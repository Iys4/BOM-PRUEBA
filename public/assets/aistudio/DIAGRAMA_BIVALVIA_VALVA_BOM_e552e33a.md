# ESPECIFICACIÓN Y DATASET: BIVALVIA (MOLUSCO_1) - MORFOLOGÍA INTERNA DE LA VALVA

Este documento define la base de datos de correspondencia anatómica y la especificación de evaluación para el diagrama interactivo de la cara interna de la valva de un bivalvo (**`MOLUSCO_1@4x.png`**), contrastado punto por punto contra la diapositiva original de cátedra (**`Captura_de_pantalla_2026-11-12_153124.png`**).

---

## 1. Contexto Académico y Diagnóstico de Cátedra

En los prácticos de **Biología de Organismos Marinos (BOM)**, la orientación y la lectura de las impresiones musculares y líneas paleales en la cara interna de las valvas son herramientas fundamentales para:
1. **Determinar la valva izquierda vs. derecha** (ubicando el umbón dorsal prosogiro, la charnela dorsal, el seno paleal posterior y la región anterior).
2. **Inferir el hábito biológico**:
   * *Presencia de seno paleal*: Bivalvo excavador infaunal con sifones retráctiles (ej. *Mactra isabelleana*, *Darina solenoides*).
   * *Línea paleal entera (sin seno)*: Bivalvo de sifones cortos o epifaunal/seminfaunal (ej. *Felaniella vilardeboaena*).
   * *Borde interno crenulado*: Carácter taxonómico diagnóstico de familias como Veneridae (*Anomalocardia flexuosa*) o Cardiidae (*Dallocardia muricata*).

---

## 2. Tabla Maestra de Correspondencia Numérica (MOLUSCO_1)

| N.° | Estructura en Diapositiva Original | Variantes y Sinónimos Aceptados (+100 pts) | Categoría Funcional | Definición Morfológica y Clave Diagnóstica de Cátedra |
|:---:|:---|:---|:---|:---|
| **1** | **Impresiones musculares** | `impresiones musculares`, `impresion muscular`, `cicatrices musculares`, `cicatriz muscular`, `marcas musculares`, `musculos aductores` | Musculatura aductora | Huellas o cicatrices elípticas sobre el interior de la conchilla donde se insertan los potentes haces musculares aductores (anterior y posterior) que cierran herméticamente ambas valvas. |
| **2** | **Umbón** | `umbón`, `umbon`, `vértice`, `vertice`, `ápice`, `apice`, `beak` | Ápice de crecimiento | Prominencia o protuberancia dorsal prominente sobre la charnela; representa la porción más antigua y el punto de origen del crecimiento de la conchilla embrionaria (prodosoconcha). |
| **3** | **Charnela** | `charnela`, `placa cardinal`, `charnela cardinal`, `zona de charnela`, `bisagra` | Articulación esquelética | Región dorsal rígida provista de dientes y fosetas calcáreas que encajan con precisión para evitar el desplazamiento lateral de las valvas, articulando la apertura y cierre. |
| **4** | **Línea paleal** | `línea paleal`, `linea paleal`, `impresión paleal`, `impresion paleal`, `pallial line` | Inserción del manto | Línea o surco continuo concéntrico paralelo al borde ventral de la valva que marca la zona de inserción de los músculos retractores del borde del manto. |
| **5** | **Crenulaciones** | `crenulaciones`, `crenulacion`, `crenulaciones marginales`, `borde crenulado`, `dientes marginales`, `crenulación` | Borde de la concha | Serie de muescas, estrías o dientecillos dentados en el borde interno marginal de la concha que aseguran un encastre milimétrico contra la valva opuesta. |
| **6** | **Seno paleal** | `seno paleal`, `seno palial`, `inflexión paleal`, `seno de los sifones`, `pallial sinus` | Zona de retracción sifonal | Hendidura, muesca o entrante profunda en la porción posterior de la línea paleal; delimita el espacio donde se alojan y retraen los sifones alargados en bivalvos de hábito excavador. |

---

## 3. Ejes de Orientación Anatómica Presentes en la Lámina

