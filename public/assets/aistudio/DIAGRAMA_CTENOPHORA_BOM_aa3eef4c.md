# ESPECIFICACIÓN Y DATASET: DIAGRAMA ANATÓMICO DE CTENOPHORA (BOM)

Este documento define la correspondencia anatómica oficial, la descripción morfo-funcional de cátedra y la estructura de datos estandarizada para el modo de rotulación interactiva del **Phylum Ctenophora** (Ctenóforos tentaculados / cidípidos, ej. *Pleurobrachia pileus*), basado en la lámina oficial de evaluación (**`CTENOPHORA@4x.png`**) y las diapositivas de clase (**`Captura_de_pantalla_2026-11-12_120729.png`** y **`Captura_de_pantalla_2026-11-12_120714.png`**).

---

## 1. Organización Anatómica y Simetría Birradial de Ctenophora

Los ctenóforos presentan una organización corporal única basada en una **simetría birradial** definida por dos planos ortogonales que se cruzan en el eje oral-aboral:
1. **Plano tentacular (transversal / lateral)**: Pasa a lo largo de las dos vainas y tentáculos contráctiles.
2. **Plano bucal o sagital (faringeo)**: Pasa a lo largo de la hendidura aplanada de la boca y la faringe ectodérmica.

La lámina de cátedra desglosa tres vistas y cortes fundamentales:
* **Vista General Lateral y Aboral (Izquierda)**: Muestra el cuerpo piriforme o esférico, el polo aboral con el estatocisto apical, las 8 hileras meridionales de peines (costillas con ctenes), las vainas tentaculares y el polo oral anterior.
* **Corte Transversal Aboral (Superior Derecha)**: Muestra el sistema de ramificación gastrovascular apical desde el infundíbulo, los canales interradiales y los 4 canales excretores (2 ciegos y 2 anales que abren por poros anales).
* **Corte Transversal Ecuatorial (Inferior Derecha)**: Muestra la faringe comprimida en el plano sagital, flanqueada por los canales faríngeos, las dos vainas tentaculares y las 8 paredes de los canales meridianos donde se alojan las **gónadas endodérmicas enfrentadas** (un cordón de testículo y un cordón de ovario por canal).

---

## 2. Tabla Maestra de Correspondencias Anatómicas (34 Números)

### **Sección A: Vista General, Polo Aboral y Superficie Externa (1 al 14)**

