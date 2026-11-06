# DIRECTIVAS DE DESARROLLO: RECONOCIMIENTO DE CNIDARIOS BOM (`AGENT_RULES.md`)

Este documento establece las reglas obligatorias de codificación, diseño y fidelidad taxonómica para cualquier agente o desarrollador que trabaje en la aplicación didáctica de reconocimiento práctico de Cnidarios del curso **BOM**.

---

## 1. Regla de Oro: Fidelidad Estricta al Material de BOM (Grounding)
1. **Cero alucinación taxonómica**: Queda terminantemente prohibido incorporar especies, géneros, familias u órganos que no figuren en `DATASET_CNIDARIA_BOM.md` o en los teóricos y protocolos de clase.
2. **Nomenclatura oficial de cátedra**: Respete rigurosamente las convenciones del curso (ej.: *Liriope tetraphylla*, *Olindias sambaquiensis*, *Lychnorhiza lucerna*, *Amphisbetia operculata*, *Tamoya haplonema*).
3. **Explicación diagnóstica real**: Todo distractor en la fase de órganos debe incluir su justificación morfológica real (ej.: explicar por qué *velario* es exclusivo de Cubozoa y no aplica a Hydrozoa).

---

## 2. Requisitos de UI/UX, Estética y Accesibilidad

### 2.1. Minimalismo y Limpieza Visual
* **Fondo predominante**: Blanco puro (`#FFFFFF`) con áreas de apoyo en gris ultra suave (`#F8FAFC`).
* **Botones e interacciones**: Azul primario vibrante (`#2563EB` o `#0066CC`), hover/active accesible y bordes redondeados (`rounded-xl` o `12px`).
* **Sin ruido superfluo**: Nada de textos explicativos largos, intros innecesarias o decoraciones pesadas. La pantalla debe presentar directamente el espécimen, el campo de entrada y los controles de juego.

### 2.2. Tipografía y Textos Grandes (Legibilidad de Laboratorio)
* **Tamaños de fuente generosos**:
  * Título / Estado del juego: mínimo `1.25rem` (20px).
  * Texto en input de búsqueda: mínimo `1.125rem` a `1.25rem` (18–20px) para evitar zoom involuntario en iOS y facilitar escritura rápida.
  * Etiquetas de taxonomía acertadas: `1rem` a `1.125rem` en negrita legible.
  * Botones de órganos: mínimo `1rem` (16px) con buen espaciado interno (padding amplio).
* **Contraste alto**: Texto principal en `#0F172A` (slate oscuro) sobre fondo claro; contraste WCAG AAA.

### 2.3. Diseño 100% Mobile-First y Responsivo
* **Optimizado para celulares**: Los alumnos suelen practicar con el teléfono en la mano o al lado de la mesa de microscopía.
* **Layout adaptable**:
  * En pantallas chicas (smartphone): Columna vertical limpia. Imagen visible en tercio superior (`max-height: 38vh`), inmediatamente debajo el input predictivo o los botones de órganos en grilla de 2 columnas táctiles.
  * En tablets/escritorio: Grid de 2 columnas (izquierda: espécimen + feedback; derecha: taxonomía resuelta y órganos).
* **Áreas táctiles (Touch Targets)**:
  * Todos los botones y sugerencias del autocompletado deben tener una altura mínima de `48px` para evitar toques erróneos con el pulgar.
  * Sin scrolling horizontal bajo ninguna circunstancia.

---

## 3. Mecánicas y Arquitectura de Juego

### 3.1. Fase 1: Input Predictivo Multinivel
* **Tolerancia y normalización**: Coincidencias sin distinción de mayúsculas/minúsculas ni tildes (`á` = `a`).
* **Sugerencias dinámicas**: Desplegar menú de sugerencias a partir de 2 caracteres tecleados.
* **Entrada no lineal**: El usuario puede ingresar la especie primero, o el orden, o la clase; cada acierto suma `+100 puntos` y eleva una etiqueta al panel de la ficha.
* **Feedback suave ante error**: Un shake sutil del input o cambio de borde momentáneo a rojo suave (`#EF4444`). **Nunca restar puntos**.

### 3.2. Fase 2: Identificación de Órganos
* **Desbloqueo automático**: Se activa al completar el nivel de género o especie.
* **Grilla aleatorizada**: Órganos verdaderos mezclados con 3–5 distractores diagnósticos de otras clases.
* **Feedback instantáneo**:
  * Órgano correcto: botón cambia a verde/azul (`#10B981` / `#2563EB`), suma puntos y queda seleccionado.
  * Órgano incorrecto: animación de temblor, color ámbar/rojo tenue y ventana emergente (o tooltip rápido) con la razón anatómica de exclusión (ej.: *"El velario es exclusivo de Cubomedusas, las hidromedusas presentan velo"*).

### 3.3. Fase 3: Ficha Final de Espécimen en Formol
* Al acertar todos los órganos diagnósticos, revelar una tarjeta concisa con:
  * Resumen taxonómico completo.
  * Aspecto real en formol (cambio de transparencia, retracción de tentáculos, visibilidad de canales).
  * Botón directo "Siguiente Espécimen" en azul prominente.

---

## 4. Estándares Técnicos de Código
* **Autonomía**: Código estructurado para funcionar como SPA (Single Page Application) sin dependencias pesadas de servidor.
* **Estado predecible**: Manejo claro de variables de sesión (`specimenIndex`, `score`, `guessedTaxa`, `selectedOrgans`, `isPhaseComplete`).
* **Rendimiento**: Carga instantánea, sin parpadeos ni demoras en la respuesta táctil.
