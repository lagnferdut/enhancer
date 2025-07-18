import { Tone, Usage, ExpectedLength, LanguageStyle, SelectOption } from './types';

export const TONE_OPTIONS: SelectOption[] = Object.entries(Tone).map(([_, label]) => ({ value: label, label }));
export const USAGE_OPTIONS: SelectOption[] = Object.entries(Usage).map(([_, label]) => ({ value: label, label }));
export const LENGTH_OPTIONS: SelectOption[] = Object.entries(ExpectedLength).map(([_, label]) => ({ value: label, label }));
export const STYLE_OPTIONS: SelectOption[] = Object.entries(LanguageStyle).map(([_, label]) => ({ value: label, label }));

export const UI_TEXT = {
  APP_TITLE: "AI Text Enhancer PL",
  APP_SUBTITLE: "Ulepsz swoje teksty z pomocą Gemini AI",
  INPUT_TEXT_LABEL: "Wklej swój tekst do edycji:",
  INPUT_TEXT_PLACEHOLDER: "Tutaj wklej tekst...",
  TONE_LABEL: "Ton tekstu:",
  USAGE_LABEL: "Zastosowanie:",
  LENGTH_LABEL: "Oczekiwana długość:",
  STYLE_LABEL: "Styl językowy:",
  ENHANCE_BUTTON: "Ulepsz tekst",
  PROCESSING: "Przetwarzanie...",
  ORIGINAL_TEXT_HEADER: "Tekst oryginalny:",
  ENHANCED_TEXT_HEADER: "Tekst ulepszony przez AI:",
  SHOW_CHANGES_BUTTON: "Pokaż zmiany",
  HIDE_CHANGES_BUTTON: "Ukryj zmiany",
  COPY_TO_CLIPBOARD: "Kopiuj",
  COPIED_SUCCESS: "Skopiowano!",
  DOWNLOAD_AS: "Pobierz jako:",
  PDF: "PDF",
  DOCX: "DOCX",
  TXT: "TXT",
  CHANGES_INFO: (percentage: number) => `Zmieniono ${percentage.toFixed(1)}% tekstu.`,
  NO_CHANGES_DETECTED: "Nie wykryto istotnych zmian.",
  ERROR_TITLE: "Wystąpił błąd",
  ERROR_API_KEY: "Klucz API Gemini nie jest skonfigurowany. Ustaw zmienną środowiskową API_KEY.",
  ERROR_API_REQUEST: "Błąd podczas komunikacji z API Gemini. Spróbuj ponownie.",
  ERROR_UNKNOWN: "Wystąpił nieznany błąd.",
  NO_TEXT_TO_ENHANCE: "Wprowadź tekst, aby go ulepszyć.",
  NO_ENHANCED_TEXT: "Brak ulepszonego tekstu do wyświetlenia.",
};

// Placeholder for API Key check. In a real app, this would be handled securely.
// For this frontend-only example, we'll check process.env directly.
// In a Vite app, environment variables prefixed with VITE_ are exposed to the client.
// export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// The instructions specify process.env.API_KEY
export const API_KEY = process.env.API_KEY;

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash';