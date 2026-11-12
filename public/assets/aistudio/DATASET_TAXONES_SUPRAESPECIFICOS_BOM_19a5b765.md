# DATASET TAXONES SUPRAESPECÍFICOS BOM - Base de Datos Taxonómica y Morfológica

Este documento complementa los archivos de datos de la aplicación interactiva para la materia **Biología de Organismos Marinos (BOM)**, integrando los grupos y linajes presentados formalmente en los teóricos, cladogramas y sistemática del curso para los cuales no se abordan especies particulares a nivel binomial.

La estructura mantiene el mismo nivel de rigor, campos estandarizados, banco de términos predictivos (+100 pts), estructuras diagnósticas reales y distractores pedagógicos justificados que los datasets precedentes, acotando la jerarquía exactamente a la profundidad requerida.

---

## 1. Estructura de Registro

Cada taxón contiene:
* `id`: Identificador alfanumérico único.
* `taxon_name`: Nombre formal del taxón solicitado.
* `rank`: Rango taxonómico formal en la clasificación del curso (Clase / Subclase).
* `common_name`: Denominación común o descriptiva dada en clase.
* `taxonomy`: Cadena jerárquica estricta ascendente (Phylum > Subphylum > Superclase / Clase / Subclase).
* `accepted_taxa_inputs`: Términos reconocidos por el motor de búsqueda predictiva (+100 pts).
* `true_diagnostic_characters`: Estructuras anatómicas, apéndices y caracteres diagnósticos propios del grupo.
* `distractors`: Caracteres ajenos con su respectiva justificación de error pedagógico basada en los otros grupos de BOM.
* `course_notes`: Contexto filogenético y notas de cátedra.

---

## 2. Catálogo Taxonómico

---

### [ID: `clitellata_oligochaeta`]
* **taxon_name**: *Oligochaeta*
* **rank**: Subclase (dentro de la Clase Clitellata)
* **common_name**: Oligoquetos / Lombrices acuáticas y terrestres
* **taxonomy**:
  * Phylum: **Annelida**
  * Class: **Clitellata**
  * Subclass: **Oligochaeta**
* **accepted_taxa_inputs**: `["Annelida", "Clitellata", "Oligochaeta", "Oligoquetos"]`
* **true_diagnostic_characters**:
  * `Clitelo` (región glandular epidérmica engrosada para secreción del capullo)
  * `Quetas escasas y simples` (insertadas directamente en la pared del cuerpo, sin parapodios)
  * `Ausencia de parapodios` (pared corporal lisa cilíndrica)
  * `Prostomio simple y reducido` (sin ojos cefálicos complejos, palpos ni antenas sensoriales conspicuas)
  * `Hermafroditismo con gónadas permanentes y localizadas`
  * `Faringe eversible desprovista de mandíbulas quitinosas y paragnatos`
  * `Desarrollo directo` (sin larva trocófora libre)
* **distractors**:
  * `Parapodios birrámeos con acículas`: *"Estructura locomotora exclusiva de Polychaeta; los clitelados carecen por completo de parapodios."*
  * `Corona radiolar branquial`: *"Propia de poliquetos sedentarios tubícolas como Serpulidae y Sabellidae."*
  * `Ventosa peribucal y ventosa posterior`: *"Característica diagnóstica de Hirudinoidea (sanguijuelas), no de oligoquetos."*
  * `Probóscide armada con paragnatos córneos`: *"Típica de poliquetos errantes Nereididae como Alitta succinea."*
* **course_notes**: *"Presentados en el cladograma de anélidos como grupo hermano de Hirudinoidea dentro de Clitellata, contrastando fuertemente con Polychaeta por la pérdida secundaria de parapodios y la presencia de clitelo."*

---

### [ID: `clitellata_hirudinoidea`]
* **taxon_name**: *Hirudinoidea*
* **rank**: Subclase (dentro de la Clase Clitellata)
* **common_name**: Hirudíneos / Sanguijuelas
* **taxonomy**:
  * Phylum: **Annelida**
  * Class: **Clitellata**
  * Subclass: **Hirudinoidea**
