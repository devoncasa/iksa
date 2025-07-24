import React from 'react';

interface StyledTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StyledText: React.FC<StyledTextProps> = ({ text, className, style }) => {
  // Regex to split by **...** but keep the delimiters for processing
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(part => part.length > 0);

  return (
    <p className={className} style={style}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-warm-terracotta">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Handle newlines within normal text parts to mimic whitespace-pre-line
        return <React.Fragment key={index}>{part.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
            </React.Fragment>
        ))}</React.Fragment>;
      })}
    </p>
  );
};