En la lámina, los cuatro puntos cardinales del espécimen se mantienen con rótulos en texto claro (no numerados) para guiar al estudiante:
* **DORSAL** (Superior): Hacia donde se proyectan el umbón y la charnela.
* **VENTRAL** (Inferior): Hacia donde abren las valvas y se disponen las crenulaciones marginales.
* **POSTERIOR** (Izquierda en la lámina): Hacia donde se orienta la inflexión del **seno paleal** y la salida sifonal.
* **ANTERIOR** (Derecha en la lámina): Región opuesta al seno paleal, orientada hacia el pie excavador.

---

## 4. Banco de Distractores Pedagógicos Específicos

* **Condróforo triangular interno**:
  * *Error*: Confundir la charnela general con el foseta ligamentaria especializada de Mactridae (*Mactra isabelleana*).
* **Rádula / Odontóforo**:
  * *Error*: Estructuras masticadoras exclusivas de Gastropoda, Cephalopoda y Polyplacophora; los Bivalvia carecen de cabeza y rádula.
* **Opérculo córneo calcáreo**:
  * *Error*: Placa protectora de gasterópodos prosobranquios; ausente en bivalvos ya que el cierre se logra por acción de las dos valvas mediante músculos aductores.
* **Canal sifonal anterior**:
  * *Error*: Escotadura de la concha propia de caracoles carnívoros gasterópodos (*Stramonita*, *Rapana*).

---

## 5. Estructura JSON para el Motor de la Aplicación

```json
{
  "diagram_id": "bivalvia_internal_valve_morphology",
  "title": "Morfología Interna de la Valva de un Bivalvo (Mollusca: Bivalvia)",
  "reference_image": "Captura_de_pantalla_2026-11-12_153124.png",
  "game_image": "MOLUSCO_1@4x.png",
  "total_points": 600,
  "points_per_target": 100,
  "parts": [
    {
      "number": 1,
      "canonical_name": "Impresiones musculares",
      "accepted_inputs": [
        "impresiones musculares",
        "impresion muscular",
        "impresión muscular",
        "cicatrices musculares",
        "cicatriz muscular",
        "marcas musculares",
        "musculos aductores",
        "músculos aductores"
      ],
      "category": "musculatura",
      "hint": "Cicatrices elípticas donde se insertan los potentes músculos que cierran las valvas."
    },
    {
      "number": 2,
      "canonical_name": "Umbón",
      "accepted_inputs": [
        "umbon",
        "umbón",
        "vertice",
        "vértice",
        "apice",
        "ápice",
        "beak"
      ],
      "category": "esqueleto",
      "hint": "Ápice o protuberancia dorsal que representa la zona más antigua de la conchilla."
    },
    {
      "number": 3,
      "canonical_name": "Charnela",
      "accepted_inputs": [
        "charnela",
        "placa cardinal",
        "charnela cardinal",
        "bisagra"
      ],
      "category": "articulacion",
      "hint": "Borde dorsal articulado provisto de dientes y fosetas que encajan ambas valvas."
    },
    {
      "number": 4,
      "canonical_name": "Línea paleal",
      "accepted_inputs": [
        "linea paleal",
        "línea paleal",
        "impresion paleal",
        "impresión paleal",
        "pallial line"
      ],
      "category": "insercion_manto",
      "hint": "Línea continua concéntrica que indica la inserción de los músculos retractores del manto."
    },
    {
      "number": 5,
      "canonical_name": "Crenulaciones",
      "accepted_inputs": [
        "crenulaciones",
        "crenulacion",
        "crenulación",
        "crenulaciones marginales",
        "borde crenulado",
        "dientes marginales"
      ],
      "category": "margen_valva",
      "hint": "Serie de dientecillos o muescas en el margen interno ventral para ajuste milimétrico."
    },
    {
      "number": 6,
      "canonical_name": "Seno paleal",
      "accepted_inputs": [
        "seno paleal",
        "seno palial",
        "inflexion paleal",
        "inflexión paleal",
        "seno de los sifones",
        "pallial sinus"
      ],
      "category": "zona_sifonal",
      "hint": "Inflexión o hendidura posterior de la línea paleal donde se repliegan los sifones."
    }
  ]
}
```