* **accepted_taxa_inputs**: `["Annelida", "Clitellata", "Hirudinoidea", "Hirudíneos", "Sanguijuelas"]`
* **true_diagnostic_characters**:
  * `Ventosa anterior / peribucal` (rodea la boca para fijación e ingestión)
  * `Ventosa posterior / anal discoidal` (órgano adhesivo locomotor principal)
  * `Número fijo de segmentos corporales (somitas)` (típicamente 33 o 34 segmentos homónomos)
  * `Anillación secundaria externa superficial` (anillos que no corresponden a septos internos)
  * `Ausencia total de quetas` (en la gran mayoría de las formas)
  * `Ausencia de parapodios`
  * `Celoma reducido a un sistema de lagunas y senos botroidales` (relleno de tejido conectivo mesenquimático)
  * `Clitelo visible únicamente durante el período reproductivo`
  * `Faringe armada con mandíbulas trirradiadas denticuladas o probóscide protráctil`
* **distractors**:
  * `Quetas abundantes en fascículos`: *"Exclusivo de Polychaeta; los hirudíneos carecen de quetas."*
  * `Opérculo calcáreo pedicelado`: *"Estructura protectora de tubos de poliquetos serpúlidos como Ficopomatus enigmaticus."*
  * `Parapodios con notopodio y neuropodio`: *"Lóbulos locomotores presentes solo en Polychaeta."*
  * `Cefalotórax cubierto por caparazón`: *"Organización corporal propia de artrópodos crustáceos."*
* **course_notes**: *"Ubicados filogenéticamente en Clitellata; adaptados morfológicamente a la hematofagia y ectoparasitismo o depredación, con anulación de septos celómicos internos y desarrollo de dos ventosas opuestas."*

---

### [ID: `crustacea_ostracoda`]
* **taxon_name**: *Ostracoda*
* **rank**: Clase
* **common_name**: Ostrácodos / Crustáceos bivalvos
* **taxonomy**:
  * Phylum: **Arthropoda**
  * Subphylum: **Crustacea** (Pancrustacea)
  * Superclass: **Oligostraca**
  * Class: **Ostracoda**
* **accepted_taxa_inputs**: `["Arthropoda", "Crustacea", "Pancrustacea", "Oligostraca", "Ostracoda", "Ostrácodos"]`
* **true_diagnostic_characters**:
  * `Caparazón bivalvo calcificado articulado dorsalmente` (cierra completamente el cuerpo y los apéndices)
  * `Músculo aductor central del caparazón` (deja cicatrices musculares diagnósticas en las valvas)
  * `Cuerpo fuertemente reducido y comprimido lateralmente sin segmentación visible externa`
  * `Reducción extrema del número de apéndices torácicos` (generalmente solo 1 a 3 pares)
  * `Anténulas y antenas bien desarrolladas birrámeas` (utilizadas para natación y locomoción fuera de la concha)
  * `Ojo naupliar único fusionado central`
  * `Furca caudal terminal retráctil`
* **distractors**:
  * `Caparazón con cámara incubatriz dorsal abierta que deja la cabeza libre`: *"Característica propia de Cladocera (Branchiopoda) como Penilia o Evadne."*
  * `Cinco pares de pereiópodos marchadores con quelas`: *"Morfología característica de Malacostraca Decapoda."*
  * `Charnela heterodonta con condróforo`: *"Estructura exclusiva de la conchilla de moluscos bivalvos (Bivalvia)."*
  * `Fotóforos bioluminiscentes ventrales`: *"Órganos emisores de luz típicos de Euphausiacea (krill)."*
* **course_notes**: *"Presentados dentro de la superclase Oligostraca en el práctico de microcrustáceos y zooplancton. Superficialmente similares a pequeños bivalvos, pero reconocibles por sus apéndices articulados artrópodos internos y caparazón articulado sin líneas de crecimiento."*

---

### [ID: `crustacea_ichthyostraca`]
* **taxon_name**: *Ictiostracas* (Ichthyostraca)
* **rank**: Clase
* **common_name**: Ictióstracos (Branchiura + Pentastomida)
* **taxonomy**:
  * Phylum: **Arthropoda**
  * Subphylum: **Crustacea** (Pancrustacea)
  * Superclass: **Oligostraca**
  * Class: **Ichthyostraca**
