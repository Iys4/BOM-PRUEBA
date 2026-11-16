/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Eye,
  ChevronDown,
  Maximize2,
  X,
  BookOpen,
  Trophy,
  Layers,
  Lock,
  History,
  Play,
  ListFilter,
  Crosshair,
} from 'lucide-react';
import {
  ALL_BOM_SPECIMENS,
  ALL_TAXONOMIC_SUGGESTIONS,
  normalizeText,
  CnidariaSpecimen,
  TaxonRankKey,
  TaxonRankInfo,
} from './data/cnidariaDataset';
import { EncyclopediaView } from './components/EncyclopediaView';
import { OrganIdentifierView } from './components/OrganIdentifierView';
import { InlineZoomableImage, FloatingZoomPopup } from './components/ZoomableImage';

interface QuizRecord {
  id: string;
  date: string;
  score: number;
  accuracy: number;
  specimensCount: number;
  ranksGuessed: number;
}

type AppScreen = 'home' | 'jugar_menu' | 'quiz' | 'encyclopedia' | 'organ_identifier' | 'results';
type QuizType = 'random10' | 'byOrder' | 'all';

type PhylumFilter =
  | 'ALL'
  | 'Cnidaria'
  | 'Mollusca'
  | 'Annelida'
  | 'Arthropoda'
  | 'Ctenophora'
  | 'Chaetognatha'
  | 'Sarcomastigophora'
  | 'Bryozoa';

interface PhylumOption {
  value: PhylumFilter;
  shortLabel: string;
  menuLabel: string;
}

