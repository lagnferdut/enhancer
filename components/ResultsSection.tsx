
import React, { useState } from 'react';
import { DiffViewer } from './DiffViewer';
import { IconButton } from './IconButton';
import { exportToPDF, exportToDOCX, exportToTXT } from '../services/exportService';
import { UI_TEXT } from '../constants';
import { DiffResultPart } from '../types';

interface ResultsSectionProps {
  originalText: string;
  enhancedText: string;
  onShowChanges: () => void;
  onHideChanges: () => void;
  showDiff: boolean;
  diffResult: DiffResultPart[] | null;
  percentageChange: number;
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const EyeIcon: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
);

const EyeSlashIcon: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
</svg>
);


export const ResultsSection: React.FC<ResultsSectionProps> = ({
  originalText,
  enhancedText,
  onShowChanges,
  onHideChanges,
  showDiff,
  diffResult,
  percentageChange,
}) => {
  const [copyStatus, setCopyStatus] = useState<'original' | 'enhanced' | null>(null);

  const handleCopy = (text: string, type: 'original' | 'enhanced') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    });
  };

  if (!enhancedText && !originalText) {
    return <p className="text-center text-slate-500 py-8">{UI_TEXT.NO_ENHANCED_TEXT}</p>;
  }

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Text Box */}
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700 space-y-3 relative">
          <h3 className="text-lg font-semibold text-cyan-400">{UI_TEXT.ORIGINAL_TEXT_HEADER}</h3>
          <textarea
            readOnly
            value={originalText}
            className="w-full h-64 p-3 bg-slate-700/50 border border-slate-600 rounded-md resize-none text-slate-300"
          />
          {originalText && (
             <IconButton 
              onClick={() => handleCopy(originalText, 'original')}
              className="absolute top-4 right-4 bg-slate-700 hover:bg-cyan-600/50"
              aria-label={UI_TEXT.COPY_TO_CLIPBOARD}
            >
              <CopyIcon />
              {copyStatus === 'original' && <span className="ml-2 text-xs">{UI_TEXT.COPIED_SUCCESS}</span>}
            </IconButton>
          )}
        </div>

        {/* Enhanced Text Box */}
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700 space-y-3 relative">
          <h3 className="text-lg font-semibold text-teal-400">{UI_TEXT.ENHANCED_TEXT_HEADER}</h3>
          <textarea
            readOnly
            value={enhancedText}
            className="w-full h-64 p-3 bg-slate-700/50 border border-slate-600 rounded-md resize-none text-slate-100"
          />
          {enhancedText && (
            <div className="absolute top-4 right-4 flex space-x-2">
                <IconButton 
                  onClick={() => handleCopy(enhancedText, 'enhanced')}
                  className="bg-slate-700 hover:bg-teal-600/50"
                  aria-label={UI_TEXT.COPY_TO_CLIPBOARD}
                >
                  <CopyIcon />
                  {copyStatus === 'enhanced' && <span className="ml-2 text-xs">{UI_TEXT.COPIED_SUCCESS}</span>}
                </IconButton>
            </div>
          )}
        </div>
      </div>

      {enhancedText && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-800/70 rounded-lg border border-slate-700">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">{UI_TEXT.DOWNLOAD_AS}</span>
            <IconButton onClick={() => exportToPDF(enhancedText, originalText)} title={UI_TEXT.PDF} className="hover:bg-red-500/30">
                <DownloadIcon /> <span className="ml-1 text-xs">PDF</span>
            </IconButton>
            <IconButton onClick={() => exportToDOCX(enhancedText, originalText)} title={UI_TEXT.DOCX} className="hover:bg-blue-500/30">
                <DownloadIcon /> <span className="ml-1 text-xs">DOCX</span>
            </IconButton>
            <IconButton onClick={() => exportToTXT(enhancedText)} title={UI_TEXT.TXT} className="hover:bg-green-500/30">
                <DownloadIcon /> <span className="ml-1 text-xs">TXT</span>
            </IconButton>
          </div>
          <IconButton onClick={showDiff ? onHideChanges : onShowChanges} className="min-w-[150px] justify-center hover:bg-cyan-500/30">
            {showDiff ? <EyeSlashIcon/> : <EyeIcon />}
            <span className="ml-2">{showDiff ? UI_TEXT.HIDE_CHANGES_BUTTON : UI_TEXT.SHOW_CHANGES_BUTTON}</span>
          </IconButton>
        </div>
      )}

      {showDiff && diffResult && (
        <DiffViewer diffResult={diffResult} percentageChange={percentageChange} />
      )}
    </section>
  );
};