* **accepted_taxa_inputs**: `["Arthropoda", "Crustacea", "Pancrustacea", "Oligostraca", "Ichthyostraca", "Ictiostracas", "Ictióstracos"]`
* **true_diagnostic_characters**:
  * `Adaptaciones morfológicas estrictas al ectoparasitismo de vertebrados acuáticos (peces)`
  * `Primer par de maxilas transformadas en grandes ventosas discoidales adhesivas` (en Branchiura)
  * `Cuerpo dorsoventralmente aplanado con escudo cefálico ancho en forma de disco`
  * `Espina preoral venenosa retráctil y probóscide chupadora`
  * `Cuatro pares de patas torácicas natatorias birrámeas` (en formas branquiuras)
  * `Ojos compuestos sésiles visibles a través del caparazón membranoso translúcido`
  * `Reducción extrema del abdomen a un lóbulo bilobulado no segmentado`
* **distractors**:
  * `Estatocisto en endopoditos de los urópodos`: *"Órgano de equilibrio diagnóstico exclusivo de Mysidacea."*
  * `Tagmosis Gymnoplea con articulación prosoma-urosoma`: *"Definición anatómica de copépodos Calanoida."*
  * `Dendrobranquias altamente ramificadas`: *"Sistema branquial exclusivo de camarones Penaeoidea (Decapoda)."*
  * `Coloblastos adhesivos`: *"Células prensiles exclusivas del filo Ctenophora."*
* **course_notes**: *"Linaje especializado de Oligostraca abordado en la sistemática de crustáceos parásitos (anteriormente tratados como Branchiura). Destacados como parásitos de peces ('piojos de los peces') con piezas bucales y maxilares convertidas en ventosas y ganchos de anclaje."*

---

### [ID: `crustacea_remipedia`]
* **taxon_name**: *Remipedia*
* **rank**: Clase
* **common_name**: Remípedos
* **taxonomy**:
  * Phylum: **Arthropoda**
  * Subphylum: **Crustacea** (Pancrustacea)
  * Superclass: **Miracrustacea**
  * Class: **Remipedia**
* **accepted_taxa_inputs**: `["Arthropoda", "Crustacea", "Pancrustacea", "Miracrustacea", "Remipedia", "Remípedos"]`
* **true_diagnostic_characters**:
  * `Cuerpo vermiforme alargado homónomo sin diferenciación de tórax y abdomen`
  * `Tronco compuesto por numerosos segmentos similares (hasta más de 30 o 40 segmentos)`
  * `Apéndices birrámeos laterales aplanados nadadores en forma de remo en cada segmento`
  * `Escudo cefálico corto semicircular sin fusionar segmentos del tronco`
  * `Primer par de maxilas hipertrofiadas como garras prensiles agudas con glándulas venenosas`
  * `Anténulas birrámeas prominentes sensoriales`
  * `Ausencia de ojos` (anophthalmia estricta por adaptación estigobia en cuevas anquihalinas)
* **distractors**:
  * `Caparazón que cubre todo el cuerpo con surco cervical`: *"Propio de Decapoda y Phyllocarida."*
  * `Cinco pares de apéndices torácicos unirrámeos con dáctilo terminal`: *"Típico de malacostráceos braquiuros y anomuros."*
  * `Antenas de 25 artejos con bisagra geniculada`: *"Característica sexual secundaria de copépodos machos."*
  * `Pluma quitinosa interna (gladio)`: *"Conchilla vestigial interna exclusiva de cefalópodos calamares (Illex argentinus)."*
* **course_notes**: *"Grupo clave en los árboles filogenéticos del curso (clado Pancrustacea/Allotriocarida), al postularse actualmente como el linaje de crustáceos marinos más estrechamente emparentado con Hexapoda (insectos). Viven exclusivamente en cuevas anquihalinas de alta salinidad."*

---