const PHYLA_OPTIONS: PhylumOption[] = [
  { value: 'ALL', shortLabel: 'Todos', menuLabel: 'Todos los Phyla' },
  { value: 'Cnidaria', shortLabel: 'Cnidaria', menuLabel: 'Cnidaria' },
  { value: 'Mollusca', shortLabel: 'Mollusca', menuLabel: 'Mollusca' },
  { value: 'Annelida', shortLabel: 'Annelida', menuLabel: 'Annelida' },
  { value: 'Arthropoda', shortLabel: 'Arthropoda', menuLabel: 'Arthropoda (Crustacea)' },
  { value: 'Ctenophora', shortLabel: 'Ctenophora', menuLabel: 'Ctenophora' },
  { value: 'Chaetognatha', shortLabel: 'Chaetognatha', menuLabel: 'Chaetognatha' },
  {
    value: 'Sarcomastigophora',
    shortLabel: 'Foraminifera',
    menuLabel: 'Sarcomastigophora (Foraminifera)',
  },
  { value: 'Bryozoa', shortLabel: 'Bryozoa', menuLabel: 'Bryozoa (Ectoprocta)' },
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [quizType, setQuizType] = useState<QuizType>('all');
  const [selectedOrderName, setSelectedOrderName] = useState<string>('');
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState<boolean>(false);

  // Active specimens pool
  const [activePool, setActivePool] = useState<CnidariaSpecimen[]>(() => ALL_BOM_SPECIMENS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [phylumFilter, setPhylumFilter] = useState<PhylumFilter>('ALL');
  const [isPhylumMenuOpen, setIsPhylumMenuOpen] = useState<boolean>(false);

  // Sticky thumbnail & image preview modal
  const specimenImageRef = useRef<HTMLDivElement>(null);
  const [isMainImageOutOfView, setIsMainImageOutOfView] = useState<boolean>(false);
  const [isThumbnailExpanded, setIsThumbnailExpanded] = useState<boolean>(false);

  // Scoring and progress
  const [score, setScore] = useState<number>(0);
  const [sessionGuessedRanksCount, setSessionGuessedRanksCount] = useState<number>(0);
  const [sessionRevealedRanksCount, setSessionRevealedRanksCount] = useState<number>(0);

  // Persistent memory across specimens within the session
  const [guessedBySpecId, setGuessedBySpecId] = useState<Record<string, Record<string, boolean>>>({});
  const [revealedBySpecId, setRevealedBySpecId] = useState<Record<string, Record<string, boolean>>>({});
  const [lastElevatedRank, setLastElevatedRank] = useState<TaxonRankKey | null>(null);

  // Predictive inputs state
  const [taxInput, setTaxInput] = useState<string>('');
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [inputFeedback, setInputFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isShakingInput, setIsShakingInput] = useState<boolean>(false);

  // Per-rank filtered input state
  const [rankInputs, setRankInputs] = useState<Partial<Record<TaxonRankKey, string>>>({});
  const [focusedRankKey, setFocusedRankKey] = useState<TaxonRankKey | null>(null);
  const [shakingRankKey, setShakingRankKey] = useState<TaxonRankKey | null>(null);

  // Local storage history of quiz rounds
  const [quizRecords, setQuizRecords] = useState<QuizRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bom_quiz_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Compute unique orders across all specimens
  const uniqueOrders = useMemo(() => {
    const map = new Map<string, { order: string; phylum: string }>();
    for (const s of ALL_BOM_SPECIMENS) {
      const ord = s.taxonomy.order || s.taxonomy.subclass || s.taxonomy.class;
      if (ord && !map.has(ord)) {
        map.set(ord, { order: ord, phylum: s.taxonomy.phylum });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.order.localeCompare(b.order));
  }, []);

  // Filtered pool when in practice mode with phylum filter
  const currentFilteredList = useMemo(() => {
    if (quizType !== 'all') return activePool;
    if (phylumFilter === 'ALL') return activePool;
    return activePool.filter((s) => s.taxonomy.phylum === phylumFilter);
  }, [activePool, phylumFilter, quizType]);

  const currentSpecimen: CnidariaSpecimen =
    currentFilteredList[currentIndex % currentFilteredList.length] || ALL_BOM_SPECIMENS[0];

  const guessedRanks = useMemo(
    () => guessedBySpecId[currentSpecimen.id] || {},
    [guessedBySpecId, currentSpecimen.id]
  );

  const revealedRanks = useMemo(
    () => revealedBySpecId[currentSpecimen.id] || {},
    [revealedBySpecId, currentSpecimen.id]
  );

  // Observe main image scroll for sticky preview
  useEffect(() => {
    const el = specimenImageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainImageOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentSpecimen?.id, screen]);

  // Click outside to close phylum menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsPhylumMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear transient text inputs when switching specimens (while keeping guessedBySpecId & revealedBySpecId in memory)
  useEffect(() => {
    setLastElevatedRank(null);
    setTaxInput('');
    setShowSuggestions(false);
    setInputFeedback(null);
    setRankInputs({});
    setFocusedRankKey(null);
    setIsThumbnailExpanded(false);
  }, [currentSpecimen?.id]);

  // Total answered categories for current specimen (guessed OR revealed)
  const answeredRanksCount = useMemo(() => {
    return currentSpecimen.ranks.filter((r) => guessedRanks[r.key] || revealedRanks[r.key]).length;
  }, [currentSpecimen, guessedRanks, revealedRanks]);

  // Minimum 3 categories required to advance in "Jugar" modes; free movement in "Practicar con todas"
  const requiredRanksCount = useMemo(() => {
    return Math.min(3, currentSpecimen.ranks.length);
  }, [currentSpecimen]);

  const canAdvance = quizType === 'all' ? true : answeredRanksCount >= requiredRanksCount;

  // General predictive autocomplete suggestions (threshold: 2 characters)
  const suggestions = useMemo(() => {
    const normQuery = normalizeText(taxInput);
    if (normQuery.length < 2) return [];

    const alreadyGuessedNorms = new Set(
      currentSpecimen.ranks
        .filter((r) => guessedRanks[r.key] || revealedRanks[r.key])
        .flatMap((r) => [normalizeText(r.canonicalValue), ...r.acceptedAliases.map(normalizeText)])
    );

    const uniqueByDisplay = new Map<string, (typeof ALL_TAXONOMIC_SUGGESTIONS)[number]>();
    const startsWithMatches: typeof ALL_TAXONOMIC_SUGGESTIONS = [];
    const containsMatches: typeof ALL_TAXONOMIC_SUGGESTIONS = [];

    for (const item of ALL_TAXONOMIC_SUGGESTIONS) {
      if (alreadyGuessedNorms.has(item.normalized)) continue;
      if (uniqueByDisplay.has(item.normalized)) continue;
      if (item.normalized.startsWith(normQuery)) {
        uniqueByDisplay.set(item.normalized, item);
        startsWithMatches.push(item);
      } else if (item.normalized.includes(normQuery)) {
        uniqueByDisplay.set(item.normalized, item);
        containsMatches.push(item);
      }
    }

    return [...startsWithMatches, ...containsMatches].slice(0, 7);
  }, [taxInput, currentSpecimen, guessedRanks, revealedRanks]);

  // Per-rank filtered suggestions
  const getFilteredSuggestionsForRank = (rankKey: TaxonRankKey, rawQuery: string) => {
    const normQuery = normalizeText(rawQuery);
    if (normQuery.length < 1) return [];

    const uniqueNorms = new Set<string>();
    const startsWith: typeof ALL_TAXONOMIC_SUGGESTIONS = [];
    const contains: typeof ALL_TAXONOMIC_SUGGESTIONS = [];

    for (const item of ALL_TAXONOMIC_SUGGESTIONS) {
      if (item.rankKey !== rankKey) continue;
      if (uniqueNorms.has(item.normalized)) continue;

      if (item.normalized.startsWith(normQuery)) {
        uniqueNorms.add(item.normalized);
        startsWith.push(item);
      } else if (item.normalized.includes(normQuery)) {
        uniqueNorms.add(item.normalized);
        contains.push(item);
      }
    }

    return [...startsWith, ...contains].slice(0, 6);
  };

  const triggerInputShake = () => {
    setIsShakingInput(false);
    setTimeout(() => setIsShakingInput(true), 10);
  };

  const triggerRankShake = (rankKey: TaxonRankKey) => {
    setShakingRankKey(null);
    setTimeout(() => setShakingRankKey(rankKey), 10);
    setTimeout(() => setShakingRankKey(null), 400);
  };

  // Validate general taxonomic input
  const evaluateTaxonSubmission = (rawValue: string) => {
    const norm = normalizeText(rawValue);
    if (!norm) return;

    const matchedRanks = currentSpecimen.ranks.filter((rank) => {
      const canonicalNorm = normalizeText(rank.canonicalValue);
      return (
        canonicalNorm === norm ||
        rank.acceptedAliases.some((alias) => normalizeText(alias) === norm)
      );
    });

    if (matchedRanks.length > 0) {
      const newlyGuessed = matchedRanks.filter((r) => !guessedRanks[r.key] && !revealedRanks[r.key]);

      const speciesMatched = matchedRanks.some((r) => r.key === 'species');
      const genusRank = currentSpecimen.ranks.find((r) => r.key === 'genus');
      const autoCreditGenus =
        speciesMatched &&
        genusRank &&
        !guessedRanks['genus'] &&
        !revealedRanks['genus'] &&
        !newlyGuessed.some((r) => r.key === 'genus');

      if (newlyGuessed.length === 0 && !autoCreditGenus) {
        setInputFeedback({
          type: 'info',
          message: `"${matchedRanks[0].canonicalValue}" ya fue validado en la ficha taxonómica.`,
        });
        setTaxInput('');
        setShowSuggestions(false);
        return;
      }

      const updated = { ...guessedRanks };
      let pointsEarned = 0;

      for (const r of newlyGuessed) {
        updated[r.key] = true;
        pointsEarned += 100;
        setLastElevatedRank(r.key);
      }

      if (autoCreditGenus && genusRank) {
        updated['genus'] = true;
        pointsEarned += 100;
      }

      setGuessedBySpecId((prev) => ({
        ...prev,
        [currentSpecimen.id]: updated,
      }));
      setScore((prev) => prev + pointsEarned);
      setSessionGuessedRanksCount((prev) => prev + newlyGuessed.length + (autoCreditGenus ? 1 : 0));
      setTaxInput('');
      setShowSuggestions(false);

      const labelsGuessed = [
        ...newlyGuessed.map((r) => `${r.label}: ${r.canonicalValue}`),
        ...(autoCreditGenus && genusRank ? [`Género: ${genusRank.canonicalValue}`] : []),
      ].join(' · ');

      setInputFeedback({
        type: 'success',
        message: `+${pointsEarned} pts — ${labelsGuessed}`,
      });
      return;
    }

    // Did not match
    triggerInputShake();
    const otherSuggestion = ALL_TAXONOMIC_SUGGESTIONS.find((s) => s.normalized === norm);
    if (otherSuggestion) {
      setInputFeedback({
        type: 'error',
        message: `"${otherSuggestion.display}" (${otherSuggestion.rankLabel}) no corresponde a este espécimen.`,
      });
    } else {
      setInputFeedback({
        type: 'error',
        message: `"${rawValue.trim()}" no coincide con la taxonomía de este espécimen.`,
      });
    }
  };

  // Validate specific rank row input
  const evaluateSpecificRankSubmission = (rank: TaxonRankInfo, rawValue: string) => {
    const norm = normalizeText(rawValue);
    if (!norm) return;

    const isMatchForThisRank =
      normalizeText(rank.canonicalValue) === norm ||
      rank.acceptedAliases.some((alias) => normalizeText(alias) === norm);

    if (isMatchForThisRank) {
      const updated = { ...guessedRanks, [rank.key]: true };
      let pointsEarned = 100;

      const genusRank = currentSpecimen.ranks.find((r) => r.key === 'genus');
      const autoCreditGenus =
        rank.key === 'species' && genusRank && !guessedRanks['genus'] && !revealedRanks['genus'];
      if (autoCreditGenus) {
        updated['genus'] = true;
        pointsEarned += 100;
      }

      setGuessedBySpecId((prev) => ({
        ...prev,
        [currentSpecimen.id]: updated,
      }));
      setScore((prev) => prev + pointsEarned);
      setSessionGuessedRanksCount((prev) => prev + (autoCreditGenus ? 2 : 1));
      setLastElevatedRank(rank.key);
      setRankInputs((prev) => ({ ...prev, [rank.key]: '' }));
      setFocusedRankKey(null);
      setInputFeedback({
        type: 'success',
        message: `+${pointsEarned} pts — ${rank.label}: ${rank.canonicalValue}`,
      });
      return;
    }

    triggerRankShake(rank.key);
    const otherSuggestion = ALL_TAXONOMIC_SUGGESTIONS.find(
      (s) => s.rankKey === rank.key && s.normalized === norm
    );
    if (otherSuggestion) {
      setInputFeedback({
        type: 'error',
        message: `"${otherSuggestion.display}" (${rank.label}) no corresponde a este espécimen.`,
      });
    } else {
      setInputFeedback({
        type: 'error',
        message: `"${rawValue.trim()}" no corresponde a ${rank.label} de este espécimen.`,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxInput.trim()) return;
    if (showSuggestions && suggestions.length > 0 && activeSuggestionIdx >= 0) {
      const chosen = suggestions[activeSuggestionIdx];
      if (
        normalizeText(taxInput) === chosen.normalized ||
        activeSuggestionIdx > 0
      ) {
        evaluateTaxonSubmission(chosen.display);
        return;
      }
    }
    evaluateTaxonSubmission(taxInput);
  };

  // Reveal a rank (no point penalty, just doesn't award points)
  const handleRevealRank = (rank: TaxonRankInfo) => {
    if (guessedRanks[rank.key] || revealedRanks[rank.key]) return;
    setRevealedBySpecId((prev) => ({
      ...prev,
      [currentSpecimen.id]: {
        ...(prev[currentSpecimen.id] || {}),
        [rank.key]: true,
      },
    }));
    setSessionRevealedRanksCount((prev) => prev + 1);
    setInputFeedback({
      type: 'info',
      message: `${rank.label}: ${rank.canonicalValue}`,
    });
  };

  // Start 10-species random session
  const startRandom10Session = () => {
    const shuffled = shuffleArray([...ALL_BOM_SPECIMENS]).slice(0, 10);
    setActivePool(shuffled);
    setCurrentIndex(0);
    setQuizType('random10');
    setScore(0);
    setGuessedBySpecId({});
    setRevealedBySpecId({});
    setSessionGuessedRanksCount(0);
    setSessionRevealedRanksCount(0);
    setIsOrderPopupOpen(false);
    setScreen('quiz');
  };

  // Start Order session
  const startOrderSession = (orderName: string) => {
    const matching = shuffleArray(
      ALL_BOM_SPECIMENS.filter(
        (s) =>
          s.taxonomy.order === orderName ||
          s.taxonomy.subclass === orderName ||
          s.taxonomy.class === orderName
      )
    );
    if (matching.length === 0) return;
    setActivePool(matching);
    setCurrentIndex(0);
    setSelectedOrderName(orderName);
    setQuizType('byOrder');
    setScore(0);
    setGuessedBySpecId({});
    setRevealedBySpecId({});
    setSessionGuessedRanksCount(0);
    setSessionRevealedRanksCount(0);
    setIsOrderPopupOpen(false);
    setScreen('quiz');
  };

  // Start All Practice session
  const startAllPracticeSession = () => {
    setActivePool(shuffleArray([...ALL_BOM_SPECIMENS]));
    setCurrentIndex(0);
    setQuizType('all');
    setPhylumFilter('ALL');
    setScore(0);
    setGuessedBySpecId({});
    setRevealedBySpecId({});
    setSessionGuessedRanksCount(0);
    setSessionRevealedRanksCount(0);
    setScreen('quiz');
  };

  // Finish 10-species session and save to localStorage
  const finishRandom10Session = () => {
    const totalGuessed = sessionGuessedRanksCount;
    const totalRevealed = sessionRevealedRanksCount;
    const totalRanks = totalGuessed + totalRevealed;
    const accuracy = totalRanks > 0 ? Math.round((totalGuessed / totalRanks) * 100) : 100;

    const newRecord: QuizRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-UY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score,
      accuracy,
      specimensCount: 10,
      ranksGuessed: totalGuessed,
    };

    const updated = [newRecord, ...quizRecords].slice(0, 15);
    setQuizRecords(updated);
    try {
      localStorage.setItem('bom_quiz_records', JSON.stringify(updated));
    } catch {
      // Ignore quota errors
    }
    setScreen('results');
  };

  // Back arrow only works if there is a previous species and it was already played
  const canGoPrev = useMemo(() => {
    if (currentIndex <= 0) return false;
    if (quizType === 'all') return true;
    const prevSpec = currentFilteredList[currentIndex - 1];
    if (!prevSpec) return false;
    const g = guessedBySpecId[prevSpec.id] || {};
    const r = revealedBySpecId[prevSpec.id] || {};
    return Object.keys(g).length > 0 || Object.keys(r).length > 0;
  }, [currentIndex, quizType, currentFilteredList, guessedBySpecId, revealedBySpecId]);

  // Handle advancing to next specimen
  const handleNextSpecimen = () => {
    if (!canAdvance) return;

    if (quizType === 'random10') {
      if (currentIndex + 1 >= 10) {
        finishRandom10Session();
        return;
      }
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => (prev + 1) % currentFilteredList.length);
    }
  };

  const handlePrevSpecimen = () => {
    if (!canGoPrev) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Keyboard navigation
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
        evaluateTaxonSubmission(chosen.display);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Render Encyclopedia Screen
  if (screen === 'encyclopedia') {
    return <EncyclopediaView onBackToHome={() => setScreen('home')} />;
  }

  // Render Organ Identifier (Beta) Screen
  if (screen === 'organ_identifier') {
    return <OrganIdentifierView onBackToHome={() => setScreen('home')} />;
  }

  // Render Results Screen (for 10 Species Exam)
  if (screen === 'results') {
    const latestRecord = quizRecords[0];
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 sm:p-6 text-slate-900">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Puntaje Final</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
              <div className="text-xs uppercase font-bold text-blue-600">Puntos</div>
              <div className="text-3xl font-black text-blue-700 mt-1">{score}</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="text-xs uppercase font-bold text-emerald-600">Exactitud</div>
              <div className="text-3xl font-black text-emerald-700 mt-1">
                {latestRecord?.accuracy ?? 100}%
              </div>
            </div>
          </div>

          {quizRecords.length > 1 && (
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Historial</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {quizRecords.slice(1, 6).map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <span className="text-slate-500 font-mono">{rec.date}</span>
                    <span className="font-bold text-slate-800">{rec.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={startRandom10Session}
              className="w-full py-4 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Volver a jugar</span>
            </button>
            <button
              onClick={() => setScreen('home')}
              className="w-full py-4 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Inicio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Home Screen (Minimalist: Title "JUEGO BOM" + 3 stacked buttons)
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-10 text-center">
            JUEGO BOM
          </h1>

          <div className="w-full space-y-4">
            {/* 1. Blue button: Jugar */}
            <button
              onClick={() => setScreen('jugar_menu')}
              className="w-full py-4 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left shadow-xs"
            >
              <Play className="w-6 h-6 fill-white shrink-0" />
              <span>Jugar</span>
            </button>

            {/* 2. Gray button: Enciclopedia */}
            <button
              onClick={() => setScreen('encyclopedia')}
              className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left"
            >
              <BookOpen className="w-6 h-6 text-slate-700 shrink-0" />
              <span>Enciclopedia</span>
            </button>

            {/* 3. Gray button: Practicar con todas las especies */}
            <button
              onClick={startAllPracticeSession}
              className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left"
            >
              <Layers className="w-6 h-6 text-slate-700 shrink-0" />
              <span>Practicar con todas las especies</span>
            </button>

            {/* 4. Gray button: Identificador de órganos (beta) */}
            <button
              onClick={() => setScreen('organ_identifier')}
              className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left"
            >
              <Crosshair className="w-6 h-6 text-slate-700 shrink-0" />
              <span>Identificador de órganos (beta)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render JUGAR Dedicated Page (Screen: 'jugar_menu')
  if (screen === 'jugar_menu') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <header className="px-4 py-4 sm:px-6">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setScreen('home')}
              className="p-2.5 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-2 font-bold text-base"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
          <div className="w-full max-w-md space-y-4">
            {/* Highlighted Button: Jugar con 10 especies al azar */}
            <button
              onClick={startRandom10Session}
              className="w-full py-4 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left shadow-xs"
            >
              <Play className="w-6 h-6 fill-white shrink-0" />
              <span>Jugar con 10 especies al azar</span>
            </button>

            {/* Second Button: Jugar por orden */}
            <button
              onClick={() => setIsOrderPopupOpen(true)}
              className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-lg sm:text-xl rounded-xl transition-colors flex items-center gap-4 text-left"
            >
              <ListFilter className="w-6 h-6 text-slate-700 shrink-0" />
              <span>Jugar por orden</span>
            </button>
          </div>
        </div>

        {/* Popup for selecting Order */}
        {isOrderPopupOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsOrderPopupOpen(false)}
          >
            <div
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Jugar por orden
                </h3>
                <button
                  onClick={() => setIsOrderPopupOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5">
                {uniqueOrders.map((item) => (
                  <button
                    key={item.order}
                    onClick={() => startOrderSession(item.order)}
                    className="w-full py-3.5 px-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-left transition-colors flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-900 text-lg sm:text-xl">
                      {item.order}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      {item.phylum}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render QUIZ Mode Screen
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Mini sticky photo top-left on scroll */}
      {isMainImageOutOfView && currentSpecimen.imageUrl && (
        <div className="fixed top-3 left-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            onClick={() => setIsThumbnailExpanded(true)}
            className="group relative cursor-pointer bg-white p-1 rounded-xl shadow-lg border border-slate-200 hover:border-blue-500 transition-all"
            title="Click para ampliar imagen"
          >
            <img
              src={currentSpecimen.imageUrl}
              alt={currentSpecimen.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-slate-100"
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
            onClick={() => setScreen(quizType === 'all' ? 'home' : 'jugar_menu')}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Mode & Progress badge */}
          <div className="flex items-center gap-2">
            {quizType === 'random10' && (
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-800 text-xs sm:text-sm font-bold font-mono">
                {currentIndex + 1} / 10
              </span>
            )}
            {quizType === 'byOrder' && (
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-800 text-xs sm:text-sm font-bold font-mono">
                {selectedOrderName} ({currentIndex + 1}/{currentFilteredList.length})
              </span>
            )}
            {quizType === 'all' && (
              <div ref={menuContainerRef} className="relative">
                <button
                  onClick={() => setIsPhylumMenuOpen(!isPhylumMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  <span>
                    {PHYLA_OPTIONS.find((p) => p.value === phylumFilter)?.shortLabel || 'Phylum'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {isPhylumMenuOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-sm">
                    {PHYLA_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setPhylumFilter(opt.value);
                          setCurrentIndex(0);
                          setIsPhylumMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between ${
                          phylumFilter === opt.value ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{opt.shortLabel}</span>
                        {phylumFilter === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Score & Arrows */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-mono font-bold text-xs sm:text-sm">
              <span>{score} pts</span>
            </div>

            {/* Previous Specimen Arrow */}
            <button
              onClick={handlePrevSpecimen}
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

            {/* Next Specimen Arrow */}
            <button
              onClick={handleNextSpecimen}
              disabled={!canAdvance}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                canAdvance
                  ? 'bg-[#2563EB] hover:bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              title={
                canAdvance
                  ? 'Siguiente'
                  : `Completá al menos ${requiredRanksCount} categorías (${answeredRanksCount}/${requiredRanksCount})`
              }
            >
              {!canAdvance && <Lock className="w-4 h-4 text-slate-400" />}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        {/* Specimen Presentation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-6">
          {/* Main Photo Area with Inline Zoom & Pan */}
          <div ref={specimenImageRef}>
            {currentSpecimen.imageUrl ? (
              <InlineZoomableImage
                src={currentSpecimen.imageUrl}
                alt="Espécimen BOM"
                darkBg={true}
                onOpenPopup={() => setIsThumbnailExpanded(true)}
              />
            ) : (
              <div className="bg-slate-900 flex items-center justify-center min-h-[280px] text-white text-center p-8">
                <Eye className="w-12 h-12 text-slate-500 mx-auto mb-2" />
              </div>
            )}
          </div>

          {/* Top General Predictive Input Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200">
            <div className="relative">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={taxInput}
                  onChange={(e) => {
                    setTaxInput(e.target.value);
                    setShowSuggestions(true);
                    setActiveSuggestionIdx(0);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí cualquier categoría taxonómica..."
                  className={`flex-1 px-4 py-3 bg-slate-50 border rounded-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                    isShakingInput ? 'animate-shake border-red-500 bg-red-50/50' : 'border-slate-200'
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
                      key={`${item.rankKey}:${item.normalized}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        evaluateTaxonSubmission(item.display);
                      }}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                        idx === activeSuggestionIdx
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span>{item.display}</span>
                      <span className="text-xs uppercase font-bold text-slate-400 font-mono">
                        {item.rankLabel}
                      </span>
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

          {/* Taxonomic Hierarchy Rows */}
          <div className="p-4 sm:p-5 bg-white">
            <div className="space-y-2.5">
              {currentSpecimen.ranks.map((rank) => {
                const isGuessed = Boolean(guessedRanks[rank.key]);
                const isRevealed = Boolean(revealedRanks[rank.key]);
                const isCompleted = isGuessed || isRevealed;
                const isElevated = lastElevatedRank === rank.key;

                return (
                  <div
                    key={rank.key}
                    className={`p-3 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-blue-50/50 border-blue-200 text-blue-900'
                        : 'bg-slate-50 border-slate-200/90 text-slate-800'
                    } ${isElevated ? 'ring-2 ring-blue-500 scale-[1.01]' : ''} ${
                      shakingRankKey === rank.key ? 'animate-shake border-red-500' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-[130px]">
                        <span className="text-xs uppercase font-mono font-bold text-slate-500">
                          {rank.label}
                        </span>
                        {isCompleted && (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        )}
                      </div>

                      {/* Value or Input */}
                      <div className="flex-1 w-full sm:w-auto">
                        {isCompleted ? (
                          <div className="font-bold text-base sm:text-lg text-slate-900 italic">
                            {rank.canonicalValue}
                          </div>
                        ) : (
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={rankInputs[rank.key] || ''}
                              onFocus={() => setFocusedRankKey(rank.key)}
                              onChange={(e) => {
                                setRankInputs((prev) => ({
                                  ...prev,
                                  [rank.key]: e.target.value,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  evaluateSpecificRankSubmission(
                                    rank,
                                    rankInputs[rank.key] || ''
                                  );
                                }
                              }}
                              placeholder={rank.label}
                              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />

                            {/* Dropdown for rank-specific input */}
                            {focusedRankKey === rank.key &&
                              (rankInputs[rank.key] || '').length >= 1 && (
                                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden text-sm">
                                  {getFilteredSuggestionsForRank(
                                    rank.key,
                                    rankInputs[rank.key] || ''
                                  ).map((item) => (
                                    <div
                                      key={item.normalized}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        evaluateSpecificRankSubmission(rank, item.display);
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

                      {/* Only Revelar button (no Pista, no point penalty) */}
                      {!isCompleted && (
                        <div className="flex items-center shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleRevealRank(rank)}
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
            onClick={handlePrevSpecimen}
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
            onClick={handleNextSpecimen}
            disabled={!canAdvance}
            className={`px-6 py-3.5 rounded-xl font-bold text-base transition-all flex items-center gap-2 ${
              canAdvance
                ? 'bg-[#2563EB] hover:bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            {!canAdvance && <Lock className="w-4 h-4 text-slate-400" />}
            <span>
              {canAdvance
                ? quizType === 'random10' && currentIndex + 1 >= 10
                  ? 'Finalizar'
                  : 'Siguiente'
                : `${answeredRanksCount}/${requiredRanksCount}`}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Floating Draggable & Zoomable Photo Pop-up */}
      {isThumbnailExpanded && currentSpecimen.imageUrl && (
        <FloatingZoomPopup
          src={currentSpecimen.imageUrl}
          title="Vista ampliada del espécimen"
          darkBg={true}
          onClose={() => setIsThumbnailExpanded(false)}
        />
      )}
    </div>
  );
}
