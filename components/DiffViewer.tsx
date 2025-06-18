
import React from 'react';
import { DiffResultPart } from '../types';
import { UI_TEXT } from '../constants';

interface DiffViewerProps {
  diffResult: DiffResultPart[];
  percentageChange: number;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ diffResult, percentageChange }) => {
  return (
    <div className="p-6 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700 space-y-4">
      <h3 className="text-lg font-semibold text-cyan-300">Szczegóły zmian:</h3>
      {percentageChange > 0 ? (
        <p className="text-sm text-slate-400">{UI_TEXT.CHANGES_INFO(percentageChange)}</p>
      ) : (
         <p className="text-sm text-slate-400">{UI_TEXT.NO_CHANGES_DETECTED}</p>
      )}
      
      <div className="p-4 bg-slate-700/50 border border-slate-600 rounded-md max-h-96 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap">
        {diffResult.map((part, index) => {
          let partClass = "text-slate-300";
          if (part.added) {
            partClass = "bg-green-500/20 text-green-300";
          } else if (part.removed) {
            partClass = "bg-red-500/20 text-red-300 line-through";
          }
          return (
            <span key={index} className={partClass}>
              {part.value}
            </span>
          );
        })}
      </div>
    </div>
  );
};
