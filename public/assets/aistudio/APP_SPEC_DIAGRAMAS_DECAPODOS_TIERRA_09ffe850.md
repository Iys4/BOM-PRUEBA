# ESPECIFICACIÓN Y DATASET: ROTULACIÓN ANATÓMICA DE DECÁPODOS DE TIERRA (BRACHYURA)

Este documento define la arquitectura funcional, las reglas de interacción y la base de datos de correspondencias anatómicas para la categoría **"Decápodos de Tierra / Cangrejos Braquiuros"** dentro del modo de rotulación de diagramas ciegos de la aplicación didáctica para **Biología de Organismos Marinos (BOM)**.

---

## 1. Concepto Morfológico y Objetivos de Aprendizaje

### 1.1 Diferenciación Biológica con el Decápodo Macruro
A diferencia del diagrama anterior de un decápodo nadador/caminador tipo camarón (Macrura/Caridea) donde el pleón (abdomen) es cilíndrico, extendido y provisto de pleópodos nadadores y un gran abanico caudal (telson + urópodos):
* En los **decápodos de tierra y estuarios (Infraorden Brachyura)** como *Neohelice granulata* (cangrejo del fango/cangrejal), *Leptuca uruguayensis* (cangrejo violinista) o *Cyrtograpsus angulatus*, el cuerpo ha sufrido un proceso extremo de **carcinización**:
  1. **Caparazón ensanchado y aplanado dorsalmente**: Con áreas o regiones dorsales netamente delimitadas por surcos que corresponden a las inserciones musculares e impresiones de los órganos internos (regiones gástrica, cardíaca, hepática y branquial).
  2. **Pleón (Abdomen) flexionado y reducido**: El abdomen ya no se proyecta hacia atrás; se encuentra permanentemente plegado bajo el plastrón de esternitos torácicos, alojándose en la fosa esternal. Pierde completamente los urópodos y carece de abanico caudal.
  3. **Quelípedos hipertrofiados**: Primer par de pereiópodos modificado en pinzas masivas defensivas y tróficas compuestas por artejos robustos (mero, carpo y quela = própodo + dáctilo).
  4. **Terceros maxilipedios operculares (Mxp3)**: Apéndices torácicos modificados que actúan como compuertas que cierran el cuadro bucal ventral.
  5. **Cámaras branquiales protegidas por el branquiostegito**: Pared lateral del caparazón que desciende cubriendo las branquias y adaptada en cangrejos terrestres/semi-terrestres para retener humedad en aire.

---

## 2. Mecánica Interactiva de la Sección ("Rotulado Ciego")

1. **Pantalla de Juego**:
   * Se presenta la lámina con las dos vistas diagnósticas estándar de cátedra: **Vista Dorsal (izquierda)** y **Vista Ventral (derecha)**, rotuladas con números limpios del **1 al 27** procedentes de `Decapodos_De_Tierra_Numeros.jpeg`.
2. **Entrada Predictiva No Lineal**:
   * Barra de texto inferior grande (`18–20px`) mobile-first.
   * El alumno puede tipear cualquier región o artejo en cualquier momento (ej. `"branquiostegito"`, `"carpo"`, `"mero"`, `"abdomen"`).
   * Al escribir 2–3 caracteres, el motor predictivo asiste para sortear dudas de acentuación técnica (`"própodo"` / `"propodo"`, `"esternito"`).
3. **Elevación Visual y Puntuación (+100 pts)**:
   * Al acertar una estructura, la etiqueta se eleva hacia el o los números correspondientes en el diagrama.
   * El número pasa a estado completado con resalte azul institucional (`#2563EB`) o verde de acierto con tilde `✓`.
   * En estructuras repetidas o señaladas en más de un sitio (ej. `dáctilo` en quela y en patas marchadoras, o `mero` en vista dorsal y ventral), el juego reconoce y revela todas las flechas asociadas a ese concepto.
4. **Tolerancia y Pedagogía sin Castigo**:
   * El error no descuenta puntos. Emite una animación suave de vibración (*shake*) con sugerencia contextual (ej. *"Esa estructura no está señalada en esta lámina o ya fue completada"*).

