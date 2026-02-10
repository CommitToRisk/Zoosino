import { useState } from "react";

type HiddenFieldProps = {
  label: string;
  value: string;
};

export function HiddenField({ label, value }: HiddenFieldProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 border-b border-border/50 last:border-0 bg-secondary-light/10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-bold text-primary uppercase tracking-wider">{label}</h3>
        {copied && <span className="text-green-400 text-xs font-bold">Copied!</span>}
      </div>
      
      <div className="relative flex items-center justify-between gap-4 bg-secondary-light border border-border rounded-lg p-3">
        <code className="font-mono text-lg text-text-main overflow-hidden text-ellipsis whitespace-nowrap">
          {isRevealed ? value : "••••"}
        </code>
        
        <div className="flex gap-2 shrink-0">
          <button
            onMouseDown={() => setIsRevealed(true)}
            onMouseUp={() => setIsRevealed(false)}
            onMouseLeave={() => setIsRevealed(false)}
            onTouchStart={() => setIsRevealed(true)}
            onTouchEnd={() => setIsRevealed(false)}
            className="p-2 text-text-muted hover:text-primary transition-colors cursor-grab active:cursor-grabbing"
          >
            {isRevealed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            )}
          </button>
          
          <button
            onClick={handleCopy}
            className="p-2 text-text-muted hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}