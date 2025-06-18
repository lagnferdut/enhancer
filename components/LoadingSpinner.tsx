
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <p className="text-cyan-400 text-sm">{UI_TEXT.PROCESSING}</p>
    </div>
  );
};

// Also exporting UI_TEXT from here for standalone use, though it's better to import from constants
import { UI_TEXT } from '../constants'; 
