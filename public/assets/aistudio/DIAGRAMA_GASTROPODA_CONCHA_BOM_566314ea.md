# ESPECIFICACIÓN Y DATASET: DIAGRAMA ANATÓMICO DE LA CONCHA DE GASTERÓPODO (BOM)

Este documento define la base de datos taxonómica, la correspondencia anatómica y el bloque de configuración para el **diagrama interactivo de la concha de un gasterópodo** (*Phylum Mollusca, Clase Gastropoda*). Todos los términos, estructuras y justificaciones se fundamentan estrictamente en las diapositivas oficiales de la cátedra de Biología de Organismos Marinos (BOM), el práctico de moluscos y los módulos de Especies Exóticas Invasoras (*Rapana venosa* vs. *Stramonita haemastoma*).

---

## 1. Archivos Multimedia Asociados

* **Lámina de evaluación interactiva (`@4x`)**: `MOLUSCO_2@4x.png`
* **Lámina original de cátedra rotulada**: `Captura_de_pantalla_2026-11-12_153236.png`
* **Ejes de orientación preservados en texto**:
  * **`posterior`**: En la porción superior (hacia el ápice de la concha).
  * **`anterior`**: En la porción inferior (hacia la abertura y el canal sifonal).

---

## 2. Correspondencia Anatómica Oficial (Números 1 al 7)

| N.° | Estructura Anatómica Oficial | Variantes y Sinónimos Aceptados (+100 pts) | Categoría / Región | Descripción Morfológica y Relevancia Diagnóstica |
|:---:|:---|:---|:---|:---|
| **1** | **Ápice** | `ápice`, `apice`, `apex`, `ápice posterior`, `protoconcha` | Región apical / posterior | Extremo posterior aguzado de la espira. Corresponde al inicio del crecimiento ontogenético de la concha (*protoconcha* larval). |
| **2** | **Vuelta** | `vuelta`, `vuelta de la espira`, `vueltas`, `vuelta del cuerpo` | Arquitectura de la concha | Cada revolución o giro completo de 360° del tubo calcáreo alrededor del eje central helicoidal (*columela*). |
| **3** | **Sutura** | `sutura`, `línea de sutura`, `suturas` | Arquitectura de la concha | Surco, ranura o línea helicoidal continua que delimita la unión entre dos vueltas contiguas de la concha. |
| **4** | **Abertura** | `abertura`, `peristoma`, `abertura de la concha`, `boca` | Región apertural | Gran orificio o boca de la concha por donde emergen la cabeza, el pie marchador/rastrero y el sifón inhalante. |
| **5** | **Labio externo** | `labio externo`, `borde externo`, `labro` | Margen de la abertura | Margen exterior o distal de la abertura (*labrum*); puede ser liso, engrosado o denticulado según la especie y estadio ontogenético. |
| **6** | **Labio interno** | `labio interno`, `borde interno`, `callo columelar`, `borde parietal` | Margen de la abertura | Margen proximal medial de la abertura adosado a la pared del cuerpo y la columela; suele presentar un callo o esmalte liso. |
| **7** | **Canal sifonal** | `canal sifonal`, `canal sifonal anterior`, `escotadura sifonal`, `canal del sifón` | Extremo anterior | Muesca, surco o canal tubular anterior que aloja y protege al sifón inhalante del manto en gasterópodos carnívoros/bentónicos. |

---

## 3. Notas Diagnósticas de Cátedra y Reconocimiento Práctico

1. **Polaridad corporal y orientación de la concha**:
   * En gasterópodos prosobranquios (como *Rapana venosa* y *Stramonita haemastoma*), la **torsión ontogenética de 180°** reubica la cavidad paleal, las branquias y el ano en posición anterior sobre la cabeza.
   * El **ápice** representa la región **posterior** ontogenética, mientras que la **abertura** y el **canal sifonal** representan la región **anterior**.
2. **Relevancia del Canal Sifonal en el Laboratorio**:
   * La presencia de un **canal sifonal** manifiesto (concha *sifonostomada*) es diagnóstica de gasterópodos depredadores o carroñeros (orden Neogastropoda / superfamilia Muricoidea), que utilizan el sifón para muestrear químicamente el agua de fondo.
   * Las conchas herbívoras o micrófagas típicamente carecen de canal sifonal (concha *holostomada*, abertura circular continua).
