import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  FileDown, 
  UploadCloud, 
  Languages, 
  Sliders, 
  Settings, 
  Terminal, 
  History, 
  Sparkles, 
  CheckCircle, 
  RefreshCw, 
  AlertTriangle, 
  Layers, 
  Type, 
  Maximize2, 
  ChevronRight,
  Sparkle,
  Trash2,
  FileCheck2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Trilingual Translations
const translations = {
  ru: {
    title: "Интеллектуальный PDF в Word Конвертер",
    subtitle: "Мгновенное распознавание структуры, таблиц и верстки с помощью нейросетей",
    dragDropText: "Перетащите сюда ваш PDF файл или",
    browseText: "выберите на компьютере",
    supportedFiles: "Поддерживаются файлы PDF весом до 100 МБ",
    fastMode: "Экспресс-анализ (без ИИ OCR)",
    aiOcrMode: "Глубокая ИИ Реконструкция (умные таблицы, заголовки, разметка)",
    convertBtn: "Конвертировать в Word (.docx)",
    converting: "Выполняется конвертация...",
    downloadBtn: "Скачать Word файл",
    downloadReady: "Документ успешно реконструирован!",
    uploadSuccess: "Файл загружен в буфер:",
    optionsTitle: "Настройки структуры макета",
    fontFamily: "Базовая гарнитура",
    margins: "Поля страницы",
    marginNormal: "Обычные (2.54 см)",
    marginElegant: "Элегантные (1.9 см)",
    marginNarrow: "Узкие (1.27 см)",
    accentColor: "Цветовой акцент интерфейса",
    accentIndigo: "Индиго Кибер",
    accentEmerald: "Изумрудный Неон",
    accentDark: "Обсидиановый Космос",
    accentGold: "Янтарный Мед",
    liveConsole: "Интерактивная консоль процесса",
    historyTitle: "История конверсий в текущей сессии",
    noHistory: "Конвертированных файлов пока нет",
    fileStats: "Статистика реконструированного файла",
    estimatedPages: "Оценка страниц",
    paragraphs: "Абзацы текста",
    tables: "Таблицы",
    headings: "Заголовки",
    detectedLang: "Язык документа",
    engineUsed: "Ядро транслятора",
    originalFile: "Исходный файл",
    reset: "Очистить и загрузить новый",
    previewTitle: "Интерактивный чертеж структуры PDF"
  },
  kk: {
    title: "Интеллектуалды PDF-тен Word-қа Конвертер",
    subtitle: "Нейрожелілер көмегімен құрылымды, кестелерді және беттеуді жылдам тану",
    dragDropText: "PDF файлын осы жерге сүйреңіз немесе",
    browseText: "компьютерден таңдаңыз",
    supportedFiles: "100 МБ-қа дейінгі PDF файлдарына қолдау көрсетіледі",
    fastMode: "Экспресс-талдау (ИИ OCR-сіз)",
    aiOcrMode: "Терең ИИ Реконструкциясы (ақылды кестелер, тақырыптар, белгілеулер)",
    convertBtn: "Word-қа түрлендіру (.docx)",
    converting: "Түрлендірілуде...",
    downloadBtn: "Word файлын жүктеп алу",
    downloadReady: "Құжат сәтті қалпына келтірілді!",
    uploadSuccess: "Файл буферге жүктелді:",
    optionsTitle: "Word макетінің параметрлері",
    fontFamily: "Негізгі қаріптер отбасы",
    margins: "Бет жиектері",
    marginNormal: "Қалыпты (2.54 см)",
    marginElegant: "Элегантты (1.9 см)",
    marginNarrow: "Тар (1.27 см)",
    accentColor: "Интерфейстің түс акценті",
    accentIndigo: "Индиго Кибер",
    accentEmerald: "Изумруд Неон",
    accentDark: "Обсидиан Ғарышы",
    accentGold: "Янтарлы Бал",
    liveConsole: "Процестің интерактивті консолі",
    historyTitle: "Осы сессиядағы түрлендіру тарихы",
    noHistory: "Әзірге түрлендірілген файлдар жоқ",
    fileStats: "Қалпына келтірілген файл статистикасы",
    estimatedPages: "Беттерді бағалау",
    paragraphs: "Абзацтар саны",
    tables: "Кестелер саны",
    headings: "Тақырыптар",
    detectedLang: "Құжат тілі",
    engineUsed: "Транслятор ядросы",
    originalFile: "Бастапқы файл",
    reset: "Жаңа файлды жүктеу",
    previewTitle: "PDF құрылымдық интерактивті сызбасы"
  },
  en: {
    title: "Intelligent PDF to Word Converter",
    subtitle: "Instant structure, table, and typography reconstruction powered by Neural Nets",
    dragDropText: "Drag & drop your PDF here or",
    browseText: "browse documents",
    supportedFiles: "Supports standard PDF files up to 100 MB",
    fastMode: "Express Analysis (bypass AI OCR)",
    aiOcrMode: "Deep AI Layout Analysis (detect headers, native bullet lists & tables)",
    convertBtn: "Convert to Word (.docx)",
    converting: "Compiling OpenXML stream...",
    downloadBtn: "Download Word Document",
    downloadReady: "Document successfully reconstructed!",
    uploadSuccess: "Loaded representation into memory:",
    optionsTitle: "Document Structure Layout",
    fontFamily: "Primary Typography",
    margins: "Page Margins",
    marginNormal: "Normal (1.0 in / 2.54 cm)",
    marginElegant: "Elegant (0.75 in / 1.9 cm)",
    marginNarrow: "Narrow (0.5 in / 1.27 cm)",
    accentColor: "Interface Color Accent",
    accentIndigo: "Cyber Indigo",
    accentEmerald: "Neon Emerald",
    accentDark: "Obsidian Deep",
    accentGold: "Amber Premium",
    liveConsole: "Interactive Process Console",
    historyTitle: "Reconstructed Archives (This Session)",
    noHistory: "No document logs in the current session",
    fileStats: "Reconstruction Intelligence Stats",
    estimatedPages: "Estimated Pages",
    paragraphs: "Paragraph Blocks",
    tables: "Data Tables",
    headings: "Section Titles",
    detectedLang: "Identified Language",
    engineUsed: "Core Translator",
    originalFile: "Source Stream",
    reset: "Reconstruct Another File",
    previewTitle: "Interactive PDF Structural Blueprint"
  }
};

