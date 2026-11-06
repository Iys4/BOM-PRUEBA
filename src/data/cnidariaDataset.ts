export type TaxonRankKey =
  | 'phylum'
  | 'subphylum'
  | 'class'
  | 'subclass'
  | 'order'
  | 'suborder'
  | 'family'
  | 'genus'
  | 'species';

export interface TaxonRankInfo {
  key: TaxonRankKey;
  label: string;
  canonicalValue: string;
  acceptedAliases: string[];
}

export interface OrganItem {
  name: string;
  description: string;
}

export interface DistractorItem {
  name: string;
  reason: string;
}

export type SvgDiagramType =
  | 'nanomia'
  | 'pseudodiploria'
  | 'mussismilia'
  | 'favia'
  | 'pocillopora'
  | 'porites'
  | 'bivalve_venerid'
  | 'polychaete_errant'
  | 'decapod_shrimp'
  | 'cladocera_podon'
  | 'mysidacea'
  | 'chaetognatha_sagitta'
  | 'chaetognatha_spadella';

export interface CnidariaSpecimen {
  id: string;
  name: string;
  commonName: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  svgType?: SvgDiagramType;
  taxonomy: {
    phylum: string;
    subphylum: string;
    class: string;
    subclass?: string;
    order: string;
    suborder?: string;
    family: string;
    genus: string;
    species: string;
  };
  ranks: TaxonRankInfo[];
  organs: OrganItem[];
  distractors: DistractorItem[];
  formolNotes: string;
}

export const RANK_LABELS: Record<TaxonRankKey, string> = {
  phylum: 'Phylum',
  subphylum: 'Subphylum',
  class: 'Clase',
  subclass: 'Subclase',
  order: 'Orden',
  suborder: 'Suborden',
  family: 'Familia',
  genus: 'Género',
  species: 'Especie',
};

