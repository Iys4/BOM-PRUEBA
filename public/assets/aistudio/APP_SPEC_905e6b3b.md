# ESPECIFICACIÓN FUNCIONAL Y TÉCNICA: APP RECONOCIMIENTO CNIDARIOS BOM

## 1. Visión General del Proyecto
Herramienta didáctica interactiva orientada a la preparación del examen parcial práctico de Biología de Organismos Marinos (BOM). Simula la instancia evaluativa en la que el estudiante se enfrenta a un espécimen conservado en formol, debiendo identificar su jerarquía taxonómica completa, reconocer sus órganos y estructuras anatómicas diagnósticas y comprender los caracteres visibles tras la fijación.

---

## 2. Filosofía de Diseño y UI/UX
* **Estética**: Ultra-minimalista, limpia y enfocada en el contenido.
* **Paleta de Colores**:
  * Fondo: Blanco puro (`#FFFFFF`) y grises neutros muy sutiles para contenedores (`#F8FAFC`).
  * Botones y Acentos Primarios: Azul institucional/marino (`#0066CC` / `#2563EB`).
  * Estados de Interacción:
    * Éxito / Acierto: Verde esmeralda suave (`#10B981`) o elevación azul luminosa.
    * Error / Distractor: Rojo suave o gris neutro con feedback textual sutil (`#EF4444`).
* **Tipografía**: Sans-serif limpia, legible y moderna (Inter, System UI).
* **Navegación**: Cero textos superfluos o introducciones innecesarias; la pantalla de juego es directa, intuitiva y autoexplicativa.

---

## 3. Dinámica y Mecánica del Juego (Flujo por Espécimen)

### Fase 1: Entrada y Deducción Taxonómica
1. **Visualización**: Imagen central destacada del espécimen (en fresco o preservado en formol).
2. **Input de Texto Predictivo**:
   * Campo de texto ubicado inmediatamente debajo de la imagen.
   * **Motor de sugerencias dinámicas**: A partir de los primeros 2–3 caracteres ingresados (ej. `"por"`), el sistema despliega una lista de coincidencias posibles (ej. `Porpita`, `Porpita porpita`, `Poritidae`, `Porites furcata`).
   * **Objetivo pedagógico**: Evitar la frustración por ortografía en latín sin dar la respuesta servida en opciones múltiples fijas. El alumno debe recordar y escribir activamente.
3. **Reconocimiento Multinivel y No Lineal**:
   * El jugador puede ingresar cualquier nivel taxonómico válido asociado a la especie en cualquier orden:
     * Phylum (`Cnidaria`)
     * Subphylum (`Medusozoa`, `Anthozoa`)
     * Clase (`Hydrozoa`, `Scyphozoa`, `Cubozoa`, `Anthozoa`)
     * Subclase (`Hydroidolina`, `Trachylina`, `Hexacorallia`, `Octocorallia`, etc.)
     * Orden (`Siphonophorae`, `Leptothecata`, `Semaeostomeae`, `Carybdeida`, etc.)
     * Familia (`Physaliidae`, `Porpitidae`, etc.)
     * Género (`Physalia`, `Aurelia`, etc.)
     * Especie (`Physalia physalis`, `Aurelia aurita`, etc.)
4. **Animación y Puntuación**:
   * Al acertar un nivel válido, la etiqueta correspondiente se "eleva" con una animación fluida hacia el panel lateral junto a la imagen, colocándose en su posición jerárquica correspondiente.
   * Se otorga un puntaje inmediato de **+100 puntos** por cada taxón acertado.
5. **Tolerancia y Ausencia de Castigo Punitivo**:
   * Si la palabra no corresponde o es errónea, el campo muestra un breve efecto sutil (*shake* o mensaje informativo suave) sin restar puntos.

---

### Fase 2: Reconocimiento de Órganos y Estructuras Diagnósticas
* **Desbloqueo**: Se activa automáticamente una vez que el usuario identifica correctamente la **especie** o el **género** del espécimen.
* **Cuadrícula de Botones**:
   * Se despliega un conjunto de botones azules minimalistas con nombres de estructuras anatómicas.
   * La lista contiene los **órganos verdaderos** del organismo mezclados con **distractores clave** (órganos de otras clases u órdenes de Cnidaria vistos en BOM).
