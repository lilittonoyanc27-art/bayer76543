import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Languages, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Lock, 
  Unlock, 
  Activity, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Check,
  Star
} from "lucide-react";
import { questions, Question, Choice } from "./questions";

// Web Audio Engine for premium game feel (chimes, whistles, and buzzers)
class AudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
  }

  isMuted() {
    return this.muted;
  }

  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
    osc1.frequency.setValueAtTime(1046.50, now + 0.3); // C6

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.6);
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(130, now + 0.12);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  playUnlock() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.55);

    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  playWhistle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(950, now);
    osc1.frequency.linearRampToValueAtTime(1050, now + 0.15);
    osc1.frequency.linearRampToValueAtTime(950, now + 0.3);
    osc1.frequency.linearRampToValueAtTime(1050, now + 0.45);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1000, now);
    osc2.frequency.linearRampToValueAtTime(1100, now + 0.15);
    osc2.frequency.linearRampToValueAtTime(1000, now + 0.3);
    osc2.frequency.linearRampToValueAtTime(1100, now + 0.45);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  }
}

export default function App() {
  // Game states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
  const [earnedKeys, setEarnedKeys] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; textEs: string; textAm: string } | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [alwaysShowAm, setAlwaysShowAm] = useState<boolean>(false);
  const [shakeTileIndex, setShakeTileIndex] = useState<number | null>(null);

  // Translation toggles for active question (resets on index change)
  const [showQuestionAm, setShowQuestionAm] = useState<boolean>(false);
  const [showChoicesAm, setShowChoicesAm] = useState<Record<'a' | 'b' | 'c' | 'd', boolean>>({
    a: false, b: false, c: false, d: false
  });

  // Audio engine singleton reference
  const audio = useMemo(() => new AudioEngine(), []);

  // Update audio engine mute status
  useEffect(() => {
    audio.setMuted(isMuted);
  }, [isMuted, audio]);

  // Reset active translation toggles and selected choice when changing question
  useEffect(() => {
    setShowQuestionAm(false);
    setShowChoicesAm({ a: false, b: false, c: false, d: false });
    setSelectedChoiceId(null);
    setFeedback(null);
  }, [currentQuestionIdx]);

  // Handle choice selection
  const handleChoiceClick = (choiceId: 'a' | 'b' | 'c' | 'd') => {
    const question = questions[currentQuestionIdx];
    
    // If already answered correctly, we just show translations or do nothing
    if (answeredQuestions[question.id]) {
      return;
    }

    setSelectedChoiceId(choiceId);
    const isCorrect = choiceId === question.correctAnswer;

    if (isCorrect) {
      audio.playCorrect();
      setScore(prev => prev + 100 + streak * 10);
      setStreak(prev => prev + 1);
      setAnsweredQuestions(prev => ({ ...prev, [question.id]: true }));
      setEarnedKeys(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        textEs: "¡Correcto! Has ganado una llave de fútbol 🔑",
        textAm: "Ճիշտ է։ Դուք վաստակեցիք ֆուտբոլային բանալի 🔑"
      });
    } else {
      audio.playWrong();
      setStreak(0);
      setFeedback({
        isCorrect: false,
        textEs: "Incorrecto. ¡Sigue practicando! ❌",
        textAm: "Սխալ է։ Շարունակիր մարզվել։ ❌"
      });
    }
  };

  // Toggle single choice translation
  const toggleChoiceTranslation = (choiceId: 'a' | 'b' | 'c' | 'd', e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering answer selection
    setShowChoicesAm(prev => ({ ...prev, [choiceId]: !prev[choiceId] }));
  };

  // Click on any grass tile to unlock/reveal it
  const handleTileClick = (index: number) => {
    if (revealedPieces.includes(index)) return; // Already revealed
    
    if (earnedKeys > 0) {
      audio.playUnlock();
      setRevealedPieces(prev => [...prev, index]);
      setEarnedKeys(prev => prev - 1);

      // If this reveals the final piece, play victory whistle!
      if (revealedPieces.length + 1 === 24) {
        setTimeout(() => {
          audio.playWhistle();
        }, 300);
      }
    } else {
      audio.playWrong();
      setShakeTileIndex(index);
      setTimeout(() => setShakeTileIndex(null), 400);
    }
  };

  // Skip/Next controls
  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  // Reset entire game state
  const handleResetGame = () => {
    setCurrentQuestionIdx(0);
    setAnsweredQuestions({});
    setRevealedPieces([]);
    setEarnedKeys(0);
    setScore(0);
    setStreak(0);
    setSelectedChoiceId(null);
    setFeedback(null);
    setShowQuestionAm(false);
    setShowChoicesAm({ a: false, b: false, c: false, d: false });
    audio.playUnlock();
  };

  // Cheat options
  const handleRevealAllPieces = () => {
    setRevealedPieces(Array.from({ length: 24 }, (_, i) => i));
    setEarnedKeys(0);
    audio.playWhistle();
  };

  const handleEarnFreeKey = () => {
    setEarnedKeys(prev => prev + 1);
    audio.playCorrect();
  };

  const currentQuestion = questions[currentQuestionIdx];
  const isCorrectlyAnswered = answeredQuestions[currentQuestion.id];
  const totalCorrect = Object.keys(answeredQuestions).length;
  const isFinished = revealedPieces.length === 24;

  return (
    <div className="min-h-screen vibrant-body text-slate-800 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Decorative subtle stadium glowing backdrop */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-emerald-100/30 to-transparent pointer-events-none" />

      {/* Main Header Bar */}
      <header className="relative z-10 border-b-2 border-emerald-500/30 bg-white/80 backdrop-blur-md px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-display text-lg shadow-lg shadow-emerald-600/20 animate-bounce">
              ⚽
            </div>
            <div>
              <h1 className="font-display font-bold text-lg sm:text-xl tracking-tight text-emerald-950 flex items-center gap-2">
                <span>🇪🇸 🇦🇲 Quiz escolar y rompecabezas</span>
              </h1>
              <p className="text-xs text-emerald-700 font-semibold">
                Դպրոցական վիկտորինա և ֆուտբոլային փազլ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Translations Switch */}
            <button
              onClick={() => setAlwaysShowAm(!alwaysShowAm)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                alwaysShowAm 
                  ? "bg-amber-500 text-white border border-amber-600" 
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
              }`}
              title="Toggle always showing Armenian translations"
            >
              <Languages size={14} />
              <span>{alwaysShowAm ? "Թարգմանությունը՝ Միացված" : "Միացնել Թարգմանությունը"}</span>
            </button>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200 shadow-sm"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Restart Button */}
            <button
              onClick={handleResetGame}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-600 transition-colors border border-slate-200 shadow-sm flex items-center gap-1 text-xs font-medium"
              title="Reset Puzzle & Quiz"
            >
              <RotateCcw size={14} />
              <span className="hidden md:inline">Վերսկսել</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: The Football Puzzle Board (7 cols on large screens) */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="puzzle-stadium-vibrant text-white rounded-2xl border-2 border-emerald-600 p-4 shadow-xl">
            
            {/* Puzzle Progress Stats Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4 items-center">
              <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Միավորներ</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{score}</span>
              </div>

              <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Հարցեր</span>
                <span className="text-sm font-bold text-amber-400 font-mono">{totalCorrect} / 24</span>
              </div>

              <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Փազլ</span>
                <span className="text-sm font-bold text-sky-400 font-mono">{revealedPieces.length} / 24</span>
              </div>

              <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30 text-center col-span-3 sm:col-span-1 flex items-center justify-center gap-1">
                <div className="text-left sm:text-center">
                  <span className="block text-[10px] text-amber-300 uppercase tracking-wider font-bold">Բանալիներ</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-extrabold text-amber-300 font-mono">🔑 {earnedKeys}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Banner for Keys */}
            <div className="mb-4 text-center">
              {earnedKeys > 0 ? (
                <div className="bg-amber-500/20 border border-amber-400/40 text-amber-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium animate-pulse flex items-center justify-center gap-2">
                  <Unlock size={16} className="text-amber-400" />
                  <span>
                    ¡Tienes {earnedKeys} {earnedKeys === 1 ? "llave" : "llaves"}! Haz clic en cualquier casilla de césped para revelar el balón.
                  </span>
                </div>
              ) : revealedPieces.length === 24 ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                  <Trophy size={16} className="text-emerald-400" />
                  <span>
                    ¡Enhorabuena! Has revelado por completo el balón de fútbol en el campo.
                  </span>
                </div>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2">
                  <Lock size={14} className="text-emerald-400" />
                  <span>
                    Ճիշտ պատասխանեք հարցերին՝ բանալիներ վաստակելու համար:
                  </span>
                </div>
              )}
            </div>

            {/* Interactive 6x4 Soccer Pitch Puzzle Board */}
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border-2 border-emerald-800 bg-pitch shadow-2xl select-none">
              
              {/* Underlying Vector SVG Soccer Field & Soccer Ball (The fully revealed image) */}
              <div className="absolute inset-0 w-full h-full">
                <svg viewBox="0 0 600 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="ballShading" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="45%" stopColor="#f8fafc" />
                      <stop offset="80%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#64748b" />
                    </radialGradient>
                  </defs>

                  {/* Grass Pitch Stripes (12 stripes) */}
                  <rect x="0" y="0" width="50" height="400" fill="#225426" />
                  <rect x="50" y="0" width="50" height="400" fill="#1b4d21" />
                  <rect x="100" y="0" width="50" height="400" fill="#225426" />
                  <rect x="150" y="0" width="50" height="400" fill="#1b4d21" />
                  <rect x="200" y="0" width="50" height="400" fill="#225426" />
                  <rect x="250" y="0" width="50" height="400" fill="#1b4d21" />
                  <rect x="300" y="0" width="50" height="400" fill="#225426" />
                  <rect x="350" y="0" width="50" height="400" fill="#1b4d21" />
                  <rect x="400" y="0" width="50" height="400" fill="#225426" />
                  <rect x="450" y="0" width="50" height="400" fill="#1b4d21" />
                  <rect x="500" y="0" width="50" height="400" fill="#225426" />
                  <rect x="550" y="0" width="50" height="400" fill="#1b4d21" />

                  {/* Standard White Field Lines */}
                  <rect x="15" y="15" width="570" height="370" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" />
                  
                  {/* Penalty Box Left */}
                  <rect x="15" y="100" width="75" height="200" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" />
                  <rect x="15" y="150" width="25" height="100" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2" />
                  
                  {/* Penalty Box Right */}
                  <rect x="510" y="100" width="75" height="200" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" />
                  <rect x="560" y="150" width="25" height="100" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2" />

                  {/* Penalty Spots */}
                  <circle cx="90" cy="200" r="3" fill="rgba(255,255,255,0.6)" />
                  <circle cx="510" cy="200" r="3" fill="rgba(255,255,255,0.6)" />

                  {/* Center Circle & Line */}
                  <line x1="300" y1="15" x2="300" y2="385" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" />
                  <circle cx="300" cy="200" r="60" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" />
                  <circle cx="300" cy="200" r="5" fill="rgba(255,255,255,0.8)" />

                  {/* Corner Arcs */}
                  <path d="M 15 30 A 15 15 0 0 0 30 15" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                  <path d="M 585 30 A 15 15 0 0 0 570 15" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                  <path d="M 15 370 A 15 15 0 0 1 30 385" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                  <path d="M 585 370 A 15 15 0 0 1 570 385" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />

                  {/* Giant 3D Soccer Ball at Center Pitch - ONLY shown when puzzle is finished */}
                  {isFinished && (
                    <g id="soccer-ball" className="transition-transform duration-500 animate-bounce">
                      {/* Shadow underneath */}
                      <ellipse cx="300" cy="285" rx="72" ry="12" fill="rgba(0,0,0,0.4)" filter="blur(5px)" />
                      
                      {/* Ball Outline */}
                      <circle cx="300" cy="200" r="76" fill="#0c1d10" />
                      
                      {/* Ball Sphere Body with realistic radial 3D lighting gradient */}
                      <circle cx="300" cy="200" r="74" fill="url(#ballShading)" />

                      {/* Pentagons & Stitching Line Art of Classic Soccer Ball */}
                      {/* Central Pentagon */}
                      <polygon points="300,180 321,195 313,219 287,219 279,195" fill="#1e293b" stroke="#0f172a" strokeWidth="2.5" />
                      
                      {/* Radiating lines connecting panels */}
                      <line x1="300" y1="180" x2="300" y2="135" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="321" y1="195" x2="359" y2="183" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="313" y1="219" x2="321" y2="257" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="287" y1="219" x2="279" y2="257" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="279" y1="195" x2="241" y2="183" stroke="#0f172a" strokeWidth="2.5" />

                      {/* Top Outer Panel */}
                      <polygon points="300,135 328,124 300,105 272,124" fill="#334155" opacity="0.9" stroke="#0f172a" strokeWidth="2" />
                      <line x1="328" y1="124" x2="359" y2="138" stroke="#0f172a" strokeWidth="2" />
                      <line x1="272" y1="124" x2="241" y2="138" stroke="#0f172a" strokeWidth="2" />

                      {/* Top Right Outer Panel */}
                      <polygon points="359,183 371,153 359,138 328,124" fill="none" stroke="#0f172a" strokeWidth="2" />
                      <polygon points="359,183 371,153 373,205 348,222" fill="#1e293b" opacity="0.9" stroke="#0f172a" strokeWidth="2" />

                      {/* Bottom Right Outer Panel */}
                      <polygon points="321,257 348,252 359,228 348,222" fill="none" stroke="#0f172a" strokeWidth="2" />
                      <polygon points="321,257 348,252 329,273 300,273" fill="#334155" opacity="0.9" stroke="#0f172a" strokeWidth="2" />

                      {/* Bottom Left Outer Panel */}
                      <polygon points="279,257 252,252 241,228 252,222" fill="none" stroke="#0f172a" strokeWidth="2" />
                      <polygon points="279,257 252,252 271,273 300,273" fill="#1e293b" opacity="0.9" stroke="#0f172a" strokeWidth="2" />

                      {/* Top Left Outer Panel */}
                      <polygon points="241,183 229,153 241,138 272,124" fill="none" stroke="#0f172a" strokeWidth="2" />
                      <polygon points="241,183 229,153 227,205 252,222" fill="#334155" opacity="0.9" stroke="#0f172a" strokeWidth="2" />

                      {/* Curved stitch lines to emulate spheres */}
                      <path d="M 241,138 Q 300,105 359,138" fill="none" stroke="#0f172a" strokeWidth="2" opacity="0.3" />
                      <path d="M 227,205 Q 300,274 373,205" fill="none" stroke="#0f172a" strokeWidth="2" opacity="0.3" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Jigsaw Grid of 24 Tiles (6 cols x 4 rows) */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-[2px] p-[2px] bg-slate-950/25">
                {Array.from({ length: 24 }).map((_, index) => {
                  const isRevealed = revealedPieces.includes(index);
                  const canReveal = earnedKeys > 0 && !isRevealed;
                  const isShaking = shakeTileIndex === index;

                  return (
                    <div
                      key={index}
                      onClick={() => handleTileClick(index)}
                      className={`relative w-full h-full perspective-1000 cursor-pointer ${
                        isShaking ? "animate-shake" : ""
                      }`}
                    >
                      {/* 3D Card flipper */}
                      <div className={`w-full h-full transition-transform duration-700 preserve-3d ${
                        isRevealed ? "rotate-y-180" : ""
                      }`}>
                        
                        {/* FRONT: Covered Grass Tile */}
                        {!isRevealed && (
                          <div className={`absolute inset-0 backface-hidden rounded-md flex flex-col items-center justify-center border border-emerald-700/40 select-none ${
                            canReveal 
                              ? "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 animate-pulse"
                              : "grass-pattern"
                          }`}>
                            {/* Grid ID Label inside a shiny bubble */}
                            <div className={`flex items-center justify-center rounded-full w-7 h-7 sm:w-8 sm:h-8 text-xs font-display font-extrabold shadow-md ${
                              canReveal
                                ? "bg-amber-400 text-slate-950 scale-110"
                                : "bg-slate-900/60 text-emerald-300 border border-emerald-600/30"
                            }`}>
                              {index + 1}
                            </div>
                            
                            {/* Tiny Indicator badge */}
                            <div className="absolute bottom-1 right-1 text-[10px] text-emerald-400/50">
                              {canReveal ? "🔑" : "🔒"}
                            </div>
                          </div>
                        )}

                        {/* BACK: Empty / See-through to revealed field */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-md bg-transparent border border-white/10 flex items-center justify-center">
                          {isRevealed && (
                            <span className="text-white/20 text-xs font-display font-bold">⭐</span>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Complete Overlay Celebration */}
              {isFinished && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-30 animate-pulse" />
                    <div className="relative w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg border-2 border-amber-300">
                      🏆
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-amber-300">
                    ¡Puzle Completado!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 font-semibold">
                    Շնորհավորում ենք: Դուք հաջողությամբ բացեցիք ֆուտբոլի գնդակի ամբողջական փազլը:
                  </p>
                  
                  <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-6 font-mono text-xs sm:text-sm text-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[10px]">TOTAL SCORE</span>
                      <span className="font-bold text-emerald-400">{score} pts</span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-700" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">ANSWERS</span>
                      <span className="font-bold text-amber-400">{totalCorrect} / 24</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetGame}
                    className="mt-5 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-medium text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 transform hover:scale-105"
                  >
                    <RotateCcw size={16} />
                    <span>Jugar de nuevo / Խաղալ նորից</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cheat / Admin Panel inside the puzzle box */}
            <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[10px]">⚽ FIELD DEVEL DESIGN</span>
              <div className="flex gap-2">
                <button
                  onClick={handleEarnFreeKey}
                  className="px-2 py-1 bg-slate-900/50 hover:bg-slate-700 hover:text-amber-300 rounded border border-slate-700/50 transition-colors"
                >
                  +1 🔑 (Բանալի)
                </button>
                <button
                  onClick={handleRevealAllPieces}
                  className="px-2 py-1 bg-slate-900/50 hover:bg-slate-700 hover:text-emerald-300 rounded border border-slate-700/50 transition-colors"
                >
                  Բացել բոլորը
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Right Column: Quiz Question Area (5 cols on large screens) */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="sidebar-vibrant rounded-2xl p-5 shadow-xl relative">
            
            {/* Subject Tag & Pagination Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold font-display uppercase tracking-wider shadow-sm">
                  {currentQuestion.subjectEs}
                </span>
                <span className="text-emerald-300 text-xs font-mono">•</span>
                <span className="text-xs text-emerald-700 font-semibold">
                  {currentQuestion.subjectAm}
                </span>
              </div>
              
              <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50/80 px-2 py-1 rounded-md border border-emerald-200">
                {currentQuestionIdx + 1} / 24
              </div>
            </div>

            {/* Teacher Classroom Card Box */}
            <div className="bg-emerald-50/30 rounded-xl border-2 border-emerald-100 p-4 mb-5 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-1.5 text-emerald-400 hover:text-emerald-500 transition-colors pointer-events-none">
                <HelpCircle size={14} />
              </div>

              {/* Classroom / Teacher Avatar Layout */}
              <div className="flex items-start gap-3">
                {/* Spanish Teacher Avatar */}
                <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-400/60 flex-shrink-0 flex items-center justify-center text-2xl shadow-md overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-emerald-200/50" />
                  👩‍🏫
                </div>

                {/* Question bubble */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
                    <span>PROFESORA (ՈՒՍՈՒՑՉՈՒՀԻ)</span>
                    {isCorrectlyAnswered && (
                      <span className="text-emerald-700 text-[9px] flex items-center gap-0.5 font-bold normal-case bg-emerald-100 px-1.5 rounded-full">
                        <Check size={8} /> Լուծված
                      </span>
                    )}
                  </div>

                  {/* Spanish sentence click-to-translate target */}
                  <div 
                    onClick={() => setShowQuestionAm(!showQuestionAm)}
                    className="cursor-pointer group block pl-3 border-l-4 border-emerald-500"
                  >
                    <p className="text-slate-800 font-display font-semibold text-base sm:text-lg leading-relaxed hover:text-emerald-600 transition-colors">
                      {currentQuestion.questionEs}
                    </p>
                    
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1 group-hover:text-emerald-700 transition-colors">
                      💡 Click text to translate / Կտտացրեք թարգմանելու համար
                    </span>
                  </div>

                  {/* Animated Armenian Translation Slide Box */}
                  {(showQuestionAm || alwaysShowAm) && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-100 text-emerald-800 text-sm sm:text-base leading-relaxed font-sans font-semibold bg-emerald-50 px-2 py-1.5 rounded">
                      <span className="inline-block mr-1">🇦🇲</span>
                      {currentQuestion.questionAm}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Answer multiple choice options container */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] text-emerald-700 uppercase tracking-widest font-mono font-bold block mb-1">
                Elige la respuesta correcta (Ընտրիր ճիշտ պատասխանը)
              </span>

              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const isCorrectAnswer = choice.id === currentQuestion.correctAnswer;
                
                // Styling logic for feedback states in light theme
                let choiceStyle = "option-btn-vibrant text-slate-700 hover:bg-emerald-50/40 hover:border-emerald-400";
                
                if (isCorrectlyAnswered) {
                  if (isCorrectAnswer) {
                    choiceStyle = "option-btn-correct";
                  } else {
                    choiceStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-400 pointer-events-none";
                  }
                } else if (selectedChoiceId !== null) {
                  if (isSelected) {
                    if (isCorrectAnswer) {
                      choiceStyle = "option-btn-correct";
                    } else {
                      choiceStyle = "option-btn-wrong";
                    }
                  } else if (isCorrectAnswer && feedback?.isCorrect === false) {
                    choiceStyle = "option-btn-vibrant border-dashed border-emerald-500 text-emerald-800 bg-emerald-50/30";
                  } else {
                    choiceStyle = "opacity-45 bg-slate-50 border-slate-200 text-slate-400 pointer-events-none";
                  }
                }

                const isTranslationVisible = showChoicesAm[choice.id] || alwaysShowAm;

                return (
                  <div
                    key={choice.id}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden flex flex-col shadow-sm ${choiceStyle}`}
                  >
                    {/* Main choice row */}
                    <div 
                      onClick={() => handleChoiceClick(choice.id)}
                      className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Option ID tag */}
                        <div className={`w-6 h-6 rounded-lg text-xs font-mono font-extrabold flex items-center justify-center shrink-0 border uppercase ${
                          isSelected 
                            ? isCorrectAnswer 
                              ? "bg-emerald-600 text-white border-emerald-500" 
                              : "bg-rose-600 text-white border-rose-500"
                            : "bg-emerald-50 border-emerald-200 text-emerald-800"
                        }`}>
                          {choice.id}
                        </div>

                        {/* Spanish phrase */}
                        <span className="text-base font-bold tracking-wide truncate">
                          {choice.textEs}
                        </span>
                      </div>

                      {/* Right side helper items */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Click to Translate Icon */}
                        <button
                          onClick={(e) => toggleChoiceTranslation(choice.id, e)}
                          className={`p-1.5 rounded-lg border text-xs flex items-center justify-center transition-all ${
                            isTranslationVisible 
                              ? "bg-amber-100 text-amber-800 border-amber-300 shadow-inner" 
                              : "bg-slate-50 text-slate-500 border-slate-200/80 hover:bg-slate-100 hover:text-slate-850"
                          }`}
                          title="Translate this option"
                        >
                          <span className="font-semibold text-xs">🇦🇲</span>
                        </button>

                        {/* Status Check Icons */}
                        {isCorrectlyAnswered && isCorrectAnswer && (
                          <CheckCircle2 size={16} className="text-white" />
                        )}
                        {isSelected && !isCorrectAnswer && (
                          <XCircle size={16} className="text-white" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Translation */}
                    {isTranslationVisible && (
                      <div className="bg-emerald-50/50 px-4 py-2 border-t border-emerald-100 text-sm font-semibold text-emerald-800 italic flex items-center gap-2">
                        <span className="text-emerald-500 not-italic font-bold">🇦🇲</span>
                        {choice.textAm}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Answer feedback alert block */}
            {feedback && (
              <div className={`mt-5 p-3.5 rounded-xl border-2 flex items-start gap-2.5 animate-fade-in shadow-sm ${
                feedback.isCorrect 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950" 
                  : "bg-rose-50 border-rose-200 text-rose-950"
              }`}>
                <div className="text-lg shrink-0">
                  {feedback.isCorrect ? "🌟" : "💡"}
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-bold text-slate-900">{feedback.textEs}</p>
                  <p className="mt-0.5 text-slate-700 font-medium">{feedback.textAm}</p>
                </div>
              </div>
            )}

            {/* Quiz Navigation Row */}
            <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIdx === 0}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 disabled:opacity-30 disabled:pointer-events-none text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              >
                <ChevronLeft size={16} />
                <span>Anterior (Նախորդ)</span>
              </button>

              <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 text-xs shadow-sm">
                {streak >= 2 && (
                  <span className="text-amber-600 font-extrabold flex items-center gap-0.5 animate-bounce">
                    <Flame size={12} className="fill-amber-500" /> {streak}🔥
                  </span>
                )}
                <span className="font-bold text-emerald-950">
                  {currentQuestionIdx + 1} / 24
                </span>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIdx === questions.length - 1}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 disabled:opacity-30 disabled:pointer-events-none text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              >
                <span>Siguiente (Հաջորդ)</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* Quick Study Summary Card */}
          <div className="bg-white/85 rounded-2xl border-2 border-emerald-200 p-4 text-sm text-slate-700 shadow-sm">
            <h3 className="font-display font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
              <BookOpen size={14} className="text-emerald-500" />
              <span>Instrucciones / Ինստրուկցիաներ</span>
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
              <li>Կտտացրեք ուսուցչուհու հարցին՝ հայերեն թարգմանությունը տեսնելու համար:</li>
              <li>Կտտացրեք յուրաքանչյուր տարբերակի աջ կողմում գտնվող <span className="text-amber-500 font-bold">🇦🇲</span> կոճակին՝ դրա թարգմանությունը բացելու համար:</li>
              <li>Ճիշտ պատասխանելուց հետո դուք ստանում եք <span className="text-emerald-600 font-bold">🔑 Բանալի</span>. Կտտացրեք ձախ կողմում գտնվող ցանկացած կանաչ սալիկի վրա՝ այն բացելու և ֆուտբոլային գնդակը բացահայտելու համար:</li>
            </ul>
          </div>
        </section>

      </main>

      {/* Modern Footer bar */}
      <footer className="mt-auto border-t-2 border-emerald-500/20 bg-white/65 py-4 px-6 text-center text-xs text-emerald-800 font-semibold shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🇪🇸 🇦🇲 Quiz escolar de español para armenios con rompecabezas interactivo</span>
          <span>© 2026 • Դպրոցական իսպաներենի վիկտորինա</span>
        </div>
      </footer>
    </div>
  );
}