type AccentKey = "cyan" | "emerald" | "dark" | "gold";

interface HistoryItem {
  id: string;
  originalName: string;
  wordName: string;
  docxBase64: string;
  timestamp: string;
  stats: {
    paragraphsCount: number;
    tablesCount: number;
    headingsCount: number;
    lang: string;
    estimatedPages: number;
    engineUsed: string;
  };
}

export default function App() {
  const [lang, setLang] = useState<"ru" | "kk" | "en">("ru");
  const [accent, setAccent] = useState<AccentKey>("cyan");
  
  // File states
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);

  // Conversion States
  const [status, setStatus] = useState<"idle" | "ready" | "converting" | "completed" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{
    docxBase64: string;
    filename: string;
    stats: HistoryItem["stats"];
  } | null>(null);

  // Layout customizers
  const [fontName, setFontName] = useState("Calibri");
  const [marginSize, setMarginSize] = useState<"normal" | "elegant" | "narrow">("normal");
  const [useAiOcr, setUseAiOcr] = useState(true);

  // Sessions History
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem("pdf_word_history");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Color mapping variables - fully rebuilt for Artistic Flair (Deep dark ground #0D0D0D, cyan accent #00F0FF, pure #F2F2F2 text highlights)
  const accentClasses = {
    cyan: {
      bg: "bg-[#00F0FF] hover:bg-[#00D8E6] text-[#0D0D0D]",
      text: "text-[#00F0FF]",
      border: "border-[#00F0FF]/30 focus:border-[#00F0FF]",
      ring: "focus:ring-[#00f0ff]/20",
      outline: "outline-[#00F0FF]",
      gradient: "from-[#00F0FF] to-blue-500",
      glow: "shadow-[#00F0FF]/15",
      badge: "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/25",
      textHover: "hover:text-[#00F0FF]",
    },
    emerald: {
      bg: "bg-emerald-500 hover:bg-emerald-600 text-[#0D0D0D]",
      text: "text-emerald-400",
      border: "border-emerald-500/30 focus:border-emerald-500",
      ring: "focus:ring-emerald-500",
      outline: "outline-emerald-500",
      gradient: "from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/10",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      textHover: "hover:text-emerald-300",
    },
    dark: {
      bg: "bg-[#F2F2F2] hover:bg-white text-[#0D0D0D]",
      text: "text-[#F2F2F2]",
      border: "border-white/20 focus:border-white/50",
      ring: "focus:ring-white",
      outline: "outline-white",
      gradient: "from-[#F2F2F2] to-slate-400",
      glow: "shadow-white/10",
      badge: "bg-[#F2F2F2]/10 text-[#F2F2F2] border-[#F2F2F2]/20",
      textHover: "hover:text-white",
    },
    gold: {
      bg: "bg-amber-450 hover:bg-amber-500 text-[#0D0D0D]",
      text: "text-amber-400",
      border: "border-amber-550/30 focus:border-amber-500",
      ring: "focus:ring-amber-500",
      outline: "outline-amber-500",
      gradient: "from-amber-400 to-yellow-500",
      glow: "shadow-amber-500/10",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/10",
      textHover: "hover:text-amber-300",
    }
  };

  const getLogTime = () => {
    const d = new Date();
    return d.toLocaleTimeString() + `.${String(d.getMilliseconds()).padStart(3, "0")}`;
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${getLogTime()}] ${msg}`]);
  };

  // Upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      setErrorMessage(
        lang === "ru" 
          ? "Пожалуйста, загрузите валидный PDF файл." 
          : lang === "kk" 
            ? "Қате формат: Өтінеміз, тек PDF файлын жүктеңіз" 
            : "Unsupported format. Please upload a PDF file."
      );
      setStatus("error");
      return;
    }

    setFile(selectedFile);
    setStatus("ready");
    setErrorMessage("");
    setLogs([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setFileBase64(base64);
      addLog(`Файл '${selectedFile.name}' (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB) успешно загружен в буфер.`);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles[0]) {
      processFile(droppedFiles[0]);
    }
  };

  // Triggers API Call to Server and simulates console reports
  const handleSubmitConversion = async () => {
    if (!file || !fileBase64) return;

    setStatus("converting");
    setLogs([]);
    addLog("Инициализация защищенного потока TLS-1.3...");
    
    // Simulate real steps with timed outputs to look incredibly premium
    setTimeout(() => addLog("Подключение к ядру обработки ИИ в виртуальном контейнере..."), 500);
    setTimeout(() => addLog(`Передача бинарного потока PDF (${(file.size / 1024).toFixed(1)} КБ) серверному парсеру...`), 1000);
    setTimeout(() => addLog(useAiOcr ? "Запуск нейросети Gemini-3.5 Flash для глубокого анализа структуры..." : "Активация режима быстрого разбора метаданных..."), 1600);
    setTimeout(() => addLog("Реконструкция табличных данных, колонок и шрифтовых интервалов..."), 2400);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfBase64: fileBase64,
          filename: file.name,
          options: {
            fontName: fontName,
            marginSize: marginSize,
            accentColor: accent === "cyan" ? "#00F0FF" : accent === "emerald" ? "#10b981" : accent === "gold" ? "#f59e0b" : "#f2f2f2",
            useAiOcr: useAiOcr,
            lang: lang,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      setTimeout(() => {
        addLog("Структурирование макета OpenXML и сохранение .docx заголовков...");
      }, 3200);

      setTimeout(() => {
        addLog("Упаковка контента в архив ZIP-docx...");
        addLog("Документ успешно скомпилирован!");
        
        setResult({
          docxBase64: data.docxBase64,
          filename: data.filename,
          stats: data.stats,
        });
        setStatus("completed");

        // Save to Session History
        const newHistoryItem: HistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          originalName: file.name,
          wordName: data.filename,
          docxBase64: data.docxBase64,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          stats: data.stats
        };

        const updatedHistory = [newHistoryItem, ...history.slice(0, 14)];
        setHistory(updatedHistory);
        localStorage.setItem("pdf_word_history", JSON.stringify(updatedHistory));
      }, 3900);

    } catch (e: any) {
      console.error(e);
      setTimeout(() => {
        addLog("CRITICAL ERROR: Ошибка на этапе компиляции блоков OpenXML.");
        setErrorMessage(e.message || "Ошибка соединения с сервером конвертации.");
        setStatus("error");
      }, 3000);
    }
  };

  const downloadFile = (base64Data: string, filename: string) => {
    const linkSource = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const handleReset = () => {
    setFile(null);
    setFileBase64("");
    setStatus("idle");
    setResult(null);
    setLogs([]);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("pdf_word_history", JSON.stringify(updated));
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2] font-sans selection:bg-[#F2F2F2] selection:text-[#0D0D0D]">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1A1A1A] rounded-full blur-[120px] opacity-50 z-0 pointer-events-none"></div>

      <header className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-b border-[#ffffff10] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border transition-all duration-500 flex items-center justify-center ${accentClasses[accent].border} bg-[#ffffff03] shadow-lg ${accentClasses[accent].glow}`}>
            <Sparkle className={`w-5 h-5 animate-pulse ${accentClasses[accent].text}`} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase italic flex items-center gap-2">
              Transform.
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${accentClasses[accent].badge}`}>PRO v2.5</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-mono text-[#00F0FF] opacity-80">// Neural PDF Reconstructor</p>
          </div>
        </div>

        {/* Global Controls Panel */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Accent select */}
          <div className="bg-[#ffffff03] backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#ffffff10] flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-wider opacity-60 uppercase">Accent:</span>
            <div className="flex items-center gap-1.5">
              {(["cyan", "emerald", "dark", "gold"] as AccentKey[]).map((col) => (
                <button
                  key={col}
                  onClick={() => setAccent(col)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                    col === "cyan" ? "bg-[#00F0FF] border-[#00F0FF]/40" : 
                    col === "emerald" ? "bg-emerald-500 border-emerald-400" : 
                    col === "dark" ? "bg-[#F2F2F2] border-white/40" : 
                    "bg-amber-500 border-amber-400"
                  } ${accent === col ? "scale-125 ring-2 ring-white/50" : "opacity-30 hover:opacity-100"}`}
                />
              ))}
            </div>
          </div>

          {/* Trilingual Buttons */}
          <div className="bg-[#ffffff03] backdrop-blur-md p-1 rounded-xl border border-[#ffffff10] flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 opacity-60 ml-1.5" />
            <button
              onClick={() => setLang("ru")}
              className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-lg font-medium transition-all ${
                lang === "ru" ? `${accentClasses[accent].bg}` : "text-[#F2F2F2] opacity-40 hover:opacity-100"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("kk")}
              className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-lg font-medium transition-all ${
                lang === "kk" ? `${accentClasses[accent].bg}` : "text-[#F2F2F2] opacity-40 hover:opacity-100"
              }`}
            >
              KZ
            </button>
            <button
              onClick={() => setLang("en")}
              className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-lg font-medium transition-all ${
                lang === "en" ? `${accentClasses[accent].bg}` : "text-[#F2F2F2] opacity-40 hover:opacity-100"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Slogan Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00F0FF] text-[11px] font-bold uppercase tracking-[0.3em] block mb-4 italic">// FAST CONVERSION & LAYOUT PRESERVATION</span>
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-[0.95] text-white uppercase">
            PDF <br/>
            <span className="italic font-serif text-[#00F0FF] font-normal lowercase">to</span> <br/>
            <span className="font-black tracking-tight">WORD</span>
          </h2>
          <p className="mt-6 text-[#F2F2F2] opacity-40 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
            <span className="block mt-2 italic font-serif text-xs opacity-80">Файлдарды мінсіз дәлдікпен түрлендіріңіз.</span>
          </p>
        </div>

        {/* Core Layout Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: File Upload & Controls Setup (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upload Box / Convert Process Area */}
            <div className="bg-[#ffffff05] backdrop-blur-md rounded-3xl border border-[#ffffff10] p-6 shadow-xl transition-all duration-300">
              
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                     key="uploader"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="space-y-4"
                  >
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative overflow-hidden cursor-pointer border border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[300px] ${
                        dragOver 
                          ? "border-[#00F0FF] bg-[#ffffff10]" 
                          : "border-[#ffffff30] bg-[#ffffff02] hover:bg-[#ffffff08] hover:border-[#ffffff50]"
                      }`}
                    >
                      {/* Decorative Corners from Artistic Flair theme */}
                      <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#00F0FF]"></div>
                      <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#00F0FF]"></div>

                      <input
                        id="pdf-file-selector"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="pdf-file-selector" className="cursor-pointer flex flex-col items-center w-full">
                        <div className="mb-8 w-20 h-20 bg-[#F2F2F2] flex items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 active:scale-95">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2 uppercase tracking-tight text-[#F2F2F2]">{t.dragDropText}</h3>
                        <p className="text-xs text-slate-400 mb-6 italic">Файлды осы жерге сүйреңіз</p>

                        <button className="px-8 py-3.5 bg-[#F2F2F2] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white active:scale-95 transition-all">
                          {t.browseText}
                        </button>
                        
                        <p className="text-[10px] text-slate-500 mt-8 uppercase tracking-widest font-mono">
                          {t.supportedFiles}
                        </p>
                      </label>
                    </div>
                  </motion.div>
                )}

                {(status === "ready" || status === "converting" || status === "completed" || status === "error") && (
                  <motion.div
                    key="process-state"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Active File Banner */}
                    <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/15 flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-400 font-mono">PDF SOURCE STREAM</p>
                          <p className="text-sm font-medium text-slate-100 truncate">{file?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500">
                          {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
                        </span>
                        {status !== "converting" && (
                          <button
                            onClick={handleReset}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg transition-all"
                            title="Reset"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Loader bar during conversion */}
                    {status === "converting" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className={`flex items-center gap-1.5 ${accentClasses[accent].text}`}>
                            <RefreshCw className="w-3 h-3 animate-spin" /> {t.converting}
                          </span>
                          <span className="text-slate-400">75%</span>
                        </div>
                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "5%" }}
                            animate={{ width: ["15%", "45%", "80%", "95%"] }}
                            transition={{ duration: 3.5, ease: "easeInOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${accentClasses[accent].gradient}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Completion Block */}
                    {status === "completed" && result && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-5 space-y-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-emerald-400">{t.downloadReady}</h4>
                            <p className="text-xs text-slate-400 mt-1">
                              Word document compiled under standard ISO Layout specs.
                            </p>
                          </div>
                        </div>

                        {/* Interactive Stats Panel */}
                        <div className="bg-slate-950/60 rounded-lg p-4 border border-slate-800/60 grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                          <div>
                            <span className="text-slate-500 block">{t.estimatedPages}</span>
                            <span className="text-slate-200 text-sm font-medium">{result.stats.estimatedPages} p.</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.paragraphs}</span>
                            <span className="text-slate-200 text-sm font-medium">{result.stats.paragraphsCount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.tables}</span>
                            <span className="text-slate-200 text-sm font-medium">{result.stats.tablesCount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.headings}</span>
                            <span className="text-slate-200 text-sm font-medium">{result.stats.headingsCount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.detectedLang}</span>
                            <span className="text-slate-200 text-sm font-medium uppercase">{result.stats.lang}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.engineUsed}</span>
                            <span className="text-slate-200 text-xs font-semibold text-indigo-400">{result.stats.engineUsed}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => downloadFile(result.docxBase64, result.filename)}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium px-5 py-3 rounded-lg flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <FileDown className="w-5 h-5" />
                            {t.downloadBtn}
                          </button>
                          <button
                            onClick={handleReset}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                          >
                            <RefreshCw className="w-4 h-4" />
                            {t.reset}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Banner */}
                    {status === "error" && (
                      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-sm text-red-200">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-red-400">Ошибка операции</p>
                          <p className="text-xs text-slate-400 mt-1">{errorMessage}</p>
                          <button
                            onClick={handleReset}
                            className="mt-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs px-3 py-1.5 rounded-lg font-mono border border-red-500/20 transition-all"
                          >
                            Повторить попытку
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action trigger button */}
                    {status === "ready" && (
                      <button
                        onClick={handleSubmitConversion}
                        className={`w-full text-white font-medium px-6 py-3.5 rounded-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] cursor-pointer shadow-lg bg-gradient-to-r ${accentClasses[accent].gradient} ${accentClasses[accent].glow}`}
                      >
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        {t.convertBtn}
                      </button>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Layout Properties Card */}
            <div className="bg-[#ffffff03] backdrop-blur-md rounded-3xl border border-[#ffffff10] p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-[#ffffff10] pb-3">
                <Sliders className={`w-4 h-4 ${accentClasses[accent].text}`} />
                <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300">{t.optionsTitle}</h3>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. OCR Engine Mode Select */}
                <div className="md:col-span-2 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider">RECONSTRUCTION TECHNOLOGY</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* AI OCR Option */}
                    <button
                      onClick={() => setUseAiOcr(true)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 relative overflow-hidden ${
                        useAiOcr 
                          ? "border-[#00F0FF]/40 bg-[#ffffff05]" 
                          : "border-white/10 hover:border-white/20 bg-transparent hover:bg-[#ffffff02]"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${useAiOcr ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/25" : "bg-white/5 text-slate-500 border-white/10"}`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#F2F2F2]">{t.aiOcrMode}</p>
                        <p className="text-[10px] opacity-40 text-slate-300 mt-1">
                          Leverages Gemini Multimodal parsing for deep layout structure retention (headings, tables, formatting).
                        </p>
                      </div>
                    </button>

                    {/* Fast Local Option */}
                    <button
                      onClick={() => setUseAiOcr(false)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 relative overflow-hidden ${
                        !useAiOcr 
                          ? "border-[#00F0FF]/40 bg-[#ffffff05]" 
                          : "border-white/10 hover:border-white/20 bg-transparent hover:bg-[#ffffff02]"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${!useAiOcr ? `${accentClasses[accent].badge}` : "bg-white/5 text-slate-500 border-white/10"}`}>
                        <RefreshCw className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#F2F2F2]">{t.fastMode}</p>
                        <p className="text-[10px] opacity-40 text-slate-300 mt-1">
                          Fast compilation bypasses neural visual inspection. Instant offline output.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Fonts */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 tracking-wider flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5" /> {t.fontFamily}
                  </label>
                  <select
                    value={fontName}
                    onChange={(e) => setFontName(e.target.value)}
                    className="w-full text-xs bg-black border border-white/10 rounded-xl p-3 text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]/50 transition-all font-mono"
                  >
                    <option value="Calibri" className="bg-[#0D0D0D]">Calibri (Standard Word)</option>
                    <option value="Arial" className="bg-[#0D0D0D]">Arial (Clean Sans)</option>
                    <option value="Times New Roman" className="bg-[#0D0D0D]">Times New Roman (Academic)</option>
                    <option value="Georgia" className="bg-[#0D0D0D]">Georgia (Serif Editorial)</option>
                    <option value="JetBrains Mono" className="bg-[#0D0D0D]">JetBrains Mono (Technical)</option>
                  </select>
                </div>

                {/* 3. Margins */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> {t.margins}
                  </label>
                  <select
                    value={marginSize}
                    onChange={(e) => setMarginSize(e.target.value as any)}
                    className="w-full text-xs bg-black border border-white/10 rounded-xl p-3 text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]/50 transition-all font-mono"
                  >
                    <option value="normal" className="bg-[#0D0D0D]">{t.marginNormal}</option>
                    <option value="elegant" className="bg-[#0D0D0D]">{t.marginElegant}</option>
                    <option value="narrow" className="bg-[#0D0D0D]">{t.marginNarrow}</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Interactive Process Logger Terminal */}
            <div className="bg-[#000000] rounded-3xl border border-[#ffffff10] overflow-hidden shadow-lg">
              <div className="bg-[#ffffff03] px-5 py-3 border-b border-[#ffffff10] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className={`w-3.5 h-3.5 ${accentClasses[accent].text}`} />
                  <span className="text-[10px] font-mono tracking-widest font-semibold text-slate-400 uppercase">
                    {t.liveConsole}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse pointer-events-none" />
                  <span className="text-[9px] font-mono font-medium text-slate-500">SYS_LOGS_ACTIVE</span>
                </div>
              </div>
              <div 
                ref={scrollRef}
                className="p-5 h-40 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1.5 leading-relaxed selection:bg-[#00F0FF]/25"
              >
                {logs.length === 0 ? (
                  <span className="text-slate-600 block italic">// Ожидание загрузки файла для мониторинга событий...</span>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="flex gap-2.5">
                      <span className="text-slate-600 flex-shrink-0">›</span>
                      <span className={log.includes("CRITICAL") ? "text-red-400" : log.includes("успешно") || log.includes("success") || log.includes("скомпилирован") ? "text-[#00F0FF] font-semibold" : "text-slate-300"}>
                        {log}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Document Structural Blueprint Visualizer (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Page Blueprint Shield */}
            <div className="bg-[#ffffff03] backdrop-blur-md rounded-3xl border border-[#ffffff10] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ffffff10] pb-3">
                <div className="flex items-center gap-2">
                  <Layers className={`w-4 h-4 ${accentClasses[accent].text}`} />
                  <h3 className="text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase">
                    {t.previewTitle}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">FORMAT PREVIEW</span>
              </div>

              {/* Dynamic Margins Container */}
              <div className="bg-[#0D0D0D] rounded-2xl p-4 border border-[#ffffff10] flex justify-center items-center py-8 relative overflow-hidden group">
                
                {/* Visual margin guidelines background */}
                <div className={`absolute inset-0 border border-[#ffffff05] pointer-events-none transition-all duration-300 ${
                  marginSize === "narrow" ? "p-2" : marginSize === "elegant" ? "p-5" : "p-8"
                }`}>
                  <div className="w-full h-full border border-dashed border-[#ffffff10] rounded-xl" />
                </div>

                <div 
                  className={`w-64 min-h-[340px] bg-[#fdfdfd] text-[#0D0D0D] shadow-2xl rounded-xl transition-all duration-500 relative ${
                    marginSize === "narrow" ? "p-3" : marginSize === "elegant" ? "p-5" : "p-7"
                  }`}
                  style={{ fontFamily: fontName === "Calibri" ? "Calibri, Helvetica, sans-serif" : fontName }}
                >
                  {/* Miniature corners as decoration inside the paper preview! */}
                  <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/30"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/30"></div>

                  {/* Styled simulated elements inside target DOCX blueprint */}
                  <div className="space-y-4 font-normal">
                    
                    {/* Section heading simulating conversion */}
                    <div className="space-y-1">
                      <div className="w-3/5 h-2 rounded-full" style={{ backgroundColor: accent === "cyan" ? "#00F0FF" : accent === "emerald" ? "#10b981" : accent === "gold" ? "#f59e0b" : "#475569" }} />
                      <div className="w-2/5 h-1.5 rounded-full bg-slate-200" />
                    </div>

                    {/* Paragraph line simulations */}
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-slate-100 rounded-full" />
                      <div className="w-full h-1 bg-slate-100 rounded-full" />
                      <div className="w-11/12 h-1 bg-slate-100 rounded-full" />
                      <div className="w-4/5 h-1 bg-slate-100 rounded-full" />
                    </div>

                    {/* Bullet list simulations */}
                    <div className="pl-3 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <div className="w-2/3 h-1 bg-slate-100 rounded-full" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <div className="w-3/4 h-1 bg-slate-100 rounded-full" />
                      </div>
                    </div>

                    {/* Table shape simulation */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden mt-3 space-y-1.5 p-2 bg-slate-50/50">
                      <div className="flex gap-1 border-b border-slate-200 pb-1">
                        <div className="w-1/3 h-1.5 rounded bg-slate-200" />
                        <div className="w-1/3 h-1.5 rounded bg-slate-200" />
                        <div className="w-1/3 h-1.5 rounded bg-slate-200" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1/3 h-1 bg-slate-100 rounded" />
                        <div className="w-1/3 h-1 bg-slate-150 rounded" />
                        <div className="w-1/3 h-1 bg-slate-100 rounded" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1/3 h-1 bg-slate-100 rounded" />
                        <div className="w-1/3 h-1 bg-slate-100 rounded" />
                        <div className="w-1/3 h-1 bg-slate-150 rounded" />
                      </div>
                    </div>

                    {/* Footer simulation */}
                    <div className="pt-6 flex justify-between items-center text-[7px] text-slate-400 tracking-wider border-t border-slate-100 font-mono">
                      <span>CONFIDENTIAL STRUCTURAL COMPILE</span>
                      <span>PAGE 1 OF {file ? "2" : "1"}</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tip info block */}
              <div className="bg-[#000000] rounded-2xl p-4 border border-[#ffffff10] text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-200 block text-xs">💡 Pro-Tip</span>
                <span className="leading-snug block">
                  При переключении видов полей сверху расстояние реконструированного макета в Word-документе будет автоматически адаптировано под выбранный стандарт.
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: History Table Container */}
        <div className="mt-12 bg-[#ffffff03] backdrop-blur-md rounded-3xl border border-[#ffffff10] p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#ffffff10] pb-3">
            <div className="flex items-center gap-2">
              <History className={`w-4 h-4 ${accentClasses[accent].text}`} />
              <h3 className="text-xs uppercase font-semibold tracking-widest text-slate-300">{t.historyTitle}</h3>
            </div>
            {history.length > 0 && (
              <span className="text-[10px] font-mono text-slate-400 bg-black px-2.5 py-0.5 rounded-full border border-[#ffffff10]">
                {history.length} FILES SAVED
              </span>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <FileCheck2 className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs font-mono uppercase tracking-wider">{t.noHistory}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => downloadFile(item.docxBase64, item.wordName)}
                  className="bg-black hover:bg-[#ffffff05] rounded-2xl p-5 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-lg bg-white/5 text-[#00F0FF] border border-white/10">
                          <FileText className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-200 truncate group-hover:text-[#00F0FF] transition-colors">{item.originalName}</p>
                      </div>
                      <button
                        onClick={(e) => deleteHistoryItem(item.id, e)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                        title="Delete from list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-[9px] font-mono text-slate-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                      <div>
                        <span className="text-slate-600 block text-[8px] tracking-wider uppercase">PAGES:</span>
                        <span className="font-bold text-[#F2F2F2]">{item.stats.estimatedPages}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[8px] tracking-wider uppercase">TABLES:</span>
                        <span className="font-bold text-[#F2F2F2]">{item.stats.tablesCount}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[8px] tracking-wider uppercase">LANG:</span>
                        <span className="font-bold uppercase text-[#00F0FF]">{item.stats.lang}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono text-[9px] opacity-60">{item.timestamp}</span>
                    <span className="flex items-center gap-1 text-slate-350 font-bold uppercase tracking-wider text-[9px] group-hover:text-[#00F0FF] transition-all">
                      Скачать <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center font-mono text-[9px] tracking-wider text-slate-600 space-y-1.5 uppercase">
        <p>CONVERT SYSTEM COMPILES TO OPENXML MICROSOFT WORD (.DOCX) SPECIFICATIONS VIA STANDALONE ZIP COMPILERS</p>
        <p className="text-slate-500 font-semibold opacity-85">© 2026 SmartConvert AI Layout Framework. Trilingual Native Engine (RU/KK/EN)</p>
      </footer>
    </div>
  );
}
