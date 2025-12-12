
// components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  className = '',
  variant = 'default',
  size = 'default',
  customWidth,
  customHeight,
  isLoading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Style variants
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
    link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus-visible:ring-blue-500 shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
  };
  
  // Size variants
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 px-3 py-1.5 text-xs',
    lg: 'h-12 px-6 py-3 text-base',
    xl: 'h-14 px-8 py-4 text-lg',
    icon: 'h-10 w-10 p-0',
  };

  // Button style
  const buttonStyle = {
    width: fullWidth ? '100%' : customWidth,
    height: customHeight,
  };

  // Combine all classes
  const allClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={allClasses}
      style={buttonStyle}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {!isLoading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;