export const CNIDARIA_SPECIMENS: CnidariaSpecimen[] = [
  {
    id: 'porpita_porpita',
    name: 'Porpita porpita',
    commonName: 'Botón azul (Condróforo)',
    imageUrl: '/assets/aistudio/Porpita_porpita_b6268d83.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Anthoathecata',
      family: 'Porpitidae',
      genus: 'Porpita',
      species: 'Porpita porpita',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Anthoathecata (Chondrophora)', acceptedAliases: ['anthoathecata', 'anthomedusae', 'chondrophora', 'condroforos', 'condroforo'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Porpitidae', acceptedAliases: ['porpitidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Porpita', acceptedAliases: ['porpita'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Porpita porpita', acceptedAliases: ['porpita porpita', 'porpita sp'] },
    ],
    organs: [
      { name: 'Condróforo discoidal circular', description: 'Disco quitinoso circular plano con cámaras concéntricas de gas y poros.' },
      { name: 'Gastrozoide central único', description: 'Pólipo alimentador grande ubicado en el centro de la cara oral.' },
      { name: 'Gonozoides reproductores', description: 'Rodean concéntricamente al gastrozoide central y liberan medusas.' },
      { name: 'Tentaculozoides capitados periféricos', description: 'Zooides marginales con ramas provistas de botones esféricos de nematocistos.' },
    ],
    distractors: [
      { name: 'Vela triangular oblicua', reason: 'Exclusiva de Velella velella; Porpita es un disco circular totalmente plano carente de vela dorsal.' },
      { name: 'Pneumatóforo asimétrico sacciforme', reason: 'Propio de Physalia physalis (Siphonophorae Cystonectae).' },
      { name: 'Brazos orales festoneados', reason: 'Estructura exclusiva de escifomedusas (Scyphozoa).' },
      { name: 'Canales radiales umbrelares', reason: 'Propios de medusas individuales; Porpita es una colonia flotante.' },
    ],
    formolNotes: 'Estructura en forma de moneda o disco circular perfecto, aplanado y rígido. Alrededor del borde parten tentaculozoides con pompones capitados distales. En formol el color azul turquesa desaparece y queda una lámina circular blanquecina con estrías concéntricas.',
  },
  {
    id: 'velella_velella',
    name: 'Velella velella',
    commonName: 'Barquito de San Pedro / Vela de mar',
    imageUrl: '/assets/aistudio/Velella_velella_27cf4a07.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Anthoathecata',
      family: 'Porpitidae',
      genus: 'Velella',
      species: 'Velella velella',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Anthoathecata (Chondrophora)', acceptedAliases: ['anthoathecata', 'anthomedusae', 'chondrophora', 'condroforos', 'condroforo'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Porpitidae', acceptedAliases: ['porpitidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Velella', acceptedAliases: ['velella'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Velella velella', acceptedAliases: ['velella velella', 'velella sp'] },
    ],
    organs: [
      { name: 'Condróforo elíptico con cámaras concéntricas', description: 'Flotador discoidal ovalado interno de quitina con cámaras de aire.' },
      { name: 'Vela triangular oblicua rígida', description: 'Lámina vertical transparente dispuesta en diagonal en la cara aboral.' },
      { name: 'Gastrozoide central único', description: 'Pólipo alimentador axial con boca central en vista oral.' },
      { name: 'Gonozoides intermedios', description: 'Corona concéntrica de zooides reproductores entre la boca y el margen.' },
      { name: 'Tentaculozoides / Dactilozoides marginales', description: 'Corona periférica defensiva y capturadora.' },
    ],
    distractors: [
      { name: 'Pneumatóforo carnoso sacciforme', reason: 'Velella tiene un disco rígido quitinoso con cámaras concéntricas (condróforo), no una vejiga membranosa inflable como Physalia.' },
      { name: 'Velo craspedoto muscular', reason: 'El velo es un repliegue natatorio de hidromedusas libres; la vela de Velella es quitinosa y dorsal.' },
      { name: 'Nectóforos natatorios', reason: 'Las colonias de porpítidos carecen de campanas natatorias activas.' },
      { name: 'Disco pedal adhesivo', reason: 'Estructura basal de anémonas bentónicas para fijación al sustrato.' },
    ],
    formolNotes: 'Flotador aplanado ovalado muy delgado con estriaciones concéntricas de consistencia apergaminada/plástica y una vela dorsal transparente diagonal. En formol pierde su vivo color azul marino tornándose blanco traslúcido o amarillento.',
  },
  {
    id: 'physalia_physalis',
    name: 'Physalia physalis',
    commonName: 'Carabela portuguesa / Fragata portuguesa',
    imageUrl: '/assets/aistudio/Physalia_physalis_2d1765ee.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Siphonophorae',
      suborder: 'Cystonectae',
      family: 'Physaliidae',
      genus: 'Physalia',
      species: 'Physalia physalis',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Siphonophorae', acceptedAliases: ['siphonophorae', 'siphonophora', 'sifonoforos', 'sifonoforo'] },
      { key: 'suborder', label: 'Suborden', canonicalValue: 'Cystonectae', acceptedAliases: ['cystonectae', 'cistonectidos', 'cystonectidos'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Physaliidae', acceptedAliases: ['physaliidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Physalia', acceptedAliases: ['physalia', 'fisalia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Physalia physalis', acceptedAliases: ['physalia physalis', 'physalia sp'] },
    ],
    organs: [
      { name: 'Pneumatóforo / Flotador asimétrico de gas', description: 'Vesícula flotadora membranosa llena de gas.' },
      { name: 'Cresta o vela del flotador', description: 'Quilla dorsal eréctil tabicada sobre el pneumatóforo.' },
      { name: 'Dactilozoides con tentáculos', description: 'Pólipos defensivos y de captura con filamentos contráctiles muy extensibles.' },
      { name: 'Baterías de nematocistos', description: 'Botones y bandas transversales densas de cápsulas urticantes en los tentáculos.' },
      { name: 'Gastrozoides con boca terminal', description: 'Pólipos digestivos tubulares carentes de tentáculos propios.' },
      { name: 'Gonozoides / Gonodendros con gonóforos', description: 'Estructuras reproductivas racimosas ramificadas.' },
    ],
    distractors: [
      { name: 'Nectóforos / Campanas natatorias', reason: 'Incorrecto: el suborden Cystonectae (Physalia y Rhizophysa) carece por completo de nectosoma y nectóforos.' },
      { name: 'Brácteas protectoras', reason: 'Incorrecto: el suborden Cystonectae carece de brácteas.' },
      { name: 'Velario', reason: 'Incorrecto: el velario es una estructura exclusiva de la clase Cubozoa.' },
      { name: 'Condróforo quitinoso concéntrico', reason: 'Incorrecto: el disco quitinoso con cámaras es exclusivo de Porpitidae (Porpita y Velella).' },
    ],
    formolNotes: 'Flotador sacciforme neumático azul violáceo que en formol vira a grisáceo o púrpura descolorido. Debajo del flotador pende una masa densa de zooides y tentáculos dactilozoides fuertemente replegados con botones nodulares de nematocistos.',
  },
  {
    id: 'rhizophysa_sp',
    name: 'Rhizophysa sp.',
    commonName: 'Sifonóforo cistonéctido filiforme',
    imageUrl: '/assets/aistudio/Rhizophysa_sp._dad3d182.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Siphonophorae',
      suborder: 'Cystonectae',
      family: 'Rhizophysidae',
      genus: 'Rhizophysa',
      species: 'Rhizophysa sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Siphonophorae', acceptedAliases: ['siphonophorae', 'siphonophora', 'sifonoforos'] },
      { key: 'suborder', label: 'Suborden', canonicalValue: 'Cystonectae', acceptedAliases: ['cystonectae', 'cistonectidos', 'cystonectidos'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Rhizophysidae', acceptedAliases: ['rhizophysidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Rhizophysa', acceptedAliases: ['rhizophysa'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Rhizophysa sp.', acceptedAliases: ['rhizophysa sp', 'rhizophysa'] },
    ],
    organs: [
      { name: 'Pneumatóforo apical globoso', description: 'Flotador de gas ovoide en el extremo superior de la colonia.' },
      { name: 'Sifosoma / Tallo largo', description: 'Eje colonial contráctil a lo largo del cual se ordenan los cormidios.' },
      { name: 'Cormidios seriados', description: 'Grupos modulares repetitivos de gastrozoides, dactilozoides y gonozoides.' },
      { name: 'Gastrozoides', description: 'Zooides alimentadores dispuestos a lo largo del tallo.' },
      { name: 'Gonodendros / Gonozoides', description: 'Racimos reproductores situados en los cormidios.' },
    ],
    distractors: [
      { name: 'Nectosoma con nectóforos biseriados', reason: 'Rhizophysa pertenece al suborden Cystonectae (sólo pneumatóforo + sifosoma, sin nectosoma).' },
      { name: 'Cresta o vela dorsal grande', reason: 'Exclusiva de Physalia physalis; Rhizophysa tiene un pneumatóforo liso piriforme.' },
      { name: 'Condróforo discoidal', reason: 'Exclusivo de Porpitidae (Porpita y Velella).' },
      { name: 'Ropalios marginales', reason: 'Órganos sensoriales de Scyphozoa y Cubozoa.' },
    ],
    formolNotes: 'Colonia lineal con un pneumatóforo ovoide bien visible en el ápice seguido directamente por un tallo largo (sifosoma) con cormidios espaciados, sin campanas natatorias (nectóforos).',
  },
  {
    id: 'obelia_sp',
    name: 'Obelia sp.',
    commonName: 'Hidroide colonial tecado / Campanulárido',
    imageUrl: '/assets/aistudio/OBELIA_ab8c65f7.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Leptothecata',
      family: 'Campanulariidae',
      genus: 'Obelia',
      species: 'Obelia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Leptothecata (Leptomedusae)', acceptedAliases: ['leptothecata', 'leptomedusae', 'leptomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Campanulariidae', acceptedAliases: ['campanulariidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Obelia', acceptedAliases: ['obelia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Obelia sp.', acceptedAliases: ['obelia sp', 'obelia'] },
    ],
    organs: [
      { name: 'Hidroteca campanuliforme', description: 'Copa de perisarco transparente que aloja y protege al gastrozoide.' },
      { name: 'Pedicelo anillado', description: 'Base anillada flexible que sostiene cada hidroteca sobre el hidrocaule.' },
      { name: 'Gastrozoide / Hidrante con tentáculos', description: 'Pólipo alimentador con corona de tentáculos e hipostoma.' },
      { name: 'Gonoteca', description: 'Cubierta cilíndrica de perisarco que encierra al pólipo reproductor.' },
      { name: 'Gonozoide / Blastostilo con yemas de medusa', description: 'Eje reproductor que forma medusas por gemación asexual.' },
      { name: 'Perisarco (cubierta externa)', description: 'Exoesqueleto quitinoso externo (frecuentemente teñido de celeste en preparados).' },
      { name: 'Cenosarco (parte carnosa viva)', description: 'Tejido vivo interno continuo que conecta todos los zooides (teñido de fucsia en preparados).' },
    ],
    distractors: [
      { name: 'Hidrotecas biseriadas sésiles con espinas', reason: 'Propio de Amphisbetia operculata (Sertulariidae); en Obelia las hidrotecas son alternas sobre pedicelos anillados.' },
      { name: 'Velario', reason: 'El velario es exclusivo de la clase Cubozoa; Hydrozoa posee velo.' },
      { name: 'Brazos orales festoneados', reason: 'Estructura exclusiva de escifomedusas (Scyphozoa).' },
      { name: 'Septos gástricos mesentéricos', reason: 'Exclusivos de Anthozoa y Scyphozoa; la cavidad de los hidroides carece de septos.' },
    ],
    formolNotes: 'Colonia ramificada simpodial pequeña. En preparados microscópicos de TP se distingue el perisarco externo (teñido de celeste) formando hidrotecas en copa sobre pedicelos anillados y gonotecas urniformes, y el cenosarco interno (teñido de fucsia) con gastrozoides y gonozoides.',
  },
  {
    id: 'amphisbetia_operculata',
    name: 'Amphisbetia operculata',
    commonName: 'Hidroide sertulárido / Capilaria',
    imageUrl: '/assets/aistudio/AMPHISBETIA_OPERCULATA_f306ab12.webp',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Leptothecata',
      family: 'Sertulariidae',
      genus: 'Amphisbetia',
      species: 'Amphisbetia operculata',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Leptothecata (Leptomedusae)', acceptedAliases: ['leptothecata', 'leptomedusae', 'leptomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Sertulariidae', acceptedAliases: ['sertulariidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Amphisbetia', acceptedAliases: ['amphisbetia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Amphisbetia operculata', acceptedAliases: ['amphisbetia operculata', 'amphisbetia sp'] },
    ],
    organs: [
      { name: 'Hidrotecas triangulares biseriadas opuestas', description: 'Copas tecales sésiles dispuestas en pares enfrentados adosadas al tallo.' },
      { name: 'Espinas o dientes marginales tecales', description: 'Cúspides puntiagudas en el borde de cada hidroteca.' },
      { name: 'Gonoteca ovada grande con opérculo', description: 'Cápsula reproductora voluminosa cerrada por una tapa opercular.' },
      { name: 'Perisarco rígido ámbar', description: 'Cubierta quitinosa continua que da rigidez a los tallos de la colonia.' },
      { name: 'Gastrozoides retráctiles', description: 'Pólipos alimentadores alojados en las hidrotecas.' },
    ],
    distractors: [
      { name: 'Pedicelo anillado', reason: 'Típico de Campanulariidae (Obelia, Clytia); en Amphisbetia las hidrotecas son sésiles y están soldadas al entrenudo.' },
      { name: 'Hidrante atecado desnudo', reason: 'Propio de Anthoathecata (Tubularia); Amphisbetia es un hidroide tecado (Leptothecata).' },
      { name: 'Pedalio', reason: 'Base carnosa del tentáculo exclusiva de Cubozoa.' },
      { name: 'Sifonoglifo', reason: 'Surco ciliado faríngeo propio de Anthozoa.' },
    ],
    formolNotes: 'Colonia arborescente densa que forma mechones rígidos de aspecto capilar marrón o amarillento. A la lupa se reconocen inmediatamente las hidrotecas triangulares con espinas soldadas por pares opuestos y las grandes gonotecas ovadas con opérculo.',
  },
  {
    id: 'tubularia_sp',
    name: 'Tubularia sp.',
    commonName: 'Hidroide atecado / Hidroide de penacho',
    imageUrl: '/assets/aistudio/Tubularia_sp._1b7a6e83.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Anthoathecata',
      family: 'Tubulariidae',
      genus: 'Tubularia',
      species: 'Tubularia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Anthoathecata (Anthomedusae)', acceptedAliases: ['anthoathecata', 'anthomedusae', 'anthomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Tubulariidae', acceptedAliases: ['tubulariidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Tubularia', acceptedAliases: ['tubularia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Tubularia sp.', acceptedAliases: ['tubularia sp', 'tubularia'] },
    ],
    organs: [
      { name: 'Gastrozoide / Hidrante atecado desnudo', description: 'Cuerpo polipoide grande sin hidroteca protectora.' },
      { name: 'Tentáculos aborales largos (corona basal)', description: 'Verticilo proximal de tentáculos filiformes largos.' },
      { name: 'Tentáculos orales cortos (corona distal)', description: 'Verticilo distal que rodea la boca en el extremo del hipostoma.' },
      { name: 'Gonozoides / Gonóforos en racimos', description: 'Estructuras reproductoras fijas situadas entre las dos coronas de tentáculos.' },
      { name: 'Talo / Hidrocaule con perisarco tubular liso', description: 'Tallo cilíndrico quitinoso que sostiene al hidrante.' },
    ],
    distractors: [
      { name: 'Hidroteca campanuliforme', reason: 'Tubularia es un hidroide atecado (Anthoathecata); el hidrante es desnudo y no puede retraerse en una copa.' },
      { name: 'Gonoteca con opérculo', reason: 'Al ser atecado, los gonóforos cuelgan en racimos desnudos sin cápsula de gonoteca.' },
      { name: 'Ropalios marginales', reason: 'Estructuras sensoriales de medusas Scyphozoa y Cubozoa.' },
      { name: 'Disco pedal adhesivo', reason: 'Propio de anémonas solitarias (Actiniaria); Tubularia se fija por estolones de hidrorriza.' },
    ],
    formolNotes: 'Tallo largo cilíndrico coronado por un gran hidrante carnoso desnudo (rosado en vivo, blanquecino/amarillento en formol). El doble verticilo de tentáculos (largos aborales y cortos orales) con racimos de gonozoides entre ambos es diagnóstico.',
  },
  {
    id: 'turritopsis_nutricola',
    name: 'Turritopsis nutricola',
    commonName: 'Medusa inmortal (Antomedusa)',
    imageUrl: '/assets/aistudio/Turritopsis_nutricola_7ba68cb5.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Anthoathecata',
      family: 'Oceaniidae',
      genus: 'Turritopsis',
      species: 'Turritopsis nutricola',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Anthoathecata (Anthomedusae)', acceptedAliases: ['anthoathecata', 'anthomedusae', 'anthomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Oceaniidae', acceptedAliases: ['oceaniidae', 'clavidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Turritopsis', acceptedAliases: ['turritopsis'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Turritopsis nutricola', acceptedAliases: ['turritopsis nutricola', 'turritopsis nutricula', 'turritopsis dohrnii', 'turritopsis sp'] },
    ],
    organs: [
      { name: 'Campana acampanada alta (Anthomedusae)', description: 'Umbrela más alta que ancha característica de antomedusas.' },
      { name: 'Manubrio voluminoso con gónadas sobre el manubrio', description: 'En Anthomedusae las gónadas ectodérmicas se ubican en las paredes del manubrio.' },
      { name: 'Velo craspedoto', description: 'Membrana muscular marginal interna propia de hidromedusas.' },
      { name: 'Canales radiales (4)', description: 'Conectan el estómago central con el canal circular marginal.' },
      { name: 'Numerosos tentáculos marginales uniformes', description: 'Dispuestos a lo largo de todo el borde umbrelar con ocelos basales.' },
    ],
    distractors: [
      { name: 'Gónadas sobre los canales radiales', reason: 'Las gónadas en los canales radiales son propias de Leptomedusae y Limnomedusae; en Anthomedusae (Turritopsis) están en el manubrio.' },
      { name: 'Velario con frenios', reason: 'Exclusivo de Cubozoa.' },
      { name: 'Brazos orales con bocas secundarias', reason: 'Exclusivo de Scyphozoa Rhizostomeae.' },
      { name: 'Pedalios angulares (4)', reason: 'Exclusivos de Cubozoa.' },
    ],
    formolNotes: 'Hidromedusa pequeña (~4-5 mm) de campana alta piriforme, con un manubrio central grande y opaco (amarillento/rojizo en vivo, blanquecino denso en formol) rodeado de una corona tupida de numerosos tentáculos marginales.',
  },
  {
    id: 'clytia_hemisphaerica',
    name: 'Clytia hemisphaerica',
    commonName: 'Hidromedusa leptomedusa hemisférica',
    imageUrl: '/assets/aistudio/Clytia_hemisphaerica_02ad3a3b.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Leptothecata',
      family: 'Campanulariidae',
      genus: 'Clytia',
      species: 'Clytia hemisphaerica',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Leptothecata (Leptomedusae)', acceptedAliases: ['leptothecata', 'leptomedusae', 'leptomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Campanulariidae', acceptedAliases: ['campanulariidae', 'clytiidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Clytia', acceptedAliases: ['clytia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Clytia hemisphaerica', acceptedAliases: ['clytia hemisphaerica', 'clytia sp'] },
    ],
    organs: [
      { name: 'Umbrela hemisférica aplanada', description: 'Campana más ancha que alta típica de Leptomedusae.' },
      { name: 'Canales radiales (4) con gónadas ovales', description: 'En Leptomedusae las 4 gónadas ectodérmicas se sitúan sobre los canales radiales.' },
      { name: 'Manubrio corto central con 4 labios', description: 'No sobrepasa el margen de la campana.' },
      { name: 'Velo craspedoto', description: 'Diafragma muscular subumbrelar característico de Hydrozoa.' },
      { name: 'Tentáculos marginales con bulbos basales y estatocistos', description: 'Alternan tentáculos marginales finos con estatocistos cerrados.' },
    ],
    distractors: [
      { name: 'Pedúnculo gástrico muy largo sobresaliente', reason: 'Diagnóstico de Liriope tetraphylla; Clytia tiene un manubrio corto dentro de la cavidad subumbrelar.' },
      { name: ' más de 50 canales radiales', reason: 'Propio de Aequorea aequorea; Clytia posee exactamente 4 canales radiales.' },
      { name: 'Ropalios marginales (8)', reason: 'Exclusivos de Scyphozoa; las leptomedusas tienen estatocistos ectodérmicos.' },
      { name: 'Tentáculos exumbrelares dorsales', reason: 'Exclusivos de Narcomedusae (Cunina octonaria).' },
    ],
    formolNotes: 'Hidromedusa pequeña (1 a 2 cm) con campana hemisférica muy transparente, manubrio central corto y 4 canales radiales nítidos donde se observan las 4 gónadas lineales/ovales blanquecinas.',
  },
  {
    id: 'aequorea_aequorea',
    name: 'Aequorea aequorea',
    commonName: 'Hidromedusa multicanal / Medusa de cristal',
    imageUrl: '/assets/aistudio/Aequorea_aequorea_05b93c9a.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Leptothecata',
      family: 'Aequoreidae',
      genus: 'Aequorea',
      species: 'Aequorea aequorea',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina', 'trachylina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Leptothecata (Leptomedusae)', acceptedAliases: ['leptothecata', 'leptomedusae', 'leptomedusa', 'limnomedusae', 'limnomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Aequoreidae', acceptedAliases: ['aequoreidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Aequorea', acceptedAliases: ['aequorea'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Aequorea aequorea', acceptedAliases: ['aequorea aequorea', 'aequorea sp', 'aequorea forskalea'] },
    ],
    organs: [
      { name: 'Numerosos canales radiales simples (50 a 100+)', description: 'Carácter diagnóstico inconfundible: decenas de canales radiales rectos que irradian del estómago ancho.' },
      { name: 'Estómago central circular muy ancho', description: 'Ocupa cerca de la mitad del diámetro de la umbrela.' },
      { name: 'Gónadas lineales sobre todos los canales radiales', description: 'Se extienden a lo largo de los múltiples canales radiales.' },
      { name: 'Velo craspedoto', description: 'Membrana marginal de hidromedusa.' },
      { name: 'Numerosos tentáculos marginales finos', description: 'Ubicados en el borde de la umbrela.' },
    ],
    distractors: [
      { name: 'Sólo 4 canales radiales', reason: 'A diferencia de la mayoría de las hidromedusas, Aequorea posee entre 50 y más de 100 canales radiales.' },
      { name: 'Gónadas en herradura (4)', reason: 'Propio de Aurelia aurita (Scyphozoa).' },
      { name: 'Brazos orales fusionados en cruz', reason: 'Propio de Lychnorhiza lucerna (Rhizostomeae).' },
      { name: 'Pedalios con quilla', reason: 'Propio de Cubozoa (Tamoya).' },
    ],
    formolNotes: 'Medusa discoidal aplanada (hasta 10 cm de diámetro) con mesoglea gruesa en el centro. En formol se identifica al instante por el estómago central muy ancho del cual salen decenas de canales radiales rectos como rayos de rueda de bicicleta.',
  },
  {
    id: 'liriope_tetraphylla',
    name: 'Liriope tetraphylla',
    commonName: 'Hidromedusa de pedúnculo largo (Traquilina)',
    imageUrl: '/assets/aistudio/Liriope_tetraphylla_5b14e774.jpg',
    secondaryImageUrl: '/assets/aistudio/Liriope_tetraphylla_735bba60.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Trachylina',
      order: 'Limnomedusae',
      family: 'Geryoniidae',
      genus: 'Liriope',
      species: 'Liriope tetraphylla',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Trachylina', acceptedAliases: ['trachylina', 'traquilina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Limnomedusae (Trachymedusae)', acceptedAliases: ['limnomedusae', 'limnomedusa', 'trachymedusae', 'trachymedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Geryoniidae', acceptedAliases: ['geryoniidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Liriope', acceptedAliases: ['liriope'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Liriope tetraphylla', acceptedAliases: ['liriope tetraphylla', 'liriope sp'] },
    ],
    organs: [
      { name: 'Pedúnculo gástrico largo y cónico', description: 'Proyección gelatinosa muy larga que sobresale ampliamente por debajo del margen umbrelar.' },
      { name: 'Manubrio terminal con 4 labios orales', description: 'Ubicado en el extremo distal del largo pedúnculo gástrico.' },
      { name: 'Gónadas foliáceas aplanadas (4) en canales radiales', description: 'En forma de hoja, corazón o rombo sobre los 4 canales radiales.' },
      { name: 'Velo craspedoto bien desarrollado', description: 'Diafragma muscular en el margen de la campana.' },
      { name: 'Tentáculos primarios largos (4) y secundarios cortos (4)', description: '4 tentáculos perradiales huecos y 4 interradiales rígidos.' },
      { name: 'Estatocistos ecto-endodérmicos cerrados', description: 'Órganos del equilibrio propios de la subclase Trachylina.' },
    ],
    distractors: [
      { name: 'Velario', reason: 'El velario es exclusivo de Cubozoa; Liriope posee velo craspedoto.' },
      { name: 'Ropalios con ocelos complejos', reason: 'Liriope posee estatocistos cerrados simples, no ropalios de Scyphozoa/Cubozoa.' },
      { name: 'Gónadas en herradura', reason: 'Característica diagnóstica de Aurelia aurita (Scyphozoa).' },
      { name: 'Hidroteca', reason: 'Liriope es holoplanctónica (Subclase Trachylina) sin fase de pólipo bentónico.' },
    ],
    formolNotes: 'Campana hemisférica transparente y cristalina (4 mm a 2 cm). El diagnóstico inmediato en la lupa es el larguísimo pedúnculo gástrico parecido a una trompa que sobresale de la campana y las 4 gónadas foliáceas ensanchadas sobre los canales radiales.',
  },
  {
    id: 'aglaura_sp',
    name: 'Aglaura sp.',
    commonName: 'Traquimedusa octogonal de gónadas en salchicha',
    imageUrl: '/assets/aistudio/Aglaura_sp._90a731d8.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Trachylina',
      order: 'Trachymedusae',
      family: 'Rhopalonematidae',
      genus: 'Aglaura',
      species: 'Aglaura sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Trachylina', acceptedAliases: ['trachylina', 'traquilina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Trachymedusae', acceptedAliases: ['trachymedusae', 'trachymedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Rhopalonematidae', acceptedAliases: ['rhopalonematidae', 'aglauridae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Aglaura', acceptedAliases: ['aglaura'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Aglaura sp.', acceptedAliases: ['aglaura sp', 'aglaura hemistoma', 'aglaura'] },
    ],
    organs: [
      { name: 'Umbrela alta prismática / octogonal truncada', description: 'Campana de paredes casi verticales y ápice plano.' },
      { name: 'Gónadas péndulas en forma de salchicha (8)', description: '8 gónadas ovoides que cuelgan juntas en la unión del pedúnculo con el manubrio.' },
      { name: 'Canales radiales (8)', description: 'Recorren longitudinalmente la campana.' },
      { name: 'Pedúnculo gástrico delgado', description: 'No sobrepasa el margen umbrelar.' },
      { name: 'Velo craspedoto ancho', description: 'Típico de Trachymedusae holoplanctónicas.' },
    ],
    distractors: [
      { name: 'Gónadas foliáceas aplanadas (4)', reason: 'Propio de Liriope tetraphylla; Aglaura tiene 8 gónadas colgantes en racimo.' },
      { name: 'Tentáculos exumbrelares dorsales', reason: 'Propio de Cunina octonaria (Narcomedusae).' },
      { name: 'Brazos orales festoneados', reason: 'Propio de Scyphozoa.' },
      { name: 'Pedalios basales', reason: 'Exclusivos de Cubozoa.' },
    ],
    formolNotes: 'Hidromedusa diminuta (3 a 6 mm) con campana prismática transparente de ápice truncado. Se identifica al instante bajo lupa por el racimo central de 8 gónadas blanquecinas ovoides ("en salchicha") que cuelgan del pedúnculo.',
  },
  {
    id: 'olindias_sambaquiensis',
    name: 'Olindias sambaquiensis',
    commonName: 'Medusa relojito / Hidromedusa de la cruz',
    imageUrl: '/assets/aistudio/Olindias_sambaquiensis_56252990.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Trachylina',
      order: 'Limnomedusae',
      family: 'Olindiidae',
      genus: 'Olindias',
      species: 'Olindias sambaquiensis',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Trachylina', acceptedAliases: ['trachylina', 'traquilina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Limnomedusae', acceptedAliases: ['limnomedusae', 'limnomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Olindiidae', acceptedAliases: ['olindiidae', 'olindiasidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Olindias', acceptedAliases: ['olindias'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Olindias sambaquiensis', acceptedAliases: ['olindias sambaquiensis', 'olindias sp'] },
    ],
    organs: [
      { name: 'Canales radiales (4) con gónadas plegadas/festoneadas', description: 'Forman una cruz característica con aspecto corrugado en toda su longitud.' },
      { name: 'Canales centrípetos ciegos', description: 'Canales suplementarios que nacen del canal circular hacia el centro sin llegar al estómago.' },
      { name: 'Tentáculos primarios y secundarios marginales', description: 'Dos tipos de tentáculos que forman un cilindro de predación.' },
      { name: 'Velo craspedoto marginal', description: 'Membrana muscular interna del borde umbrelar.' },
      { name: 'Manubrio cuadrangular con 4 labios', description: 'Ubicado en el centro de los 4 canales radiales.' },
      { name: 'Estatocistos marginales pareados', description: 'Órganos del equilibrio en la base de los tentáculos primarios.' },
    ],
    distractors: [
      { name: 'Lappets marginales y ropalios', reason: 'Exclusivos de Scyphozoa; Olindias es una hidromedusa con velo y estatocistos.' },
      { name: 'Brazos orales esponjosos (8) con bocas secundarias', reason: 'Propio de Lychnorhiza lucerna (Scyphozoa Rhizostomeae).' },
      { name: 'Pedalios', reason: 'Exclusivos de Cubozoa.' },
      { name: 'Pneumatóforo', reason: 'Exclusivo de Siphonophorae.' },
    ],
    formolNotes: 'Medusa de consistencia firme (5 a 10 cm de diámetro). En formol se distingue de inmediato de Lychnorhiza porque Olindias tiene VELO, numerosos tentáculos marginales, 4 gónadas fuertemente plegadas sobre los 4 canales radiales y canales centrípetos ciegos que suben desde el borde.',
  },
  {
    id: 'cunina_octonaria',
    name: 'Cunina octonaria',
    commonName: 'Narcomedusa parásita de otras medusas',
    imageUrl: '/assets/aistudio/Cunina_octonaria_c132d7f5.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Trachylina',
      order: 'Narcomedusae',
      family: 'Cuninidae',
      genus: 'Cunina',
      species: 'Cunina octonaria',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Trachylina', acceptedAliases: ['trachylina', 'traquilina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Narcomedusae', acceptedAliases: ['narcomedusae', 'narcomedusa'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Cuninidae', acceptedAliases: ['cuninidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Cunina', acceptedAliases: ['cunina'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Cunina octonaria', acceptedAliases: ['cunina octonaria', 'cunina sp'] },
    ],
    organs: [
      { name: 'Tentáculos exumbrelares rígidos (8)', description: 'Insertados en el dorso de la umbrela por encima del margen (no en el borde).' },
      { name: 'Margen umbrelar lobulado en festones', description: 'Dividido en 8 lóbulos por los surcos peroniales.' },
      { name: 'Peronios / Surcos peroniales', description: 'Bandas ectodérmicas que unen la base de cada tentáculo con el margen umbrelar.' },
      { name: 'Bolsas gástricas radiales anchas (8)', description: 'Extensiones del estómago central en cada antímero (carece de canales radiales finos).' },
      { name: 'Otoporpas y estatocistos libres', description: 'Tractos con nematocistos asociados a los órganos sensoriales marginales.' },
      { name: 'Velo membranoso', description: 'Suele colgar verticalmente en los lóbulos marginales.' },
    ],
    distractors: [
      { name: 'Canales radiales estrechos (4)', reason: 'Narcomedusae carece de canales radiales finos; presenta bolsas gástricas anchas.' },
      { name: 'Pedúnculo gástrico largo sobresaliente', reason: 'Propio de Liriope tetraphylla (donde la plánula de Cunina suele parasitar).' },
      { name: 'Brazos orales fusionados', reason: 'Propio de Scyphozoa Rhizostomeae.' },
      { name: 'Hidroteca', reason: 'Cunina no tiene fase de pólipo tecado; sus larvas parasitan a otras hidromedusas como Liriope.' },
    ],
    formolNotes: 'Medusa diminuta (3 mm de diámetro), aplanada y lenticular. Su rasgo diagnóstico inconfundible bajo lupa/microscopio son los 8 tentáculos rígidos que emergen de la superficie exumbrelar (por encima del margen) y las 8 bolsas gástricas.',
  },
  {
    id: 'aurelia_aurita',
    name: 'Aurelia aurita',
    commonName: 'Medusa de la luna / Medusa común',
    imageUrl: '/assets/aistudio/Aurelia_aurita_9bfd5753.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Scyphozoa',
      subclass: 'Discomedusae',
      order: 'Semaeostomeae',
      family: 'Ulmaridae',
      genus: 'Aurelia',
      species: 'Aurelia aurita',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Scyphozoa', acceptedAliases: ['scyphozoa', 'schyphozoa', 'escifozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Discomedusae', acceptedAliases: ['discomedusae'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Semaeostomeae', acceptedAliases: ['semaeostomeae', 'semaeostomea'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Ulmaridae', acceptedAliases: ['ulmaridae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Aurelia', acceptedAliases: ['aurelia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Aurelia aurita', acceptedAliases: ['aurelia aurita', 'aurelia sp'] },
    ],
    organs: [
      { name: 'Gónadas endodérmicas en herradura (4)', description: 'Cuatro anillos o herraduras conspicuas en el piso de las bolsas gástricas.' },
      { name: 'Brazos orales festoneados y acanalados (4)', description: 'Rodean la boca central abierta.' },
      { name: 'Tentáculos marginales cortos filiformes en fleco continuo', description: 'Numerosos tentáculos cortos a lo largo del margen umbrelar.' },
      { name: 'Ropalios marginales (8)', description: 'Órganos sensoriales con estatocisto y ocelo situados en las escotaduras marginales.' },
      { name: 'Canales radiales ramificados y canal circular', description: 'Sistema gastrovascular ramificado visible por transparencia.' },
      { name: 'Filamentos gástricos en cavidad gastrovascular', description: 'Estructuras digestivas con nematocistos exclusivas de Scyphozoa/Cubozoa.' },
    ],
    distractors: [
      { name: 'Velo craspedoto', reason: 'Las medusas de Scyphozoa son acraspedotas (carecen por completo de velo).' },
      { name: 'Velario', reason: 'Estructura exclusiva de Cubozoa.' },
      { name: 'Pedalios (4)', reason: 'Bases carnosas de los tentáculos exclusivas de Cubozoa.' },
      { name: 'Boca primaria ocluida con bocas secundarias', reason: 'Propio del orden Rhizostomeae (Lychnorhiza); Aurelia tiene boca central abierta con 4 brazos libres.' },
    ],
    formolNotes: 'Campana discoidal blanquecina translúcida (15 a 25 cm), sin velo, con fleco marginal de tentáculos muy cortos y las inconfundibles 4 gónadas en forma de herradura o trébol en el centro. En TP también se observan sus fases de pólipo scyphistoma estrobilando y larva éfira de 8 brazos bifurcados.',
  },
  {
    id: 'chrysaora_lactea',
    name: 'Chrysaora lactea',
    commonName: 'Medusa lechosa / Aguaviva de brazos largos',
    imageUrl: '/assets/aistudio/Chrysaora_lactea_cd39e952.webp',
    secondaryImageUrl: '/assets/aistudio/Chrysaora_lactea_7a52ba17.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Scyphozoa',
      subclass: 'Discomedusae',
      order: 'Semaeostomeae',
      family: 'Pelagiidae',
      genus: 'Chrysaora',
      species: 'Chrysaora lactea',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Scyphozoa', acceptedAliases: ['scyphozoa', 'schyphozoa', 'escifozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Discomedusae', acceptedAliases: ['discomedusae'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Semaeostomeae', acceptedAliases: ['semaeostomeae', 'semaeostomea'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Pelagiidae', acceptedAliases: ['pelagiidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Chrysaora', acceptedAliases: ['chrysaora'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Chrysaora lactea', acceptedAliases: ['chrysaora lactea', 'chrysaora sp'] },
    ],
    organs: [
      { name: 'Tentáculos marginales largos (24: 3 por octante)', description: 'Largos tentáculos dispuestos en el margen umbrelar entre los lappets.' },
      { name: 'Brazos orales largos y muy festoneados (4)', description: 'Cuatro brazos orales acintados en espiral alrededor de la boca central.' },
      { name: 'Ropalios marginales (8)', description: 'Órganos sensoriales alojados en escotaduras entre lappets.' },
      { name: 'Lappets / Lóbulos marginales (32)', description: 'Festones redondeados que bordean el margen de la campana.' },
      { name: 'Bolsas gástricas radiales (16) y filamentos gástricos', description: 'Cavidad gastrovascular tabicada sin canal circular.' },
      { name: 'Gónadas endodérmicas plegadas (4)', description: 'Ubicadas en la pared subumbrelar de la cavidad gástrica.' },
    ],
    distractors: [
      { name: 'Velo craspedoto', reason: 'Scyphozoa carece de velo (medusa acraspedota).' },
      { name: 'Brazos orales (8) con bocas secundarias y sin tentáculos', reason: 'Propio de Lychnorhiza lucerna (Rhizostomeae); Chrysaora tiene 4 brazos orales y 24 tentáculos marginales.' },
      { name: 'Canales centrípetos ciegos', reason: 'Estructura de Limnomedusae (Olindias sambaquiensis).' },
      { name: 'Pedalios (4)', reason: 'Exclusivos de Cubozoa.' },
    ],
    formolNotes: 'Campana hemisférica blanco-lechosa o violácea pálida (10 a 15 cm) con puntuación o bandas radiales en la exumbrela. Se diferencia de Lychnorhiza porque Chrysaora posee 24 tentáculos marginales largos y 4 brazos orales libres en forma de cortina plegada.',
  },
  {
    id: 'cyanea_capillata',
    name: 'Cyanea capillata',
    commonName: 'Medusa melena de león',
    imageUrl: '/assets/aistudio/Cyanea_capillata_6cca81fa.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Scyphozoa',
      subclass: 'Discomedusae',
      order: 'Semaeostomeae',
      family: 'Cyaneidae',
      genus: 'Cyanea',
      species: 'Cyanea capillata',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Scyphozoa', acceptedAliases: ['scyphozoa', 'schyphozoa', 'escifozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Discomedusae', acceptedAliases: ['discomedusae'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Semaeostomeae', acceptedAliases: ['semaeostomeae', 'semaeostomea'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Cyaneidae', acceptedAliases: ['cyaneidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Cyanea', acceptedAliases: ['cyanea'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Cyanea capillata', acceptedAliases: ['cyanea capillata', 'cyanea sp'] },
    ],
    organs: [
      { name: 'Tentáculos en 8 grupos subumbrelares (~150 c/u)', description: 'Penachos densos de tentáculos que forman un cilindro de predación tipo melena.' },
      { name: 'Brazos orales cortinados y muy plegados (4)', description: 'Masas voluminosas de pliegues orales centrales.' },
      { name: 'Ropalios en escotaduras profundas (8)', description: 'Órganos sensoriales marginales.' },
      { name: 'Lóbulos marginales umbrelares anchos', description: 'Ocho pares de grandes lóbulos marginales.' },
      { name: 'Filamentos gástricos y gónadas endodérmicas', description: 'Típicos de la clase Scyphozoa.' },
    ],
    distractors: [
      { name: 'Velo craspedoto', reason: 'Scyphozoa carece de velo.' },
      { name: 'Velario', reason: 'Exclusivo de Cubozoa.' },
      { name: 'Pneumatóforo', reason: 'Exclusivo de Siphonophorae.' },
      { name: 'Sin tentáculos marginales (orden Rhizostomeae)', reason: 'Cyanea capillata pertenece a Semaeostomeae y posee cientos de tentáculos en 8 grupos.' },
    ],
    formolNotes: 'Escifomedusa caracterizada por presentar sus numerosísimos tentáculos dispuestos en 8 haces o penachos en la cara subumbrelar (hasta 150 tentáculos por grupo) formando una tupida cabellera alrededor de los 4 brazos orales cortinados.',
  },
  {
    id: 'lychnorhiza_lucerna',
    name: 'Lychnorhiza lucerna',
    commonName: 'Medusa de la cruz (Rizostomo)',
    imageUrl: '/assets/aistudio/Lychnorhiza_lucerna_87c06055.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Scyphozoa',
      subclass: 'Discomedusae',
      order: 'Rhizostomeae',
      family: 'Lychnorhizidae',
      genus: 'Lychnorhiza',
      species: 'Lychnorhiza lucerna',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Scyphozoa', acceptedAliases: ['scyphozoa', 'schyphozoa', 'escifozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Discomedusae', acceptedAliases: ['discomedusae'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Rhizostomeae', acceptedAliases: ['rhizostomeae', 'rizostomos', 'rhizostomea'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Lychnorhizidae', acceptedAliases: ['lychnorhizidae', 'lychnorizidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Lychnorhiza', acceptedAliases: ['lychnorhiza', 'lychnoriza'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Lychnorhiza lucerna', acceptedAliases: ['lychnorhiza lucerna', 'lychnoriza lucerna', 'lychnorhiza sp'] },
    ],
    organs: [
      { name: 'Brazos orales (8) gruesos ramificados', description: 'Ocho brazos orales carnosos cuyos pilares forman una cruz en vista oral/aboral.' },
      { name: 'Múltiples orificios bucales / Bocas secundarias', description: 'En cada extremo dilatado de los brazos orales (la boca central primaria está cerrada).' },
      { name: 'Margen umbrelar festoneado SIN tentáculos marginales', description: 'Los rizostomos carecen por completo de tentáculos en el borde de la campana.' },
      { name: 'Red de canales anastomosados, canal anular y canales ciegos', description: 'Sistema vascular marginal reticulado muy conspicuo bajo lupa.' },
      { name: 'Ropalios marginales (8) con estatocisto, estatolito y ocelo', description: 'Órganos sensoriales alojados entre los festones marginales.' },
    ],
    distractors: [
      { name: 'Tentáculos marginales largos', reason: 'Incorrecto: el orden Rhizostomeae (Lychnorhiza) carece totalmente de tentáculos en el margen de la campana.' },
      { name: 'Boca central única abierta', reason: 'En Rhizostomeae la boca central se fusiona y es reemplazada por miles de pequeños orificios bucales en los 8 brazos orales.' },
      { name: 'Velo craspedoto', reason: 'Scyphozoa es acraspedota (no posee velo).' },
      { name: 'Pedalios (4)', reason: 'Exclusivos de la clase Cubozoa.' },
    ],
    formolNotes: 'Campana hemisférica firme y carnosa SIN tentáculos marginales, frecuentemente con manchas violáceas/azuladas en los festones del borde y una figura en cruz central. Posee 8 brazos orales gruesos arborescentes con múltiples bocas microscópicas (suele hallarse asociada en foresis/comensalismo con el cangrejo Libinia spinosa).',
  },
  {
    id: 'tamoya_haplonema',
    name: 'Tamoya haplonema',
    commonName: 'Avispa de mar atlántica / Cubomedusa',
    imageUrl: '/assets/aistudio/Tamoya_haplonema_7b94d58a.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Cubozoa',
      order: 'Carybdeida',
      family: 'Tamoyidae',
      genus: 'Tamoya',
      species: 'Tamoya haplonema',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Cubozoa', acceptedAliases: ['cubozoa', 'cubozoos', 'cubomedusa', 'cubomedusae'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Carybdeida', acceptedAliases: ['carybdeida', 'carybdeidae'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Tamoyidae', acceptedAliases: ['tamoyidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Tamoya', acceptedAliases: ['tamoya'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Tamoya haplonema', acceptedAliases: ['tamoya haplonema', 'tamoya sp'] },
    ],
    organs: [
      { name: 'Campana cúbica / prismática cuadrangular alta', description: 'Umbrela de sección cuadrada (~12 cm de alto) con simetría tetrámera.' },
      { name: 'Pedalios simples (4) en forma de pala', description: 'Apéndices basales gelatinosos aplanados en cada esquina inferior de la campana.' },
      { name: 'Tentáculo único contráctil por cada pedalio (4)', description: 'Un solo tentáculo grueso anillado emerge de cada uno de los 4 pedalios.' },
      { name: 'Velario (velo con canales endodérmicos)', description: 'Repliegue muscular subumbrelar sostenido por 4 frenios que propulsa el nado a chorro.' },
      { name: 'Ropalios (4) en nichos con ojos complejos (córnea, lente y retina)', description: 'Órganos sensoriales ópticamente competentes en las 4 caras de la campana.' },
      { name: 'Manubrio y filamentos gástricos', description: 'Situados en el techo de la cavidad gástrica.' },
    ],
    distractors: [
      { name: 'Velo craspedoto simple (sin canales)', reason: 'El velo simple es de Hydrozoa; Cubozoa posee VELARIO (con divertículos o canales gastrovasculares y frenios).' },
      { name: 'Brazos orales festoneados (4 u 8)', reason: 'Propios de Scyphozoa; Cubozoa posee un manubrio simple dentro de la campana.' },
      { name: 'Pedalios ramificados con múltiples tentáculos', reason: 'Tamoya haplonema pertenece a Carybdeida y tiene 4 pedalios simples con 1 solo tentáculo cada uno.' },
      { name: 'Estrobilación polidisco del pólipo', reason: 'En Cubozoa el pólipo sufre metamorfosis directa en medusa (no estrobila en éfiras como Scyphozoa).' },
    ],
    formolNotes: 'Umbrela prismática alta, rígida y cuadrangular (10 a 15 cm). En cada una de las 4 esquinas basales destaca un pedalio aplanado en pala del cual sale un único tentáculo grueso. Hacia adentro del borde se pliega el velario y en las paredes se ven los 4 ropalios con puntos oculares oscuros.',
  },
  {
    id: 'carybdea_marsupialis',
    name: 'Carybdea marsupialis',
    commonName: 'Cubomedusa caribdeida',
    imageUrl: '/assets/aistudio/Carybdea_marsupialis_1677c7e9.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Cubozoa',
      order: 'Carybdeida',
      family: 'Carybdeidae',
      genus: 'Carybdea',
      species: 'Carybdea marsupialis',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Cubozoa', acceptedAliases: ['cubozoa', 'cubozoos', 'cubomedusa'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Carybdeida', acceptedAliases: ['carybdeida'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Carybdeidae', acceptedAliases: ['carybdeidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Carybdea', acceptedAliases: ['carybdea'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Carybdea marsupialis', acceptedAliases: ['carybdea marsupialis', 'carybdea sp'] },
    ],
    organs: [
      { name: 'Campana cúbica transparente con nematocistos exumbrelares', description: 'Umbrela cuadrangular de 3 a 5 cm.' },
      { name: 'Pedalios simples (4) en los ángulos interradiales', description: 'Cuatro bases laminares que transfieren la presa hacia el manubrio.' },
      { name: 'Tentáculos (4) simples (1 por pedalio)', description: 'Se contraen y flexionan hacia adentro durante la alimentación.' },
      { name: 'Velario marginal con canales velariales y frenios', description: 'Estructura propulsora exclusiva de Cubozoa.' },
      { name: 'Ropalios (4) con ojo complejo (córnea, lente, espacio vítreo y retina)', description: 'Conectados al anillo nervioso subumbrelar.' },
      { name: 'Filamentos gástricos (fascelas) y manubrio', description: 'En las 4 esquinas del estómago.' },
    ],
    distractors: [
      { name: 'Velo craspedoto sin canales', reason: 'Propio de Hydrozoa; Carybdea posee velario.' },
      { name: 'Ropalios (8) y lappets marginales', reason: 'Propios de Scyphozoa; Cubozoa tiene 4 ropalios en nichos de las caras.' },
      { name: 'Brazos orales con bocas suctorias', reason: 'Propio de Scyphozoa Rhizostomeae.' },
      { name: 'Pneumatóforo', reason: 'Exclusivo de Siphonophorae.' },
    ],
    formolNotes: 'Cubomedusa de campana prismática cuadrangular más pequeña y compacta que Tamoya (~3-4 cm), con 4 pedalios bien recortados en la base, 4 tentáculos y 4 ropalios laterales con lentes oculares oscuros.',
  },
  {
    id: 'actinia_sp',
    name: 'Actinia sp.',
    commonName: 'Anémona de mar / Tomate de mar',
    imageUrl: '/assets/aistudio/Actinia_sp._f7ae9244.jpeg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Actiniaria',
      family: 'Actiniidae',
      genus: 'Actinia',
      species: 'Actinia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia', 'zoantharia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Actiniaria', acceptedAliases: ['actiniaria', 'actiniarios'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Actiniidae', acceptedAliases: ['actiniidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Actinia', acceptedAliases: ['actinia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Actinia sp.', acceptedAliases: ['actinia sp', 'actinia equina', 'actinia'] },
    ],
    organs: [
      { name: 'Disco de fijación / Disco pedal plano adhesivo', description: 'Suela basal muscular ancha con la que el pólipo solitario se adhiere a la roca.' },
      { name: 'Columna cilíndrica carnosa y lisa', description: 'Tronco del pólipo sin exoesqueleto calcáreo.' },
      { name: 'Disco oral con boca central en hendidura', description: 'Superficie superior rodeada por los tentáculos.' },
      { name: 'Tentáculos cónicos lisos retráctiles (múltiplos de 6)', description: 'Provistos de nematocistos y espirocistos adhesivos.' },
      { name: 'Faringe invaginada con sifonoglifos y septos gástricos', description: 'Cavidad gastrovascular tabicada por mesenterios con filamentos mesentéricos.' },
    ],
    distractors: [
      { name: 'Pedúnculo de fijación enterrable sin disco pedal', reason: 'Propio de Cerianthus sp. (Ceriantharia); Actinia posee un disco pedal plano adhesivo.' },
      { name: 'Exoesqueleto calcáreo de CaCO3 (coralito)', reason: 'Propio de corales hermatípicos (Orden Scleractinia); Actinia es un pólipo solitario desnudo.' },
      { name: 'Tentáculos pinnados (8)', reason: 'Exclusivos de Octocorallia; Hexacorallia posee tentáculos simples lisos en múltiplos de 6.' },
      { name: 'Fase medusa libre', reason: 'El Subphylum Anthozoa es 100% polipoide holobentónico (carece por completo de fase medusa).' },
    ],
    formolNotes: 'Pólipo solitario cilíndrico robusto y carnoso, de color parduzco/grisáceo en formol. Se distingue inmediatamente de Cerianthus por tener una columna gruesa arrugada transversalmente y un DISCO DE FIJACIÓN (disco pedal) plano y ancho en la base.',
  },
  {
    id: 'cerianthus_sp',
    name: 'Cerianthus sp.',
    commonName: 'Ceriantario / Anémona tubular excavadora',
    imageUrl: '/assets/aistudio/Cerianthussp._1cfae763.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Ceriantharia',
      order: 'Ceriantharia',
      family: 'Cerianthidae',
      genus: 'Cerianthus',
      species: 'Cerianthus sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'ceriantharia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Ceriantharia', acceptedAliases: ['ceriantharia', 'ceriantarios'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Ceriantharia (Spirularia)', acceptedAliases: ['ceriantharia', 'spirularia'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Cerianthidae', acceptedAliases: ['cerianthidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Cerianthus', acceptedAliases: ['cerianthus'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Cerianthus sp.', acceptedAliases: ['cerianthus sp', 'cerianthus'] },
    ],
    organs: [
      { name: 'Pedúnculo de fijación aboral aguzado (SIN disco pedal)', description: 'Extremo posterior cónico muscular que entierra en el sedimento.' },
      { name: 'Columna alargada vermiforme lisa', description: 'Cuerpo cilíndrico largo adaptado a vivir dentro de un tubo mucoso.' },
      { name: 'Doble corona de tentáculos (marginales largos y labiales cortos)', description: 'Dos verticilos concéntricos bien diferenciados alrededor del disco oral.' },
      { name: 'Pticocistos (cnidocistos no tóxicos exclusivos)', description: 'Secretan los filamentos entrelazados que forman el tubo donde vive el animal.' },
      { name: 'Faringe con un único sifonoglifo dorsal', description: 'Y cavidad gastrovascular con septos completos.' },
    ],
    distractors: [
      { name: 'Disco de fijación / Disco pedal plano adhesivo', reason: 'Diferencia clave de TP con Actinia: Cerianthus carece de disco pedal y posee un pedúnculo de fijación cónico para enterrarse.' },
      { name: 'Exoesqueleto de CaCO3', reason: 'Los ceriantarios son pólipos solitarios blandos sin esqueleto mineral.' },
      { name: 'Tentáculos pinnados en número de 8', reason: 'Exclusivos de Octocorallia.' },
      { name: 'Hidroteca de perisarco', reason: 'Propio de colonias de Hydrozoa.' },
    ],
    formolNotes: 'En bandeja de disección (TP Cnidaria 2) se observa un pólipo solitario de columna alargada que se estrecha hacia abajo terminando en un PEDÚNCULO DE FIJACIÓN redondeado/cónico (sin disco pedal plano), y en el extremo oral presenta tentáculos largos periféricos y cortos centrales.',
  },
  {
    id: 'gorgonia_sp',
    name: 'Gorgonia sp.',
    commonName: 'Abanico de mar / Coral blando octocoral',
    imageUrl: '/assets/aistudio/Gorgonia_sp._3e685adb.jpg',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Octocorallia',
      order: 'Gorgonacea',
      family: 'Gorgoniidae',
      genus: 'Gorgonia',
      species: 'Gorgonia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'octocorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Octocorallia', acceptedAliases: ['octocorallia', 'alcyonaria', 'octocorales'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Gorgonacea (Alcyonacea)', acceptedAliases: ['gorgonacea', 'alcyonacea', 'malacalcyonacea'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Gorgoniidae', acceptedAliases: ['gorgoniidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Gorgonia', acceptedAliases: ['gorgonia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Gorgonia sp.', acceptedAliases: ['gorgonia sp', 'gorgonia ventalina', 'gorgonia'] },
    ],
    organs: [
      { name: 'Esqueleto en abanico con ramas principales y ramificaciones anastomosadas', description: 'Ramas interconectadas formando una red plana orientada perpendicular a la corriente.' },
      { name: 'Eje central de escleroproteínas (gorgonina)', description: 'Sostén axial córneo y flexible.' },
      { name: 'Escleritos calcáreos libres en el cenénquima', description: 'Espículas microscópicas de carbonato de calcio agrupadas en el tejido.' },
      { name: 'Pólipos (zooides) con 8 tentáculos pinnados y 8 septos', description: 'Simetría octarradial estricta con tentáculos provistos de pínnulas.' },
      { name: 'Canales y tubos de la red solenial (solenia)', description: 'Tubos gastrovasculares que comunican a todos los pólipos de la colonia.' },
    ],
    distractors: [
      { name: 'Exoesqueleto pétreo macizo de CaCO3 con coralitos y esclerotabiques', reason: 'Propio de Hexacorallia Scleractinia (corales hermatípicos); Gorgonia tiene eje proteico flexible y escleritos libres.' },
      { name: 'Tentáculos lisos en múltiplos de 6', reason: 'Propio de Hexacorallia; Octocorallia tiene 8 tentáculos pinnados (plumosos).' },
      { name: 'Hidrotecas y gonotecas de perisarco', reason: 'Propio de colonias de Hydrozoa.' },
      { name: 'Disco pedal muscular', reason: 'Propio de anémonas solitarias; Gorgonia se fija al sustrato por una base córnea calcificada.' },
    ],
    formolNotes: 'Colonia seca o en alcohol/formol con forma de abanico reticulado plano. Se distinguen la base de fijación al sustrato, las ramas principales gruesas y la malla de ramificaciones anastomosadas flexibles con diminutos poros donde se retraen los pólipos octocorales.',
  },
  {
    id: 'nanomia_bijuga',
    name: 'Nanomia bijuga',
    commonName: 'Sifonóforo fisonéctido (con pneumatóforo y nectosoma)',
    svgType: 'nanomia',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Medusozoa',
      class: 'Hydrozoa',
      subclass: 'Hydroidolina',
      order: 'Siphonophorae',
      suborder: 'Physonectae',
      family: 'Agalmatidae',
      genus: 'Nanomia',
      species: 'Nanomia bijuga',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Medusozoa', acceptedAliases: ['medusozoa'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Hydrozoa', acceptedAliases: ['hydrozoa', 'hidrozoos'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hydroidolina', acceptedAliases: ['hydroidolina', 'hidroidolina'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Siphonophorae', acceptedAliases: ['siphonophorae', 'siphonophora', 'sifonoforos'] },
      { key: 'suborder', label: 'Suborden', canonicalValue: 'Physonectae', acceptedAliases: ['physonectae', 'fisonectidos'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Agalmatidae', acceptedAliases: ['agalmatidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Nanomia', acceptedAliases: ['nanomia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Nanomia bijuga', acceptedAliases: ['nanomia bijuga', 'nanomia sp'] },
    ],
    organs: [
      { name: 'Pneumatóforo apical pequeño', description: 'Flotador de gas en el ápice superior de la colonia.' },
      { name: 'Nectosoma con nectóforos biseriados', description: 'Región natatoria superior con dos hileras de campanas propulsoras.' },
      { name: 'Sifosoma con cormidios repetitivos', description: 'Región inferior que porta los cormidios alimentadores y reproductores.' },
      { name: 'Brácteas protectoras gelatinosas', description: 'Escudos transparentes que protegen los zooides del sifosoma.' },
      { name: 'Gastrozoides, dactilozoides (palpones) y gonozoides', description: 'Polimorfismo colonial completo en cada cormidio.' },
    ],
    distractors: [
      { name: 'Ausencia de nectosoma (sólo pneumatóforo y sifosoma)', reason: 'Ese patrón corresponde a Cystonectae (Physalia, Rhizophysa); Nanomia es un Fisonéctido y posee pneumatóforo + nectosoma + sifosoma.' },
      { name: 'Condróforo quitinoso discoidal', reason: 'Exclusivo de Porpitidae (Porpita y Velella).' },
      { name: 'Pedalios basales', reason: 'Exclusivos de Cubozoa.' },
      { name: 'Ropalios', reason: 'Exclusivos de Scyphozoa y Cubozoa.' },
    ],
    formolNotes: 'Sifonóforo fisonéctido con las 3 regiones del patrón básico completas: pneumatóforo pequeño apical, nectosoma con dos filas de nectóforos nadadores y sifosoma inferior con cormidios y brácteas (en formol los nectóforos y brácteas suelen desprenderse en el frasco).',
  },
  {
    id: 'pseudodiploria_strigosa',
    name: 'Pseudodiploria strigosa',
    commonName: 'Coral cerebro (Coral hermatípico meandroide)',
    svgType: 'pseudodiploria',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Scleractinia',
      family: 'Mussidae',
      genus: 'Pseudodiploria',
      species: 'Pseudodiploria strigosa',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Scleractinia', acceptedAliases: ['scleractinia', 'madreporaria', 'corales hermatipicos'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Mussidae', acceptedAliases: ['mussidae', 'faviidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Pseudodiploria', acceptedAliases: ['pseudodiploria', 'diploria'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Pseudodiploria strigosa', acceptedAliases: ['pseudodiploria strigosa', 'diploria strigosa', 'pseudodiploria sp'] },
    ],
    organs: [
      { name: 'Exoesqueleto macizo de CaCO3 (Corallum meandroide)', description: 'Colonia hemisférica pétrea con aspecto de circunvoluciones cerebrales.' },
      { name: 'Valles seriados sinuosos continuos', description: 'Surcos largos donde los pólipos comparten cavidad sin paredes divisorias individuales.' },
      { name: 'Colinas / Crestas tecales continuas', description: 'Murallas que separan los valles vecinos.' },
      { name: 'Escleroseptos / Septos calcáreos radiales regulares', description: 'Tabiques minerales perpendiculares a las colinas.' },
      { name: 'Columela trabecular continua en el fondo del valle', description: 'Eje calcáreo esponjoso central.' },
    ],
    distractors: [
      { name: 'Eje córneo flexible de gorgonina', reason: 'Propio de Gorgonia (Octocorallia); Scleractinia secreta un exoesqueleto rígido de carbonato de calcio (CaCO3).' },
      { name: 'Coralitos circulares aislados independientes', reason: 'En Pseudodiploria los cálices están fusionados en largos valles meandroides sinuosos.' },
      { name: 'Ramas digitiformes con verrugas', reason: 'Propio de Pocillopora.' },
      { name: 'Tentáculos pinnados (8)', reason: 'Propio de Octocorallia; los corales escleractinios son Hexacorallia.' },
    ],
    formolNotes: 'Esqueleto colonial pétreo blanco de CaCO3, pesado y hemisférico, inconfundible por sus valles sinuosos continuos y colinas que imitan la corteza cerebral.',
  },
  {
    id: 'mussismilia_sp',
    name: 'Mussismilia sp.',
    commonName: 'Coral hermatípico de grandes cálices dentados',
    svgType: 'mussismilia',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Scleractinia',
      family: 'Mussidae',
      genus: 'Mussismilia',
      species: 'Mussismilia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Scleractinia', acceptedAliases: ['scleractinia'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Mussidae', acceptedAliases: ['mussidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Mussismilia', acceptedAliases: ['mussismilia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Mussismilia sp.', acceptedAliases: ['mussismilia sp', 'mussismilia'] },
    ],
    organs: [
      { name: 'Exoesqueleto colonial macizo de CaCO3', description: 'Corallum pétreo pesado.' },
      { name: 'Coralitos individuales grandes (>10 mm)', description: 'Cálices bien delimitados y prominentes.' },
      { name: 'Escleroseptos gruesos fuertemente dentados/espinosos', description: 'Tabiques calcáreos radiales con dientes conspicuos muy marcados.' },
      { name: 'Columela esponjosa central y teca', description: 'Centro trabecular rodeado por los ciclos de septos.' },
    ],
    distractors: [
      { name: 'Valles meandroides largos tipo cerebro', reason: 'Propio de Pseudodiploria strigosa; Mussismilia tiene coralitos grandes individualizados.' },
      { name: 'Coralitos microscópicos (<1.5 mm) en ramas lisas', reason: 'Propio de Porites furcata.' },
      { name: 'Eje de escleroproteína (gorgonina)', reason: 'Propio de Octocorallia.' },
      { name: 'Disco pedal blando', reason: 'Propio de Actiniaria.' },
    ],
    formolNotes: 'Esqueleto calcáreo colonial con cálices individuales muy grandes y profundos donde resaltan a simple vista los septos gruesos erizados de dientes calcáreos agudos.',
  },
  {
    id: 'favia_sp',
    name: 'Favia sp.',
    commonName: 'Coral estrellado / Coral panal (Scleractinia)',
    svgType: 'favia',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Scleractinia',
      family: 'Faviidae',
      genus: 'Favia',
      species: 'Favia sp.',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Scleractinia', acceptedAliases: ['scleractinia'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Faviidae', acceptedAliases: ['faviidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Favia', acceptedAliases: ['favia'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Favia sp.', acceptedAliases: ['favia sp', 'favia'] },
    ],
    organs: [
      { name: 'Corallum hemisférico plocoide de CaCO3', description: 'Colonia pétrea globosa regular.' },
      { name: 'Coralitos circulares/ovalados medianos con pared propia', description: 'Cada pólipo tiene su teca separada de los vecinos por un surco.' },
      { name: 'Escleroseptos radiales regulares y columela', description: 'Disposición estrellada simétrica en cada cáliz.' },
      { name: 'Placa basal y teca calcárea', description: 'Estructuras del exoesqueleto secretado por la epidermis.' },
    ],
    distractors: [
      { name: 'Colonia ramificada con verrugas', reason: 'Propio de Pocillopora.' },
      { name: 'Valles meandroides continuos', reason: 'Propio de Pseudodiploria strigosa.' },
      { name: 'Escleritos libres en cenénquima flexible', reason: 'Propio de Octocorallia.' },
      { name: 'Perisarco quitinoso', reason: 'Propio de Hydrozoa.' },
    ],
    formolNotes: 'Colonia calcárea hemisférica regular cuyos coralitos circulares u ovalados independientes, separados entre sí por un pequeño espacio peritecal, le dan aspecto de panal o cielo estrellado.',
  },
  {
    id: 'pocillopora_tuahiniensis',
    name: 'Pocillopora tuahiniensis',
    commonName: 'Coral coliflor / Coral ramificado verrugoso',
    svgType: 'pocillopora',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Scleractinia',
      family: 'Pocilloporidae',
      genus: 'Pocillopora',
      species: 'Pocillopora tuahiniensis',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Scleractinia', acceptedAliases: ['scleractinia'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Pocilloporidae', acceptedAliases: ['pocilloporidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Pocillopora', acceptedAliases: ['pocillopora'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Pocillopora tuahiniensis', acceptedAliases: ['pocillopora tuahiniensis', 'pocillopora verrucosa', 'pocillopora damicornis', 'pocillopora sp'] },
    ],
    organs: [
      { name: 'Corallum arborescente / ramificado de CaCO3', description: 'Colonia pétrea con ramas gruesas compactas.' },
      { name: 'Verrucae (verrugas calcáreas superficiales)', description: 'Protuberancias multicelulares que recubren todas las ramas y llevan coralitos.' },
      { name: 'Coralitos inmersos muy pequeños (~1 mm)', description: 'Apretados sobre las ramas y las verrugas.' },
      { name: 'Septos y columela reducidos', description: 'Visibles al microscopio electrónico o lupa de gran aumento.' },
    ],
    distractors: [
      { name: 'Ramas cilíndricas lisas sin verrugas', reason: 'Las ramas digitiformes lisas sin verrucae son diagnósticas de Porites furcata.' },
      { name: 'Valles meandroides sinuosos', reason: 'Propio de Pseudodiploria strigosa.' },
      { name: 'Ramas anastomosadas en abanico flexible de gorgonina', reason: 'Propio de Gorgonia sp. (Octocorallia).' },
      { name: 'Hidrotecas biseriadas', reason: 'Propio de Amphisbetia operculata (Hydrozoa).' },
    ],
    formolNotes: 'Esqueleto coralino blanco ramificado en forma de arbusto o coliflor, inmediatamente diferenciable de Porites porque las ramas de Pocillopora están cubiertas de protuberancias o verrugas (verrucae).',
  },
  {
    id: 'porites_furcata',
    name: 'Porites furcata',
    commonName: 'Coral dedo poroso (Scleractinia)',
    svgType: 'porites',
    taxonomy: {
      phylum: 'Cnidaria',
      subphylum: 'Anthozoa',
      class: 'Anthozoa',
      subclass: 'Hexacorallia',
      order: 'Scleractinia',
      family: 'Poritidae',
      genus: 'Porites',
      species: 'Porites furcata',
    },
    ranks: [
      { key: 'phylum', label: 'Phylum', canonicalValue: 'Cnidaria', acceptedAliases: ['cnidaria', 'cnidarios'] },
      { key: 'subphylum', label: 'Subphylum', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos'] },
      { key: 'class', label: 'Clase', canonicalValue: 'Anthozoa', acceptedAliases: ['anthozoa', 'antozoos', 'hexacorallia'] },
      { key: 'subclass', label: 'Subclase', canonicalValue: 'Hexacorallia', acceptedAliases: ['hexacorallia'] },
      { key: 'order', label: 'Orden', canonicalValue: 'Scleractinia', acceptedAliases: ['scleractinia'] },
      { key: 'family', label: 'Familia', canonicalValue: 'Poritidae', acceptedAliases: ['poritidae'] },
      { key: 'genus', label: 'Género', canonicalValue: 'Porites', acceptedAliases: ['porites'] },
      { key: 'species', label: 'Especie', canonicalValue: 'Porites furcata', acceptedAliases: ['porites furcata', 'porites sp'] },
    ],
    organs: [
      { name: 'Colonia ramificada digitiforme (o compacta) de CaCO3', description: 'Ramas cilíndricas bifurcadas con puntas redondeadas.' },
      { name: 'Superficie de las ramas lisa (SIN verrugas)', description: 'Contorno uniforme sin protuberancias verrucosas.' },
      { name: 'Coralitos cerioides diminutos (<1.5 mm) y porosos', description: 'Cálices poligonales muy juntos en contacto directo pared con pared.' },
      { name: 'Escleroseptos trabeculares porosos', description: 'Aspecto microscópico de fina esponja calcárea.' },
    ],
    distractors: [
      { name: 'Verrucae / Verrugas calcáreas prominentes', reason: 'Las verrugas sobre las ramas son exclusivas de Pocillopora; Porites tiene ramas lisas.' },
      { name: 'Valles meandroides continuos', reason: 'Propio de Pseudodiploria strigosa.' },
      { name: 'Cálices gigantes (>1 cm) con grandes dientes', reason: 'Propio de Mussismilia sp.' },
      { name: 'Eje córneo de gorgonina', reason: 'Propio de Octocorallia.' },
    ],
    formolNotes: 'Ramas cilíndricas calcáreas en forma de dedos bifurcados de superficie lisa (sin verrugas), tapizadas por miles de poros caliculares poligonales diminutos (<1.5 mm).',
  },
];

import { MOLLUSCA_SPECIMENS } from './molluscaDataset';
import { ANNELIDA_FORAM_SPECIMENS } from './annelidaForamDataset';
import { CRUSTACEA_SPECIMENS } from './crustaceaDataset';
import { CTENOPHORA_CHAETOGNATHA_SPECIMENS } from './ctenophoraChaetognathaDataset';

export const ALL_BOM_SPECIMENS: CnidariaSpecimen[] = [
  ...CNIDARIA_SPECIMENS,
  ...MOLLUSCA_SPECIMENS,
  ...ANNELIDA_FORAM_SPECIMENS,
  ...CRUSTACEA_SPECIMENS,
  ...CTENOPHORA_CHAETOGNATHA_SPECIMENS,
];

export interface AutocompleteSuggestion {
  display: string;
  normalized: string;
  rankKey: TaxonRankKey;
  rankLabel: string;
}

export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const ALL_TAXONOMIC_SUGGESTIONS: AutocompleteSuggestion[] = (() => {
  const map = new Map<string, AutocompleteSuggestion>();

  const register = (display: string, rankKey: TaxonRankKey, rankLabel: string) => {
    if (!display || display === '-' || display === 'N/A') return;
    const norm = normalizeText(display);
    if (!norm) return;
    const mapKey = `${rankKey}:${norm}`;
    if (!map.has(mapKey)) {
      map.set(mapKey, { display, normalized: norm, rankKey, rankLabel });
    }
  };

  for (const spec of ALL_BOM_SPECIMENS) {
    register(spec.taxonomy.phylum, 'phylum', 'Phylum');
    register(spec.taxonomy.subphylum, 'subphylum', 'Subphylum');
    register(spec.taxonomy.class, 'class', 'Clase');
    if (spec.taxonomy.subclass) register(spec.taxonomy.subclass, 'subclass', 'Subclase');
    register(spec.taxonomy.order, 'order', 'Orden');
    if (spec.taxonomy.suborder) register(spec.taxonomy.suborder, 'suborder', 'Suborden');
    register(spec.taxonomy.family, 'family', 'Familia');
    register(spec.taxonomy.genus, 'genus', 'Género');
    register(spec.taxonomy.species, 'species', 'Especie');

    for (const rank of spec.ranks) {
      register(rank.canonicalValue, rank.key, rank.label);
      for (const alias of rank.acceptedAliases) {
        const formatted = alias.charAt(0).toUpperCase() + alias.slice(1);
        register(formatted, rank.key, rank.label);
      }
    }
  }

  // Additional theoretical taxa for richer distractors in predictive input
  register('Staurozoa', 'class', 'Clase');
  register('Haliclystus antarcticus', 'species', 'Especie');
  register('Endocnidozoa', 'subphylum', 'Subphylum');
  register('Myxozoa', 'class', 'Clase');
  register('Calycophorae', 'suborder', 'Suborden');
  register('Chirodropida', 'order', 'Orden');
  register('Chironex fleckeri', 'species', 'Especie');
  register('Polyplacophora', 'class', 'Clase');
  register('Scaphopoda', 'class', 'Clase');
  register('Oligochaeta', 'subclass', 'Subclase');
  register('Hirudinea', 'subclass', 'Subclase');
  register('Cirripedia', 'subclass', 'Subclase');

  return Array.from(map.values()).sort((a, b) => a.display.localeCompare(b.display));
})();


