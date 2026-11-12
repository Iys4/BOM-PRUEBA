# ESPECIFICACIÓN Y DATASET: MODO DIAGRAMAS Y ROTULACIÓN ANATÓMICA (BOM)

Este documento define la arquitectura funcional, la mecánica interactiva y la base de datos de correspondencia anatómica para el **nuevo modo de juego de rotulación de diagramas** de la aplicación de Biología de Organismos Marinos (BOM).

---

## 1. Concepto y Mecánica del Juego ("Modo Diagrama / Rotulado Ciego")

### 1.1 Objetivo Pedagógico
En los parciales prácticos de BOM, además de la identificación en formol, los estudiantes deben reconocer y rotular esquemas morfológicos y piezas anatómicas de invertebrados marinos (tagmas, apéndices cefálicos, torácicos, abdominales y piezas caudales). Este modo de juego entrena la memoria activa visual sin opciones múltiples pasivas.

### 1.2 Flujo de Interacción
1. **Presentación visual**:
   - Se muestra la lámina o diagrama del organismo en alta resolución con indicadores numéricos (1, 2, 3...) apuntando a las distintas partes del cuerpo.
   - Los números aparecen como pines o etiquetas circulares sobre fondo blanco/azul.
2. **Entrada de texto no lineal**:
   - Debajo de la imagen se ubica una barra de input de texto grande (18–20px) con soporte mobile-first.
   - El estudiante **no está obligado** a responder en orden numérico: puede escribir el nombre de cualquier estructura que reconozca a simple vista (ej.: "telson", "anténula", "pereiópodos").
   - *Opcional*: Si el usuario hace clic o toca directamente sobre un número en la imagen, ese número queda enfocado/seleccionado como objetivo guiado.
3. **Búsqueda predictiva (Autocompletado)**:
   - Al tipear 2 o 3 caracteres (ej. "per"), se despliega un listado flotante con opciones compatibles ("pereión", "pereiópodos").
   - Evita la frustración por ortografía exacta o tildes en latín/castellano técnico, pero exige evocar la palabra mentalmente.
4. **Animación de acierto (+100 pts)**:
   - Al ingresar una parte correcta, la palabra se eleva con una transición suave hacia el número correspondiente en la imagen o hacia el panel lateral de partes identificadas.
   - El número en el diagrama cambia de estado: se resalta en azul/verde con un checkmark `✓` y muestra el nombre de la estructura.
   - Suma **+100 puntos** inmediatos.
5. **Manejo de errores sin penalización**:
   - Si la palabra ingresada no corresponde a ninguna parte pendiente, el campo de texto realiza un efecto de vibración (*shake*) sutil con mensaje breve (ej. *"Esa estructura no está señalada o ya fue descubierta"*), sin descontar puntos.
6. **Finalización de ronda**:
   - Al descubrir todas las estructuras del diagrama, se despliega una tarjeta de síntesis morfológica con la organización anatómica completa del grupo (tagmosis y apéndices).

---

## 2. Caso de Prueba: Morfología Externa de Crustacea Decapoda (Malacostraca)

Basado en la comparación directa entre la lámina de referencia rotulada (**`Decapoda_con_cosas.png`**) y la lámina ciega con numeración (**`Decapoda_con_numeros.jpeg`**):

### 2.1 Tabla Maestra de Correspondencias Anatómicas

