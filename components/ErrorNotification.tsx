
import React from 'react';
import { UI_TEXT } from '../constants';

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

const XCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-700/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative shadow-lg shadow-red-500/20" role="alert">
      <div className="flex items-start">
        <XCircleIcon className="text-red-400 mr-3 mt-0.5" />
        <div>
          <strong className="font-bold text-red-200">{UI_TEXT.ERROR_TITLE}</strong>
          <span className="block sm:inline ml-1">{message}</span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-400 hover:text-red-200 transition-colors"
        aria-label="Close"
      >
        <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Zamknij</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </button>
    </div>
  );
};
