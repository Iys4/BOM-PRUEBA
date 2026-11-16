# DIAGRAMA Y ESPECIFICACIÓN: ANATOMÍA DE CUBOZOA (CLASE CUBOZOA - CUBOMEDUSA)

Este documento contiene la correspondencia anatómica exacta, la especificación pedagógica y los datos estructurados para el ejercicio de rotulación ciego de la **Cubomedusa** (Subphylum Medusozoa: Clase Cubozoa), derivado de la comparación minuciosa entre la lámina interactiva (**`CUBOZOA@4x.png`**) y la captura de cátedra (**`Captura_de_pantalla_2026-11-12_120119.png`**).

---

## 1. Identificación y Metadatos de la Lámina

* **Diagram ID**: `cubozoa_medusa_anatomy`
* **Título de Cátedra**: `SUBPHYLUM MEDUSOZOA - CLASE: CUBOZOA - MEDUSA`
* **Organismo Representativo**: Cubomedusa (ej. *Carybdea marsupialis*, *Tamoya haplonema*, *Chironex fleckeri*)
* **Imagen del Juego (Ciega)**: `CUBOZOA@4x.png`
* **Imagen de Referencia de Cátedra (Rotulada)**: `Captura_de_pantalla_2026-11-12_120119.png`
* **Total de Estructuras Rotuladas**: 10 números (1 al 10)
* **Puntuación por Estructura**: +100 puntos (Total: 1.000 puntos)

---

## 2. Tabla Maestra de Correspondencias Anatómicas (Números 1 al 10)

| N.° | Estructura Anatómica Rotulada en Cátedra | Términos Canónicos y Variantes Aceptadas en el Input | Ubicación y Categoría | Diagnosis Morfológica y Notas de Cátedra (BOM) |
|:---:|:---|:---|:---|:---|
| **1** | **Rhopalium (4) *(Ropalio - vista izquierda)*** | `rhopalium`, `ropalio`, `ropalios`, `rhopalium 4`, `ropalio 4`, `organo sensorial` | Nicho perradial marginal izquierdo | Órgano sensorial marginal alojado en una cavidad o nicho perradial a media altura de la campana. Los cubomedusas poseen 4 ropalios con ojos complejos provistos de lente, córnea y retina, además de estatocistos de equilibrio. |
| **2** | **Tentáculos (4) *(Tentaculos 4)*** | `tentáculos`, `tentaculos`, `tentaculos 4`, `tentáculos 4`, `tentaculo`, `tentáculo` | Apéndices marginales basales | Nacen directamente del extremo distal de cada pedalio. En Cubozoa de orden Carybdeida existe 1 tentáculo por esquina (4 en total), alargados y con bandas anilladas de cnidocitos altamente tóxicos. |
| **3** | **Filamentos gástricos *(Filamentos gastricos)*** | `filamentos gástricos`, `filamentos gastricos`, `gastric phacellae`, `facelas` | Interior del estómago (polo aboral) | Mechones de filamentos carnosos ricos en cnidocitos y células glandulares que tapizan el interior del estómago celentérico para someter químicamente a presas vivas. |
| **4** | **Manubrio** | `manubrio`, `tubo oral`, `pedunculo oral` | Eje central subumbrelar | Proyección carnosa corta cuadrangular suspendida en el centro de la cavidad subumbrelar, rematada distalmente en la boca. |
| **5** | **Gónadas *(Gonadas)*** | `gónadas`, `gonadas`, `gónada`, `gonada` | Tabiques de los bolsillos gástricos | Láminas foliáceas dobles de origen **endodérmico / gastrodérmico** dispuestas a lo largo de los tabiques interradiales en los cuatro bolsillos gástricos. |
| **6** | **Canal circular** | `canal circular`, `canal anular`, `vaso circular` | Margen subumbrelar | Vaso gastrovascular continuo que bordea la base de la umbrela e irriga los pedalia y los canales del velario. |
| **7** | **Bolsillo radial *(Bolsillos radiales / Bolsas gástricas)*** | `bolsillo radial`, `bolsillos radiales`, `bolsa gástrica`, `bolsas gastricas`, `bolsas radiales` | Ángulos perradiales / superiores | Amplias extensiones o divertículos gastrovasculares que parten de la cavidad gástrica central hacia las paredes de la campana. |
| **8** | **Pedalia *(Pedalio / Pedalia)*** | `pedalia`, `pedalio`, `pedalios`, `pedalium` | Esquinas interradiales inferiores | **Estructura diagnóstica exclusiva de Cubozoa**. Paleta o lámina muscular aplanada y flexible situada en cada una de las cuatro esquinas de la campana que actúa como base de sustentación y palanca motora para los tentáculos. |
| **9** | **Rhopalium *(Ropalio - vista derecha)*** | `rhopalium`, `ropalio`, `rhopalium derecho`, `ropalio derecho` | Nicho perradial marginal derecho | Segunda indicación del sistema sensorial tetrámero, señalando la hendidura sensorial sobre la cara opuesta de la campana cúbica. |
| **10** | **Velo *(Velario / Velarium)*** | `velo`, `velario`, `velarium`, `falso velo` | Margen interior subumbrelar | **Carácter diagnóstico de Cubozoa**. En la diapositiva original de clase figura rotulado como *\"velo\"*. Anatómicamente es un **velario**, un reborde subumbrelar horizontal similar al velo de Hydrozoa pero que contiene extensiones de los canales gastrovasculares endodérmicos (canales del velario), fundamental para su natación activa y maniobrable. |