* **Interacción y Feedback Inmediato**:
   * **Acierto**: Al pulsar un órgano correcto, el botón cambia a verde/azul resaltado, se suma puntaje adicional (+50 pts) y queda seleccionado.
   * **Error**: Al pulsar un distractor, el botón muestra una indicación visual roja suave y un tooltip o micro-texto explicativo breve (ej. *"El velario es exclusivo de Cubozoa; esta especie presenta velo verdadero craspedota"*). No se restan puntos.
* **Criterio de Avance**: El jugador debe identificar todos los órganos y estructuras diagnósticas presentes en la muestra.

---

### Fase 3: Tarjeta Diagnóstica y Cierre de Ronda
* Al completar la identificación taxonómica y anatómica, se despliega una tarjeta de síntesis con:
  1. **Nombre científico completo y taxonomía resumida**.
  2. **Claves de observación en formol**: Descripción concisa de cómo se reconoce el espécimen fijado en el laboratorio (coloración opaca, retracción muscular de tentáculos, visibilidad de canales radiales, rigidez de pneumatóforo o esqueleto calcáreo/córneo).
  3. **Botón minimalista**: "Siguiente espécimen" para continuar con la práctica.

---

## 4. Estructura de Datos (Esquema JSON)

Cada espécimen de la base de datos se modela bajo la siguiente estructura estandarizada:

```json
{
  "id": "physalia_physalis",
  "common_name": "Carabela portuguesa",
  "image_url": "assets/img/physalia_physalis.jpg",
  "taxonomy": {
    "phylum": "Cnidaria",
    "subphylum": "Medusozoa",
    "class": "Hydrozoa",
    "subclass": "Hydroidolina",
    "order": "Siphonophorae",
    "suborder": "Cystonectae",
    "family": "Physaliidae",
    "genus": "Physalia",
    "species": "Physalia physalis"
  },
  "synonyms_accepted": [
    "Sifonóforos",
    "Fisalia"
  ],
  "organs": {
    "correct": [
      {
        "name": "Pneumatóforo",
        "description": "Vesícula flotadora llena de gas con cresta apical."
      },
      {
        "name": "Dactilozoides",
        "description": "Pólipos defensivos y de captura con tentáculos muy extensibles y nematocistos."
      },
      {
        "name": "Gastrozoides",
        "description": "Pólipos digestivos con boca funcional."
      },
      {
        "name": "Gonozoides / Gonóforos",
        "description": "Estructuras reproductivas racimosas."
      }
    ],
    "distractors": [
      {
        "name": "Nectóforos",
        "feedback": "Incorrecto: el suborden Cystonectae carece de campanas natatorias (nectóforos)."
      },
      {
        "name": "Velario",
        "feedback": "Incorrecto: el velario es una estructura exclusiva de la clase Cubozoa."
      },
      {
        "name": "Condróforo",
        "feedback": "Incorrecto: el disco quitinoso flotador es característico de Porpitidae (Porpita/Velella)."
      },
      {
        "name": "Brazos orales festoneados",
        "feedback": "Incorrecto: son estructuras diagnósticas de Scyphozoa (Semaeostomeae)."
      }
    ]
  },
  "preservation_notes": "En formol el flotador pierde sus tonos violáceos brillantes volviéndose translúcido o azulado pálido. Los tentáculos dactilozoides se contraen en masas filamentosas densas adheridas a la base del pneumatóforo."
}
```

---

## 5. Reglas de Validación para Agentes de Desarrollo
1. **Fidelidad Absoluta a los Contenidos de BOM**: No introducir especies, clasificaciones o terminología anatómica que no figure en los teóricos y protocolos de la materia.
2. **Separación de Lógica y Datos**: El motor de la app debe ser agnóstico del contenido; la información biológica debe residir íntegramente en archivos de datos modulares.
3. **Optimización Web**: Implementación en HTML5, CSS moderno (Flexbox/Grid, transiciones sutiles) y JavaScript sin librerías externas pesadas.
