import { normalizeText } from './cnidariaDataset';

export interface AnatomyTargetPart {
  number: number;
  canonicalName: string;
  acceptedInputs: string[];
  category: string;
}

export interface AnatomyDiagram {
  id: string;
  title: string;
  organismGroup: string;
  imageUrl: string;
  targets: AnatomyTargetPart[];
}

export const ANATOMY_DIAGRAMS: AnatomyDiagram[] = [
  {
    id: 'malacostraca_decapoda_external_morphology',
    title: 'Morfología Externa de un Crustáceo Decápodo',
    organismGroup: 'Crustacea: Decapoda (Malacostraca)',
    imageUrl: '/assets/aistudio/Decapoda_con_numeros_414140b1.jpeg',
    targets: [
      {
        number: 1,
        canonicalName: 'Cefalotórax',
        acceptedInputs: ['cefalotorax', 'cefalotórax'],
        category: 'Tagma compuesto',
      },
      {
        number: 2,
        canonicalName: 'Cefalón',
        acceptedInputs: ['cefalon', 'cefalón', 'cabeza'],
        category: 'Tagma anterior',
      },
      {
        number: 3,
        canonicalName: 'Pereión',
        acceptedInputs: ['pereion', 'pereión', 'torax', 'tórax'],
        category: 'Tagma medio',
      },
      {
        number: 4,
        canonicalName: 'Pleón',
        acceptedInputs: ['pleon', 'pleón', 'abdomen'],
        category: 'Tagma posterior',
      },
      {
        number: 5,
        canonicalName: 'Anténula',
        acceptedInputs: ['antenula', 'anténula', 'a1', 'antena 1', 'primer par de antenas'],
        category: 'Apéndice cefálico',
      },
      {
        number: 6,
        canonicalName: 'Ojo',
        acceptedInputs: ['ojo', 'ojo compuesto', 'ojo pedunculado'],
        category: 'Órgano sensorial',
      },
      {
        number: 7,
        canonicalName: 'Antena',
        acceptedInputs: ['antena', 'a2', 'antena 2', 'segundo par de antenas'],
        category: 'Apéndice cefálico',
      },
      {
        number: 8,
        canonicalName: 'Mandíbula',
        acceptedInputs: ['mandibula', 'mandíbula', 'piezas bucales'],
        category: 'Apéndice trófico',
      },
      {
        number: 9,
        canonicalName: 'Maxílula',
        acceptedInputs: ['maxilula', 'maxílula', 'mx1', 'primera maxila'],
        category: 'Apéndice trófico',
      },
      {
        number: 10,
        canonicalName: 'Maxila',
        acceptedInputs: ['maxila', 'mx2', 'segunda maxila'],
        category: 'Apéndice trófico',
      },
      {
        number: 11,
        canonicalName: 'Pereiópodos',
        acceptedInputs: [
          'pereiopodos',
          'pereiópodos',
          'patas toracicas',
          'patas torácicas',
          'patas marchadoras',
          'patas caminadoras',
        ],
        category: 'Apéndice torácico',
      },
      {
        number: 12,
        canonicalName: 'Pleópodos',
        acceptedInputs: [
          'pleopodos',
          'pleópodos',
          'pelopodos',
          'pelópodos',
          'patas natatorias',
          'patas abdominales',
        ],
        category: 'Apéndice abdominal',
      },
      {
        number: 13,
        canonicalName: 'Telson',
        acceptedInputs: ['telson', 'pieza terminal', 'espina caudal'],
        category: 'Pieza caudal',
      },
      {
        number: 14,
        canonicalName: 'Urópodos',
        acceptedInputs: ['uropodos', 'urópodos', 'aletas caudales'],
        category: 'Apéndice abdominal',
      },
    ],
  },
  {
    id: 'brachyura_land_crab_morphology',
    title: 'Morfología Externa de un Decápodo de Tierra',
    organismGroup: 'Decapoda: Brachyura (Cangrejos)',
    imageUrl: '/assets/aistudio/Decapodos_De_Tierra_Numeros_02b71f78.jpeg',
    targets: [
      {
        number: 1,
        canonicalName: 'Vista dorsal',
        acceptedInputs: ['vista dorsal', 'dorsal', 'cara dorsal'],
        category: 'Orientación',
      },
      {
        number: 2,
        canonicalName: 'Vista ventral',
        acceptedInputs: ['vista ventral', 'ventral', 'cara ventral'],
        category: 'Orientación',
      },
      {
        number: 3,
        canonicalName: 'Dáctilo (de la quela)',
        acceptedInputs: ['dactilo', 'dáctilo', 'dedo movil', 'dedo móvil', 'dedo dactilar', 'dactilo de la quela'],
        category: 'Artejo apendicular',
      },
      {
        number: 4,
        canonicalName: 'Quela',
        acceptedInputs: ['quela', 'pinza', 'queli'],
        category: 'Estructura apendicular',
      },
      {
        number: 5,
        canonicalName: 'Dáctilo',
        acceptedInputs: ['dactilo', 'dáctilo', 'dedo movil', 'dedo móvil'],
        category: 'Artejo apendicular',
      },
      {
        number: 6,
        canonicalName: 'Antena',
        acceptedInputs: ['antena', 'antenas', 'antenula', 'anténula', 'antenas anteriores'],
        category: 'Apéndice cefálico',
      },
      {
        number: 7,
        canonicalName: 'Própodo / Región gástrica',
        acceptedInputs: [
          'propodo',
          'própodo',
          'palma',
          'dedo fijo',
          'region gastrica',
          'región gástrica',
        ],
        category: 'Artejo / Región dorsal',
      },
      {
        number: 8,
        canonicalName: 'Carpo (del quelípedo)',
        acceptedInputs: ['carpo', 'carpopodito', 'muñeca', 'carpo del quelipedo'],
        category: 'Artejo apendicular',
      },
      {
        number: 9,
        canonicalName: 'Región branquial',
        acceptedInputs: ['region branquial', 'región branquial', 'area branquial', 'área branquial'],
        category: 'Región del caparazón',
      },
      {
        number: 10,
        canonicalName: 'Caparazón',
        acceptedInputs: ['caparazon', 'caparazón', 'carapacho'],
        category: 'Exoesqueleto dorsal',
      },
      {
        number: 11,
        canonicalName: 'Región hepática',
        acceptedInputs: ['region hepatica', 'región hepática', 'area hepatica', 'área hepática'],
        category: 'Región del caparazón',
      },
      {
        number: 12,
        canonicalName: 'Región cardíaca',
        acceptedInputs: ['region cardiaca', 'región cardíaca', 'area cardiaca', 'área cardíaca'],
        category: 'Región del caparazón',
      },
      {
        number: 13,
        canonicalName: 'Quelípedo',
        acceptedInputs: ['quelipedo', 'quelípedo', 'primer pereiopodo', 'primer pereiópodo', 'p1'],
        category: 'Apéndice torácico',
      },
      {
        number: 14,
        canonicalName: 'Isquio / Coxa',
        acceptedInputs: ['isquio', 'isquiopodito', 'coxa', 'coxopodito', 'isquio / coxa'],
        category: 'Artejo basal apendicular',
      },
      {
        number: 15,
        canonicalName: 'Mero / Carpo (patas derechas)',
        acceptedInputs: ['mero', 'carpo', 'meropodito', 'mero / carpo'],
        category: 'Artejo apendicular',
      },
      {
        number: 16,
        canonicalName: 'Dáctilo (de patas marchadoras)',
        acceptedInputs: ['dactilo', 'dáctilo', 'uña', 'dactilo caminador', 'dactilo ungueal'],
        category: 'Artejo distal apendicular',
      },
      {
        number: 17,
        canonicalName: 'Carpo (pata marchadora)',
        acceptedInputs: ['carpo', 'carpopodito'],
        category: 'Artejo apendicular',
      },
      {
        number: 18,
        canonicalName: 'Mero (pata marchadora)',
        acceptedInputs: ['mero', 'meropodito'],
        category: 'Artejo apendicular',
      },
      {
        number: 19,
        canonicalName: 'Própodo (pata marchadora)',
        acceptedInputs: ['propodo', 'própodo', 'propopodito'],
        category: 'Artejo apendicular',
      },
      {
        number: 20,
        canonicalName: 'Pereiópodos 2-5',
        acceptedInputs: [
          'pereiopodos 2-5',
          'pereiópodos 2-5',
          'patas marchadoras',
          'patas caminadoras',
          'pereiopodos',
          'pereiópodos',
        ],
        category: 'Apéndices torácicos',
      },
      {
        number: 21,
        canonicalName: 'Isquio (quelípedo ventral)',
        acceptedInputs: ['isquio', 'isquiopodito', 'isquio del quelipedo'],
        category: 'Artejo apendicular (ventral)',
      },
      {
        number: 22,
        canonicalName: 'Maxilipedio 3',
        acceptedInputs: [
          'maxilipedio 3',
          'tercer maxilipedio',
          'mxp3',
          'maxilipedo 3',
          'maxilípedo 3',
          'maxilipedio',
          'maxilipedios',
        ],
        category: 'Apéndice trófico torácico',
      },
      {
        number: 23,
        canonicalName: 'Antena / Anténula (ventral)',
        acceptedInputs: ['antena', 'antenula', 'anténula', 'antenas'],
        category: 'Apéndice cefálico (ventral)',
      },
      {
        number: 24,
        canonicalName: 'Mero (quelípedo ventral)',
        acceptedInputs: ['mero', 'meropodito', 'brazo del quelipedo'],
        category: 'Artejo apendicular (ventral)',
      },
      {
        number: 25,
        canonicalName: 'Branquiostegito',
        acceptedInputs: [
          'branquiostegito',
          'pared branquiostegal',
          'region subhepatica',
          'región subhepática',
          'camara branquial',
        ],
        category: 'Pared del caparazón',
      },
      {
        number: 26,
        canonicalName: 'Esternito torácico',
        acceptedInputs: [
          'esternito toracico',
          'esternito torácico',
          'esternito',
          'esternitos',
          'plastron esternal',
          'plastrón esternal',
          'esternon',
          'esternón',
        ],
        category: 'Esqueleto ventral',
      },
      {
        number: 27,
        canonicalName: 'Abdomen',
        acceptedInputs: ['abdomen', 'pleon', 'pleón', 'abdomen plegado'],
        category: 'Tagma posterior',
      },
    ],
  },
];