---

## 3. Claves de Reconocimiento y Preguntas Frecuentes de Examen Práctico (BOM)

1. **¿Velo o Velario?**:
   - En la lámina de cátedra el término impreso es literalmente **`velo`** (número 10), por lo que el sistema acepta tanto `velo` como `velario` / `velarium`.
   - *Pregunta teórica clásica*: "¿Qué diferencia el velario de Cubozoa del velo verdadero de Hydrozoa?"
     * **Respuesta**: El velo de Hydrozoa es un simple repliegue tisular epidérmico sin cavidades digestivas. El velario de Cubozoa contiene canales gastrovasculares internos endodérmicos ramificados (*canales velariares*) y frenillos de soporte.
2. **Pedalio (Pedalia)**:
   - Es una apomorfía de Cubozoa. Ausente en Hydrozoa y Scyphozoa.
3. **Organización Tetrámera**:
   - 4 caras (campana cúbica), 4 ropalios perradiales, 4 pedalia interradiales, 4 bolsas gástricas con 4 pares de gónadas laminares.

---

## 4. Bloque JSON para el Motor de la Aplicación

```json
{
  "diagram_id": "cubozoa_medusa_anatomy",
  "title": "Subphylum Medusozoa: Clase Cubozoa (Cubomedusa)",
  "reference_image": "Captura_de_pantalla_2026-11-12_120119.png",
  "game_image": "CUBOZOA@4x.png",
  "total_points": 1000,
  "points_per_target": 100,
  "parts": [
    {
      "number": 1,
      "canonical_name": "Rhopalium (4)",
      "accepted_inputs": ["rhopalium", "ropalio", "ropalios", "rhopalium 4", "ropalio 4", "organo sensorial"],
      "category": "sensorial",
      "hint": "Órgano sensorial marginal tetrámero en nicho perradial con ojos complejos y estatocisto."
    },
    {
      "number": 2,
      "canonical_name": "Tentáculos (4)",
      "accepted_inputs": ["tentáculos", "tentaculos", "tentaculos 4", "tentáculos 4", "tentaculo", "tentáculo"],
      "category": "captura",
      "hint": "Apéndices marginales alargados que nacen del extremo de cada pedalio."
    },
    {
      "number": 3,
      "canonical_name": "Filamentos gástricos",
      "accepted_inputs": ["filamentos gástricos", "filamentos gastricos", "gastric phacellae", "facelas"],
      "category": "digestivo",
      "hint": "Haces de filamentos con cnidocitos en el interior de la cavidad gástrica."
    },
    {
      "number": 4,
      "canonical_name": "Manubrio",
      "accepted_inputs": ["manubrio", "tubo oral", "pedunculo oral"],
      "category": "digestivo",
      "hint": "Eje cilíndrico subumbrelar que sostiene la boca cuadrangular."
    },
    {
      "number": 5,
      "canonical_name": "Gónadas",
      "accepted_inputs": ["gónadas", "gonadas", "gónada", "gonada"],
      "category": "reproductor",
      "hint": "Láminas foliáceas endodérmicas a los lados de los tabiques gástricos."
    },
    {
      "number": 6,
      "canonical_name": "Canal circular",
      "accepted_inputs": ["canal circular", "canal anular", "vaso circular"],
      "category": "gastrovascular",
      "hint": "Conducto marginal anular que recorre el borde de la campana."
    },
    {
      "number": 7,
      "canonical_name": "Bolsillo radial",
      "accepted_inputs": ["bolsillo radial", "bolsillos radiales", "bolsa gástrica", "bolsas gastricas", "bolsas radiales"],
      "category": "gastrovascular",
      "hint": "Divertículo gastrovascular perradial que comunica el estómago con las paredes umbrelares."
    },
    {
      "number": 8,
      "canonical_name": "Pedalia",
      "accepted_inputs": ["pedalia", "pedalio", "pedalios", "pedalium"],
      "category": "locomotor",
      "hint": "Base muscular aplanada en las esquinas interradiales de la campana de donde nacen los tentáculos."
    },
    {
      "number": 9,
      "canonical_name": "Rhopalium",
      "accepted_inputs": ["rhopalium", "ropalio", "rhopalium derecho", "ropalio derecho"],
      "category": "sensorial",
      "hint": "Nicho sensorial perradial en la cara opuesta de la campana."
    },
    {
      "number": 10,
      "canonical_name": "Velo (Velario)",
      "accepted_inputs": ["velo", "velario", "velarium", "falso velo"],
      "category": "locomotor",
      "hint": "Reborde marginal interior que en clase figura rotulado como velo, aunque anatómicamente es un velario con canales gastrovasculares."
    }
  ]
}
```
