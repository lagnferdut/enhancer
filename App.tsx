
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorNotification } from './components/ErrorNotification';
import { callGeminiApi } from './services/geminiService';
import { calculateDiff, calculatePercentageChange } from './services/diffService';
import { UI_TEXT, API_KEY } from './constants';
import { Tone, Usage, ExpectedLength, LanguageStyle, DiffResultPart } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.NEUTRAL);
  const [usage, setUsage] = useState<Usage>(Usage.WEBSITE_CONTENT);
  const [length, setLength] = useState<ExpectedLength>(ExpectedLength.MEDIUM);
  const [style, setStyle] = useState<LanguageStyle>(LanguageStyle.SIMPLE);

  const [originalText, setOriginalText] = useState<string>('');
  const [enhancedText, setEnhancedText] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffResultPart[] | null>(null);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  useEffect(() => {
    if (!API_KEY) {
      setError(UI_TEXT.ERROR_API_KEY);
    }
  }, []);

  const handleEnhanceText = useCallback(async () => {
    if (!inputText.trim()) {
      setError(UI_TEXT.NO_TEXT_TO_ENHANCE);
      return;
    }
    if (!API_KEY) {
      setError(UI_TEXT.ERROR_API_KEY);
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedText('');
    setDiffResult(null);
    setShowDiff(false);

    try {
      const prompt = `Jesteś zaawansowanym asystentem AI specjalizującym się w ulepszaniu tekstów w języku polskim oraz innych językach. Ulepsz poniższy tekst, zachowując jego oryginalny język, jeśli nie jest to polski.

Oryginalny tekst:
"${inputText}"

Instrukcje dotyczące ulepszenia:
- Ton: ${tone}
- Zastosowanie: ${usage}
- Oczekiwana długość: ${length} (postaraj się dostosować długość, ale priorytetem jest jakość)
- Styl językowy: ${style}

Odpowiedz TYLKO ulepszonym tekstem, bez żadnych dodatkowych komentarzy, wstępów, czy wyjaśnień. Zachowaj oryginalny język tekstu wejściowego.`;

      const result = await callGeminiApi(prompt);
      setOriginalText(inputText);
      setEnhancedText(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message.includes("API key not valid")) {
             setError(`${UI_TEXT.ERROR_API_REQUEST} Sprawdź swój klucz API.`);
        } else {
             setError(`${UI_TEXT.ERROR_API_REQUEST} (${err.message})`);
        }
      } else {
        setError(UI_TEXT.ERROR_UNKNOWN);
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputText, tone, usage, length, style]);

  const handleShowChanges = useCallback(() => {
    if (originalText && enhancedText) {
      const diff = calculateDiff(originalText, enhancedText);
      const changePercentage = calculatePercentageChange(originalText, diff);
      setDiffResult(diff);
      setPercentageChange(changePercentage);
      setShowDiff(true);
    }
  }, [originalText, enhancedText]);

  const handleHideChanges = () => {
    setShowDiff(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 selection:bg-cyan-500 selection:text-slate-900">
      <Header />
      <main className="w-full max-w-4xl mt-8 space-y-8">
        {error && <ErrorNotification message={error} onClose={() => setError(null)} />}
        
        <InputSection
          inputText={inputText}
          setInputText={setInputText}
          tone={tone}
          setTone={setTone}
          usage={usage}
          setUsage={setUsage}
          length={length}
          setLength={setLength}
          style={style}
          setStyle={setStyle}
          onEnhance={handleEnhanceText}
          isLoading={isLoading}
        />

        {isLoading && <div className="flex justify-center py-8"><LoadingSpinner /></div>}

        {(originalText || enhancedText) && !isLoading && (
          <ResultsSection
            originalText={originalText}
            enhancedText={enhancedText}
            onShowChanges={handleShowChanges}
            onHideChanges={handleHideChanges}
            showDiff={showDiff}
            diffResult={diffResult}
            percentageChange={percentageChange}
          />
        )}
      </main>
      <footer className="w-full max-w-4xl mt-12 mb-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI Text Enhancer PL. Powered by Gemini.</p>
        <p className="text-xs mt-1">Pamiętaj, aby skonfigurować zmienną środowiskową API_KEY.</p>
      </footer>
    </div>
  );
};

export default App;
