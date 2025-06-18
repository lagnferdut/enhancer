
import React from 'react';
import { UI_TEXT } from '../constants';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-8 h-8 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69a.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.468 1.682-6.552 4.29-8.47نامهa.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center w-full py-6 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center justify-center space-x-3">
        <SparkleIcon className="text-cyan-400" />
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-500 text-transparent bg-clip-text">
          {UI_TEXT.APP_TITLE}
        </h1>
        <SparkleIcon className="text-teal-400" />
      </div>
      <p className="mt-3 text-lg text-slate-400">{UI_TEXT.APP_SUBTITLE}</p>
    </header>
  );
};