| N.° | Estructura Anatómica | Variantes y Sinónimos Aceptados en el Input | Categoría / Región | Descripción Morfológica y Diagnóstica de Cátedra |
|:---:|:---|:---|:---|:---|
| **1** | **Cefalotórax** | `cefalotórax`, `cefalotorax` | Tagma compuesto | Fusión dorsal del cefalón y el pereión bajo un caparazón continuo (*carapacho*). En la lámina está indicado con dos flechas abarcando cabeza y tórax. |
| **2** | **Cefalón** | `cefalón`, `cefalon`, `cabeza` | Tagma anterior | Región cefálica anterior que porta los ojos compuestos y los apéndices sensoriales y tróficos (anténulas, antenas, mandíbulas, maxílulas y maxilas). |
| **3** | **Pereión** | `pereión`, `pereion`, `tórax`, `torax` | Tagma medio | Región torácica que porta los pereiópodos (patas marchadoras o quelípedos). En decápodos está fusionada dorsalmente con el cefalón. |
| **4** | **Pleón** | `pleón`, `pleon`, `abdomen` | Tagma posterior | Región abdominal segmentada, móvil y muscular, compuesta por somitas independientes que portan los pleópodos. |
| **5** | **Anténula** | `anténula`, `antenula`, `primer par de antenas`, `antena 1`, `A1` | Apéndice cefálico | Primer par de apéndices sensoriales cefálicos preorales; típicamente birrámeas o trirrámeas en decápodos, con estatocisto basal. |
| **6** | **Ojo** | `ojo`, `ojo compuesto`, `ojo pedunculado` | Órgano sensorial | Ojo compuesto generalmente sostenido por un pedúnculo móvil en decápodos carídeos y braquiuros. |
| **7** | **Antena** | `antena`, `segundo par de antenas`, `antena 2`, `A2` | Apéndice cefálico | Segundo par de apéndices cefálicos sensoriales; flagelo largo táctil con escama antenal (escafocerito) en la base de formas nadadoras. |
| **8** | **Mandíbula** | `mandíbula`, `mandibula`, `piezas bucales` | Apéndice trófico | Apéndice masticador esclerotizado y calcificado que flanquea la boca; en la lámina se señala como la pieza bucal anterior más externa. |
| **9** | **Maxílula** | `maxílula`, `maxilula`, `primera maxila`, `Mx1` | Apéndice trófico | Primer par de maxilas delgadas y laminares encargadas de la manipulación de alimento hacia el atrio oral. |
| **10** | **Maxila** | `maxila`, `segunda maxila`, `Mx2` | Apéndice trófico | Segundo par de maxilas; provistas del escafognatito o lámina bailadora que genera corrientes respiratorias en la cámara branquial. |
| **11** | **Pereiópodos** | `pereiópodos`, `pereiopodos`, `patas torácicas`, `patas marchadoras`, `patas caminadoras` | Apéndice torácico | Cinco pares de apéndices torácicos (carácter que da nombre a *Decapoda*); los anteriores pueden estar quelados (pinzas) y los posteriores son marchadores. |
| **12** | **Pleópodos** *(Pelópodos)* | `pleópodos`, `pleopodos`, `pelópodos`, `pelopodos`, `patas natatorias`, `patas abdominales` | Apéndice abdominal | Apéndices birrámeos abdominales nadadores. *Nota de cátedra:* En la lámina original de clase figura con la grafía `"pelópodos"`, por lo que el juego debe aceptar ambas variantes. |
| **13** | **Telson** | `telson`, `pieza terminal`, `espina caudal` | Región post-segmentaria | Pieza terminal medial del cuerpo (no es un segmento verdadero por carecer de celoma y apéndices típicos); junto a los urópodos conforma el abanico caudal. |
| **14** | **Urópodos** | `urópodos`, `uropodos`, `aletas caudales` | Apéndice abdominal (6.° somita) | Sexto par de apéndices del pleón, anchos y aplanados en forma de paletas que flanquean al telson para propulsión natatoria de escape retrograda. |

---

## 3. Estructura JSON para el Motor de la Aplicación