---

## 3. Tabla Maestra de Correspondencias Anatómicas (1 al 27)

Basado en la correlación punto a punto entre la lámina de cátedra **`Decapodo_de_tierra_con_texto.png`** y la lámina ciega **`Decapodos_De_Tierra_Numeros.jpeg`**:

| N.° | Estructura Anatómica | Variantes Aceptadas en el Input | Región / Categoría | Descripción y Clave Diagnóstica de Cátedra |
|:---:|:---|:---|:---|:---|
| **1** | **Vista dorsal** | `vista dorsal`, `dorsal`, `cara dorsal` | Orientación | Vista superior del organismo donde se aprecian el caparazón dorsal, los quelípedos y los 4 pares de patas marchadoras. |
| **2** | **Vista ventral** | `vista ventral`, `ventral`, `cara ventral` | Orientación | Vista inferior del organismo donde se observan el plastrón esternal, el abdomen replegado, los terceros maxilipedios y el branquiostegito. |
| **3** | **Dáctilo (de la quela)** | `dáctilo`, `dactilo`, `dedo móvil`, `dedo dactilar` | Artejo apendicular | Dedo superior móvil articulado de la quela o pinza del quelípedo. La flecha 3 parte de la posición del texto original señalando el dedo dactilar. |
| **4** | **Quela** | `quela`, `pinza`, `queli` | Estructura apendicular | Llave/corchete que abarca el extremo distal prensil del quelípedo, compuesto por el própodo (palma + dedo fijo) y el dáctilo (dedo móvil). |
| **5** | **Dáctilo** | `dáctilo`, `dactilo`, `dedo móvil` | Artejo apendicular | Flecha que apunta directamente al cuerpo del dedo móvil superior de la pinza izquierda. Acepta los mismos sinónimos que el N.° 3. |
| **6** | **Antena** | `antena`, `antenas`, `anténula`, `antenas anteriores` | Apéndice cefálico | Apéndices sensoriales cefálicos cortos situados en el margen frontal entre las órbitas oculares. |
| **7** | **Própodo / Región gástrica** | `própodo`, `propodo`, `palma`, `dedo fijo`, `región gástrica`, `region gastrica` | Artejo / Región dorsal | Flecha de doble foco en la lámina: una punta señala al **própodo** de la quela (porción basal que incluye la palma y el dedo fijo), y la otra punta desciende hacia la **región gástrica** del caparazón anterior. |
| **8** | **Carpo (del quelípedo)** | `carpo`, `muñeca` | Artejo apendicular | Artejo articulado intermedio entre el mero y el própodo en el primer pereiópodo (quelípedo). |
| **9** | **Región branquial** | `región branquial`, `region branquial`, `área branquial` | Región del caparazón | Regiones laterales convexas del caparazón que cubren dorsalmente las cámaras branquiales donde se alojan las branquias. |
| **10** | **Caparazón** | `caparazón`, `caparazon`, `carapacho` | Exoesqueleto dorsal | Escudo dorsal calcificado continuo resultante de la fusión de los terguitos cefálicos y torácicos. |
| **11** | **Región hepática** | `región hepática`, `region hepatica`, `área hepática` | Región del caparazón | Área anterolateral del caparazón situada a ambos lados de la región gástrica y por delante de las regiones branquiales. |
| **12** | **Región cardíaca** | `región cardíaca`, `region cardiaca`, `área cardíaca` | Región del caparazón | Área posterior central del caparazón situada por detrás de la región gástrica, bajo la cual se ubica el corazón. |
| **13** | **Quelípedo** | `quelípedo`, `quelipedo`, `primer pereiópodo`, `P1` | Apéndice torácico | Llave/corchete que engloba el primer par de pereiópodos completo, hipertrofiado y dotado de una pinza prensil. |
| **14** | **Isquio / Coxa** | `isquio`, `isquiopodito`, `coxa`, `coxopodito` | Artejo basal apendicular | Flecha señalando los artejos basales proximales de las patas marchadoras (isquio articulado a la coxa). |
| **15** | **Mero / Carpo (patas derechas)** | `mero`, `carpo`, `meropodito` | Artejo apendicular | Flechas dobles indicando los segmentos alargados intermedios (mero y carpo) de los pereiópodos marchadores derechos. |
| **16** | **Dáctilo (de patas marchadoras)** | `dáctilo`, `dactilo`, `uña`, `dáctilo caminador` | Artejo distal apendicular | Flechas dobles señalando el último artejo agudo y espiniforme (dáctilo ungueal) de los pereiópodos marchadores 2 al 5. |
| **17** | **Carpo (pata marchadora)** | `carpo`, `carpopodito` | Artejo apendicular | Artejo corto y curvado ubicado entre el mero y el própodo en las patas marchadoras izquierdas. |
| **18** | **Mero (pata marchadora)** | `mero`, `meropodito` | Artejo apendicular | El artejo más largo y robusto de las patas marchadoras, ubicado entre el isquio y el carpo. |
| **19** | **Própodo (pata marchadora)** | `própodo`, `propodo`, `propopodito` | Artejo apendicular | Penúltimo artejo de las patas marchadoras, cilíndrico o comprimido, ubicado entre el carpo y el dáctilo. |
| **20** | **Pereiópodos 2-5** | `pereiópodos 2-5`, `pereiopodos 2-5`, `patas marchadoras`, `patas caminadoras`, `pereiópodos` | Apéndices torácicos | Llave/corchete que agrupa a los cuatro pares posteriores de patas torácicas locomotoras no queladas. |
| **21** | **Isquio (quelípedo ventral)** | `isquio`, `isquiopodito`, `isquio del quelípedo` | Artejo apendicular (ventral) | Artejo basal del quelípedo visible ventralmente entre la coxa y el gran mero. |
| **22** | **Maxilipedio 3** | `maxilipedio 3`, `tercer maxilipedio`, `Mxp3`, `maxilípedo 3` | Apéndice trófico torácico | Tercer par de apéndices torácicos, aplanados y operculares, que recubren y protegen las restantes piezas bucales en el cuadro bucal ventral. |
| **23** | **Antena / Anténula (ventral)** | `antena`, `anténula`, `antenula`, `antenas` | Apéndice cefálico (ventral) | Base y flagelos antenales y antenulares visibles en posición anterior media entre las órbitas y el epistoma. |
| **24** | **Mero (quelípedo ventral)** | `mero`, `meropodito`, `brazo del quelípedo` | Artejo apendicular (ventral) | Sección ancha y alargada del quelípedo vista por su cara interna/ventral. |
| **25** | **Branquiostegito** | `branquiostegito`, `pared branquiostegal`, `región subhepática` | Pared del caparazón | Proyección lateral descendente del caparazón que encierra ventralmente la cámara branquial; en cangrejos terrestres posee epitelios vascularizados para respiración aérea. |
| **26** | **Esternito torácico** | `esternito torácico`, `esternito`, `esternitos`, `plastrón esternal`, `esternón` | Esqueleto ventral | Placas esternal ventrales fusionadas que forman el suelo del cefalotórax donde articulan las coxas de las patas marchadoras. |
| **27** | **Abdomen** | `abdomen`, `pleón`, `pleon`, `abdomen plegado` | Tagma posterior | Pleón estrecho o triangular doblado ventralmente sobre el esternón; aloja el ano en el telson apical y en hembras protege la masa de huevos sujeta a los pleópodos. |

