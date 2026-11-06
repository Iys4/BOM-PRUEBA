# DATASET CNIDARIA BOM - Base de Datos Taxonómica y Anatómica de Cátedra

Este documento constituye la fuente de datos oficial y cerrada para la aplicación interactiva de entrenamiento de reconocimiento práctico para la materia **Biología de Organismos Marinos (BOM)**. Todos los nombres, jerarquías, estructuras y observaciones se basan estrictamente en los contenidos de los teóricos y protocolos prácticos de la cátedra.

---

## 1. Estructura de la Base de Datos

Cada registro de espécimen contiene los siguientes campos estandarizados:

* `id`: Identificador único (slug alfanumérico).
* `scientific_name`: Nombre científico binomial o genérico formal del espécimen.
* `common_name`: Nombre vulgar o apelativo diagnóstico enseñado en clase (si aplica).
* `taxonomy`:
  * `phylum`
  * `subphylum`
  * `class`
  * `subclass`
  * `order`
  * `suborder` (si aplica en BOM)
  * `family` (si aplica en BOM)
  * `genus`
  * `species`
* `accepted_taxa_inputs`: Lista de términos taxonómicos exactos y variantes válidas que el input predictivo reconoce (+100 pts por cada uno).
* `true_organs`: Lista de órganos, estructuras y partes corporales observables/diagnósticas presentes en el espécimen.
* `distractors`: Lista de órganos distractores seleccionados específicamente para el parcial, con su respectiva justificación de error pedagógico (por qué no pertenece a ese grupo).
* `formol_recognition_notes`: Claves diagnósticas para identificar el espécimen fijado en formol en la bandeja de examen.

---

## 2. Catálogo de Especies y Especímenes de Clase

---

### [ID: `obelia_sp`]
* **scientific_name**: *Obelia sp.*
* **common_name**: Hidroide colonial tecado / Campanulárido
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Leptothecata** (Leptomedusae)
  * Family: **Campanulariidae**
  * Genus: **Obelia**
  * Species: ***Obelia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Leptothecata", "Leptomedusae", "Campanulariidae", "Obelia", "Obelia sp"]`
* **true_organs**:
  * `Hidroteca` (copa de perisarco transparente que aloja al hidrante)
  * `Pedicelo anillado` (anillos flexibles en la base de la hidroteca)
  * `Gastrozoide / Hidrante` (pólipo alimentador con tentáculos filiformes)
  * `Hipostoma` (cono oral que sostiene la boca)
  * `Gonoteca` (cubierta de perisarco cilíndrica de los pólipos reproductores)
  * `Gonozoide / Gonangio / Medusóforo` (eje blastostilo con medusas en gemación)
  * `Perisarco` (cubierta quitinosa externa continua de la colonia)
  * `Cenosarco` (tejido celular vivo interno continuo)
  * `Velo` (presente en la fase medusa liberada)
  * `Canales radiales (4)` (en la fase medusa)
* **distractors**:
  * `Velario`: *"El velario es exclusivo de la clase Cubozoa; Hydrozoa posee velo verdadero."*
  * `Brazos orales festoneados`: *"Estructura exclusiva de escifomedusas (Scyphozoa); los hidroides tienen hipostoma simple."*
  * `Pneumatóforo`: *"Flotador de gas exclusivo de sifonóforos."*
  * `Ropalio`: *"Órgano sensorial de Scyphozoa y Cubozoa; Hydrozoa tiene estatocistos ocelos simples marginales."*
  * `Septos gástricos`: *"Exclusivos de Anthozoa y Scyphozoa; la cavidad gastrovascular de los hidroides carece de tabiques."*
* **formol_recognition_notes**: *"Colonia pequeña plumosa ramificada de color ámbar pajizo o transparente. En lupa o microscopio se aprecian las hidrotecas en forma de copa abierta con pedicelos anillados característicos, a diferencia de las tecas biseriadas adosadas de Amphisbetia."*

---

### [ID: `amphisbetia_operculata`]
* **scientific_name**: *Amphisbetia operculata*
* **common_name**: Hidroide sertulárido / Capilaria
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Leptothecata** (Leptomedusae)
  * Family: **Sertulariidae**
  * Genus: **Amphisbetia**
  * Species: ***Amphisbetia operculata***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Leptothecata", "Leptomedusae", "Sertulariidae", "Amphisbetia", "Amphisbetia operculata"]`
* **true_organs**:
  * `Hidrotecas biseriadas opuestas` (dispuestas en pares enfrentados adosadas a los tallos)
  * `Dientes o espinas marginales tecales` (cúspides puntiagudas en el margen de la hidroteca)
  * `Opérculo tecal` (valva o tapa que clausura la apertura de la hidroteca)
  * `Gonoteca ovada u oblonga con opérculo cónico` (cápsula reproductora grande con cuello definido)
  * `Perisarco rígido marrón/ámbar`
  * `Cenosarco`
  * `Gastrozoides retráctiles`
* **distractors**:
  * `Pedicelo anillado`: *"Típico de Campanulariidae (Obelia, Clytia); las hidrotecas de Amphisbetia son sésiles y adosadas al entrenudo."*
  * `Pedalio`: *"Base carnosa del tentáculo exclusiva de Cubozoa."*
  * `Condróforo`: *"Flotador con cámaras de quitina propio de Velella y Porpita."*
  * `Sifonoglifo`: *"Canal ciliado de la faringe propio de Anthozoa."*
* **formol_recognition_notes**: *"Colonia arborescente densa que forma mechones rígidos de aspecto capilar marrón o amarillento. Al microscopio se reconocen inmediatamente las hidrotecas soldadas por pares opuestos con margen bidentado provisto de opérculo."*

---

### [ID: `tubularia_sp`]
* **scientific_name**: *Tubularia sp.*
* **common_name**: Hidroide atecado / Hidroide de penacho
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Anthoathecata** (Anthomedusae)
  * Family: **Tubulariidae**
  * Genus: **Tubularia**
  * Species: ***Tubularia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Anthoathecata", "Anthomedusae", "Tubulariidae", "Tubularia", "Tubularia sp"]`
* **true_organs**:
  * `Hidrante atecado desnudo` (sin hidroteca de perisarco protectora)
  * `Tentáculos aborales filiformes` (corona basal de tentáculos largos)
  * `Tentáculos orales cortos` (corona distal alrededor del hipostoma)
  * `Gonóforos racemosos en racimo` (medusoides fijos colgando entre ambas coronas de tentáculos)
  * `Larva actínula` (estadio larval desarrollado dentro del gonóforo)
  * `Cauloperisarco / Tallo perisárquico cilíndrico liso`
* **distractors**:
  * `Hidroteca`: *"Tubularia es un hidroide atecado (Anthoathecata); carece de copa protectora alrededor del hidrante."*
  * `Gonoteca`: *"Al ser atecado, los gonóforos cuelgan desnudos sin cápsula de gonoteca."*
  * `Ropalio`: *"Estructura sensorial de Scyphozoa/Cubozoa."*
  * `Brazos orales con bocas secundarias`: *"Propio de Scyphozoa Rhizostomeae."*
* **formol_recognition_notes**: *"Tallo largo cilíndrico no ramificado o poco ramificado coronado por un gran hidrante carnoso de color rosado pálido en fresco (blanquecino en formol). El doble verticilo de tentáculos (largos basales y cortos orales) y los racimos de gonóforos son diagnósticos."*

---

### [ID: `physalia_physalis`]
* **scientific_name**: *Physalia physalis*
* **common_name**: Carabela portuguesa / Fragata portuguesa
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Siphonophorae**
  * Suborder: **Cystonectae**
  * Family: **Physaliidae**
  * Genus: **Physalia**
  * Species: ***Physalia physalis***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Siphonophorae", "Cystonectae", "Physaliidae", "Physalia", "Physalia physalis"]`
* **true_organs**:
  * `Pneumatóforo / Flotador asimétrico de gas` (vejiga llena de gas de origen neuroectodérmico)
  * `Cresta o vela del flotador` (quilha dorsal eréctil)
  * `Dactilozoides` (zooides defensivos y de captura con tentáculos larguísimos)
  * `Baterías de nematocistos` (filas transversales densas de cápsulas urticantes en los tentáculos)
  * `Gastrozoides con boca terminal` (zooides digestivos sin tentáculos)
  * `Gonozoides / Gonodentros` (racimos reproductores arborescentes)
  * `Ampolla basal del tentáculo`
