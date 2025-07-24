import React, { ReactNode, forwardRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ChevronRightIcon } from './icons';

interface PolicySubsectionProps {
  titleKey: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const PolicySubsection = forwardRef<HTMLDetailsElement, PolicySubsectionProps>(
  ({ titleKey, children, defaultOpen = false }, ref) => {
    const { translate } = useLanguage();

    return (
      <details ref={ref} open={defaultOpen} className="group mb-4 transition-all duration-300">
        <summary className="list-none flex items-center justify-center cursor-pointer text-xl font-semibold text-brandAccent-700 py-3 px-4 rounded-md bg-stone-100/70 hover:bg-stone-200/80 transition-colors duration-200">
          <ChevronRightIcon className="w-5 h-5 mr-3 text-brandAccent-600 transition-transform duration-300 ease-in-out group-open:rotate-90" />
          <span className="text-center">{translate(titleKey)}</span>
        </summary>
        <div className="pt-3 pb-2 px-4 text-left">
          {children}
        </div>
      </details>
    );
  }
);