### [ID: `crustacea_cephalocarida`]
* **taxon_name**: *Cephalocarida*
* **rank**: Clase
* **common_name**: Cefalocáridos
* **taxonomy**:
  * Phylum: **Arthropoda**
  * Subphylum: **Crustacea** (Pancrustacea)
  * Superclass: **Miracrustacea**
  * Class: **Cephalocarida**
* **accepted_taxa_inputs**: `["Arthropoda", "Crustacea", "Pancrustacea", "Miracrustacea", "Cephalocarida", "Cefalocáridos"]`
* **true_diagnostic_characters**:
  * `Escudo cefálico en herradura sin ojos compuestos ni caparazón torácico`
  * `Tronco dividido en tórax con 8 segmentos provistos de apéndices y abdomen de 11 segmentos ápodas`
  * `Apéndices torácicos birrámeos de estructura primitiva foliácea trirrámea uniforme` (con pseudepipodito lateral)
  * `Maxilas y maxílulas prácticamente indiferenciadas de los apéndices torácicos posteriores` (condición ancestral seriada)
  * `Telson terminal provisto de largas ramas caudales furcales`
  * `Surco ventral alimentario medio para microfagia bentónica`
  * `Organismos hermafroditas de diminuto tamaño intersticial (<3-4 mm)`
* **distractors**:
  * `Pleópodos modificados en gonópodos copuladores`: *"Propio de machos de Malacostraca Decapoda."*
  * `Rostro bífido con espinas laterales y orbitales`: *"Propio de cangrejos araña (Majidae/Epialtidae) como Libinia spinosa."*
  * `Caparazón bivalvo con charnela`: *"Estructura presente en Ostracoda y Conchostraca."*
  * `Corona de peines o paletas ciliadas`: *"Estructura locomotora de Ctenophora."*
* **course_notes**: *"Representados en los árboles filogenéticos basales de crustáceos como un grupo con caracteres marcadamente plesiomórficos (apéndices poscefálicos casi idénticos en forma y función, sin diferenciación funcional avanzada)."*

---

### [ID: `crustacea_thecostraca`]
* **taxon_name**: *Thecostraca*
* **rank**: Clase
* **common_name**: Tecostracos / Cirrípedos y afines (balanos, percebes y parásitos rizocéfalos)
* **taxonomy**:
  * Phylum: **Arthropoda**
  * Subphylum: **Crustacea** (Pancrustacea)
  * Superclass: **Cirripedia / Thecostraca**
  * Class: **Thecostraca**
* **accepted_taxa_inputs**: `["Arthropoda", "Crustacea", "Pancrustacea", "Thecostraca", "Tecostracos", "Cirripedia", "Cirrípedos", "Balanos", "Percebes"]`
* **true_diagnostic_characters**:
  * `Fase adulta sésil bentónica fijada por la región cefálica` (mediante glándulas de cemento en las anténulas)
  * `Muralla de placas esqueléticas calcáreas externas` (carina, rostrum, scuta y terga)
  * `Opérculo móvil compuesto por pares de tergos y escudos para cierre hermético`
  * `Modificación de seis pares de apéndices torácicos en cirros filamentosos birrámeos birsutos` (utilizados como red de filtración)
  * `Caparazón profundamente modificado en un manto carnoso envolvente que secreta las placas calcáreas`
  * `Pedúnculo carnoso flexible contráctil` (en formas pedunculadas / percebes) o `fijación directa sésil cónica` (en balanos / bellotas de mar)
  * `Larva cipris univalva especializada` (con anténulas prensiles para fijación al sustrato)
* **distractors**:
  * `Valvas calcáreas con líneas de crecimiento concéntricas y lúnula`: *"Morfología de la concha de moluscos bivalvos; las placas de los cirrípedos son de origen cuticular artrópodo."*
  * `Cinco pares de pereiópodos marchadores`: *"Organización torácica de Malacostraca Decapoda."*
  * `Tagma urosoma articulado con furca caudal`: *"Propio de copépodos."*
  * `Cnidocitos urticantes`: *"Células diagnósticas exclusivas del filo Cnidaria."*
* **course_notes**: *"Mostrados en los cladogramas de Pancrustacea de clase. Constituyen uno de los ejemplos más notables de modificación morfológica hacia el sésilismo filtrador en artrópodos, confundidos históricamente con moluscos por sus murallas calcáreas."*

