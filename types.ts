
export enum Tone {
  PERSUASIVE = "Perswazyjny",
  EMPATHETIC = "Empatyczny",
  PROFESSIONAL = "Profesjonalny",
  NEUTRAL = "Neutralny",
  OPTIMISTIC = "Optymistyczny",
  ASSERTIVE = "Stanowczy",
  FRIENDLY = "Przyjazny",
}

export enum Usage {
  AD_COPY = "Tekst reklamowy",
  WEBSITE_CONTENT = "Treść na stronę",
  SOCIAL_MEDIA_POST = "Post na social media",
  EMAIL = "Email",
  BLOG_POST = "Artykuł blogowy",
  PRESENTATION = "Prezentacja",
  PRODUCT_DESCRIPTION = "Opis produktu",
  NEWS_ARTICLE = "Artykuł newsowy",
}

export enum ExpectedLength {
  TWEET = "Bardzo krótka (np. tweet, ~10-30 słów)",
  SHORT = "Krótka (np. nagłówek, ~30-60 słów)",
  MEDIUM = "Średnia (np. akapit, ~60-150 słów)",
  LONG = "Długa (np. sekcja, ~150-300 słów)",
  VERY_LONG = "Bardzo długa (np. esej, 300+ słów)",
}

export enum LanguageStyle {
  SIMPLE = "Prostym językiem",
  INDUSTRY = "Język branżowy",
  HUMOROUS = "Żartobliwie",
  FORMAL = "Formalny",
  CREATIVE = "Kreatywny",
  TECHNICAL = "Techniczny",
  ACADEMIC = "Akademicki",
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DiffResultPart {
  value: string;
  added?: boolean;
  removed?: boolean;
  count: number;
}