* **distractors**:
  * `Nectóforos / Campanas natatorias`: *"Physalia pertenece a Cystonectae y carece por completo de nectóforos natatorios."*
  * `Brácteas protectoras`: *"Ausentes en el suborden Cystonectae."*
  * `Velario`: *"Propio de Cubomedusas."*
  * `Condróforo quitinoso concéntrico`: *"Exclusivo de Porpitidae (Velella y Porpita)."*
  * `Ropalio`: *"Propio de Scyphozoa y Cubozoa."*
* **formol_recognition_notes**: *"Flotador sacciforme neumático azul violáceo que en formol vira a grisáceo o púrpura descolorido. Debajo del flotador pende una masa densa de zooides y tentáculos fuertemente replegados y contráctiles con botones nodulares de nematocistos."*

---

### [ID: `velella_velella`]
* **scientific_name**: *Velella velella*
* **common_name**: Barquito de San Pedro / Vela de mar
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Anthoathecata** (Condróforos / Siphonophorae sensu lato)
  * Family: **Porpitidae**
  * Genus: **Velella**
  * Species: ***Velella velella***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Anthoathecata", "Porpitidae", "Chondrophora", "Velella", "Velella velella"]`
* **true_organs**:
  * `Condróforo / Flotador discoidal elíptico con cámaras de quitina concéntricas`
  * `Vela triangular oblicua rígida` (lámina vertical transparente sobre el flotador)
  * `Gastrozoide central único grande` (pólipo alimentador axial)
  * `Gonozoosides / Gonozooides intermedios` (dispuestos en corona concéntrica liberadores de medusas)
  * `Tentaculozoides / Dactilozoides marginales` (corona periférica azulada)
  * `Manto periférico azul`
* **distractors**:
  * `Pneumatóforo carnoso sacciforme`: *"Velella tiene un disco rígido interno con cámaras concéntricas (condróforo), no una vejiga membranosa inflable como Physalia."*
  * `Velo craspedoto`: *"El velo es una estructura de hidromedusas libres; la vela de Velella es un esqueleto quitinoso dorsal."*
  * `Nectóforos`: *"Las colonias de porpítidos no poseen campanas natatorias activas."*
  * `Disco pedal`: *"Estructura de anémonas bentónicas para fijación a rocas."*
* **formol_recognition_notes**: *"Flotador aplanado ovalado muy delgado con estriaciones concéntricas de consistencia apergaminada/plástica y una vela dorsal transparente diagonal. En formol pierde su vivo color azul marino tornándose blanco traslúcido o amarillento."*

---

### [ID: `porpita_porpita`]
* **scientific_name**: *Porpita porpita*
* **common_name**: Botón azul
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Anthoathecata** (Condróforos / Porpitidae)
  * Family: **Porpitidae**
  * Genus: **Porpita**
  * Species: ***Porpita porpita***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Anthoathecata", "Porpitidae", "Chondrophora", "Porpita", "Porpita porpita"]`
* **true_organs**:
  * `Condróforo discoidal perfectamente circular` (disco quitinoso con poros y cámaras concéntricas de gas)
  * `Gastrozoide central único` (boca y cavidad digestiva principal)
  * `Gonozoides / Gonozooides reproductores` (rodean concéntricamente al gastrozoide central)
  * `Tentaculozoides capitados periféricos` (con ramas ramificadas terminadas en botones esféricos con nematocistos)
  * `Sin vela dorsal`
* **distractors**:
  * `Vela triangular oblicua`: *"Exclusiva de Velella velella; Porpita es un disco plano circular carente de quilla o vela."*
  * `Pneumatóforo asimétrico`: *"Propio de Physalia."*
  * `Brazos orales`: *"Estructura de Scyphozoa."*
  * `Canales radiales`: *"Propio de medusas individuales con cavidad gastrovascular umbrelar."*
* **formol_recognition_notes**: *"Estructura en forma de moneda o disco circular perfecto, aplanado y rígido. Alrededor del borde parten tentaculozoides con pompones capitados distales. En formol el color azul turquesa desaparece y queda una lámina circular blanquecina con estrías concéntricas."*

---

### [ID: `nanomia_bijuga`]
* **scientific_name**: *Nanomia bijuga*
* **common_name**: Sifonóforo fisonéctido
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Hydroidolina**
  * Order: **Siphonophorae**
  * Suborder: **Physonectae**
  * Family: **Agalmatidae**
  * Genus: **Nanomia**
  * Species: ***Nanomia bijuga***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Hydroidolina", "Siphonophorae", "Physonectae", "Agalmatidae", "Nanomia", "Nanomia bijuga", "Nanomia sp"]`
* **true_organs**:
  * `Pneumatóforo apical pequeño con poro` (flotador de gas diminuto con mancha pigmentaria apical)
  * `Nectosoma / Nectosoma locomotor` (tallo proximal que sostiene campanas de propulsión)
  * `Nectóforos biseriados` (campanas natatorias con velo y canales radiales)
  * `Sifosoma` (tallo distal alargado que sostiene los módulos o cormidios funcionales)
  * `Cormidios` (unidades repetitivas funcionales a lo largo del tallo)
  * `Brácteas protectoras` (escudos gelatinosos prismáticos sobre los zooides)
  * `Gastrozoides con basigastro y tentáculo`
  * `Tentilla / Tentilillos espiralados` (ramificaciones laterales del tentáculo con baterías urticantes)
  * `Palpones / Dactilozoides accesorios`
* **distractors**:
  * `Condróforo con cámaras concéntricas`: *"Propio de Porpitidae (Velella, Porpita)."*
  * `Brazos orales festoneados`: *"Propio de Scyphozoa."*
  * `Pedalio`: *"Estructura basal de tentáculos de Cubozoa."*
  * `Ropalio`: *"Órgano sensorial marginal de Scyphozoa y Cubozoa."*
* **formol_recognition_notes**: *"Eje central filamentoso con una porción natatoria de nectóforos transparentes acoplados y una porción trófica de cormidios protegidos por brácteas poliédricas. Al fijarse en formol suele desprender los nectóforos y brácteas en el fondo del frasco."*

---

### [ID: `liriope_tetraphylla`]
* **scientific_name**: *Liriope tetraphylla*
* **common_name**: Hidromedusa de pedúnculo largo / Traquilina
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Trachylina**
  * Order: **Limnomedusae** (a menudo tratada en Trachymedusae en fuentes clásicas)
  * Family: **Geryoniidae**
  * Genus: **Liriope**
  * Species: ***Liriope tetraphylla***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Trachylina", "Limnomedusae", "Geryoniidae", "Liriope", "Liriope tetraphylla"]`
* **true_organs**:
  * `Velo craspedoto bien desarrollado` (membrana interna del margen umbrelar)
  * `Pedúnculo gástrico largo y cónico` (proyección gelatinosa que cuelga por debajo del velo)
  * `Manubrio terminal con 4 labios orales simples` (en el extremo del pedúnculo)
  * `Canales radiales (4)`
  * `Gónadas foliáceas acintadas en los 4 canales radiales` (láminas ensanchadas con forma de hoja o corazón)
  * `Tentáculos perradiales largos huecos (4)`
  * `Tentáculos interradiales secundarios cortos y rígidos (4)`
  * `Estatocistos ecto-endodérmicos cerrados`
* **distractors**:
  * `Velario`: *"El velario carece de musculatura craspedota y posee canales velariales; exclusivo de Cubozoa."*
  * `Ropalios`: *"Liriope posee estatocistos simples, no ropalios con bolsas sensoriales."*
  * `Gónadas en herradura`: *"Característica clásica de Aurelia aurita (Scyphozoa)."*
  * `Hidroteca`: *"Liriope es una medusa libre de ciclo hipogenético sin fase de pólipo tecado."*
* **formol_recognition_notes**: *"Campana hemisférica transparente y cristalina de 1 a 2 cm. El diagnóstico inmediato en la lupa es el pedúnculo gástrico prominente que sobresale del margen umbrelar y las 4 gónadas aplanadas en forma de rombo o corazón sobre los canales radiales."*

---

### [ID: `olindias_sambaquiensis`]
* **scientific_name**: *Olindias sambaquiensis*
* **common_name**: Medusa de la cruz / Hidromedusa urticante de verano
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Trachylina**
  * Order: **Limnomedusae**
  * Family: **Olindiidae**
  * Genus: **Olindias**
  * Species: ***Olindias sambaquiensis***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Trachylina", "Limnomedusae", "Olindiidae", "Olindias", "Olindias sambaquiensis"]`
