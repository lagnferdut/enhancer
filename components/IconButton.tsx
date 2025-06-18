
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  'aria-label'?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`p-2 rounded-md text-slate-300 hover:text-cyan-400 bg-slate-700/50 hover:bg-slate-600/70 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md flex items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