| N.° | Estructura Anatómica | Variantes Aceptadas en el Input | Categoría / Posición | Descripción Morfo-funcional de Cátedra |
|:---:|:---|:---|:---|:---|
| **1** | **Estatocisto / Cúpula aboral** | `estatocisto`, `estatocito`, `cupula aboral`, `cupula`, `organo aboral`, `organo sensorial aboral` | Polo aboral (sensorial) | Órgano apical de equilibrio encerrado bajo una cúpula membranosa transparente; contiene el estatolito sostenido por cuatro balancines ciliados. |
| **2** | **Campo polar / Surco ciliado** | `campo polar`, `surco ciliado`, `placas polares`, `campos polares` | Polo aboral | Zonas sensoriales ciliadas alargadas aplanadas que se extienden a los lados del estatocisto sobre el plano sagital. |
| **3** | **Balancines ciliados** | `balancines`, `balancin`, `balancines ciliados`, `resortes ciliados` | Polo aboral | Cuatro penachos o soportes mecánicos formados por cilios fusionados que sostienen el estatolito y transmiten impulsos nerviosos a las hileras de peines. |
| **4** | **Tentáculo contráctil** | `tentáculo`, `tentaculo`, `tentaculo contráctil`, `tentaculo con coloblastos` | Plano tentacular | Uno de los dos largos tentáculos móviles completamente retráctiles dentro de las vainas tentaculares, carentes de cnidocitos y armados con coloblastos. |
| **5** | **Tentaculillos / Coloblastos** | `tentaculillos`, `tentaculillo`, `ramificaciones tentaculares`, `coloblastos` | Plano tentacular | Filamentos secundarios laterales que nacen a lo largo del tentáculo principal, densamente tapizados por células adhesivas (**coloblastos**) para atrapar presas. |
| **6** | **Vaina tentacular** | `vaina tentacular`, `vaina`, `bolsa tentacular`, `tsche tentacular` | Interno / Invaginación | Profundo bolsillo o estuche epidérmico invaginado en el mesénquima donde el tentáculo puede replegarse por completo. |
| **7** | **Faringe / Estomodeo** | `faringe`, `estomodeo`, `faringe ectodérmica` | Eje digestivo | Tubo digestivo anterior aplanado de **origen ectodérmico** que se extiende desde la boca hasta el estómago/infundíbulo. |
| **8** | **Estómago / Infundíbulo** | `estómago`, `estomago`, `infundíbulo`, `infundibulo`, `camara gastrica` | Eje digestivo | Cámara central de origen endodérmico donde desemboca la faringe y desde la que irradia todo el sistema de canales gastrovasculares. |
| **9** | **Canal meridiano** | `canal meridiano`, `canales meridianos`, `conducto meridiano` | Sistema gastrovascular | Conducto gastrovascular longitudinal ciego que corre directamente por debajo de cada una de las 8 hileras de peines. |
| **10** | **Canal tentacular** | `canal tentacular`, `conductos tentaculares` | Sistema gastrovascular | Conducto que parte del sistema gastrovascular central para irrigar la base muscular y la vaina del tentáculo. |
| **11** | **Costillas / Hileras de peines** | `costillas`, `costilla`, `hileras de peines`, `hileras de paletas`, `filas de peines` | Superficie externa | Ocho bandas longitudinales de tracción locomotoras equidistantes que recorren el cuerpo desde el polo aboral hacia el polo oral. |
| **12** | **Paleta natatoria / Peine (Ctene)** | `paleta natatoria`, `paletas natatorias`, `peine`, `ctene`, `ctenes`, `paleta` | Estructura locomotora | Placa transversal formada por cientos de cilios gigantes fusionados en peine (**ctene**) cuyo batido metacronal propulsa al animal boca adelante. |
| **13** | **Boca / Polo oral** | `boca`, `polo oral`, `apertura bucal`, `extremo anterior` | Polo oral (anterior) | Apertura bucal terminal ubicada en el polo opuesto al estatocisto, orientada hacia adelante durante la natación. |
| **14** | **Costillas / Peines perradiales** | `costillas perradiales`, `costillas`, `hileras orales`, `peines` | Margen corporal inferior | Extremo inferior de las hileras locomotoras cerca del margen bucal. |

---

### **Sección B: Corte Transversal a Nivel Aboral (15 al 26)**

