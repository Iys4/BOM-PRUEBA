import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Check,
  ArrowLeft,
  Maximize2,
  Trophy,
  RotateCcw,
  Play,
} from 'lucide-react';
import { normalizeText } from '../data/cnidariaDataset';
import {
  ANATOMY_DIAGRAMS,
  ALL_ANATOMY_SUGGESTIONS,
  AnatomyDiagram,
  AnatomyTargetPart,
} from '../data/anatomyDiagramsDataset';
import { InlineZoomableImage, FloatingZoomPopup } from './ZoomableImage';

interface OrganIdentifierViewProps {
  onBackToHome: () => void;
}

const PR_STORAGE_KEY = 'bom_organ_pr_records_v1';

export function OrganIdentifierView({ onBackToHome }: OrganIdentifierViewProps) {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string | null>(null);
  const [isMatchFinished, setIsMatchFinished] = useState<boolean>(false);
  const [isNewPR, setIsNewPR] = useState<boolean>(false);

  // Personal Records per diagramId stored in localStorage
  const [prRecords, setPrRecords] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(PR_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Ignore storage errors
    }
    return {};
  });

  // Current individual match state
  const [score, setScore] = useState<number>(0);
  const [guessedParts, setGuessedParts] = useState<Record<number, boolean>>({});
  const [revealedParts, setRevealedParts] = useState<Record<number, boolean>>({});
  const [lastElevatedNumbers, setLastElevatedNumbers] = useState<number[]>([]);

  // Sticky thumbnail & floating popup
  const diagramImageRef = useRef<HTMLDivElement>(null);
  const [isMainImageOutOfView, setIsMainImageOutOfView] = useState<boolean>(false);
  const [isThumbnailExpanded, setIsThumbnailExpanded] = useState<boolean>(false);

  // Top general predictive input state
  const [partInput, setPartInput] = useState<string>('');
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [inputFeedback, setInputFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isShakingInput, setIsShakingInput] = useState<boolean>(false);

  // Per-number input state
  const [numberInputs, setNumberInputs] = useState<Record<number, string>>({});
  const [focusedNumber, setFocusedNumber] = useState<number | null>(null);
  const [shakingNumber, setShakingNumber] = useState<number | null>(null);

  const currentDiagram: AnatomyDiagram | null = useMemo(() => {
    if (!selectedDiagramId) return null;
    return ANATOMY_DIAGRAMS.find((d) => d.id === selectedDiagramId) || null;
  }, [selectedDiagramId]);

  // Save PR helper
  const saveRecordIfBetter = (diagramId: string, finalScore: number) => {
    setPrRecords((prev) => {
      const existing = prev[diagramId];
      const isBetter = existing === undefined || finalScore > existing;
      if (!isBetter) return prev;
      const updated = { ...prev, [diagramId]: finalScore };
      try {
        localStorage.setItem(PR_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  // Start or restart an individual match for a specific diagram
  const startDiagramMatch = (diagramId: string) => {
    setSelectedDiagramId(diagramId);
    setIsMatchFinished(false);
    setIsNewPR(false);
    setScore(0);
    setGuessedParts({});
    setRevealedParts({});
    setLastElevatedNumbers([]);
    setPartInput('');
    setShowSuggestions(false);
    setInputFeedback(null);
    setNumberInputs({});
    setFocusedNumber(null);
    setIsThumbnailExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finish the current match and record PR in localStorage
  const finishCurrentMatch = (finalScoreToSave?: number) => {
    if (!currentDiagram) return;
    const effectiveScore = finalScoreToSave !== undefined ? finalScoreToSave : score;
    const previousPR = prRecords[currentDiagram.id];
    const beatPR =
      previousPR === undefined
        ? effectiveScore > 0
        : effectiveScore > previousPR;

    saveRecordIfBetter(currentDiagram.id, effectiveScore);
    setIsNewPR(beatPR);
    setIsMatchFinished(true);
    setIsThumbnailExpanded(false);
  };

  // Observe main image scroll for sticky preview
  useEffect(() => {
    if (!currentDiagram || isMatchFinished) {
      setIsMainImageOutOfView(false);
      return;
    }
    const el = diagramImageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainImageOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentDiagram, isMatchFinished]);

  // General predictive suggestions (threshold: 2 characters)
  const suggestions = useMemo(() => {
    const normQuery = normalizeText(partInput);
    if (normQuery.length < 2) return [];

    const startsWithMatches: typeof ALL_ANATOMY_SUGGESTIONS = [];
    const containsMatches: typeof ALL_ANATOMY_SUGGESTIONS = [];

    for (const item of ALL_ANATOMY_SUGGESTIONS) {
      if (item.normalized.startsWith(normQuery)) {
        startsWithMatches.push(item);
      } else if (item.normalized.includes(normQuery)) {
        containsMatches.push(item);
      }
    }

    return [...startsWithMatches, ...containsMatches].slice(0, 7);
  }, [partInput]);

  // Suggestions for a specific number row input
  const getSuggestionsForRow = (rawQuery: string) => {
    const normQuery = normalizeText(rawQuery);
    if (normQuery.length < 2) return [];

    const startsWith: typeof ALL_ANATOMY_SUGGESTIONS = [];
    const contains: typeof ALL_ANATOMY_SUGGESTIONS = [];

    for (const item of ALL_ANATOMY_SUGGESTIONS) {
      if (item.normalized.startsWith(normQuery)) {
        startsWith.push(item);
      } else if (item.normalized.includes(normQuery)) {
        contains.push(item);
      }
    }

    return [...startsWith, ...contains].slice(0, 6);
  };

  const triggerInputShake = () => {
    setIsShakingInput(false);
    setTimeout(() => setIsShakingInput(true), 10);
  };

  const triggerRowShake = (num: number) => {
    setShakingNumber(null);
    setTimeout(() => setShakingNumber(num), 10);
    setTimeout(() => setShakingNumber(null), 400);
  };

  const doesTargetMatchInput = (target: AnatomyTargetPart, normInput: string) => {
    if (normalizeText(target.canonicalName) === normInput) return true;
    return target.acceptedInputs.some((alias) => normalizeText(alias) === normInput);
  };

  // Check if all targets are completed after an update, and auto-save PR
  const checkAndPersistProgress = (
    diagram: AnatomyDiagram,
    nextGuessed: Record<number, boolean>,
    nextRevealed: Record<number, boolean>,
    nextScore: number
  ) => {
    // Always keep PR updated if current score already exceeds previous PR
    if (nextScore > (prRecords[diagram.id] ?? -1)) {
      saveRecordIfBetter(diagram.id, nextScore);
    }

    const allCompleted = diagram.targets.every(
      (t) => nextGuessed[t.number] || nextRevealed[t.number]
    );
    if (allCompleted) {
      saveRecordIfBetter(diagram.id, nextScore);
    }
  };

  // Validate general top input submission
  const evaluateGeneralPartSubmission = (rawValue: string) => {
    if (!currentDiagram) return;
    const norm = normalizeText(rawValue);
    if (!norm) return;

    const matchedTargets = currentDiagram.targets.filter((t) =>
      doesTargetMatchInput(t, norm)
    );

    if (matchedTargets.length > 0) {
      const newlyGuessed = matchedTargets.filter(
        (t) => !guessedParts[t.number] && !revealedParts[t.number]
      );

      if (newlyGuessed.length === 0) {
        setInputFeedback({
          type: 'info',
          message: `"${matchedTargets[0].canonicalName}" ya fue completado.`,
        });
        setPartInput('');
        setShowSuggestions(false);
        return;
      }

      const updatedGuessed = { ...guessedParts };
      let pointsEarned = 0;
      const elevatedNums: number[] = [];

      for (const t of newlyGuessed) {
        updatedGuessed[t.number] = true;
        pointsEarned += 100;
        elevatedNums.push(t.number);
      }

      const nextScore = score + pointsEarned;
      setGuessedParts(updatedGuessed);
      setScore(nextScore);
      setLastElevatedNumbers(elevatedNums);
      setPartInput('');
      setShowSuggestions(false);

      const labelsText = newlyGuessed
        .map((t) => `#${t.number} ${t.canonicalName}`)
        .join(' · ');

      setInputFeedback({
        type: 'success',
        message: `+${pointsEarned} pts — ${labelsText}`,
      });

      checkAndPersistProgress(
        currentDiagram,
        updatedGuessed,
        revealedParts,
        nextScore
      );
      return;
    }

    // Did not match any part in this diagram
    triggerInputShake();
    setInputFeedback({
      type: 'error',
      message: `"${rawValue.trim()}" no corresponde a ninguna parte señalada en este espécimen.`,
    });
  };

  // Validate a specific numbered row input
  const evaluateSpecificNumberSubmission = (
    target: AnatomyTargetPart,
    rawValue: string
  ) => {
    if (!currentDiagram) return;
    const norm = normalizeText(rawValue);
    if (!norm) return;

    if (doesTargetMatchInput(target, norm)) {
      const updatedGuessed = { ...guessedParts, [target.number]: true };
      const nextScore = score + 100;
      setGuessedParts(updatedGuessed);
      setScore(nextScore);
      setLastElevatedNumbers([target.number]);
      setNumberInputs((prev) => ({ ...prev, [target.number]: '' }));
      setFocusedNumber(null);
      setInputFeedback({
        type: 'success',
        message: `+100 pts — #${target.number}: ${target.canonicalName}`,
      });

      checkAndPersistProgress(
        currentDiagram,
        updatedGuessed,
        revealedParts,
        nextScore
      );
      return;
    }

    triggerRowShake(target.number);
    setInputFeedback({
      type: 'error',
      message: `"${rawValue.trim()}" no corresponde al número #${target.number}.`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partInput.trim()) return;
    if (showSuggestions && suggestions.length > 0 && activeSuggestionIdx >= 0) {
      const chosen = suggestions[activeSuggestionIdx];
      if (
        normalizeText(partInput) === chosen.normalized ||
        activeSuggestionIdx > 0
      ) {
        evaluateGeneralPartSubmission(chosen.display);
        return;
      }
    }
    evaluateGeneralPartSubmission(partInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = suggestions[activeSuggestionIdx];
      if (chosen) {
        evaluateGeneralPartSubmission(chosen.display);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Reveal a specific numbered part (0 points, no penalty)
  const handleRevealTarget = (target: AnatomyTargetPart) => {
    if (!currentDiagram) return;
    if (guessedParts[target.number] || revealedParts[target.number]) return;
    const updatedRevealed = { ...revealedParts, [target.number]: true };
    setRevealedParts(updatedRevealed);
    setInputFeedback({
      type: 'info',
      message: `#${target.number}: ${target.canonicalName}`,
    });

    checkAndPersistProgress(
      currentDiagram,
      guessedParts,
      updatedRevealed,
      score
    );
  };

  // ---------------------------------------------------------------------------
  // VIEW 1: ANIMAL SELECTION LIST
  // ---------------------------------------------------------------------------
  if (!currentDiagram) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <h1 className="text-base sm:text-lg font-black text-slate-900">
              Identificador de órganos
            </h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto px-4 py-6 w-full">
          <div className="space-y-3">
            {ANATOMY_DIAGRAMS.map((diag) => {
              const pr = prRecords[diag.id];
              const hasPR = pr !== undefined;

              return (
                <div
                  key={diag.id}
                  onClick={() => startDiagramMatch(diag.id)}
                  className="group cursor-pointer p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/20 transition-all flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={diag.imageUrl}
                        alt={diag.organismGroup}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {diag.organismGroup}
                      </h2>

                      {hasPR && (
                        <div className="mt-0.5 text-xs sm:text-sm font-mono font-bold text-blue-600">
                          PR: {pr}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startDiagramMatch(diag.id);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#2563EB] group-hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Jugar</span>
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  const maxDiagramScore = currentDiagram.targets.length * 100;
  const completedCount = currentDiagram.targets.filter(
    (t) => guessedParts[t.number] || revealedParts[t.number]
  ).length;
  const allPartsCompleted = completedCount === currentDiagram.targets.length;
  const currentBestPR = Math.max(score, prRecords[currentDiagram.id] ?? 0);

  // ---------------------------------------------------------------------------
  // VIEW 2: RESULTS / PR SUMMARY FOR THIS ANIMAL
  // ---------------------------------------------------------------------------
  if (isMatchFinished) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 sm:p-6 text-slate-900 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {currentDiagram.organismGroup}
            </h2>
            {isNewPR && (
              <span className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider">
                ¡Nuevo Récord Personal (PR)!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
              <div className="text-xs uppercase font-bold text-blue-600">
                Puntaje Partida
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1 font-mono">
                {score}
              </div>
              <div className="text-xs text-blue-600/80 font-mono">
                / {maxDiagramScore} pts
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="text-xs uppercase font-bold text-emerald-600">
                Mejor PR
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-mono">
                {currentBestPR}
              </div>
              <div className="text-xs text-emerald-600/80 font-mono">
                / {maxDiagramScore} pts
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => startDiagramMatch(currentDiagram.id)}
              className="w-full py-3.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a jugar</span>
            </button>

            <button
              onClick={() => {
                setSelectedDiagramId(null);
                setIsMatchFinished(false);
              }}
              className="w-full py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
            >
              Volver a la lista de animales
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 3: INDIVIDUAL ANIMAL MATCH
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Mini sticky photo top-left on scroll */}
      {isMainImageOutOfView && currentDiagram.imageUrl && (
        <div className="fixed top-3 left-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            onClick={() => setIsThumbnailExpanded(true)}
            className="group relative cursor-pointer bg-white p-1 rounded-xl shadow-lg border border-slate-200 hover:border-blue-500 transition-all"
            title="Click para abrir pop-up con zoom"
          >
            <img
              src={currentDiagram.imageUrl}
              alt={currentDiagram.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border border-slate-100 bg-white"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
              <Maximize2 className="w-4 h-4 text-white drop-shadow-md" />
            </div>
          </div>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-3 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Back to animal list button */}
          <button
            onClick={() => {
              if (score > 0 || completedCount > 0) {
                saveRecordIfBetter(currentDiagram.id, score);
              }
              setSelectedDiagramId(null);
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-bold text-xs sm:text-sm"
            title="Volver a la lista de animales"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Lista</span>
          </button>

          {/* Animal Name */}
          <div className="text-xs sm:text-sm font-black text-slate-900 truncate px-2">
            {currentDiagram.organismGroup}
          </div>

          {/* Score & PR */}
          <div className="flex items-center gap-2 shrink-0">
            {prRecords[currentDiagram.id] !== undefined && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-700 font-mono font-bold text-xs">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                <span>PR: {prRecords[currentDiagram.id]}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-mono font-bold text-xs sm:text-sm">
              <span>{score} pts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-6">
          {/* Revealed Species / Organism Banner */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {currentDiagram.organismGroup}
            </h2>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-500">
              {completedCount} / {currentDiagram.targets.length}
            </span>
          </div>

          {/* Diagram Image Area with Inline Zoom & Pan */}
          <div ref={diagramImageRef}>
            <InlineZoomableImage
              src={currentDiagram.imageUrl}
              alt={currentDiagram.title}
              darkBg={false}
              onOpenPopup={() => setIsThumbnailExpanded(true)}
            />
          </div>

          {/* Top General Predictive Input Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200">
            <div className="relative">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={partInput}
                  onChange={(e) => {
                    setPartInput(e.target.value);
                    setShowSuggestions(true);
                    setActiveSuggestionIdx(0);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí cualquier parte u órgano del animal..."
                  className={`flex-1 px-4 py-3 bg-slate-50 border rounded-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                    isShakingInput
                      ? 'animate-shake border-red-500 bg-red-50/50'
                      : 'border-slate-200'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl text-base transition-colors"
                >
                  Validar
                </button>
              </form>

              {/* Autocomplete Dropdown List */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden text-base">
                  {suggestions.map((item, idx) => (
                    <div
                      key={item.normalized}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        evaluateGeneralPartSubmission(item.display);
                      }}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                        idx === activeSuggestionIdx
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span>{item.display}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Instant Validation Feedback */}
            {inputFeedback && (
              <div
                className={`mt-2.5 text-sm font-semibold px-3.5 py-2 rounded-lg animate-in fade-in ${
                  inputFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : inputFeedback.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {inputFeedback.message}
              </div>
            )}
          </div>

          {/* Numbered Parts List */}
          <div className="p-4 sm:p-5 bg-white">
            <div className="space-y-2.5">
              {currentDiagram.targets.map((target) => {
                const isGuessed = Boolean(guessedParts[target.number]);
                const isRevealed = Boolean(revealedParts[target.number]);
                const isCompleted = isGuessed || isRevealed;
                const isElevated = lastElevatedNumbers.includes(target.number);

                return (
                  <div
                    key={target.number}
                    className={`p-3 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-blue-50/50 border-blue-200 text-blue-900'
                        : 'bg-slate-50 border-slate-200/90 text-slate-800'
                    } ${isElevated ? 'ring-2 ring-blue-500 scale-[1.01]' : ''} ${
                      shakingNumber === target.number
                        ? 'animate-shake border-red-500'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-[85px]">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-sm ${
                            isCompleted
                              ? 'bg-[#2563EB] text-white'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          {target.number}
                        </span>
                        {isCompleted && (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        )}
                      </div>

                      {/* Value or Input */}
                      <div className="flex-1 w-full sm:w-auto">
                        {isCompleted ? (
                          <div className="font-bold text-base sm:text-lg text-slate-900">
                            {target.canonicalName}
                          </div>
                        ) : (
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={numberInputs[target.number] || ''}
                              onFocus={() => setFocusedNumber(target.number)}
                              onChange={(e) => {
                                setNumberInputs((prev) => ({
                                  ...prev,
                                  [target.number]: e.target.value,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  evaluateSpecificNumberSubmission(
                                    target,
                                    numberInputs[target.number] || ''
                                  );
                                }
                              }}
                              placeholder={`Parte #${target.number}`}
                              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />

                            {/* Dropdown for row-specific input */}
                            {focusedNumber === target.number &&
                              (numberInputs[target.number] || '').length >= 2 && (
                                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden text-sm">
                                  {getSuggestionsForRow(
                                    numberInputs[target.number] || ''
                                  ).map((item) => (
                                    <div
                                      key={item.normalized}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        evaluateSpecificNumberSubmission(
                                          target,
                                          item.display
                                        );
                                      }}
                                      className="px-3.5 py-2.5 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-slate-800"
                                    >
                                      {item.display}
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}
                      </div>

                      {/* Revelar button */}
                      {!isCompleted && (
                        <div className="flex items-center shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleRevealTarget(target)}
                            className="px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                          >
                            Revelar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200 gap-3">
          <button
            onClick={() => {
              if (score > 0 || completedCount > 0) {
                saveRecordIfBetter(currentDiagram.id, score);
              }
              setSelectedDiagramId(null);
            }}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm sm:text-base transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a la lista</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startDiagramMatch(currentDiagram.id)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm sm:text-base transition-colors flex items-center gap-1.5"
              title="Reiniciar partida de este animal"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>

            <button
              onClick={() => finishCurrentMatch(score)}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                allPartsCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-[#2563EB] hover:bg-blue-700 text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>
                {allPartsCompleted ? 'Ver resultado y PR' : 'Finalizar partida'}
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Draggable & Zoomable Diagram Pop-up */}
      {isThumbnailExpanded && currentDiagram.imageUrl && (
        <FloatingZoomPopup
          src={currentDiagram.imageUrl}
          title={currentDiagram.organismGroup}
          darkBg={false}
          onClose={() => setIsThumbnailExpanded(false)}
        />
      )}
    </div>
  );
}
