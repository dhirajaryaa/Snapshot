import React from 'react';
import { cn } from '@/lib/utils';
import { IconChevronDown } from '@tabler/icons-react';

interface AccordionSectionProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  activeSection: string;
  onToggle: (id: string) => void;
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  icon: Icon,
  activeSection,
  onToggle,
  theme,
  children
}) => {
  const isOpen = activeSection === id;
  return (
    <div className={cn(
      "border-b transition-colors duration-200",
      theme === 'dark' ? "border-neutral-800" : "border-neutral-200"
    )}>
      <button
        onClick={() => onToggle(isOpen ? '' : id)}
        className={cn(
          "w-full flex items-center justify-between py-3.5 px-4 text-sm font-semibold transition-all hover:bg-opacity-50",
          theme === 'dark' ? "text-neutral-200 hover:bg-neutral-900" : "text-neutral-700 hover:bg-neutral-50"
        )}
      >
        <div className="flex items-center space-x-2.5">
          <Icon className={cn("w-4.5 h-4.5", isOpen ? "text-brand" : "text-neutral-400")} />
          <span>{title}</span>
        </div>
        <IconChevronDown className={cn("w-4 h-4 transition-transform duration-200 opacity-60", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="px-4 pb-5 pt-1 space-y-4 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