| N.° | Estructura Anatómica | Variantes Aceptadas en el Input | Categoría / Posición | Descripción Morfo-funcional de Cátedra |
|:---:|:---|:---|:---|:---|
| **15** | **Canal meridiano (debajo de las costillas)** | `canal meridiano`, `canales meridianos`, `canal subcostal` | Vasos periféricos | Sección del canal longitudinal situado inmediatamente por debajo de la costilla locomotora. |
| **16** | **Canal interradial** | `canal interradial`, `canales interradiales` | Sistema gastrovascular | Rama intermedia bifurcada que conecta el canal perradial o transversal con los dos canales meridianos adyacentes. |
| **17** | **Canal tentacular (corte apical)** | `canal tentacular`, `vaso tentacular` | Sistema tentacular | Conducto gastrovascular que desciende hacia la vaina tentacular. |
| **18** | **Canales excretores (4)** | `canales excretores`, `canales excretores 4`, `conductos excretores` | Polo aboral apical | Cuatro finos conductos verticales divergentes que ascienden desde el infundíbulo hacia la superficie del polo aboral. |
| **19** | **Canales ciegos (2)** | `canales ciegos`, `dos canales ciegos`, `conductos ciegos` | Polo aboral apical | Dos de los cuatro canales excretores que rematan en fondo de saco ciego sin salida al exterior. |
| **20** | **Canales anales / Poro anal (2)** | `canales anales`, `poro anal`, `poros anales`, `canales excretores anales` | Excreción / Evacuación | Los dos canales excretores opuestos que comunican con el exterior mediante sendos **poros anales**, permitiendo la expulsión de fluidos y desechos. |
| **21** | **Canal aboral** | `canal aboral`, `conducto aboral` | Eje aboral | Vaso gastrovascular vertical que asciende por la línea media hacia el estatocisto. |
| **22** | **Canal transversal / Perradial** | `canal transversal`, `canal perradial`, `canales transversales` | Sistema gastrovascular | Conducto gastrovascular horizontal que parte lateralmente del estómago/infundíbulo hacia el plano tentacular. |
| **23** | **Estómago (infundíbulo)** | `estómago`, `estomago`, `infundíbulo`, `infundibulo` | Digestivo central | Sección transversal de la cavidad gástrica media endodérmica. |
| **24** | **Canal interradial (apical)** | `canal interradial`, `bifurcacion interradial` | Sistema gastrovascular | Ramificación del canal transversal que abastece al cuadrante corporal. |
| **25** | **Canal meridiano periférico** | `canal meridiano`, `canales meridianos` | Vasos periféricos | Vaso gastrovascular bajo la costilla en la vista del corte transversal. |
| **26** | **Vaina tentacular (lumen)** | `vaina tentacular`, `vaina`, `cavidad tentacular` | Plano tentacular | Sección transversal de la cavidad hueca que aloja la base del tentáculo. |

---

### **Sección C: Corte Ecuatorial Transversal - Gónadas y Faringe (27 al 34)**

| N.° | Estructura Anatómica | Variantes Aceptadas en el Input | Categoría / Posición | Descripción Morfo-funcional de Cátedra |
|:---:|:---|:---|:---|:---|
| **27** | **Faringe o estomodeo (origen ectodérmico)** | `faringe`, `estomodeo`, `faringe ectodérmica`, `faringe o estomodeo` | Eje sagital / bucal | Gran cavidad faríngea aplanada central revestida por epitelio ciliado de **origen ectodérmico** encargado de triturar y digerir presas. |
| **28** | **Canal faríngeo (estomodéico)** | `canal faríngeo`, `canal faringeo`, `canal estomodeico`, `canales faringeos` | Eje digestivo lateral | Dos canales gastrovasculares endodérmicos que descienden adosados íntimamente a las caras anchas de la faringe. |
| **29** | **Canal tentacular (corte ecuatorial)** | `canal tentacular`, `vaso tentacular` | Plano tentacular | Conducto que nutre la musculatura de la base del tentáculo a nivel medio del cuerpo. |
| **30** | **Testículo (endodérmico)** | `testículo`, `testiculo`, `testiculos`, `gónada masculina` | Reproductor / Gónada | Banda o cordón espermatogénico longitudinal de **origen endodérmico** situado en una de las paredes del canal meridiano. |
| **31** | **Canal meridiano (lumen)** | `canal meridiano`, `luz del canal meridiano` | Sistema gastrovascular | Luz del vaso longitudinal sobre cuyas paredes laterales se diferencian las gónadas. |
| **32** | **Ovario (endodérmico)** | `ovario`, `ovarios`, `gónada femenina` | Reproductor / Gónada | Banda o cordón ovogénico longitudinal de **origen endodérmico** ubicado en la pared opuesta al testículo dentro del mismo canal meridiano. |
| **33** | **Costilla / Paleta natatoria** | `costilla`, `peine`, `paleta natatoria`, `ctene` | Estructura locomotora | Base de inserción externa de las paletas de peines ciliados en la epidermis. |
| **34** | **Vaina tentacular (sección ecuatorial)** | `vaina tentacular`, `vaina` | Plano tentacular | Luz interna de la vaina tentacular a la altura media del cuerpo. |

---

## 3. Claves de Diagnóstico de Cátedra y Distractores (BOM)

1. **Ausencia total de Cnidocitos / Presencia de Coloblastos**:
   * *Aclaración pedagógica:* Ctenophora no produce cnidocitos (a excepción de *Haeckelia* por cleptocnidios). Sus células de captura son **coloblastos** provistos de filamento espiral contráctil y gránulos de pegamento adherente.