* **true_organs**:
  * `Velo marginal craspedoto`
  * `Canales radiales (4) con gónadas plegadas/festoneadas` (aspecto corrugado transversal en toda su longitud)
  * `Canales centrípetos ciegos` (canales suplementarios que parten del canal circular hacia la umbrela sin llegar al estómago)
  * `Tentáculos primarios con almohadillas o discos adhesivos terminales` (salen por encima del margen de la campana)
  * `Tentáculos secundarios marginales finos densamente anillados`
  * `Manubrio cuadrangular con 4 labios orales festoneados`
  * `Estatocistos marginales pareados`
* **distractors**:
  * `Lappets marginales`: *"Escotaduras marginales exclusivas de Scyphozoa."*
  * `Brazos orales carnosos esponjosos`: *"Propio de Scyphozoa Rhizostomeae."*
  * `Pedalios`: *"Bases alares musculares exclusivas de Cubozoa."*
  * `Flotador neumático`: *"Propio de Siphonophorae."*
* **formol_recognition_notes**: *"Medusa de consistencia firme y rígida, con umbrela en casquete hemisférico aplanado (5 a 10 cm). En formol se distinguen las 4 gónadas fuertemente corrugadas en forma de cinta plegada sobre los canales radiales y los canales centrípetos que suben desde el borde."*

---

### [ID: `cunina_octonaria`]
* **scientific_name**: *Cunina octonaria*
* **common_name**: Narcomedusa parásita
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Hydrozoa**
  * Subclass: **Trachylina**
  * Order: **Narcomedusae**
  * Family: **Cuninidae**
  * Genus: **Cunina**
  * Species: ***Cunina octonaria***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Hydrozoa", "Trachylina", "Narcomedusae", "Cuninidae", "Cunina", "Cunina octonaria"]`
* **true_organs**:
  * `Margen umbrelar lobulado en festones / Lappets umbrelares`
  * `Tentáculos exumbrelares rígidos (8)` (insertados horizontalmente por encima del margen de la campana)
  * `Peronios / Surcos peroniales` (líneas engrosadas ectodérmicas que van desde la base de cada tentáculo hasta el margen)
  * `Bolsas gástricas radiales periféricas (8)` (extensiones del estómago sin canales radiales angostos típicos)
  * `Otoporpas` (tractos ectodérmicos con nematocistos sobre los órganos sensoriales)
  * `Velo reducido / Velo membranoso festoneado`
* **distractors**:
  * `Canales radiales finos`: *"Narcomedusae carece de canales radiales estrechos; tiene bolsas gástricas anchas directas."*
  * `Pedúnculo gástrico largo`: *"Propio de Liriope tetraphylla."*
  * `Brazos orales fusionados`: *"Propio de Rhizostomeae."*
  * `Pneumatóforo`: *"Propio de Siphonophorae."*
* **formol_recognition_notes**: *"Medusa muy pequeña (generalmente 2 a 5 mm), transparente y lenticular. Su rasgo diagnóstico inconfundible al microscopio es la inserción horizontal de los 8 tentáculos rígidos directamente en el dorso exumbrelar, unidos al margen por peronios."*

---

### [ID: `aurelia_aurita`]
* **scientific_name**: *Aurelia aurita*
* **common_name**: Medusa de la luna / Medusa común
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Scyphozoa**
  * Subclass: **Discomedusae**
  * Order: **Semaeostomeae**
  * Family: **Ulmaridae**
  * Genus: **Aurelia**
  * Species: ***Aurelia aurita***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Scyphozoa", "Discomedusae", "Semaeostomeae", "Ulmaridae", "Aurelia", "Aurelia aurita", "Aurelia sp"]`
* **true_organs**:
  * `Gónadas gástricas en forma de herradura (4)` (en el piso del estómago)
  * `Brazos orales festoneados y acanalados (4)` (con pliegues y surco ciliar ventral)
  * `Tentáculos marginales cortos filiformes en hilera densa continua`
  * `Ropalios (8)` (órganos sensoriales con estatocisto y ocelo en las escotaduras marginales)
  * `Lappets marginales / Lóbulos marginales` (flanquean cada ropalio)
  * `Canales radiales profusamente ramificados y anastomóticos`
  * `Canal circular marginal`
  * `Cavidad gastrovascular central con 4 bolsas gástricas y filamentos gástricos`
  * `Ausencia de velo (Acraspedota)`
* **distractors**:
  * `Velo craspedoto`: *"Las escifomedusas son acraspedotas (carecen de velo muscular verdadero)."*
  * `Velario`: *"Estructura exclusiva de Cubozoa."*
  * `Pedalio`: *"Base carnosa ensanchada de tentáculos propia de Cubozoa."*
  * `Hidroteca`: *"Propio del pólipo de hidroides tecados."*
  * `Boca cerrada por fusión de brazos`: *"Propio del orden Rhizostomeae; Aurelia tiene boca central abierta rodeada por 4 brazos libres."*
* **formol_recognition_notes**: *"Campana aplanada blanquecina translúcida de 15 a 25 cm. La presencia de las 4 gónadas circulares o en herradura en el centro de la umbrela y los 4 brazos orales semejantes a cintas plegadas son los caracteres inmediatos de identificación en formol."*

---

### [ID: `chrysaora_lactea`]
* **scientific_name**: *Chrysaora lactea*
* **common_name**: Medusa de compás / Medusa lechosa
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Scyphozoa**
  * Subclass: **Discomedusae**
  * Order: **Semaeostomeae**
  * Family: **Pelagiidae**
  * Genus: **Chrysaora**
  * Species: ***Chrysaora lactea***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Scyphozoa", "Discomedusae", "Semaeostomeae", "Pelagiidae", "Chrysaora", "Chrysaora lactea"]`
* **true_organs**:
  * `Tentáculos marginales (24)` (dispuestos en grupos de 3 por cada octante)
  * `Ropalios marginales (8)`
  * `Lappets marginales (32)` (4 por octante flanqueando tentáculos y ropalios)
  * `Brazos orales largos (4) fuertemente festoneados y espiralados`
  * `Bolsas gástricas radiales (16)` (8 ropalares y 8 tentaculares)
  * `Manchas o triángulos pigmentarios radiales en la exumbrela` (patrón de compás o rayos marrones/rojizos)
  * `Filamentos gástricos endodérmicos`
* **distractors**:
  * `Velo`: *"Scyphozoa carece de velo."*
  * `Canales centrípetos`: *"Estructura de Limnomedusae (Olindias)."*
  * `Pedalio`: *"Propio de Cubozoa."*
  * `Faringe con sifonoglifo`: *"Exclusivo de pólipos de Anthozoa."*
* **formol_recognition_notes**: *"Campana hemisférica de 10 a 15 cm con dibujos radiales triangulares o bandas marrones sobre fondo blanco lechoso (a menudo decoloradas pero visibles en formol). A diferencia de Aurelia, tiene tentáculos marginales muy largos agrupados de a 3 por octante (24 en total) y 4 brazos orales extremadamente largos."*

---

### [ID: `cyanea_capillata`]
* **scientific_name**: *Cyanea capillata*
* **common_name**: Medusa melena de león / Medusa gigante ártica
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Scyphozoa**
  * Subclass: **Discomedusae**
  * Order: **Semaeostomeae**
  * Family: **Cyaneidae**
  * Genus: **Cyanea**
  * Species: ***Cyanea capillata***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Scyphozoa", "Discomedusae", "Semaeostomeae", "Cyaneidae", "Cyanea", "Cyanea capillata"]`
* **true_organs**:
  * `Penachos o haces subumbrelares de tentáculos (8 grupos de 70 a 150 tentáculos cada uno)`
  * `Ropalios en escotaduras profundas (8)`
  * `Lóbulos marginales umbrelares anchos (8 o 16)`
  * `Brazos orales cortinados voluminosos y plegados`
  * `Bolsas gástricas con divertículos radiales ramificados en el margen`
  * `Filamentos gástricos`
* **distractors**:
  * `Tentáculos marginales uniseriados`: *"Cyanea no tiene tentáculos en una sola fila en el borde, sino agrupados en 8 grandes haces bajo la campana."*
  * `Velario`: *"Propio de Cubozoa."*
  * `Pneumatóforo`: *"Propio de Siphonophorae."*
  * `Coralito`: *"Esqueleto de coral pétreo."*
