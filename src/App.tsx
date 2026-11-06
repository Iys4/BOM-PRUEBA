/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  RotateCcw,
  Eye,
  Dna,
  ExternalLink,
  ChevronDown,
  Maximize2,
  X,
} from 'lucide-react';
import {
  ALL_BOM_SPECIMENS,
  ALL_TAXONOMIC_SUGGESTIONS,
  normalizeText,
  CnidariaSpecimen,
  TaxonRankKey,
  TaxonRankInfo,
} from './data/cnidariaDataset';
import { SpecimenSvgDiagram } from './components/SpecimenSvgDiagram';
import { queryNcbiSequencesForTaxon, NcbiOrganismData } from './utils/ncbiLookup';

interface ShuffledOrganOption {
  id: string;
  name: string;
  isTrueOrgan: boolean;
  feedbackText: string;
}

type PhylumFilter =
  | 'ALL'
  | 'Cnidaria'
  | 'Mollusca'
  | 'Annelida'
  | 'Arthropoda'
  | 'Ctenophora'
  | 'Chaetognatha'
  | 'Sarcomastigophora';

interface PhylumOption {
  value: PhylumFilter;
  shortLabel: string;
  menuLabel: string;
}

const PHYLA_OPTIONS: PhylumOption[] = [
  { value: 'ALL', shortLabel: 'Todos', menuLabel: 'Todos los Phyla' },
  { value: 'Cnidaria', shortLabel: 'Cnidaria', menuLabel: 'Cnidaria' },
  { value: 'Mollusca', shortLabel: 'Mollusca', menuLabel: 'Mollusca' },
  { value: 'Annelida', shortLabel: 'Annelida', menuLabel: 'Annelida' },
  { value: 'Arthropoda', shortLabel: 'Arthropoda', menuLabel: 'Arthropoda (Crustacea)' },
  { value: 'Ctenophora', shortLabel: 'Ctenophora', menuLabel: 'Ctenophora' },
  { value: 'Chaetognatha', shortLabel: 'Chaetognatha', menuLabel: 'Chaetognatha' },
  {
    value: 'Sarcomastigophora',
    shortLabel: 'Foraminifera',
    menuLabel: 'Sarcomastigophora (Foraminifera)',
  },
];

function resolveAssetUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const clean = url.startsWith('/') ? url.slice(1) : url;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}${clean}`;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [phylumFilter, setPhylumFilter] = useState<PhylumFilter>('ALL');
  const [isPhylumMenuOpen, setIsPhylumMenuOpen] = useState<boolean>(false);
  const [specimenOrder] = useState<CnidariaSpecimen[]>(() =>
    shuffleArray(ALL_BOM_SPECIMENS.filter((s) => Boolean(s.imageUrl))).concat(
      shuffleArray(ALL_BOM_SPECIMENS.filter((s) => !s.imageUrl))
    )
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [useSecondaryPhoto, setUseSecondaryPhoto] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Sticky thumbnail state when main image scrolls out of view
  const specimenImageRef = useRef<HTMLDivElement>(null);
  const [isMainImageOutOfView, setIsMainImageOutOfView] = useState<boolean>(false);
  const [isThumbnailExpanded, setIsThumbnailExpanded] = useState<boolean>(false);

  // Game state
  const [score, setScore] = useState<number>(0);
  const [guessedRanks, setGuessedRanks] = useState<Record<string, boolean>>({});
  const [lastElevatedRank, setLastElevatedRank] = useState<TaxonRankKey | null>(null);

  // Top general predictive input state
  const [taxInput, setTaxInput] = useState<string>('');
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [inputFeedback, setInputFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isShakingInput, setIsShakingInput] = useState<boolean>(false);

  // Per-rank filtered input state
  const [rankInputs, setRankInputs] = useState<Partial<Record<TaxonRankKey, string>>>({});
  const [focusedRankKey, setFocusedRankKey] = useState<TaxonRankKey | null>(null);
  const [rankSuggestionIdx, setRankSuggestionIdx] = useState<number>(0);
  const [shakingRankKey, setShakingRankKey] = useState<TaxonRankKey | null>(null);

  // Phase 2 & 3 state
  const [organsUnlockedManually, setOrgansUnlockedManually] = useState<boolean>(false);
  const [selectedTrueOrgans, setSelectedTrueOrgans] = useState<Record<string, boolean>>({});
  const [clickedDistractors, setClickedDistractors] = useState<Record<string, boolean>>({});
  const [shakingOrganName, setShakingOrganName] = useState<string | null>(null);
  const [organFeedback, setOrganFeedback] = useState<{
    type: 'correct' | 'incorrect';
    title: string;
    detail: string;
  } | null>(null);

  // Optional NCBI Molecular data in Phase 3
  const [ncbiData, setNcbiData] = useState<NcbiOrganismData | null>(null);
  const [ncbiLoading, setNcbiLoading] = useState<boolean>(false);
  const [ncbiError, setNcbiError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const filteredSpecimens = useMemo(() => {
    if (phylumFilter === 'ALL') return specimenOrder;
    return specimenOrder.filter((s) => s.taxonomy.phylum === phylumFilter);
  }, [specimenOrder, phylumFilter]);

  const currentSpecimen: CnidariaSpecimen =
    filteredSpecimens[currentIndex % filteredSpecimens.length] || ALL_BOM_SPECIMENS[0];

  // Observe when the main specimen image scrolls out of view to show the mini sticky reference top-left
  useEffect(() => {
    const el = specimenImageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainImageOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentSpecimen.id]);

  // Close phylum dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsPhylumMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build randomized organ buttons for current specimen
  const organOptions: ShuffledOrganOption[] = useMemo(() => {
    const trueOpts: ShuffledOrganOption[] = currentSpecimen.organs.map((o) => ({
      id: `true_${o.name}`,
      name: o.name,
      isTrueOrgan: true,
      feedbackText: o.description,
    }));
    const distractorOpts: ShuffledOrganOption[] = currentSpecimen.distractors.map((d) => ({
      id: `dist_${d.name}`,
      name: d.name,
      isTrueOrgan: false,
      feedbackText: d.reason,
    }));
    return shuffleArray([...trueOpts, ...distractorOpts]);
  }, [currentSpecimen]);

  // Unlock Phase 2 when species or genus is guessed, or manually unlocked
  const isPhase2Unlocked =
    Boolean(guessedRanks['species']) ||
    Boolean(guessedRanks['genus']) ||
    organsUnlockedManually;

  // Unlock Phase 3 when all true organs of current specimen are selected
  const totalTrueOrgans = currentSpecimen.organs.length;
  const foundTrueOrgansCount = Object.keys(selectedTrueOrgans).length;
  const isPhase3Complete = isPhase2Unlocked && foundTrueOrgansCount === totalTrueOrgans;

  // Reset round state when specimen changes
  const resetForSpecimen = () => {
    setGuessedRanks({});
    setLastElevatedRank(null);
    setTaxInput('');
    setShowSuggestions(false);
    setInputFeedback(null);
    setRankInputs({});
    setFocusedRankKey(null);
    setOrgansUnlockedManually(false);
    setSelectedTrueOrgans({});
    setClickedDistractors({});
    setOrganFeedback(null);
    setUseSecondaryPhoto(false);
    setImageError(false);
    setIsThumbnailExpanded(false);
    setNcbiData(null);
    setNcbiLoading(false);
    setNcbiError(null);
  };

  useEffect(() => {
    resetForSpecimen();
  }, [currentSpecimen.id]);

  // General predictive autocomplete suggestions (threshold: 2 characters)
  const suggestions = useMemo(() => {
    const normQuery = normalizeText(taxInput);
    if (normQuery.length < 2) return [];

    const alreadyGuessedNorms = new Set(
      currentSpecimen.ranks
        .filter((r) => guessedRanks[r.key])
        .flatMap((r) => [normalizeText(r.canonicalValue), ...r.acceptedAliases.map(normalizeText)])
    );

    const uniqueByDisplay = new Map<string, (typeof ALL_TAXONOMIC_SUGGESTIONS)[number]>();
    const startsWithMatches: typeof ALL_TAXONOMIC_SUGGESTIONS = [];
    const containsMatches: typeof ALL_TAXONOMIC_SUGGESTIONS = [];

    for (const item of ALL_TAXONOMIC_SUGGESTIONS) {
      if (alreadyGuessedNorms.has(item.normalized)) continue;
      if (uniqueByDisplay.has(item.normalized)) continue;
      if (item.normalized.startsWith(normQuery)) {
        uniqueByDisplay.set(item.normalized, item);
        startsWithMatches.push(item);
      } else if (item.normalized.includes(normQuery)) {
        uniqueByDisplay.set(item.normalized, item);
        containsMatches.push(item);
      }
    }

    return [...startsWithMatches, ...containsMatches].slice(0, 7);
  }, [taxInput, currentSpecimen, guessedRanks]);

  // Per-rank filtered suggestions (strictly filtered by `rankKey`)
  const getFilteredSuggestionsForRank = (rankKey: TaxonRankKey, rawQuery: string) => {
    const normQuery = normalizeText(rawQuery);
    if (normQuery.length < 1) return [];

    const uniqueNorms = new Set<string>();
    const startsWith: typeof ALL_TAXONOMIC_SUGGESTIONS = [];
    const contains: typeof ALL_TAXONOMIC_SUGGESTIONS = [];

    for (const item of ALL_TAXONOMIC_SUGGESTIONS) {
      if (item.rankKey !== rankKey) continue;
      if (uniqueNorms.has(item.normalized)) continue;

      if (item.normalized.startsWith(normQuery)) {
        uniqueNorms.add(item.normalized);
        startsWith.push(item);
      } else if (item.normalized.includes(normQuery)) {
        uniqueNorms.add(item.normalized);
        contains.push(item);
      }
    }

    return [...startsWith, ...contains].slice(0, 6);
  };

  const triggerInputShake = () => {
    setIsShakingInput(false);
    setTimeout(() => setIsShakingInput(true), 10);
  };

  const triggerRankShake = (rankKey: TaxonRankKey) => {
    setShakingRankKey(null);
    setTimeout(() => setShakingRankKey(rankKey), 10);
    setTimeout(() => setShakingRankKey(null), 400);
  };

  // Validate a general taxonomic input (from the top bar under the image)
  const evaluateTaxonSubmission = (rawValue: string) => {
    const norm = normalizeText(rawValue);
    if (!norm) return;

    const matchedRanks = currentSpecimen.ranks.filter((rank) => {
      const canonicalNorm = normalizeText(rank.canonicalValue);
      return (
        canonicalNorm === norm ||
        rank.acceptedAliases.some((alias) => normalizeText(alias) === norm)
      );
    });

    if (matchedRanks.length > 0) {
      const newlyGuessed = matchedRanks.filter((r) => !guessedRanks[r.key]);

      const speciesMatched = matchedRanks.some((r) => r.key === 'species');
      const genusRank = currentSpecimen.ranks.find((r) => r.key === 'genus');
      const autoCreditGenus =
        speciesMatched &&
        genusRank &&
        !guessedRanks['genus'] &&
        !newlyGuessed.some((r) => r.key === 'genus');

      if (newlyGuessed.length === 0 && !autoCreditGenus) {
        setInputFeedback({
          type: 'info',
          message: `"${matchedRanks[0].canonicalValue}" ya fue validado en la ficha taxonómica.`,
        });
        setTaxInput('');
        setShowSuggestions(false);
        return;
      }

      const updated = { ...guessedRanks };
      let pointsEarned = 0;

      for (const r of newlyGuessed) {
        updated[r.key] = true;
        pointsEarned += 100;
        setLastElevatedRank(r.key);
      }

      if (autoCreditGenus && genusRank) {
        updated['genus'] = true;
        pointsEarned += 100;
      }

      setGuessedRanks(updated);
      setScore((prev) => prev + pointsEarned);
      setTaxInput('');
      setShowSuggestions(false);

      const labelsGuessed = [
        ...newlyGuessed.map((r) => `${r.label}: ${r.canonicalValue}`),
        ...(autoCreditGenus && genusRank ? [`Género: ${genusRank.canonicalValue}`] : []),
      ].join(' · ');

      setInputFeedback({
        type: 'success',
        message: `+${pointsEarned} pts — ${labelsGuessed}`,
      });
      return;
    }

    // Did not match current specimen (no "Sin penalización" text per user instructions)
    triggerInputShake();
    const otherSuggestion = ALL_TAXONOMIC_SUGGESTIONS.find((s) => s.normalized === norm);
    if (otherSuggestion) {
      setInputFeedback({
        type: 'error',
        message: `"${otherSuggestion.display}" (${otherSuggestion.rankLabel}) no corresponde a este espécimen.`,
      });
    } else {
      setInputFeedback({
        type: 'error',
        message: `"${rawValue.trim()}" no coincide con la taxonomía de este espécimen.`,
      });
    }
  };

  // Validate a rank-specific input (inside the Grupo Taxonómico grid)
  const evaluateSpecificRankSubmission = (rank: TaxonRankInfo, rawValue: string) => {
    const norm = normalizeText(rawValue);
    if (!norm) return;

    const isMatchForThisRank =
      normalizeText(rank.canonicalValue) === norm ||
      rank.acceptedAliases.some((alias) => normalizeText(alias) === norm);

    if (isMatchForThisRank) {
      const updated = { ...guessedRanks, [rank.key]: true };
      let pointsEarned = 100;

      // If user entered the species in the Species box, also credit Genus if unguessed
      const genusRank = currentSpecimen.ranks.find((r) => r.key === 'genus');
      const autoCreditGenus =
        rank.key === 'species' && genusRank && !guessedRanks['genus'];
      if (autoCreditGenus) {
        updated['genus'] = true;
        pointsEarned += 100;
      }

      setGuessedRanks(updated);
      setScore((prev) => prev + pointsEarned);
      setLastElevatedRank(rank.key);
      setRankInputs((prev) => ({ ...prev, [rank.key]: '' }));
      setFocusedRankKey(null);
      setInputFeedback({
        type: 'success',
        message: `+${pointsEarned} pts — ${rank.label}: ${rank.canonicalValue}`,
      });
      return;
    }

    triggerRankShake(rank.key);
    const otherSuggestion = ALL_TAXONOMIC_SUGGESTIONS.find(
      (s) => s.rankKey === rank.key && s.normalized === norm
    );
    if (otherSuggestion) {
      setInputFeedback({
        type: 'error',
        message: `"${otherSuggestion.display}" (${rank.label}) no corresponde a este espécimen.`,
      });
    } else {
      setInputFeedback({
        type: 'error',
        message: `"${rawValue.trim()}" no corresponde a ${rank.label} de este espécimen.`,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxInput.trim()) return;
    if (showSuggestions && suggestions.length > 0 && activeSuggestionIdx >= 0) {
      const chosen = suggestions[activeSuggestionIdx];
      if (
        normalizeText(taxInput) === chosen.normalized ||
        activeSuggestionIdx > 0
      ) {
        evaluateTaxonSubmission(chosen.display);
        return;
      }
    }
    evaluateTaxonSubmission(taxInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleGiveTaxonHint = () => {
    const nextUnguessed = currentSpecimen.ranks.find((r) => !guessedRanks[r.key]);
    if (!nextUnguessed) return;
    setGuessedRanks((prev) => ({ ...prev, [nextUnguessed.key]: true }));
    setLastElevatedRank(nextUnguessed.key);
    setInputFeedback({
      type: 'info',
      message: `Pista revelada — ${nextUnguessed.label}: ${nextUnguessed.canonicalValue}`,
    });
  };

  const handleRevealSpeciesAndOrgans = () => {
    setGuessedRanks((prev) => ({
      ...prev,
      genus: true,
      species: true,
    }));
    setOrgansUnlockedManually(true);
    setLastElevatedRank('species');
    setInputFeedback({
      type: 'info',
      message: `Especie revelada: ${currentSpecimen.name}. Selecciona ahora sus órganos diagnósticos.`,
    });
  };

  const handleOrganClick = (option: ShuffledOrganOption) => {
    if (option.isTrueOrgan) {
      if (selectedTrueOrgans[option.name]) {
        setOrganFeedback({
          type: 'correct',
          title: option.name,
          detail: option.feedbackText,
        });
        return;
      }
      setSelectedTrueOrgans((prev) => ({ ...prev, [option.name]: true }));
      setScore((prev) => prev + 50);
      setOrganFeedback({
        type: 'correct',
        title: `+50 pts · ${option.name}`,
        detail: option.feedbackText,
      });
    } else {
      setClickedDistractors((prev) => ({ ...prev, [option.name]: true }));
      setShakingOrganName(option.name);
      setTimeout(() => setShakingOrganName(null), 380);
      setOrganFeedback({
        type: 'incorrect',
        title: `Distractor: ${option.name}`,
        detail: option.feedbackText,
      });
    }
  };

  const handlePrevSpecimen = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredSpecimens.length) % filteredSpecimens.length
    );
  };

  const handleNextSpecimen = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredSpecimens.length);
  };

  const handleLoadNcbiData = async () => {
    setNcbiLoading(true);
    setNcbiError(null);
    try {
      const result = await queryNcbiSequencesForTaxon(currentSpecimen.taxonomy.genus);
      setNcbiData(result);
    } catch {
      setNcbiError('No se pudo conectar con NCBI E-utilities en este momento.');
    } finally {
      setNcbiLoading(false);
    }
  };

  const totalRanksCount = currentSpecimen.ranks.length;
  const guessedRanksCount = currentSpecimen.ranks.filter((r) => guessedRanks[r.key]).length;
  const rawPhotoUrl =
    useSecondaryPhoto && currentSpecimen.secondaryImageUrl
      ? currentSpecimen.secondaryImageUrl
      : currentSpecimen.imageUrl;
  const activePhotoUrl = resolveAssetUrl(rawPhotoUrl);

  const activePhylumOption =
    PHYLA_OPTIONS.find((p) => p.value === phylumFilter) || PHYLA_OPTIONS[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Floating Mini Sticky Image Reference on Top-Left when scrolling down */}
      {isMainImageOutOfView && (
        <div className="fixed top-2.5 left-3 z-40 flex items-start gap-2">
          <button
            type="button"
            onClick={() => setIsThumbnailExpanded((prev) => !prev)}
            title="Tocar para ampliar o reducir imagen de referencia"
            className={`bg-white border-2 border-[#2563EB] shadow-lg rounded-xl overflow-hidden transition-all cursor-pointer relative flex items-center justify-center ${
              isThumbnailExpanded ? 'w-56 h-56 sm:w-64 sm:h-64 p-2' : 'w-20 h-20 sm:w-24 sm:h-24 p-1'
            }`}
          >
            {activePhotoUrl && !imageError ? (
              <img
                src={activePhotoUrl}
                alt="Referencia de espécimen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <SpecimenSvgDiagram
                svgType={currentSpecimen.svgType}
                label={currentSpecimen.commonName}
              />
            )}
            <span className="absolute bottom-1 right-1 bg-slate-900/75 text-white p-1 rounded-md">
              {isThumbnailExpanded ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </span>
          </button>
        </div>
      )}

      {/* Ultra-compact Header: Back Arrow (left) — Phylum Dropdown (center) — Score + Forward Arrow (right) */}
      <header className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 border-b border-slate-200 bg-white relative z-30">
        {/* Back Arrow Button (icon only) */}
        <button
          type="button"
          onClick={handlePrevSpecimen}
          aria-label="Espécimen anterior"
          title="Espécimen anterior"
          className="min-h-[48px] min-w-[48px] p-2.5 text-slate-800 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Phylum-only Dropdown Menu */}
        <div ref={menuContainerRef} className="relative flex-1 max-w-[220px] sm:max-w-xs">
          <button
            type="button"
            onClick={() => setIsPhylumMenuOpen((prev) => !prev)}
            className="w-full min-h-[48px] px-3 py-2 text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center justify-between gap-1.5 cursor-pointer"
          >
            <span className="truncate">{activePhylumOption.shortLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                isPhylumMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isPhylumMenuOpen && (
            <div className="absolute left-0 right-0 sm:w-64 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-[75vh] overflow-y-auto z-50 p-1.5 space-y-1">
              {PHYLA_OPTIONS.map((opt) => {
                const isSelected = opt.value === phylumFilter;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setPhylumFilter(opt.value);
                      setCurrentIndex(0);
                      setIsPhylumMenuOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3 py-2 text-left text-sm sm:text-base rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white font-semibold'
                        : 'text-slate-800 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <span>{opt.menuLabel}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Score + Forward Arrow Button (icon only) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-sm sm:text-lg font-semibold text-slate-900 tabular-nums whitespace-nowrap">
            {score} pts
          </span>
          <button
            type="button"
            onClick={handleNextSpecimen}
            aria-label="Siguiente espécimen"
            title="Siguiente espécimen"
            className="min-h-[48px] min-w-[48px] p-2.5 text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main 2-column responsive laboratory workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Specimen Image + General Predictive Taxonomic Input */}
          <section className="lg:col-span-6 flex flex-col gap-4">
            {/* Specimen Counter & Photo Switcher */}
            <div className="flex items-center justify-between text-base text-slate-600">
              <span className="font-medium tabular-nums">
                Espécimen {(currentIndex % filteredSpecimens.length) + 1} /{' '}
                {filteredSpecimens.length}
              </span>
              <div className="flex items-center gap-3">
                {currentSpecimen.secondaryImageUrl && (
                  <button
                    type="button"
                    onClick={() => setUseSecondaryPhoto((prev) => !prev)}
                    className="text-sm font-semibold text-[#2563EB] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    Cambiar vista ({useSecondaryPhoto ? '2/2' : '1/2'})
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetForSpecimen}
                  title="Reiniciar este espécimen"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>

            {/* Specimen Viewport Container */}
            <div
              ref={specimenImageRef}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3 sm:p-4 flex items-center justify-center min-h-[220px] sm:min-h-[300px]"
            >
              {activePhotoUrl && !imageError ? (
                <img
                  src={activePhotoUrl}
                  alt="Espécimen de Cnidaria para identificar"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full max-h-[36vh] lg:max-h-[400px] object-contain rounded-xl select-none"
                />
              ) : (
                <SpecimenSvgDiagram
                  svgType={currentSpecimen.svgType}
                  label={currentSpecimen.commonName}
                />
              )}
            </div>

            {/* General Predictive Taxonomic Input Bar (accepts any rank in any order) */}
            <div className="relative">
              <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={taxInput}
                    onChange={(e) => {
                      setTaxInput(e.target.value);
                      setActiveSuggestionIdx(0);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 180);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ingresa cualquier taxón (especie, familia, clase...)"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className={`w-full min-h-[52px] px-4 py-3 text-[18px] sm:text-[19px] font-medium text-slate-900 bg-white border-2 rounded-xl outline-none transition-colors placeholder:text-slate-400 ${
                      isShakingInput
                        ? 'animate-shake border-[#EF4444]'
                        : 'border-slate-300 focus:border-[#2563EB]'
                    }`}
                  />

                  {/* Autocomplete Dropdown (triggers at >= 2 chars) */}
                  {showSuggestions && suggestions.length > 0 && (
                    <ul
                      role="listbox"
                      className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20 divide-y divide-slate-100"
                    >
                      {suggestions.map((item, idx) => (
                        <li key={`${item.rankKey}:${item.normalized}`}>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              evaluateTaxonSubmission(item.display);
                            }}
                            className={`w-full min-h-[48px] px-4 py-2.5 text-left flex items-center justify-between text-[18px] transition-colors cursor-pointer ${
                              idx === activeSuggestionIdx
                                ? 'bg-blue-50 text-[#2563EB] font-semibold'
                                : 'text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <span className="italic">{item.display}</span>
                            <span className="text-sm font-normal text-slate-500 not-italic">
                              {item.rankLabel}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  className="min-h-[52px] px-6 py-3 text-[18px] font-semibold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Validar
                </button>
              </form>

              {/* Immediate feedback message */}
              {inputFeedback && (
                <div
                  className={`mt-3 px-4 py-3 rounded-xl text-[17px] font-medium flex items-center gap-2.5 ${
                    inputFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : inputFeedback.type === 'error'
                      ? 'bg-red-50 text-red-900 border border-red-200'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {inputFeedback.type === 'success' ? (
                    <Check className="w-5 h-5 text-[#10B981] shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                  <span>{inputFeedback.message}</span>
                </div>
              )}

              {/* Quick study helpers (Hint / Unlock Organs) */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
                <button
                  type="button"
                  onClick={handleGiveTaxonHint}
                  disabled={guessedRanksCount === totalRanksCount}
                  className="min-h-[44px] px-2 py-1.5 text-slate-700 hover:text-[#2563EB] font-medium flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Pista taxonómica</span>
                </button>

                {!isPhase2Unlocked && (
                  <button
                    type="button"
                    onClick={handleRevealSpeciesAndOrgans}
                    className="min-h-[44px] px-2 py-1.5 text-[#2563EB] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Revelar especie y pasar a órganos</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Filtered Inputs per Taxonomic Rank + Phase 2 Organs + Phase 3 Formol Card */}
          <section className="lg:col-span-6 flex flex-col gap-6">
            {/* Taxonomic Group Panel with individual filtered inputs per rank */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-xl font-bold text-slate-900">
                  Grupo Taxonómico
                </h2>
                <span className="font-mono text-base font-semibold text-slate-700 tabular-nums">
                  {guessedRanksCount} / {totalRanksCount}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentSpecimen.ranks.map((rank) => {
                  const isGuessed = Boolean(guessedRanks[rank.key]);
                  const isRevealedAtEnd = isPhase3Complete && !isGuessed;
                  const isJustElevated = lastElevatedRank === rank.key;
                  const isShakingThisRank = shakingRankKey === rank.key;
                  const currentVal = rankInputs[rank.key] || '';
                  const isFocused = focusedRankKey === rank.key;
                  const rankSuggestions = isFocused
                    ? getFilteredSuggestionsForRank(rank.key, currentVal)
                    : [];

                  if (isGuessed || isRevealedAtEnd) {
                    return (
                      <div
                        key={rank.key}
                        className={`min-h-[52px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all ${
                          isGuessed
                            ? `bg-[#2563EB] text-white border-[#2563EB] ${
                                isJustElevated ? 'animate-elevate' : ''
                              }`
                            : 'bg-white text-slate-800 border-slate-300'
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            isGuessed ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {rank.label}
                        </span>
                        <span
                          className={`text-[17px] font-bold text-right ${
                            rank.key === 'genus' || rank.key === 'species' ? 'italic' : ''
                          }`}
                        >
                          {rank.canonicalValue}
                        </span>
                      </div>
                    );
                  }

                  // Unguessed rank: render an interactive input filtered specifically by this taxonomic rank
                  return (
                    <div key={rank.key} className="relative">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!currentVal.trim()) return;
                          if (
                            rankSuggestions.length > 0 &&
                            rankSuggestionIdx >= 0 &&
                            (normalizeText(currentVal) ===
                              rankSuggestions[rankSuggestionIdx].normalized ||
                              rankSuggestionIdx > 0)
                          ) {
                            evaluateSpecificRankSubmission(
                              rank,
                              rankSuggestions[rankSuggestionIdx].display
                            );
                            return;
                          }
                          evaluateSpecificRankSubmission(rank, currentVal);
                        }}
                        className={`min-h-[52px] px-3.5 py-2 rounded-xl border-2 bg-white flex items-center justify-between gap-2 transition-colors ${
                          isShakingThisRank
                            ? 'animate-shake border-[#EF4444]'
                            : isFocused
                            ? 'border-[#2563EB]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <label
                          htmlFor={`rank-input-${rank.key}`}
                          className="text-sm font-semibold text-slate-500 shrink-0 cursor-text"
                        >
                          {rank.label}
                        </label>
                        <input
                          id={`rank-input-${rank.key}`}
                          type="text"
                          value={currentVal}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRankInputs((prev) => ({ ...prev, [rank.key]: val }));
                            setFocusedRankKey(rank.key);
                            setRankSuggestionIdx(0);
                          }}
                          onFocus={() => {
                            setFocusedRankKey(rank.key);
                            setRankSuggestionIdx(0);
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              setFocusedRankKey((prev) =>
                                prev === rank.key ? null : prev
                              );
                            }, 180);
                          }}
                          onKeyDown={(e) => {
                            if (rankSuggestions.length === 0) return;
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setRankSuggestionIdx(
                                (prev) => (prev + 1) % rankSuggestions.length
                              );
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setRankSuggestionIdx(
                                (prev) =>
                                  (prev - 1 + rankSuggestions.length) %
                                  rankSuggestions.length
                              );
                            } else if (e.key === 'Escape') {
                              setFocusedRankKey(null);
                            }
                          }}
                          placeholder={`Escribir ${rank.label.toLowerCase()}...`}
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          className="w-full text-right text-[16px] sm:text-[17px] font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300 placeholder:font-normal"
                        />
                      </form>

                      {/* Filtered dropdown for this specific taxonomic rank */}
                      {isFocused && rankSuggestions.length > 0 && (
                        <ul
                          role="listbox"
                          className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-30 divide-y divide-slate-100"
                        >
                          {rankSuggestions.map((sug, idx) => (
                            <li key={`${rank.key}-${sug.normalized}`}>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  evaluateSpecificRankSubmission(rank, sug.display);
                                }}
                                className={`w-full min-h-[46px] px-3.5 py-2 text-left flex items-center justify-between text-[16px] transition-colors cursor-pointer ${
                                  idx === rankSuggestionIdx
                                    ? 'bg-blue-50 text-[#2563EB] font-semibold'
                                    : 'text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                <span
                                  className={
                                    rank.key === 'genus' || rank.key === 'species'
                                      ? 'italic'
                                      : ''
                                  }
                                >
                                  {sug.display}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {rank.label}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PHASE 2: Diagnostic Organs Selection Grid */}
            {isPhase2Unlocked && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 animate-elevate">
                <div className="flex items-center justify-between mb-3.5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Órganos y Estructuras Diagnósticas
                  </h2>
                  <span className="font-mono text-base font-semibold text-[#2563EB] tabular-nums">
                    {foundTrueOrgansCount} / {totalTrueOrgans}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {organOptions.map((opt) => {
                    const isSelectedTrue = Boolean(selectedTrueOrgans[opt.name]);
                    const isClickedDistractor = Boolean(clickedDistractors[opt.name]);
                    const isShaking = shakingOrganName === opt.name;

                    let buttonStyle =
                      'bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white border-[#2563EB]';
                    if (isSelectedTrue) {
                      buttonStyle = 'bg-[#10B981] text-white border-[#10B981]';
                    } else if (isClickedDistractor) {
                      buttonStyle = 'bg-red-50 text-red-900 border-[#EF4444]';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleOrganClick(opt)}
                        className={`min-h-[52px] px-4 py-3 rounded-xl border-2 text-left text-[16px] sm:text-[17px] font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer ${buttonStyle} ${
                          isShaking ? 'animate-shake' : ''
                        }`}
                      >
                        <span className="leading-snug">{opt.name}</span>
                        {isSelectedTrue && <Check className="w-5 h-5 shrink-0" />}
                        {isClickedDistractor && (
                          <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Immediate diagnostic feedback on organ click */}
                {organFeedback && (
                  <div
                    className={`mt-4 p-4 rounded-xl border text-[17px] leading-relaxed ${
                      organFeedback.type === 'correct'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-red-50 border-red-200 text-red-950'
                    }`}
                  >
                    <p className="font-bold">{organFeedback.title}</p>
                    <p className="mt-1 text-[16px]">{organFeedback.detail}</p>
                  </div>
                )}
              </div>
            )}

            {/* PHASE 3: Final Specimen Description & Formol Recognition Card */}
            {isPhase3Complete && (
              <div className="bg-[#F8FAFC] border-2 border-[#2563EB] rounded-2xl p-5 sm:p-6 animate-elevate">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-200 pb-3.5">
                  <h3 className="text-2xl font-bold italic text-slate-900">
                    {currentSpecimen.name}
                  </h3>
                  <span className="text-base font-semibold text-slate-600">
                    {currentSpecimen.commonName}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    Reconocimiento del espécimen en formol (Parcial Práctico)
                  </h4>
                  <p className="text-[18px] leading-relaxed text-slate-800 bg-white p-4 rounded-xl border border-slate-200">
                    {currentSpecimen.formolNotes}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Resumen de órganos diagnósticos
                  </h4>
                  <ul className="space-y-1.5 text-[16px] text-slate-700">
                    {currentSpecimen.organs.map((org) => (
                      <li
                        key={org.name}
                        className="bg-white px-3.5 py-2 rounded-lg border border-slate-200"
                      >
                        <span className="font-bold text-slate-900">{org.name}:</span>{' '}
                        <span>{org.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional NCBI Entrez molecular verification */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  {!ncbiData && !ncbiLoading && (
                    <button
                      type="button"
                      onClick={handleLoadNcbiData}
                      className="min-h-[44px] text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Dna className="w-4 h-4" />
                      <span>
                        Ver registros moleculares en NCBI Entrez (
                        {currentSpecimen.taxonomy.genus})
                      </span>
                    </button>
                  )}

                  {ncbiLoading && (
                    <p className="text-sm text-slate-500">
                      Consultando NCBI E-utilities...
                    </p>
                  )}

                  {ncbiError && <p className="text-sm text-red-600">{ncbiError}</p>}

                  {ncbiData && (
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-900">
                          NCBI Protein · {ncbiData.queryTerm} ({ncbiData.totalCount}{' '}
                          secuencias)
                        </span>
                        <a
                          href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${encodeURIComponent(
                            currentSpecimen.taxonomy.genus
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>NCBI Taxonomy</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      {ncbiData.records.length > 0 ? (
                        <ul className="space-y-1 text-slate-700">
                          {ncbiData.records.map((rec) => (
                            <li key={rec.uid} className="truncate">
                              <span className="font-mono text-xs font-semibold text-slate-900">
                                {rec.accessionVersion}
                              </span>{' '}
                              · {rec.title} ({rec.slen} aa)
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-500">
                          Sin accesiones directas listadas para este género en la
                          consulta rápida.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handlePrevSpecimen}
                    className="min-h-[54px] px-4 py-3.5 text-[18px] font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Anterior</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSpecimen}
                    className="min-h-[54px] px-4 py-3.5 text-[18px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