export interface AnatomySuggestion {
  display: string;
  normalized: string;
}

export const ALL_ANATOMY_SUGGESTIONS: AnatomySuggestion[] = (() => {
  const map = new Map<string, AnatomySuggestion>();

  const register = (label: string) => {
    const clean = label.trim();
    if (!clean) return;
    const norm = normalizeText(clean);
    if (!norm) return;
    if (!map.has(norm)) {
      const display = clean.charAt(0).toUpperCase() + clean.slice(1);
      map.set(norm, { display, normalized: norm });
    }
  };

  for (const diag of ANATOMY_DIAGRAMS) {
    for (const t of diag.targets) {
      register(t.canonicalName);
      for (const alias of t.acceptedInputs) {
        register(alias);
      }
    }
  }

  // Extra anatomical distractors for predictive input so it doesn't give away answers trivially
  const extraTerms = [
    'Rostro',
    'Escafocerito',
    'Estatocisto',
    'Endopodito',
    'Exopodito',
    'Epipodito',
    'Protopodito',
    'Basipodito',
    'Surco cervical',
    'Órbita ocular',
    'Epistoma',
    'Gonópodos',
    'Branquias',
  ];
  for (const term of extraTerms) {
    register(term);
  }

  return Array.from(map.values()).sort((a, b) => a.display.localeCompare(b.display));
})();