* **formol_recognition_notes**: *"Espécimen de grandes dimensiones o fragmento de margen umbrelar donde se aprecian los densos penachos de cientos de tentáculos filiformes que nacen de la cara subumbrelar (no del borde neto) asemejando una cabellera o melena."*

---

### [ID: `lychnorhiza_lucerna`]
* **scientific_name**: *Lychnorhiza lucerna*
* **common_name**: Medusa de la cruz / Aguaviva manchada
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Scyphozoa**
  * Subclass: **Discomedusae**
  * Order: **Rhizostomeae**
  * Family: **Lychnorhizidae**
  * Genus: **Lychnorhiza**
  * Species: ***Lychnorhiza lucerna***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Scyphozoa", "Discomedusae", "Rhizostomeae", "Lychnorhizidae", "Lychnorhiza", "Lychnorhiza lucerna"]`
* **true_organs**:
  * `Brazos orales (8) fusionados proximalmente y ramificados distalmente en 3 alas`
  * `Bocas secundarias microscópicas o suctorias en los brazos orales` (boca original primaria ocluida)
  * `Apéndices o filamentos subcilíndricos entre los brazos orales`
  * `Disposición en cruz de los pilares orales`
  * `Margen umbrelar festoneado SIN tentáculos marginales`
  * `Ropalios marginales (8)`
  * `Red anastomótica de canales radiales`
* **distractors**:
  * `Tentáculos marginales`: *"Las medusas del orden Rhizostomeae carecen totalmente de tentáculos en el borde de la umbrela."*
  * `Boca central abierta simple`: *"En Rhizostomeae la boca embrionaria se ocluye y se sustituye por miles de bocas secundarias."*
  * `Velo craspedoto`: *"Scyphozoa es acraspedota."*
  * `Pedalios`: *"Exclusivo de Cubozoa."*
* **formol_recognition_notes**: *"Campana hemisférica gruesa y carnosa, blanquecina o amarronada con borde azulado o marrón en vivo. En formol es inconfundible por la ausencia total de tentáculos marginales y la presencia de 8 brazos orales masivos y carnosos ramificados con crestas que forman un patrón en cruz."*

---

### [ID: `tamoya_haplonema`]
* **scientific_name**: *Tamoya haplonema*
* **common_name**: Avispa de mar atlántica / Cubomedusa solitaria
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Medusozoa**
  * Class: **Cubozoa**
  * Order: **Carybdeida**
  * Family: **Tamoyidae**
  * Genus: **Tamoya**
  * Species: ***Tamoya haplonema***
* **accepted_taxa_inputs**: `["Cnidaria", "Medusozoa", "Cubozoa", "Carybdeida", "Tamoyidae", "Tamoya", "Tamoya haplonema", "Tamoya sp"]`
* **true_organs**:
  * `Campana cúbica / prismática alta y cuadrangular`
  * `Pedalios simples (4) en las esquinas de la campana con quilla exterior`
  * `Tentáculo único robusto y aplanado por cada pedalio (4 tentáculos en total)`
  * `Velario marginal con canales velariales` (repliegue interno sostenido por frenios)
  * `Frenios perradiales (4)` (frenillos de anclaje del velario)
  * `Ropalios en nichos perradiales cerrados con ojos complejos provistos de lente y retina`
  * `Fascelas / Filamentos gástricos en las 4 esquinas del estómago`
  * `Gónadas acintadas pareadas en los septos gástricos`
* **distractors**:
  * `Velo craspedoto`: *"Cubozoa posee velario (desarrollado con endodermo y canales), no un velo verdadero de Hydrozoa."*
  * `Brazos orales festoneados`: *"Propio de Scyphozoa Semaeostomeae; las cubomedusas tienen un manubrio simple cuadrangular."*
  * `Pedalios ramificados`: *"Tamoya tiene pedalios simples con 1 solo tentáculo; los pedalios ramificados con múltiples tentáculos son de Chirodropida."*
  * `Hidroteca`: *"Propio de hidroides tecados."*
* **formol_recognition_notes**: *"Umbrela prismática alta y transparente, rígida y cuadrangular en corte transversal (hasta 10-15 cm de alto). En cada esquina basal destaca un pedalio ensanchado en pala con una quilla exterior muy visible y un tentáculo grueso. El velario doblado hacia el interior y los ropalios en pequeños nichos son diagnósticos."*

---

### [ID: `actinia_sp`]
* **scientific_name**: *Actinia sp.*
* **common_name**: Anémona de mar / Tomate de mar
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Actiniaria**
  * Family: **Actiniidae**
  * Genus: **Actinia**
  * Species: ***Actinia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Actiniaria", "Actiniidae", "Actinia", "Actinia sp"]`
* **true_organs**:
  * `Disco pedal / Suela basal adhesiva` (plano de fijación al sustrato rocoso)
  * `Columna lisa carnosa y retráctil`
  * `Disco oral plano con hendidura bucal central`
  * `Tentáculos marginales cónicos huecos lisos (en múltiplos de 6)`
  * `Fosa y collarín marginal`
  * `Esferas marginales / Acrorragios con nematocistos atrichos` (botones marginales de defensa intercolonial)
  * `Faringe invaginada / Estomodelo con sifonoglifos (1 o 2)`
  * `Septos o mesenterios gástricos pares (múltiplos de 6)`
  * `Acontios / Filamentos acontiales con nematocistos`
* **distractors**:
  * `Coralito calcáreo de CaCO3`: *"Actinia es una anémona desnuda (Actiniaria) sin exoesqueleto de carbonato de calcio."*
  * `Tentáculos pinnados / plumosos`: *"Los tentáculos pinnados son exclusivos de Octocorallia; Hexacorallia tiene tentáculos lisos."*
  * `Velo o Velario`: *"Anthozoa carece por completo de fase medusa y de estructuras de campana."*
  * `Pneumatóforo`: *"Exclusivo de Siphonophorae."*
* **formol_recognition_notes**: *"Cuerpo cilíndrico carnoso contraído en forma de botón o tomate semiesférico. En formol el disco pedal plano inferior se evidencia liso y arrugado; los tentáculos suelen estar total o parcialmente invaginados hacia la faringe por contracción muscular del esfínter."*

---

### [ID: `pseudodiploria_strigosa`]
* **scientific_name**: *Pseudodiploria strigosa*
* **common_name**: Coral cerebro
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Scleractinia**
  * Family: **Mussidae**
  * Genus: **Pseudodiploria**
  * Species: ***Pseudodiploria strigosa***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Scleractinia", "Mussidae", "Pseudodiploria", "Pseudodiploria strigosa"]`
* **true_organs**:
  * `Corallum meandroide hemisférico macizo de carbonato de calcio (CaCO3)`
  * `Valles seriados continuos sinuosos` (albergan hileras de bocas de pólipos fusionados)
  * `Colinas / Crestas de separación o tecas tectiformes continuas`
  * `Septos y septocostas continuos y regulares`
  * `Columela trabecular esponjosa continua en el fondo del valle`
* **distractors**:
  * `Eje axial de gorgonina`: *"Gorgonina es la proteína córnea de las gorgonias (Octocorallia); Scleractinia secreta aragonita/CaCO3 mineral macizo."*
  * `Coralitos cerioides o plocoides aislados`: *"En Pseudodiploria las paredes entre pólipos se reabsorbieron formando valles meandroides sin cálices cerrados individuales."*
  * `Tentáculos pinnados con pínnulas`: *"Hexacorallia posee tentáculos lisos y 6 septos principales."*
* **formol_recognition_notes**: *"Esqueleto pétreo pesado y duro, blanquecino en seco o grisáceo en formol, con surcos y convoluciones meándricas idénticas a la superficie de un cerebro humano. No hay coralitos aislados sino valles y colinas continuas."*

---

### [ID: `mussismilia_sp`]
* **scientific_name**: *Mussismilia sp.*
* **common_name**: Coral plocoide macizo brasileño
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Scleractinia**
  * Family: **Mussidae**
  * Genus: **Mussismilia**
  * Species: ***Mussismilia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Scleractinia", "Mussidae", "Mussismilia", "Mussismilia sp"]`
* **true_organs**:
  * `Corallum plocoide o subcerioide masivo`
  * `Coralitos redondeados a elípticos de gran calibre (generalmente >10–15 mm de diámetro)`
  * `Septos radiales calcáreos gruesos con dientes o espinas marginales conspicuas`
  * `Columela central trabecular papilosa bien desarrollada`
  * `Costas marcadas en el peritecal`