2. **Origen de las Gónadas (Endodérmico vs. Cnidarios)**:
   * En Ctenophora las gónadas se forman siempre en las paredes gastrodérmicas de los canales meridianos (**origen endodérmico**). En Hydrozoa son de origen epidérmico/ectodérmico.
3. **Aparato Locomotor**:
   * Ocho hileras meridianas de **peines o ctenes** coordinados por el estatocisto aboral. Son los animales más grandes que se desplazan mediante cilios.
4. **Poros anales funcionales**:
   * A diferencia de los cnidarios (tubo digestivo ciego con una sola apertura), los ctenóforos poseen **dos poros anales aborales** funcionales para evacuación de líquidos y desechos.

---

## 4. Bloque JSON para el Motor de la Aplicación

```json
{
  "diagram_id": "ctenophora_morphology_complete",
  "title": "Anatomía y Organización Birradial de Phylum Ctenophora",
  "reference_image": "Captura_de_pantalla_2026-11-12_120729.png",
  "game_image": "CTENOPHORA@4x.png",
  "total_points": 3400,
  "points_per_target": 100,
  "parts": [
    {
      "number": 1,
      "canonical_name": "Estatocisto / Cúpula aboral",
      "accepted_inputs": ["estatocisto", "estatocito", "cupula aboral", "cupula", "organo aboral"],
      "category": "sensorial",
      "hint": "Órgano sensorial apical de equilibrio encerrado bajo una cúpula membranosa con estatolito."
    },
    {
      "number": 2,
      "canonical_name": "Campo polar / Surco ciliado",
      "accepted_inputs": ["campo polar", "campos polares", "surco ciliado", "placas polares"],
      "category": "sensorial",
      "hint": "Zonas sensoriales ciliadas alargadas a los lados del estatocisto sobre el plano sagital."
    },
    {
      "number": 3,
      "canonical_name": "Balancines ciliados",
      "accepted_inputs": ["balancines", "balancin", "balancines ciliados"],
      "category": "sensorial",
      "hint": "Cuatro penachos de cilios fusionados que sostienen el estatolito y transmiten impulsos mecánicos."
    },
    {
      "number": 4,
      "canonical_name": "Tentáculo contráctil",
      "accepted_inputs": ["tentaculo", "tentáculo", "tentaculo contractil", "tentaculo con coloblastos"],
      "category": "captura",
      "hint": "Largo tentáculo retráctil dentro de la vaina, provisto de coloblastos sin nematocistos."
    },
    {
      "number": 5,
      "canonical_name": "Tentaculillos",
      "accepted_inputs": ["tentaculillos", "tentaculillo", "coloblastos", "ramificaciones tentaculares"],
      "category": "captura",
      "hint": "Ramificaciones laterales que nacen a lo largo del tentáculo principal cubiertas de coloblastos adhesivos."
    },
    {
      "number": 6,
      "canonical_name": "Vaina tentacular",
      "accepted_inputs": ["vaina tentacular", "vaina", "bolsa tentacular"],
      "category": "anatomia_interna",
      "hint": "Profundo estuche o cavidad epidérmica invaginada donde se retrae el tentáculo."
    },
    {
      "number": 7,
      "canonical_name": "Faringe / Estomodeo",
      "accepted_inputs": ["faringe", "estomodeo", "faringe ectodermica", "faringe ectodérmica"],
      "category": "digestivo",
      "hint": "Tubo digestivo anterior muy aplanado en el plano sagital, de origen ectodérmico."
    },
    {
      "number": 8,
      "canonical_name": "Estómago / Infundíbulo",
      "accepted_inputs": ["estomago", "estómago", "infundibulo", "infundíbulo", "camara gastrica"],
      "category": "digestivo",
      "hint": "Cámara gástrica central endodérmica desde la que irradian los canales gastrovasculares."
    },
    {
      "number": 9,
      "canonical_name": "Canal meridiano",
      "accepted_inputs": ["canal meridiano", "canales meridianos", "conducto meridiano"],
      "category": "gastrovascular",
      "hint": "Conducto ciego longitudinal que corre inmediatamente por debajo de cada hilera de peines."
    },
    {
      "number": 10,
      "canonical_name": "Canal tentacular",
      "accepted_inputs": ["canal tentacular", "canales tentaculares"],
      "category": "gastrovascular",
      "hint": "Conducto gastrovascular que desciende para irrigar la vaina y base del tentáculo."
    },
    {
      "number": 11,
      "canonical_name": "Costillas / Hileras de peines",
      "accepted_inputs": ["costillas", "costilla", "hileras de peines", "hileras de paletas", "filas de peines"],
      "category": "locomocion",
      "hint": "Ocho bandas longitudinales locomotoras equidistantes formadas por ctenes ciliados."
    },
    {
      "number": 12,
      "canonical_name": "Paleta natatoria / Peine (Ctene)",
      "accepted_inputs": ["paleta natatoria", "paletas natatorias", "peine", "ctene", "ctenes"],
      "category": "locomocion",
      "hint": "Placa transversal compuesta por cientos de cilios gigantes fusionados que baten rítmicamente."
    },
    {
      "number": 13,
      "canonical_name": "Boca / Polo oral",
      "accepted_inputs": ["boca", "polo oral", "apertura bucal"],
      "category": "digestivo",
      "hint": "Apertura bucal anterior orientada hacia adelante durante la natación del ctenóforo."
    },
    {
      "number": 14,
      "canonical_name": "Costillas / Peines perradiales",
      "accepted_inputs": ["costillas perradiales", "costillas", "peines", "hileras orales"],
      "category": "locomocion",
      "hint": "Porción inferior de las hileras de peines cerca del polo oral."
    },
    {
      "number": 15,
      "canonical_name": "Canal meridiano (debajo de las costillas)",
      "accepted_inputs": ["canal meridiano", "canales meridianos", "canal subcostal"],
      "category": "gastrovascular",
      "hint": "Canal gastrovascular longitudinal en la sección del corte transversal apical."
    },
    {
      "number": 16,
      "canonical_name": "Canal interradial",
      "accepted_inputs": ["canal interradial", "canales interradiales"],
      "category": "gastrovascular",
      "hint": "Canal intermedio bifurcado que conecta el canal transversal con dos canales meridianos."
    },
    {
      "number": 17,
      "canonical_name": "Canal tentacular (corte apical)",
      "accepted_inputs": ["canal tentacular", "conducto tentacular"],
      "category": "gastrovascular",
      "hint": "Vaso gastrovascular que abastece a la vaina tentacular en el corte transversal aboral."
    },
    {
      "number": 18,
      "canonical_name": "Canales excretores (4)",
      "accepted_inputs": ["canales excretores", "canales excretores 4", "conductos excretores"],
      "category": "excrecion",
      "hint": "Cuatro conductos apicales ascendentes que nacen del infundíbulo hacia el polo aboral."
    },
    {
      "number": 19,
      "canonical_name": "Canales ciegos (2)",
      "accepted_inputs": ["canales ciegos", "dos canales ciegos", "conductos ciegos"],
      "category": "excrecion",
      "hint": "Dos de los cuatro canales excretores apicales que terminan en fondo de saco ciego."
    },
    {
      "number": 20,
      "canonical_name": "Canales anales / Poro anal (2)",
      "accepted_inputs": ["canales anales", "poro anal", "poros anales", "canales excretores anales"],
      "category": "excrecion",
      "hint": "Los dos canales excretores que desembocan al exterior mediante sendos poros anales funcionales."
    },
    {
      "number": 21,
      "canonical_name": "Canal aboral",
      "accepted_inputs": ["canal aboral", "conducto aboral"],
      "category": "gastrovascular",
      "hint": "Conducto vertical que asciende por la línea media hacia la base del estatocisto."
    },
    {
      "number": 22,
      "canonical_name": "Canal transversal / Perradial",
      "accepted_inputs": ["canal transversal", "canal perradial", "canales transversales"],
      "category": "gastrovascular",
      "hint": "Rama gastrovascular horizontal principal que sale del infundíbulo hacia el plano tentacular."
    },
    {
      "number": 23,
      "canonical_name": "Estómago (infundíbulo)",
      "accepted_inputs": ["estomago", "estómago", "infundibulo", "infundíbulo"],
      "category": "digestivo",
      "hint": "Corte de la cámara central endodérmica digestiva en el plano apical."
    },
    {
      "number": 24,
      "canonical_name": "Canal interradial (apical)",
      "accepted_inputs": ["canal interradial", "canales interradiales"],
      "category": "gastrovascular",
      "hint": "Segunda ramificación interradial en el cuadrante del corte transversal aboral."
    },
    {
      "number": 25,
      "canonical_name": "Canal meridiano periférico",
      "accepted_inputs": ["canal meridiano", "canales meridianos"],
      "category": "gastrovascular",
      "hint": "Canal longitudinal periférico ubicado debajo de las costillas en el corte aboral."
    },
    {
      "number": 26,
      "canonical_name": "Vaina tentacular (lumen)",
      "accepted_inputs": ["vaina tentacular", "vaina", "cavidad tentacular"],
      "category": "anatomia_interna",
      "hint": "Sección del bolsillo invaginado que alberga el tentáculo en el corte transversal."
    },
    {
      "number": 27,
      "canonical_name": "Faringe o estomodeo (origen ectodérmico)",
      "accepted_inputs": ["faringe", "estomodeo", "faringe ectodermica", "faringe ectodérmica", "faringe o estomodeo"],
      "category": "digestivo",
      "hint": "Corte transversal de la faringe aplanada sagitalmente, de estricto origen ectodérmico."
    },
    {
      "number": 28,
      "canonical_name": "Canal faríngeo (estomodéico)",
      "accepted_inputs": ["canal faringeo", "canal faríneo", "canal estomodeico", "canales faringeos"],
      "category": "gastrovascular",
      "hint": "Canal digestivo endodérmico adosado a la cara lateral ancha de la faringe."
    },
    {
      "number": 29,
      "canonical_name": "Canal tentacular (corte ecuatorial)",
      "accepted_inputs": ["canal tentacular", "conducto tentacular"],
      "category": "gastrovascular",
      "hint": "Vaso nutricio que irriga la base muscular del tentáculo a nivel ecuatorial."
    },
    {
      "number": 30,
      "canonical_name": "Testículo (endodérmico)",
      "accepted_inputs": ["testiculo", "testículo", "testiculos", "gonada masculina", "gónada masculina"],
      "category": "reproductor",
      "hint": "Cordón espermatogénico de origen endodérmico en una de las paredes del canal meridiano."
    },
    {
      "number": 31,
      "canonical_name": "Canal meridiano (lumen)",
      "accepted_inputs": ["canal meridiano", "canales meridianos", "luz del canal meridiano"],
      "category": "gastrovascular",
      "hint": "Luz del vaso longitudinal bajo las costillas que porta las gónadas en sus paredes."
    },
    {
      "number": 32,
      "canonical_name": "Ovario (endodérmico)",
      "accepted_inputs": ["ovario", "ovarios", "gonada femenina", "gónada femenina"],
      "category": "reproductor",
      "hint": "Cordón ovogénico de origen endodérmico en la pared opuesta al testículo en el canal meridiano."
    },
    {
      "number": 33,
      "canonical_name": "Costilla / Paleta natatoria",
      "accepted_inputs": ["costilla", "peine", "paleta natatoria", "ctene"],
      "category": "locomocion",
      "hint": "Corte de la placa locomotora ciliada en la superficie epidérmica externa."
    },
    {
      "number": 34,
      "canonical_name": "Vaina tentacular (sección ecuatorial)",
      "accepted_inputs": ["vaina tentacular", "vaina"],
      "category": "anatomia_interna",
      "hint": "Sección transversal de la cavidad tentacular en el corte ecuatorial medio."
    }
  ]
}
```
