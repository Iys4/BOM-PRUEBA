export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  baseDelayMs = 600
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);
    if (response.ok) {
      return response;
    }
    if (
      (response.status === 429 || response.status >= 500) &&
      attempt < maxRetries
    ) {
      const retryAfter = Number(response.headers.get('Retry-After'));
      const delay =
        !Number.isNaN(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : baseDelayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `HTTP ${response.status} (${response.statusText}) from ${url}: ${errorBody.slice(0, 300)}`
    );
  }
  throw new Error(`Exhausted retries for ${url}`);
}

export interface NcbiRecordSummary {
  uid: string;
  accessionVersion: string;
  title: string;
  slen: number;
}

export interface NcbiOrganismData {
  queryTerm: string;
  totalCount: number;
  records: NcbiRecordSummary[];
}

const ncbiCache = new Map<string, NcbiOrganismData>();

export async function queryNcbiSequencesForTaxon(scientificName: string): Promise<NcbiOrganismData> {
  const cleanTerm = scientificName.replace(/\bsp\.?$/i, '').trim();
  if (ncbiCache.has(cleanTerm)) {
    return ncbiCache.get(cleanTerm)!;
  }

  const esearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=protein&term=${encodeURIComponent(
    `${cleanTerm}[Organism]`
  )}&retmode=json&retmax=3`;

  const searchRes = await fetchWithRetry(esearchUrl);
  const searchJson = await searchRes.json();
  const idList: string[] = searchJson?.esearchresult?.idlist || [];
  const totalCount = Number(searchJson?.esearchresult?.count || 0);

  if (idList.length === 0) {
    const emptyResult: NcbiOrganismData = { queryTerm: cleanTerm, totalCount: 0, records: [] };
    ncbiCache.set(cleanTerm, emptyResult);
    return emptyResult;
  }

  const esummaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=protein&id=${idList.join(',')}&retmode=json`;
  const summaryRes = await fetchWithRetry(esummaryUrl);
  const summaryJson = await summaryRes.json();

  const records: NcbiRecordSummary[] = idList
    .map((uid) => {
      const item = summaryJson?.result?.[uid];
      if (!item) return null;
      return {
        uid,
        accessionVersion: item.accessionversion || item.caption || uid,
        title: item.title || 'Secuencia proteica registrada en NCBI',
        slen: Number(item.slen || 0),
      };
    })
    .filter((r): r is NcbiRecordSummary => r !== null);

  const data: NcbiOrganismData = {
    queryTerm: cleanTerm,
    totalCount,
    records,
  };
  ncbiCache.set(cleanTerm, data);
  return data;
}