3. **Diferenciación de Especies en el Práctico de EEIA (Uruguay)**:
   * ***Rapana venosa* (Exótica invasora)**: Concha de gran tamaño, globosa y pesada, vuelta del cuerpo muy expandida, abertura ovalada muy amplia de color naranja/salmón intenso y estrías espirales con tubérculos bajos.
   * ***Stramonita haemastoma* (Autóctona)**: Concha más pequeña y alargada, con dos hileras conspicuas de tubérculos prominentes en la vuelta del cuerpo y abertura con tonos crema o anaranjados menos intensos.

---

## 4. Banco de Distractores Pedagógicos para Examen

* `Umbón`: *Error de Clase. El umbón es la protuberancia dorsal embrionaria diagnóstica de bivalvos (Mollusca: Bivalvia); en gasterópodos la estructura homóloga inicial es el ápice o protoconcha.*
* `Charnela`: *Error de Clase. La charnela con dientes cardinales es la estructura de articulación exclusiva de bivalvos.*
* `Seno paleal`: *Error anatómico. El seno paleal es la inflexión de la línea paleal en el interior de las valvas de bivalvos excavadores.*
* `Crenulaciones`: *Error de órgano. Las crenulaciones marginales denticuladas corresponden al borde interno ventral de bivalvos como Anomalocardia o Dallocardia.*
* `Opérculo`: *Estructura ausente en la lámina. El opérculo es la placa córnea o calcárea discoidal que se inserta dorsalmente en la porción posterior del pie del caracol, no un componente de la espira de la concha vacía.*

---

## 5. Bloque JSON para el Motor de la Aplicación

```json
{
  "diagram_id": "mollusca_gastropoda_shell_morphology",
  "title": "Morfología de la Concha de Gasterópodo (Mollusca: Gastropoda)",
  "reference_image": "Captura_de_pantalla_2026-11-12_153236.png",
  "game_image": "MOLUSCO_2@4x.png",
  "total_points": 700,
  "points_per_target": 100,
  "orientation_labels": [
    {
      "text": "posterior",
      "position": "top",
      "description": "Hacia el ápice de la concha"
    },
    {
      "text": "anterior",
      "position": "bottom",
      "description": "Hacia la abertura y canal sifonal"
    }
  ],
  "parts": [
    {
      "number": 1,
      "canonical_name": "Ápice",
      "accepted_inputs": [
        "apice",
        "ápice",
        "apex",
        "apice posterior",
        "ápice posterior",
        "protoconcha"
      ],
      "category": "region_apical",
      "hint": "Extremo posterior aguzado de la espira donde se inicia el crecimiento de la concha."
    },
    {
      "number": 2,
      "canonical_name": "Vuelta",
      "accepted_inputs": [
        "vuelta",
        "vuelta de la espira",
        "vueltas",
        "vuelta del cuerpo"
      ],
      "category": "arquitectura_concha",
      "hint": "Cada giro completo de 360 grados de la concha alrededor de su eje central."
    },
    {
      "number": 3,
      "canonical_name": "Sutura",
      "accepted_inputs": [
        "sutura",
        "linea de sutura",
        "línea de sutura",
        "suturas"
      ],
      "category": "arquitectura_concha",
      "hint": "Línea o surco continuo que separa dos vueltas contiguas de la concha."
    },
    {
      "number": 4,
      "canonical_name": "Abertura",
      "accepted_inputs": [
        "abertura",
        "peristoma",
        "abertura de la concha",
        "boca"
      ],
      "category": "region_apertural",
      "hint": "Gran orificio por donde emergen la cabeza, el pie y el sifón del molusco."
    },
    {
      "number": 5,
      "canonical_name": "Labio externo",
      "accepted_inputs": [
        "labio externo",
        "borde externo",
        "labro"
      ],
      "category": "margen_abertura",
      "hint": "Borde distal libre o margen externo de la abertura."
    },
    {
      "number": 6,
      "canonical_name": "Labio interno",
      "accepted_inputs": [
        "labio interno",
        "borde interno",
        "callo columelar",
        "borde parietal"
      ],
      "category": "margen_abertura",
      "hint": "Borde medial de la abertura adosado a la pared del cuerpo y columela."
    },
    {
      "number": 7,
      "canonical_name": "Canal sifonal",
      "accepted_inputs": [
        "canal sifonal",
        "canal sifonal anterior",
        "escotadura sifonal",
        "canal del sifon",
        "canal del sifón"
      ],
      "category": "region_anterior",
      "hint": "Hendidura o canal anterior por donde se proyecta el sifón inhalante del manto."
    }
  ]
}
```
