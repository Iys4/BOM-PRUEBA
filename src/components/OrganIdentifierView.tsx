import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  X,
  ChevronDown,
} from 'lucide-react';
import { normalizeText } from '../data/cnidariaDataset';
import {
  ANATOMY_DIAGRAMS,
  ALL_ANATOMY_SUGGESTIONS,
  AnatomyDiagram,
  AnatomyTargetPart,
} from '../data/anatomyDiagramsDataset';

interface OrganIdentifierViewProps {
  onBackToHome: () => void;
}

export function OrganIdentifierView({ onBackToHome }: OrganIdentifierViewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isDiagramMenuOpen, setIsDiagramMenuOpen] = useState<boolean>(false);

  // Track which diagram indices have been played/visited
  const [visitedIndices, setVisitedIndices] = useState<Record<number, boolean>>({ 0: true });

  // Memory across diagrams in session
  const [guessedByDiagramId, setGuessedByDiagramId] = useState<
    Record<string, Record<number, boolean>>
  >({});
  const [revealedByDiagramId, setRevealedByDiagramId] = useState<
    Record<string, Record<number, boolean>>
  >({});
  const [lastElevatedNumbers, setLastElevatedNumbers] = useState<number[]>([]);

  // Sticky thumbnail & lightbox modal
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

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const currentDiagram: AnatomyDiagram =
    ANATOMY_DIAGRAMS[currentIndex] || ANATOMY_DIAGRAMS[0];

  const guessedParts = useMemo(
    () => guessedByDiagramId[currentDiagram.id] || {},
    [guessedByDiagramId, currentDiagram.id]
  );

  const revealedParts = useMemo(
    () => revealedByDiagramId[currentDiagram.id] || {},
    [revealedByDiagramId, currentDiagram.id]
  );

  // Observe main image scroll for sticky preview
  useEffect(() => {
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
  }, [currentDiagram.id]);

  // Close diagram dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsDiagramMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear transient inputs when changing diagram (keeping guessed/revealed in memory)
  useEffect(() => {
    setLastElevatedNumbers([]);
    setPartInput('');
    setShowSuggestions(false);
    setInputFeedback(null);
    setNumberInputs({});
    setFocusedNumber(null);
    setIsThumbnailExpanded(false);
  }, [currentDiagram.id]);

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

  // Validate general top input submission
  const evaluateGeneralPartSubmission = (rawValue: string) => {
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

      const updated = { ...guessedParts };
      let pointsEarned = 0;
      const elevatedNums: number[] = [];

      for (const t of newlyGuessed) {
        updated[t.number] = true;
        pointsEarned += 100;
        elevatedNums.push(t.number);
      }

      setGuessedByDiagramId((prev) => ({
        ...prev,
        [currentDiagram.id]: updated,
      }));
      setScore((prev) => prev + pointsEarned);
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
    const norm = normalizeText(rawValue);
    if (!norm) return;

    if (doesTargetMatchInput(target, norm)) {
      const updated = { ...guessedParts, [target.number]: true };
      setGuessedByDiagramId((prev) => ({
        ...prev,
        [currentDiagram.id]: updated,
      }));
      setScore((prev) => prev + 100);
      setLastElevatedNumbers([target.number]);
      setNumberInputs((prev) => ({ ...prev, [target.number]: '' }));
      setFocusedNumber(null);
      setInputFeedback({
        type: 'success',
        message: `+100 pts — #${target.number}: ${target.canonicalName}`,
      });
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
    if (guessedParts[target.number] || revealedParts[target.number]) return;
    setRevealedByDiagramId((prev) => ({
      ...prev,
      [currentDiagram.id]: {
        ...(prev[currentDiagram.id] || {}),
        [target.number]: true,
      },
    }));
    setInputFeedback({
      type: 'info',
      message: `#${target.number}: ${target.canonicalName}`,
    });
  };

  // Back arrow only works if there is a previous diagram that was already played/visited
  const canGoPrev =
    currentIndex > 0 && Boolean(visitedIndices[currentIndex - 1]);
  const canGoNext = currentIndex < ANATOMY_DIAGRAMS.length - 1;

  const handlePrevDiagram = () => {
    if (!canGoPrev) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNextDiagram = () => {
    if (!canGoNext) return;
    const nextIdx = currentIndex + 1;
    setVisitedIndices((prev) => ({ ...prev, [nextIdx]: true }));
    setCurrentIndex(nextIdx);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Mini sticky photo top-left on scroll */}
      {isMainImageOutOfView && currentDiagram.imageUrl && (
        <div className="fixed top-3 left-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            onClick={() => setIsThumbnailExpanded(true)}
            className="group relative cursor-pointer bg-white p-1 rounded-xl shadow-lg border border-slate-200 hover:border-blue-500 transition-all"
            title="Click para ampliar imagen"
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
          {/* Back button */}
          <button
            onClick={onBackToHome}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center"
            title="Volver al menú principal"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Diagram Selector Dropdown */}
          <div ref={menuContainerRef} className="relative">
            <button
              onClick={() => setIsDiagramMenuOpen(!isDiagramMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <span>{currentDiagram.organismGroup}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {isDiagramMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-sm">
                {ANATOMY_DIAGRAMS.map((diag, idx) => (
                  <button
                    key={diag.id}
                    onClick={() => {
                      setVisitedIndices((prev) => ({ ...prev, [idx]: true }));
                      setCurrentIndex(idx);
                      setIsDiagramMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between ${
                      currentIndex === idx
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{diag.organismGroup}</span>
                    {currentIndex === idx && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Score & Arrows */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-mono font-bold text-xs sm:text-sm">
              <span>{score} pts</span>
            </div>

            {/* Previous Arrow (Only works if previous diagram was played) */}
            <button
              onClick={handlePrevDiagram}
              disabled={!canGoPrev}
              className={`p-2 rounded-lg border transition-colors ${
                canGoPrev
                  ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'
              }`}
              title="Anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNextDiagram}
              disabled={!canGoNext}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                canGoNext
                  ? 'bg-[#2563EB] hover:bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
              }`}
              title="Siguiente"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
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
              {
                currentDiagram.targets.filter(
                  (t) => guessedParts[t.number] || revealedParts[t.number]
                ).length
              }{' '}
              / {currentDiagram.targets.length}
            </span>
          </div>

          {/* Diagram Image Area */}
          <div
            ref={diagramImageRef}
            className="relative bg-white flex items-center justify-center overflow-hidden min-h-[280px] max-h-[500px] p-2 sm:p-4 border-b border-slate-200"
          >
            <img
              src={currentDiagram.imageUrl}
              alt={currentDiagram.title}
              className="w-full h-auto max-h-[470px] object-contain select-none"
            />

            <button
              onClick={() => setIsThumbnailExpanded(true)}
              className="absolute bottom-3 right-3 p-2 bg-slate-900/75 hover:bg-slate-900 text-white rounded-xl backdrop-blur-xs transition-colors"
              title="Ampliar diagrama"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
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

        {/* Bottom Navigation Bar */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200">
          <button
            onClick={handlePrevDiagram}
            disabled={!canGoPrev}
            className={`p-3 rounded-xl border font-bold transition-colors flex items-center justify-center ${
              canGoPrev
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'
            }`}
            title="Anterior"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextDiagram}
            disabled={!canGoNext}
            className={`px-6 py-3.5 rounded-xl font-bold text-base transition-all flex items-center gap-2 ${
              canGoNext
                ? 'bg-[#2563EB] hover:bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <span>Siguiente</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Expanded Diagram Lightbox Modal */}
      {isThumbnailExpanded && currentDiagram.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsThumbnailExpanded(false)}
        >
          <div
            className="relative max-w-5xl max-h-[92vh] bg-white rounded-2xl overflow-hidden border border-slate-300 flex flex-col items-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsThumbnailExpanded(false)}
              className="absolute top-3 right-3 p-2 bg-slate-900/75 hover:bg-slate-900 text-white rounded-xl z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={currentDiagram.imageUrl}
              alt={currentDiagram.title}
              className="max-h-[88vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
