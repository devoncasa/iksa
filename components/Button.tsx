import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out transform hover:-translate-y-px active:scale-95 active:translate-y-0';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      // Deep Sandstone Beige (#D6C4A8) bg, Obsidian Black (#1C1C1C) text. Hover Rich Terracotta (#C1784A) bg. Gold glow.
      variantStyles = 'bg-brandAccent-500 hover:bg-brandAccent-600 text-stone-800 focus:ring-brandAccent-500 focus:ring-offset-stone-50 shadow-md hover:shadow-lg hover:shadow-brandAccent-700/30';
      break;
    case 'secondary':
      // Light Greige bg, Charcoal text.
      variantStyles = 'bg-stone-200 hover:bg-stone-300 text-stone-700 focus:ring-stone-400 focus:ring-offset-stone-50 border border-stone-300 hover:border-stone-400';
      break;
    case 'outline':
      // Burnished Gold (#B59F6C) border & text. Hover: Burnished Gold bg, White text. Gold glow.
      variantStyles = 'border border-brandAccent-700 text-brandAccent-700 hover:bg-brandAccent-700 hover:text-white focus:ring-brandAccent-700 focus:ring-offset-stone-50 hover:shadow-lg hover:shadow-brandAccent-700/30';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-5 py-2.5 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-7 py-3 text-lg';
      break;
  }

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};