---

### [ID: `cnidaria_myxozoa`]
* **taxon_name**: *Myxozoa*
* **rank**: Clase (dentro del Subphylum Endocnidozoa)
* **common_name**: Mixozoos / Cnidarios parásitos microscópicos
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Endocnidozoa**
  * Class: **Myxozoa**
* **accepted_taxa_inputs**: `["Cnidaria", "Endocnidozoa", "Myxozoa", "Mixozoos"]`
* **true_diagnostic_characters**:
  * `Organización corporal microscópica y extremadamente reducida` (parásitos obligados con alternancia de hospedadores: anélidos/briozoos y peces)
  * `Esporas multicelulares infecciosas diagnósticas` compuestas por valvas protectoras
  * `Cápsulas polares de origen cnidocítico` (1 a 4 estructuras vesiculares esféricas u ovoides)
  * `Filamentos polares espiralados dentro de la cápsula` (homólogos al túbulo del nematocisto para fijación al hospedador)
  * `Amebula / esporoplasma infectivo multinucleado interno`
  * `Pérdida secundaria completa de epitelios verdaderos, cavidad gastrovascular (celenteron), boca y sistema nervioso`
* **distractors**:
  * `Campana umbrelar con velario y pedalios`: *"Estructuras diagnósticas exclusivas de Cubozoa."*
  * `Faringe invaginada con sifonoglifo`: *"Anatomía diagnóstica interna de Anthozoa."*
  * `Pneumatóforo de gas con flotador`: *"Órgano hidrostático de hidrozoos sifonóforos."*
  * `Ropalios con estatocisto y ocelos complejos`: *"Centros sensoriales marginales de Scyphozoa y Cubozoa."*
* **course_notes**: *"Presentados en el teórico de Cnidaria como miembros del subfilo parásito Endocnidozoa (~2.500 especies). Descritos históricamente como protozoos esporozoos hasta que la microscopía electrónica y la filogenómica demostraron que las cápsulas polares son nematocistos modificados, confirmando su estatus como Cnidarios derivados."*

---

### [ID: `cnidaria_polypodiozoa`]
* **taxon_name**: *Polypodiozoa*
* **rank**: Clase (dentro del Subphylum Endocnidozoa)
* **common_name**: Polipodiozoos
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Endocnidozoa**
  * Class: **Polypodiozoa**
* **accepted_taxa_inputs**: `["Cnidaria", "Endocnidozoa", "Polypodiozoa", "Polipodiozoos"]`
* **true_diagnostic_characters**:
  * `Parásito intracelular estricto de ovocitos de peces dulceacuícolas y anádromos (Acipenseriformes)`
  * `Fase parasitaria con inversión de capas germinales` (ectodermo situado internamente y endodermo hacia el exterior en contacto con el vitelo)
  * `Estolón multinucleado vermiforme que se segmenta libremente en el agua al eclosionar`
  * `Fase de vida libre cilíndrica con tentáculos y boca` (forma solitaria tentaculada en agua dulce)
  * `Cnidocitos verdaderos con nematocistos funcionales` presentes en los tentáculos de la forma libre
  * `Ciclo biológico con inversión ontogenética única en todo el reino animal`
* **distractors**:
  * `Disco condróforo quitinoso con vela triangular`: *"Estructura de hidrozoos pleustónicos Porpitidae como Velella velella."*
  * `Septos mesenteriales con acontios filamentosos`: *"Caracteres internos de Anthozoa Actiniaria."*
  * `Pedalios en las 4 esquinas de la campana`: *"Exclusivo de medusas Cubozoa."*
  * `Canales radiales numerosos ramificados (>60)`: *"Morfología de hidromedusas Aequoreidae como Aequorea aequorea."*
* **course_notes**: *"Mencionado en la sistemática moderna de Cnidarios como un linaje hermano especializado dentro de Endocnidozoa. Destaca por su adaptación única a vivir como parásito dentro del citoplasma de los ovocitos de esturiones antes de convertirse en una pequeña forma tentaculada libre en el agua."*

---
