
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const LoadingSpinnerIcon: React.FC<{className?: string}> = ({className}) => (
 <svg className={`animate-spin h-5 w-5 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center space-x-2";
  
  const primaryStyle = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white focus:ring-cyan-500 shadow-cyan-500/30 hover:shadow-cyan-500/50";
  const secondaryStyle = "bg-slate-600 hover:bg-slate-500 text-slate-100 focus:ring-slate-500 shadow-slate-600/30 hover:shadow-slate-600/50";

  const selectedStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button
      className={`${baseStyle} ${selectedStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingSpinnerIcon className="mr-2" />}
      <span>{children}</span>
    </button>
  );
};