---

## 4. Estructura JSON Normalizada para el Motor de la Aplicación

```json
{
  "diagram_id": "brachyura_land_crab_morphology",
  "title": "Morfología Externa de un Decápodo de Tierra (Crustacea: Brachyura)",
  "organism_group": "Decapoda: Brachyura (Cangrejos semi-terrestres y de marisma)",
  "reference_image": "Decapodo_de_tierra_con_texto.png",
  "game_image": "Decapodos_De_Tierra_Numeros.jpeg",
  "total_points": 2700,
  "points_per_target": 100,
  "views": [
    { "id": "dorsal", "name": "Vista dorsal", "target_number": 1 },
    { "id": "ventral", "name": "Vista ventral", "target_number": 2 }
  ],
  "targets": [
    {
      "number": 1,
      "canonical_name": "Vista dorsal",
      "accepted_inputs": ["vista dorsal", "dorsal", "cara dorsal"],
      "category": "orientacion",
      "hint": "Vista superior del animal que muestra el caparazón y el dorso de las patas."
    },
    {
      "number": 2,
      "canonical_name": "Vista ventral",
      "accepted_inputs": ["vista ventral", "ventral", "cara ventral"],
      "category": "orientacion",
      "hint": "Vista inferior que expone el plastrón esternal, el abdomen plegado y el aparato bucal."
    },
    {
      "number": 3,
      "canonical_name": "Dáctilo (de la quela)",
      "accepted_inputs": ["dactilo", "dáctilo", "dedo movil", "dedo móvil"],
      "category": "apendice_quelipedo",
      "hint": "Dedo superior móvil articulado de la pinza prensil."
    },
    {
      "number": 4,
      "canonical_name": "Quela",
      "accepted_inputs": ["quela", "pinza", "queli"],
      "category": "apendice_quelipedo",
      "hint": "Estructura distal prensil formada por el própodo y el dáctilo."
    },
    {
      "number": 5,
      "canonical_name": "Dáctilo",
      "accepted_inputs": ["dactilo", "dáctilo", "dedo movil", "dedo móvil"],
      "category": "apendice_quelipedo",
      "hint": "Artejo superior móvil de la pinza izquierda."
    },
    {
      "number": 6,
      "canonical_name": "Antena",
      "accepted_inputs": ["antena", "antenas", "antenula", "anténula"],
      "category": "apendice_cefalico",
      "hint": "Apéndices sensoriales cefálicos ubicados en el margen frontal entre los ojos."
    },
    {
      "number": 7,
      "canonical_name": "Própodo / Región gástrica",
      "accepted_inputs": ["propodo", "própodo", "palma", "dedo fijo", "region gastrica", "región gástrica"],
      "category": "artejo_y_region",
      "hint": "Artejo basal de la quela (palma + dedo fijo) y región anterior central del caparazón."
    },
    {
      "number": 8,
      "canonical_name": "Carpo (del quelípedo)",
      "accepted_inputs": ["carpo", "carpopodito"],
      "category": "apendice_quelipedo",
      "hint": "Artejo intermedio del quelípedo situado entre el mero y el própodo."
    },
    {
      "number": 9,
      "canonical_name": "Región branquial",
      "accepted_inputs": ["region branquial", "región branquial", "area branquial"],
      "category": "region_caparazon",
      "hint": "Regiones laterales amplias del caparazón dorsal que recubren las cámaras branquiales."
    },
    {
      "number": 10,
      "canonical_name": "Caparazón",
      "accepted_inputs": ["caparazon", "caparazón", "carapacho"],
      "category": "exoesqueleto",
      "hint": "Escudo continuo dorsal fuertemente calcificado característico de Brachyura."
    },
    {
      "number": 11,
      "canonical_name": "Región hepática",
      "accepted_inputs": ["region hepatica", "región hepática", "area hepatica"],
      "category": "region_caparazon",
      "hint": "Área anterolateral del caparazón situada a los lados de la región gástrica."
    },
    {
      "number": 12,
      "canonical_name": "Región cardíaca",
      "accepted_inputs": ["region cardiaca", "región cardíaca", "area cardiaca"],
      "category": "region_caparazon",
      "hint": "Área posterior media del caparazón bajo la cual se aloja el corazón."
    },
    {
      "number": 13,
      "canonical_name": "Quelípedo",
      "accepted_inputs": ["quelipedo", "quelípedo", "primer pereiopodo", "primer pereiópodo", "P1"],
      "category": "apendice_toracico",
      "hint": "Primer par de patas torácicas modificado en una pinza robusta."
    },
    {
      "number": 14,
      "canonical_name": "Isquio / Coxa",
      "accepted_inputs": ["isquio", "isquiopodito", "coxa", "coxopodito"],
      "category": "artejo_marchador",
      "hint": "Artejos basales proximales que articulan la pata torácica con el cuerpo."
    },
    {
      "number": 15,
      "canonical_name": "Mero / Carpo (patas derechas)",
      "accepted_inputs": ["mero", "carpo", "meropodito"],
      "category": "artejo_marchador",
      "hint": "Segmentos intermedios y largos de los pereiópodos marchadores."
    },
    {
      "number": 16,
      "canonical_name": "Dáctilo (de patas marchadoras)",
      "accepted_inputs": ["dactilo", "dáctilo", "uña", "dactilo ungueal"],
      "category": "artejo_marchador",
      "hint": "Último artejo terminal agudo en forma de uña de las patas marchadoras 2 a 5."
    },
    {
      "number": 17,
      "canonical_name": "Carpo (pata marchadora)",
      "accepted_inputs": ["carpo", "carpopodito"],
      "category": "artejo_marchador",
      "hint": "Artejo curvo situado entre el mero y el própodo en las patas marchadoras."
    },
    {
      "number": 18,
      "canonical_name": "Mero (pata marchadora)",
      "accepted_inputs": ["mero", "meropodito"],
      "category": "artejo_marchador",
      "hint": "El segmento más largo y robusto de las patas caminadoras."
    },
    {
      "number": 19,
      "canonical_name": "Própodo (pata marchadora)",
      "accepted_inputs": ["propodo", "própodo", "propopodito"],
      "category": "artejo_marchador",
      "hint": "Penúltimo artejo de las patas marchadoras, entre el carpo y el dáctilo."
    },
    {
      "number": 20,
      "canonical_name": "Pereiópodos 2-5",
      "accepted_inputs": ["pereiopodos 2-5", "pereiópodos 2-5", "patas marchadoras", "patas caminadoras"],
      "category": "apendice_toracico",
      "hint": "Conjunto de los cuatro pares de patas torácicas locomotoras no queladas."
    },
    {
      "number": 21,
      "canonical_name": "Isquio (quelípedo ventral)",
      "accepted_inputs": ["isquio", "isquiopodito", "isquio del quelipedo"],
      "category": "artejo_quelipedo_ventral",
      "hint": "Segmento basal del quelípedo visible ventralmente entre la coxa y el mero."
    },
    {
      "number": 22,
      "canonical_name": "Maxilipedio 3",
      "accepted_inputs": ["maxilipedio 3", "tercer maxilipedio", "Mxp3", "maxilipedio", "maxilipedios"],
      "category": "apendice_trofico",
      "hint": "Tercer par de apéndices torácicos modificados como valvas operculares bucales."
    },
    {
      "number": 23,
      "canonical_name": "Antena / Anténula (ventral)",
      "accepted_inputs": ["antena", "antenula", "anténula", "antenas"],
      "category": "apendice_cefalico",
      "hint": "Apéndices cefálicos visibles ventralmente en el margen frontal entre las órbitas."
    },
    {
      "number": 24,
      "canonical_name": "Mero (quelípedo ventral)",
      "accepted_inputs": ["mero", "meropodito", "brazo del quelipedo"],
      "category": "artejo_quelipedo_ventral",
      "hint": "Cara interna ventral del gran segmento braquial del quelípedo."
    },
    {
      "number": 25,
      "canonical_name": "Branquiostegito",
      "accepted_inputs": ["branquiostegito", "pared branquiostegal", "camara branquial"],
      "category": "caparazon_ventral",
      "hint": "Borde lateral ventral del caparazón que cubre y delimita la cámara branquial."
    },
    {
      "number": 26,
      "canonical_name": "Esternito torácico",
      "accepted_inputs": ["esternito toracico", "esternito torácico", "esternito", "plastron esternal", "esternon"],
      "category": "esqueleto_ventral",
      "hint": "Placas esqueléticas ventrales fusionadas sobre las que se pliega el abdomen."
    },
    {
      "number": 27,
      "canonical_name": "Abdomen",
      "accepted_inputs": ["abdomen", "pleon", "pleón", "abdomen plegado"],
      "category": "tagma_posterior",
      "hint": "Pleón reducido y flexionado hacia adelante en la línea media esternal."
    }
  ]
}
```