* **distractors**:
  * `Valles meandroides continuos`: *"Patrón meandroide propio de Pseudodiploria; Mussismilia presenta cálices individualizados."*
  * `Espículas calcáreas libres`: *"Propio de octocorales blandos; los escleractinios forman un esqueleto macizo continuo."*
  * `Disco pedal`: *"Estructura exclusiva de anémonas desnudas solitarias."*
* **formol_recognition_notes**: *"Esqueleto colonial rocoso muy pesado con cálices circulares independientes prominentes y de paredes gruesas. Los septos presentan dientes agudos muy ásperos al tacto y la columela esponjosa central es nítida."*

---

### [ID: `favia_sp`]
* **scientific_name**: *Favia sp.*
* **common_name**: Coral estrellado / Coral panal
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Scleractinia**
  * Family: **Faviidae**
  * Genus: **Favia**
  * Species: ***Favia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Scleractinia", "Faviidae", "Favia", "Favia sp"]`
* **true_organs**:
  * `Corallum hemisférico plocoide`
  * `Coralitos redondeados a poligonales de tamaño mediano (5 a 10 mm)`
  * `Paredes tecales separadas por surcos intercorálites (gemación intratentacular)`
  * `Septos ordenados y denticulados`
  * `Columela esponjosa`
* **distractors**:
  * `Ramas digitiformes con verrugas`: *"Propio de Pocillopora."*
  * `Valles meandroides fusionados`: *"Propio de corales cerebro (Pseudodiploria)."*
  * `Eje de gorgonina`: *"Propio de Octocorallia (Gorgonia)."*
* **formol_recognition_notes**: *"Esqueleto calcáreo globular o redondeado con apariencia de panal de abejas o estrellas apretadas. Cada cáliz está bien definido y separado de los vecinos por una doble pared tecal visible en lupa."*

---

### [ID: `pocillopora_tuahiniensis`]
* **scientific_name**: *Pocillopora tuahiniensis*
* **common_name**: Coral coliflor / Coral verrugoso
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Scleractinia**
  * Family: **Pocilloporidae**
  * Genus: **Pocillopora**
  * Species: ***Pocillopora tuahiniensis***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Scleractinia", "Pocilloporidae", "Pocillopora", "Pocillopora tuahiniensis", "Pocillopora sp"]`
* **true_organs**:
  * `Corallum ramificado / subarborescente cespitoso`
  * `Verrucae / Verrugas superficiales prominentes` (protuberancias esqueléticas sobre las ramas que alojan los coralitos)
  * `Coralitos inmersos de pequeño diámetro (<1 mm)`
  * `Columela estiliforme pequeña o reducida`
  * `Septos reducidos o rudimentarios`
* **distractors**:
  * `Ramas lisas cilíndricas sin verrugas`: *"Las ramas lisas con coralitos diminutos sin verrugas son propias de Porites."*
  * `Valles meandroides`: *"Propio de corales cerebro."*
  * `Grandes cálices plocoides (>1 cm)`: *"Propio de Mussismilia."*
* **formol_recognition_notes**: *"Colonia ramificada compacta en forma de racimo o coliflor. Su carácter diagnóstico clave es la presencia de verrugas calcáreas redondeadas erizadas por toda la superficie de las ramas, dentro de las cuales se abren los coralitos microscópicos."*

---

### [ID: `porites_furcata`]
* **scientific_name**: *Porites furcata*
* **common_name**: Coral dedo fino
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Hexacorallia**
  * Order: **Scleractinia**
  * Family: **Poritidae**
  * Genus: **Porites**
  * Species: ***Porites furcata***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Hexacorallia", "Scleractinia", "Poritidae", "Porites", "Porites furcata", "Porites sp"]`
* **true_organs**:
  * `Corallum ramificado digitiforme con puntas bifurcadas obtusas`
  * `Ramas de superficie lisa y cilíndrica (sin verrugas)`
  * `Coralitos cerioides muy pequeños (<1.5 mm) muy apretados y superficiales`
  * `Muro o teca porosa / poritosa`
  * `Septos con pali y columela pequeña`
* **distractors**:
  * `Verrucae esqueléticas`: *"Diagnóstico de Pocillopora; Porites tiene ramas cilíndricas lisas sin verrugas."*
  * `Valles continuos meandroides`: *"Propio de Pseudodiploria."*
  * `Pólipos con 8 tentáculos pinnados`: *"Propio de Octocorallia; Porites es un hexacoral escleractinio."*
* **formol_recognition_notes**: *"Ramas cilíndricas digitiformes (en forma de dedos) con extremos redondeados o bifurcados. La superficie es completamente lisa al tacto y está cubierta por una miríada de orificios diminutos apretados y poco profundos semejantes a poros."*

---

### [ID: `cerianthus_sp`]
* **scientific_name**: *Cerianthus sp.*
* **common_name**: Ceriantario / Anémona tubular
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Ceriantharia**
  * Order: **Ceriantharia** (Spirularia / Penicillaria)
  * Family: **Cerianthidae**
  * Genus: **Cerianthus**
  * Species: ***Cerianthus sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Ceriantharia", "Cerianthidae", "Cerianthus", "Cerianthus sp"]`
* **true_organs**:
  * `Tubo protector mucoso de pticocistos entrelazados con arena y fango`
  * `Cuerpo vermiforme alargado y cilíndrico`
  * `Extremo aboral redondeado con poro terminal (SIN disco pedal adhesivo)`
  * `Doble corona concéntrica de tentáculos simples`:
    * `Tentáculos marginales largos exteriores`
    * `Tentáculos labiales / orales cortos interiores rodeando la boca`
  * `Faringe invaginada con un único sifonoglifo dorsal (sulco)`
  * `Septos completos y acónsitos`
* **distractors**:
  * `Disco pedal adhesivo plano`: *"Los ceriantarios carecen de disco pedal; su base es un bulbo redondeado con poro que se entierra en el fango dentro de su tubo."*
  * `Esqueleto calcáreo de CaCO3`: *"Los ceriantarios son formas exclusivamente blandas sin carbonato de calcio."*
  * `Tentáculos plumosos pinnados`: *"Propio de Octocorallia."*
  * `Velario`: *"Propio de Cubozoa."*
* **formol_recognition_notes**: *"Cuerpo alargado y flácido en forma de gusano o tubo carnoso, a menudo extraído de su grueso estuche cilíndrico grisáceo de consistencia afelpada/limosa. La ausencia de suela basal plana y la nítida separación entre los tentáculos exteriores muy largos y los cortos orales erguidos en el centro son diagnósticos."*

---

### [ID: `gorgonia_sp`]
* **scientific_name**: *Gorgonia sp.*
* **common_name**: Abanico de mar / Coral blando octocoral
* **taxonomy**:
  * Phylum: **Cnidaria**
  * Subphylum: **Anthozoa**
  * Class: **Anthozoa**
  * Subclass: **Octocorallia** (Alcyonaria)
  * Order: **Alcyonacea** (Gorgonacea)
  * Family: **Gorgoniidae**
  * Genus: **Gorgonia**
  * Species: ***Gorgonia sp.***
* **accepted_taxa_inputs**: `["Cnidaria", "Anthozoa", "Octocorallia", "Alcyonaria", "Alcyonacea", "Gorgonacea", "Gorgoniidae", "Gorgonia", "Gorgonia sp"]`
* **true_organs**:
  * `Colonia flabeliforme anastomosada en abanico plano`
  * `Eje axial córneo flexible compuesto de gorgonina escleroproteica`
  * `Cenosarco / Cenénquima cortical engrosado alrededor del eje`
  * `Escleritos / Espículas calcáreas microscópicas libres incrustadas en el cenénquima`
  * `Pólipos / Autozoides con 8 tentáculos pinnados con pínnulas laterales`
  * `Cavidad gástrica con 8 septos mesentéricos completos`
  * `Solenia / Red de canales endodérmicos que interconectan los pólipos`
* **distractors**:
  * `Esqueleto macizo continuo de aragonita / CaCO3`: *"Las gorgonias tienen un eje flexible de proteína córnea (gorgonina) y espículas libres, nunca un esqueleto calcáreo pétreo continuo como Scleractinia."*
  * `Tentáculos lisos no ramificados`: *"Octocorallia se define por tener 8 tentáculos ramificados/pinnados con flecos."*
  * `Velo marginal`: *"Ausente en toda la clase Anthozoa."*
