
import React from 'react';
import { SelectOption } from '../types';

interface DropdownProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);


export const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-cyan-400 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none py-2.5 px-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-700 text-slate-200">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
};