```json
{
  "diagram_id": "malacostraca_decapoda_external_morphology",
  "title": "Morfología Externa de un Crustáceo Decápodo (Malacostraca)",
  "reference_image": "Decapoda_con_cosas.png",
  "game_image": "Decapoda_con_numeros.jpeg",
  "total_points": 1400,
  "points_per_target": 100,
  "parts": [
    {
      "number": 1,
      "canonical_name": "Cefalotórax",
      "accepted_inputs": ["cefalotorax", "cefalotórax"],
      "category": "tagma",
      "hint": "Tagma dorsal continuo formado por la fusión de la cabeza y el tórax."
    },
    {
      "number": 2,
      "canonical_name": "Cefalón",
      "accepted_inputs": ["cefalon", "cefalón", "cabeza"],
      "category": "tagma",
      "hint": "Región cefálica anterior portadora de ojos y apéndices sensoriales/bucales."
    },
    {
      "number": 3,
      "canonical_name": "Pereión",
      "accepted_inputs": ["pereion", "pereión", "tórax", "torax"],
      "category": "tagma",
      "hint": "Región torácica que sostiene los 5 pares de pereiópodos."
    },
    {
      "number": 4,
      "canonical_name": "Pleón",
      "accepted_inputs": ["pleon", "pleón", "abdomen"],
      "category": "tagma",
      "hint": "Abdomen segmentado y musculoso posterior."
    },
    {
      "number": 5,
      "canonical_name": "Anténula",
      "accepted_inputs": ["antenula", "anténula", "a1", "antena 1", "primer par de antenas"],
      "category": "apendice_cefalico",
      "hint": "Primer apéndice sensorial cefálico con estatocisto basal."
    },
    {
      "number": 6,
      "canonical_name": "Ojo",
      "accepted_inputs": ["ojo", "ojo compuesto", "ojo pedunculado"],
      "category": "organo_sensorial",
      "hint": "Estructura fotorreceptora compuesta sostenida por un pedúnculo móvil."
    },
    {
      "number": 7,
      "canonical_name": "Antena",
      "accepted_inputs": ["antena", "a2", "antena 2", "segundo par de antenas"],
      "category": "apendice_cefalico",
      "hint": "Segundo apéndice sensorial provisto de un largo flagelo táctil."
    },
    {
      "number": 8,
      "canonical_name": "Mandíbula",
      "accepted_inputs": ["mandibula", "mandíbula"],
      "category": "apendice_trofico",
      "hint": "Pieza bucal fuertemente calcificada y trituradora."
    },
    {
      "number": 9,
      "canonical_name": "Maxílula",
      "accepted_inputs": ["maxilula", "maxílula", "mx1", "primera maxila"],
      "category": "apendice_trofico",
      "hint": "Primer par de piezas maxilares laminares de manipulación de alimento."
    },
    {
      "number": 10,
      "canonical_name": "Maxila",
      "accepted_inputs": ["maxila", "mx2", "segunda maxila"],
      "category": "apendice_trofico",
      "hint": "Segundo par de maxilas provistas del escafognatito respiratorio."
    },
    {
      "number": 11,
      "canonical_name": "Pereiópodos",
      "accepted_inputs": ["pereiopodos", "pereiópodos", "patas toracicas", "patas torácicas", "patas marchadoras"],
      "category": "apendice_toracico",
      "hint": "Cinco pares de apéndices torácicos marchadores o prensiles."
    },
    {
      "number": 12,
      "canonical_name": "Pleópodos",
      "accepted_inputs": ["pleopodos", "pleópodos", "pelopodos", "pelópodos", "patas natatorias", "patas abdominales"],
      "category": "apendice_abdominal",
      "hint": "Apéndices birrámeos abdominales nadadores (rotulado como 'pelópodos' en la lámina)."
    },
    {
      "number": 13,
      "canonical_name": "Telson",
      "accepted_inputs": ["telson", "pieza terminal"],
      "category": "pieza_caudal",
      "hint": "Pieza terminal media sin apéndices que forma el centro del abanico caudal."
    },
    {
      "number": 14,
      "canonical_name": "Urópodos",
      "accepted_inputs": ["uropodos", "urópodos", "aletas caudales"],
      "category": "apendice_abdominal",
      "hint": "Sexto par de apéndices abdominales aplanados laterales al telson."
    }
  ]
}
```