* **formol_recognition_notes**: *"Estructura aplanada arborescente en forma de redecilla o abanico de tonalidad ocre, violácea o amarillenta. Al flexionarla es elástica debido a su eje proteico interno de gorgonina. Con lupa se observan las diminutas aperturas de los pólipos con 8 tentáculos y las espículas calcáreas granulares incrustadas en la corteza."*

---

## 3. Formato JSON Embebido para Inicialización de la Aplicación

```json
{
  "version": "1.0-bom",
  "total_species": 18,
  "specimens": [
    {
      "id": "obelia_sp",
      "name": "Obelia sp.",
      "common_name": "Hidroide colonial tecado",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Leptothecata",
        "family": "Campanulariidae",
        "genus": "Obelia",
        "species": "Obelia sp."
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "leptothecata", "leptomedusae", "campanulariidae", "obelia", "obelia sp"],
      "organs": ["Hidroteca", "Pedicelo anillado", "Gastrozoide / Hidrante", "Hipostoma", "Gonoteca", "Gonozoide / Gonangio", "Perisarco", "Cenosarco", "Velo", "Canales radiales"],
      "distractors": [
        {"name": "Velario", "reason": "El velario es exclusivo de Cubozoa; Hydrozoa posee velo."},
        {"name": "Brazos orales festoneados", "reason": "Estructura exclusiva de escifomedusas."},
        {"name": "Pneumatóforo", "reason": "Flotador vesicular de gas exclusivo de sifonóforos."},
        {"name": "Ropalio", "reason": "Órgano sensorial de Scyphozoa y Cubozoa."},
        {"name": "Septos gástricos", "reason": "Exclusivos de Anthozoa y Scyphozoa."}
      ],
      "formol_notes": "Colonia plumosa ramificada pajiza. Hidrotecas en copa abierta sobre pedicelos anillados."
    },
    {
      "id": "amphisbetia_operculata",
      "name": "Amphisbetia operculata",
      "common_name": "Capilaria / Hidroide sertulárido",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Leptothecata",
        "family": "Sertulariidae",
        "genus": "Amphisbetia",
        "species": "Amphisbetia operculata"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "leptothecata", "leptomedusae", "sertulariidae", "amphisbetia", "amphisbetia operculata"],
      "organs": ["Hidrotecas biseriadas opuestas", "Dientes marginales tecales", "Opérculo tecal", "Gonoteca ovada con opérculo", "Perisarco", "Cenosarco", "Gastrozoides retráctiles"],
      "distractors": [
        {"name": "Pedicelo anillado", "reason": "Típico de Campanulariidae; en Amphisbetia las hidrotecas son sésiles y adosadas."},
        {"name": "Pedalio", "reason": "Base carnosa de tentáculo exclusiva de Cubozoa."},
        {"name": "Condróforo", "reason": "Flotador quitinoso de Velella y Porpita."},
        {"name": "Sifonoglifo", "reason": "Canal ciliado faríngeo propio de Anthozoa."}
      ],
      "formol_notes": "Mechones arborescentes densos de aspecto capilar marrón. Hidrotecas en pares opuestos soldadas con opérculo."
    },
    {
      "id": "tubularia_sp",
      "name": "Tubularia sp.",
      "common_name": "Hidroide atecado / Hidroide de penacho",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Anthoathecata",
        "family": "Tubulariidae",
        "genus": "Tubularia",
        "species": "Tubularia sp."
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "anthoathecata", "anthomedusae", "tubulariidae", "tubularia", "tubularia sp"],
      "organs": ["Hidrante atecado desnudo", "Tentáculos aborales filiformes", "Tentáculos orales cortos", "Gonóforos racemosos", "Larva actínula", "Tallo perisárquico liso"],
      "distractors": [
        {"name": "Hidroteca", "reason": "Tubularia es atecado; carece de copa protectora perisárquica."},
        {"name": "Gonoteca", "reason": "Los gonóforos cuelgan en racimos desnudos sin cápsula de gonoteca."},
        {"name": "Ropalio", "reason": "Órgano sensorial de Scyphozoa/Cubozoa."},
        {"name": "Brazos orales con bocas secundarias", "reason": "Propio de Scyphozoa Rhizostomeae."}
      ],
      "formol_notes": "Tallo cilíndrico coronado por gran hidrante carnoso blanquecino con dos verticilos de tentáculos (largos basales y cortos orales)."
    },
    {
      "id": "physalia_physalis",
      "name": "Physalia physalis",
      "common_name": "Carabela portuguesa",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Siphonophorae",
        "family": "Physaliidae",
        "genus": "Physalia",
        "species": "Physalia physalis"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "siphonophorae", "cystonectae", "physaliidae", "physalia", "physalia physalis"],
      "organs": ["Pneumatóforo asimétrico", "Cresta o vela del flotador", "Dactilozoides", "Baterías de nematocistos", "Gastrozoides con boca terminal", "Gonozoides / Gonodentros", "Ampolla basal del tentáculo"],
      "distractors": [
        {"name": "Nectóforos / Campanas natatorias", "reason": "Physalia pertenece a Cystonectae y carece de nectóforos natatorios."},
        {"name": "Brácteas protectoras", "reason": "Ausentes en el suborden Cystonectae."},
        {"name": "Velario", "reason": "Propio de Cubomedusas."},
        {"name": "Condróforo quitinoso", "reason": "Exclusivo de Porpitidae (Velella y Porpita)."}
      ],
      "formol_notes": "Flotador sacciforme neumático azul violáceo que vira a grisáceo. Debajo pende masa densa de zooides y tentáculos fuertemente replegados."
    },
    {
      "id": "velella_velella",
      "name": "Velella velella",
      "common_name": "Barquito de San Pedro / Vela de mar",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Anthoathecata",
        "family": "Porpitidae",
        "genus": "Velella",
        "species": "Velella velella"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "anthoathecata", "porpitidae", "chondrophora", "velella", "velella velella"],
      "organs": ["Condróforo elíptico con cámaras quitinosas concéntricas", "Vela triangular oblicua rígida", "Gastrozoide central único", "Gonozoides intermedios", "Tentaculozoides marginales", "Manto periférico"],
      "distractors": [
        {"name": "Pneumatóforo carnoso", "reason": "Velella tiene un disco rígido interno con cámaras concéntricas (condróforo), no una vejiga membranosa inflable."},
        {"name": "Velo craspedoto", "reason": "El velo es una estructura de hidromedusas libres; la vela de Velella es un esqueleto quitinoso dorsal."},
        {"name": "Nectóforos", "reason": "Los porpítidos no poseen campanas natatorias activas."},
        {"name": "Disco pedal", "reason": "Estructura de anémonas bentónicas."}
      ],
      "formol_notes": "Flotador ovalado aplanado con estrías concéntricas apergaminadas y una vela dorsal transparente diagonal. Color blanco traslúcido en formol."
    },
    {
      "id": "porpita_porpita",
      "name": "Porpita porpita",
      "common_name": "Botón azul",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Anthoathecata",
        "family": "Porpitidae",
        "genus": "Porpita",
        "species": "Porpita porpita"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "anthoathecata", "porpitidae", "chondrophora", "porpita", "porpita porpita"],
      "organs": ["Condróforo discoidal circular", "Gastrozoide central único", "Gonozoides reproductores", "Tentaculozoides capitados periféricos"],
      "distractors": [
        {"name": "Vela triangular oblicua", "reason": "Exclusiva de Velella velella; Porpita es un disco circular totalmente plano sin vela."},
        {"name": "Pneumatóforo asimétrico", "reason": "Propio de Physalia."},
        {"name": "Brazos orales", "reason": "Estructura de Scyphozoa."},
        {"name": "Canales radiales", "reason": "Propio de medusas individuales con cavidad gastrovascular umbrelar."}
      ],
      "formol_notes": "Disco circular plano perfecto con estrías concéntricas. Tentaculozoides marginales con ramas capitadas."
    },
    {
      "id": "nanomia_bijuga",
      "name": "Nanomia bijuga",
      "common_name": "Sifonóforo fisonéctido",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Hydroidolina",
        "order": "Siphonophorae",
        "family": "Agalmatidae",
        "genus": "Nanomia",
        "species": "Nanomia bijuga"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "hydroidolina", "siphonophorae", "physonectae", "agalmatidae", "nanomia", "nanomia bijuga", "nanomia sp"],
      "organs": ["Pneumatóforo apical con poro", "Nectosoma locomotor", "Nectóforos biseriados", "Sifosoma", "Cormidios", "Brácteas protectoras", "Gastrozoides", "Tentilillos espiralados", "Palpones"],
      "distractors": [
        {"name": "Condróforo concéntrico", "reason": "Propio de Porpitidae (Velella, Porpita)."},
        {"name": "Brazos orales festoneados", "reason": "Propio de Scyphozoa."},
        {"name": "Pedalio", "reason": "Estructura basal de tentáculos de Cubozoa."},
        {"name": "Ropalio", "reason": "Órgano sensorial de Scyphozoa y Cubozoa."}
      ],
      "formol_notes": "Eje central filamentoso con nectóforos acoplados proximales y cormidios con brácteas prismáticas distales."
    },
    {
      "id": "liriope_tetraphylla",
      "name": "Liriope tetraphylla",
      "common_name": "Hidromedusa de pedúnculo largo",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Trachylina",
        "order": "Limnomedusae",
        "family": "Geryoniidae",
        "genus": "Liriope",
        "species": "Liriope tetraphylla"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "trachylina", "limnomedusae", "geryoniidae", "liriope", "liriope tetraphylla"],
      "organs": ["Velo craspedoto", "Pedúnculo gástrico largo", "Manubrio terminal con 4 labios", "Canales radiales (4)", "Gónadas foliáceas acintadas (4)", "Tentáculos perradiales largos", "Tentáculos interradiales cortos", "Estatocistos cerrados"],
      "distractors": [
        {"name": "Velario", "reason": "Cubozoa posee velario con canales; Hydrozoa posee velo craspedoto."},
        {"name": "Ropalios", "reason": "Liriope tiene estatocistos simples, no ropalios con ocelos complejos."},
        {"name": "Gónadas en herradura", "reason": "Característica de Aurelia aurita (Scyphozoa)."},
        {"name": "Hidroteca", "reason": "Liriope es una medusa de ciclo hipogenético sin fase de pólipo tecado."}
      ],
      "formol_notes": "Campana hemisférica cristalina de 1 a 2 cm. Pedúnculo gástrico muy largo que sobrepasa el velo y 4 gónadas en forma de corazón en los canales radiales."
    },
    {
      "id": "olindias_sambaquiensis",
      "name": "Olindias sambaquiensis",
      "common_name": "Medusa de la cruz / Hidromedusa de verano",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Trachylina",
        "order": "Limnomedusae",
        "family": "Olindiidae",
        "genus": "Olindias",
        "species": "Olindias sambaquiensis"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "trachylina", "limnomedusae", "olindiidae", "olindias", "olindias sambaquiensis"],
      "organs": ["Velo craspedoto", "Canales radiales (4) con gónadas plegadas", "Canales centrípetos ciegos", "Tentáculos primarios con discos adhesivos", "Tentáculos secundarios anillados", "Manubrio cuadrangular festoneado", "Estatocistos pareados"],
      "distractors": [
        {"name": "Lappets marginales", "reason": "Escotaduras marginales exclusivas de Scyphozoa."},
        {"name": "Brazos orales esponjosos", "reason": "Propio de Scyphozoa Rhizostomeae."},
        {"name": "Pedalios", "reason": "Bases alares musculares exclusivas de Cubozoa."},
        {"name": "Pneumatóforo", "reason": "Propio de Siphonophorae."}
      ],
      "formol_notes": "Medusa rígida hemisférica (5 a 10 cm). Se distinguen 4 gónadas fuertemente corrugadas en cinta plegada y canales centrípetos que suben desde el margen."
    },
    {
      "id": "cunina_octonaria",
      "name": "Cunina octonaria",
      "common_name": "Narcomedusa",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Hydrozoa",
        "subclass": "Trachylina",
        "order": "Narcomedusae",
        "family": "Cuninidae",
        "genus": "Cunina",
        "species": "Cunina octonaria"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "hydrozoa", "trachylina", "narcomedusae", "cuninidae", "cunina", "cunina octonaria"],
      "organs": ["Margen umbrelar lobulado en festones", "Tentáculos exumbrelares rígidos (8)", "Peronios ectodérmicos", "Bolsas gástricas radiales (8)", "Otoporpas", "Velo membranoso reducido"],
      "distractors": [
        {"name": "Canales radiales finos", "reason": "Narcomedusae carece de canales radiales estrechos; tiene bolsas gástricas anchas directas."},
        {"name": "Pedúnculo gástrico largo", "reason": "Propio de Liriope tetraphylla."},
        {"name": "Brazos orales fusionados", "reason": "Propio de Rhizostomeae."}
      ],
      "formol_notes": "Medusa diminuta (2 a 5 mm) aplanada. Diagnóstico: 8 tentáculos rígidos insertados en la cara exumbrelar (por encima del margen) unidos por surcos peroniales."
    },
    {
      "id": "aurelia_aurita",
      "name": "Aurelia aurita",
      "common_name": "Medusa de la luna / Medusa común",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Scyphozoa",
        "subclass": "Discomedusae",
        "order": "Semaeostomeae",
        "family": "Ulmaridae",
        "genus": "Aurelia",
        "species": "Aurelia aurita"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "scyphozoa", "discomedusae", "semaeostomeae", "ulmaridae", "aurelia", "aurelia aurita", "aurelia sp"],
      "organs": ["Gónadas gástricas en herradura (4)", "Brazos orales festoneados y acanalados (4)", "Tentáculos marginales cortos filiformes", "Ropalios (8)", "Lappets marginales", "Canales radiales ramificados", "Canal circular", "Filamentos gástricos"],
      "distractors": [
        {"name": "Velo craspedoto", "reason": "Scyphozoa es acraspedota (carece de velo muscular)."},
        {"name": "Velario", "reason": "Estructura exclusiva de Cubozoa."},
        {"name": "Pedalio", "reason": "Base carnosa ensanchada propia de Cubozoa."},
        {"name": "Boca ocluida por fusión", "reason": "Propio de Rhizostomeae; Aurelia tiene boca central abierta con 4 brazos libres."}
      ],
      "formol_notes": "Campana aplanada blanquecina (15 a 25 cm) con 4 gónadas circulares/herradura conspicuas en el centro y 4 brazos orales semejantes a cintas con pliegues."
    },
    {
      "id": "chrysaora_lactea",
      "name": "Chrysaora lactea",
      "common_name": "Medusa de compás / Medusa lechosa",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Scyphozoa",
        "subclass": "Discomedusae",
        "order": "Semaeostomeae",
        "family": "Pelagiidae",
        "genus": "Chrysaora",
        "species": "Chrysaora lactea"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "scyphozoa", "discomedusae", "semaeostomeae", "pelagiidae", "chrysaora", "chrysaora lactea"],
      "organs": ["Tentáculos marginales (24: 3 por octante)", "Ropalios marginales (8)", "Lappets marginales (32)", "Brazos orales largos festoneados (4)", "Bolsas gástricas radiales (16)", "Manchas o bandas pigmentarias radiales exumbrelares", "Filamentos gástricos"],
      "distractors": [
        {"name": "Velo craspedoto", "reason": "Scyphozoa carece de velo."},
        {"name": "Canales centrípetos", "reason": "Estructura de Limnomedusae (Olindias)."},
        {"name": "Pedalio", "reason": "Propio de Cubozoa."},
        {"name": "Sifonoglifo", "reason": "Exclusivo de faringe de Anthozoa."}
      ],
      "formol_notes": "Campana hemisférica (10 a 15 cm) con bandas triangulares pigmentarias radiales, 24 tentáculos marginales largos y 4 brazos orales muy extensos y espiralados."
    },
    {
      "id": "lychnorhiza_lucerna",
      "name": "Lychnorhiza lucerna",
      "common_name": "Medusa de la cruz / Aguaviva manchada",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Scyphozoa",
        "subclass": "Discomedusae",
        "order": "Rhizostomeae",
        "family": "Lychnorhizidae",
        "genus": "Lychnorhiza",
        "species": "Lychnorhiza lucerna"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "scyphozoa", "discomedusae", "rhizostomeae", "lychnorhizidae", "lychnorhiza", "lychnorhiza lucerna"],
      "organs": ["Brazos orales (8) fusionados ramificados en 3 alas", "Bocas secundarias suctorias", "Apéndices subcilíndricos entre brazos", "Pilares orales en cruz", "Margen festoneado SIN tentáculos marginales", "Ropalios marginales (8)", "Red anastomótica de canales"],
      "distractors": [
        {"name": "Tentáculos marginales", "reason": "Rhizostomeae carece completamente de tentáculos en el borde de la campana."},
        {"name": "Boca central abierta simple", "reason": "La boca original se ocluye y se sustituye por bocas secundarias microscópicas."},
        {"name": "Velo", "reason": "Scyphozoa es acraspedota."},
        {"name": "Pedalio", "reason": "Exclusivo de Cubozoa."}
      ],
      "formol_notes": "Campana gruesa hemisférica sin tentáculos marginales; 8 brazos orales masivos esponjosos con disposición en cruz. Frecuente asociación con Libinia spinosa."
    },
    {
      "id": "tamoya_haplonema",
      "name": "Tamoya haplonema",
      "common_name": "Avispa de mar atlántica / Cubomedusa",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Medusozoa",
        "class": "Cubozoa",
        "order": "Carybdeida",
        "family": "Tamoyidae",
        "genus": "Tamoya",
        "species": "Tamoya haplonema"
      },
      "valid_taxa": ["cnidaria", "medusozoa", "cubozoa", "carybdeida", "tamoyidae", "tamoya", "tamoya haplonema", "tamoya sp"],
      "organs": ["Campana cúbica prismática alta", "Pedalios simples (4) con quilla exterior", "Tentáculo único grueso por pedalio (4)", "Velario con canales velariales", "Frenios perradiales (4)", "Ropalios en nichos con ojos complejos", "Fascelas gástricas", "Gónadas acintadas"],
      "distractors": [
        {"name": "Velo craspedoto", "reason": "Cubozoa tiene velario (con canales endodérmicos), no velo de Hydrozoa."},
        {"name": "Brazos orales festoneados", "reason": "Propio de Scyphozoa Semaeostomeae; Cubozoa tiene manubrio simple."},
        {"name": "Pedalios ramificados", "reason": "Tamoya tiene pedalios simples con 1 tentáculo; los ramificados son de Chirodropida."},
        {"name": "Hidroteca", "reason": "Propio de hidroides tecados."}
      ],
      "formol_notes": "Umbrela prismática alta y cuadrangular (hasta 12-15 cm). 4 pedalios en pala con quilla y 1 tentáculo por pedalio; velario doblado hacia adentro."
    },
    {
      "id": "actinia_sp",
      "name": "Actinia sp.",
      "common_name": "Anémona de mar / Tomate de mar",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Anthozoa",
        "class": "Anthozoa",
        "subclass": "Hexacorallia",
        "order": "Actiniaria",
        "family": "Actiniidae",
        "genus": "Actinia",
        "species": "Actinia sp."
      },
      "valid_taxa": ["cnidaria", "anthozoa", "hexacorallia", "actiniaria", "actiniidae", "actinia", "actinia sp"],
      "organs": ["Disco pedal plano adhesivo", "Columna lisa retráctil", "Disco oral con hendidura bucal", "Tentáculos cónicos simples lisos (múltiplos de 6)", "Fosa y collarín", "Acrorragios con nematocistos atrichos", "Faringe estomodelo con sifonoglifos", "Septos mesenterios pares (múltiplos de 6)", "Acontios"],
      "distractors": [
        {"name": "Coralito calcáreo de CaCO3", "reason": "Actinia es una anémona desnuda sin esqueleto mineral."},
        {"name": "Tentáculos pinnados / plumosos", "reason": "Exclusivos de Octocorallia; Hexacorallia tiene tentáculos lisos no ramificados."},
        {"name": "Velario o Velo", "reason": "Anthozoa carece por completo de fase medusa."},
        {"name": "Pneumatóforo", "reason": "Exclusivo de Siphonophorae."}
      ],
      "formol_notes": "Cuerpo cilíndrico carnoso contraído en botón semiesférico. Disco pedal basal liso visible; tentáculos replegados hacia la faringe por el esfínter."
    },
    {
      "id": "pseudodiploria_strigosa",
      "name": "Pseudodiploria strigosa",
      "common_name": "Coral cerebro",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Anthozoa",
        "class": "Anthozoa",
        "subclass": "Hexacorallia",
        "order": "Scleractinia",
        "family": "Mussidae",
        "genus": "Pseudodiploria",
        "species": "Pseudodiploria strigosa"
      },
      "valid_taxa": ["cnidaria", "anthozoa", "hexacorallia", "scleractinia", "mussidae", "pseudodiploria", "pseudodiploria strigosa"],
      "organs": ["Corallum meandroide macizo de CaCO3", "Valles seriados continuos sinuosos", "Colinas / Crestas tecales continuas", "Septos y septocostas continuos", "Columela trabecular esponjosa continua"],
      "distractors": [
        {"name": "Eje axial de gorgonina", "reason": "Gorgonina es la proteína córnea de Octocorallia; Scleractinia secreta CaCO3 macizo."},
        {"name": "Coralitos cerioides aislados", "reason": "En Pseudodiploria las paredes se fusionaron formando valles continuos meandroides."},
        {"name": "Tentáculos pinnados", "reason": "Hexacorallia posee tentáculos lisos simples."}
      ],
      "formol_notes": "Esqueleto pétreo muy duro con valles y crestas sinuosas continuas idénticas a los surcos de un cerebro."
    },
    {
      "id": "pocillopora_tuahiniensis",
      "name": "Pocillopora tuahiniensis",
      "common_name": "Coral coliflor / Coral verrugoso",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Anthozoa",
        "class": "Anthozoa",
        "subclass": "Hexacorallia",
        "order": "Scleractinia",
        "family": "Pocilloporidae",
        "genus": "Pocillopora",
        "species": "Pocillopora tuahiniensis"
      },
      "valid_taxa": ["cnidaria", "anthozoa", "hexacorallia", "scleractinia", "pocilloporidae", "pocillopora", "pocillopora tuahiniensis", "pocillopora sp"],
      "organs": ["Corallum ramificado cespitoso de CaCO3", "Verrucae superficiales prominentes", "Coralitos diminutos inmersos (<1 mm)", "Columela estiliforme reducida", "Septos reducidos"],
      "distractors": [
        {"name": "Ramas cilíndricas lisas sin verrugas", "reason": "Diagnóstico de Porites; Pocillopora se caracteriza por sus verrugas."},
        {"name": "Valles meandroides", "reason": "Propio de corales cerebro."},
        {"name": "Cálices plocoides mayores a 1 cm", "reason": "Propio de Mussismilia."}
      ],
      "formol_notes": "Colonia pétrea arborescente compacta erizada por verrugas calcáreas conspicuas que alojan los coralitos diminutos."
    },
    {
      "id": "gorgonia_sp",
      "name": "Gorgonia sp.",
      "common_name": "Abanico de mar",
      "taxonomy": {
        "phylum": "Cnidaria",
        "subphylum": "Anthozoa",
        "class": "Anthozoa",
        "subclass": "Octocorallia",
        "order": "Alcyonacea",
        "family": "Gorgoniidae",
        "genus": "Gorgonia",
        "species": "Gorgonia sp."
      },
      "valid_taxa": ["cnidaria", "anthozoa", "octocorallia", "alcyonaria", "alcyonacea", "gorgonacea", "gorgoniidae", "gorgonia", "gorgonia sp"],
      "organs": ["Colonia flabeliforme anastomosada en abanico", "Eje axial córneo flexible de gorgonina", "Cenénquima cortical engrosado", "Escleritos / Espículas calcáreas libres", "Pólipos con 8 tentáculos pinnados con pínnulas", "Cavidad gástrica con 8 septos", "Solenia"],
      "distractors": [
        {"name": "Esqueleto macizo de CaCO3", "reason": "Las gorgonias tienen eje flexible de gorgonina y espículas libres, no esqueleto pétreo continuo."},
        {"name": "Tentáculos lisos", "reason": "Octocorallia se define por tener 8 tentáculos pinnados ramificados."},
        {"name": "Velo marginal", "reason": "Ausente en toda la clase Anthozoa."}
      ],
      "formol_notes": "Estructura plana elástica en forma de redecilla o abanico ocre o violácea. Con lupa se observan los pólipos con 8 tentáculos pinnados y espículas calcáreas."
    }
  ]
}
```
