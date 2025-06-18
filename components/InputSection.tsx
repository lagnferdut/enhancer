
import React from 'react';
import { Dropdown } from './Dropdown';
import { Button } from './Button';
import { UI_TEXT, TONE_OPTIONS, USAGE_OPTIONS, LENGTH_OPTIONS, STYLE_OPTIONS } from '../constants';
import { Tone, Usage, ExpectedLength, LanguageStyle } from '../types';

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  usage: Usage;
  setUsage: (usage: Usage) => void;
  length: ExpectedLength;
  setLength: (length: ExpectedLength) => void;
  style: LanguageStyle;
  setStyle: (style: LanguageStyle) => void;
  onEnhance: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  tone,
  setTone,
  usage,
  setUsage,
  length,
  setLength,
  style,
  setStyle,
  onEnhance,
  isLoading,
}) => {
  return (
    <section className="p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700 space-y-6 transform transition-all hover:shadow-cyan-500/20 hover:border-cyan-500/30">
      <div>
        <label htmlFor="inputText" className="block text-sm font-medium text-cyan-400 mb-1">
          {UI_TEXT.INPUT_TEXT_LABEL}
        </label>
        <textarea
          id="inputText"
          rows={8}
          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-slate-500"
          placeholder={UI_TEXT.INPUT_TEXT_PLACEHOLDER}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Dropdown
          label={UI_TEXT.TONE_LABEL}
          options={TONE_OPTIONS}
          value={tone}
          onChange={(value) => setTone(value as Tone)}
          disabled={isLoading}
        />
        <Dropdown
          label={UI_TEXT.USAGE_LABEL}
          options={USAGE_OPTIONS}
          value={usage}
          onChange={(value) => setUsage(value as Usage)}
          disabled={isLoading}
        />
        <Dropdown
          label={UI_TEXT.LENGTH_LABEL}
          options={LENGTH_OPTIONS}
          value={length}
          onChange={(value) => setLength(value as ExpectedLength)}
          disabled={isLoading}
        />
        <Dropdown
          label={UI_TEXT.STYLE_LABEL}
          options={STYLE_OPTIONS}
          value={style}
          onChange={(value) => setStyle(value as LanguageStyle)}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onEnhance} isLoading={isLoading} disabled={isLoading || !inputText.trim()}>
          {isLoading ? UI_TEXT.PROCESSING : UI_TEXT.ENHANCE_BUTTON}
        </Button>
      </div>
    </section>
  );
};
