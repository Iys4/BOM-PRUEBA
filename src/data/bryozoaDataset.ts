import { CnidariaSpecimen } from './cnidariaDataset';

export const BRYOZOA_SPECIMENS: CnidariaSpecimen[] = [
  {
    id: 'membraniporopsis_tubigera',
    name: 'Membraniporopsis tubigera',
    commonName: 'Briozoo incrustante invasor / Briozoo de tubérculos calcáreos (EEIA)',
    imageUrl: '/assets/aistudio/membraniporopsis_tubigera.jpg',
    taxonomy: {
      phylum: 'Bryozoa',
      subphylum: 'Ectoprocta',
      class: 'Gymnolaemata',
      order: 'Cheilostomatida',
      suborder: 'Malacostegina',
      family: 'Membraniporidae',
      genus: 'Membraniporopsis',
      species: 'Membraniporopsis tubigera',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Bryozoa', acceptedAliases: ['bryozoa', 'ectoprocta', 'briozoos', 'briozoo'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Ectoprocta', acceptedAliases: ['ectoprocta'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Gymnolaemata', acceptedAliases: ['gymnolaemata', 'gimnolemados'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Cheilostomatida', acceptedAliases: ['cheilostomatida', 'cheilostomata', 'queilostomados', 'queilostomata'] },
      { key: 'suborder', label: 'Suborden', canonicalValue: 'Malacostegina', acceptedAliases: ['malacostegina', 'flustrina'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Membraniporidae', acceptedAliases: ['membraniporidae', 'membraniporidos'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Membraniporopsis', acceptedAliases: ['membraniporopsis'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Membraniporopsis tubigera', acceptedAliases: ['membraniporopsis tubigera', 'membraniporopsis tubugera', 'briozoo invasor'] },
    ],
    organs: [],
    distractors: [],
    formolNotes: 'Costra calcárea continua laminar de color blanco cremoso o beige en encaje calado sobre conchillas de bivalvos (Mytella, Rapana, Mactra), boyas o cascos de embarcaciones. Al microscopio destacan zoecios rectangulares ordenados en hileras alternadas con una enorme opesia membranosa frontal (>80%) y conspicuos tubérculos calcáreos cilíndricos huecos en las esquinas distales.',
  },
];
