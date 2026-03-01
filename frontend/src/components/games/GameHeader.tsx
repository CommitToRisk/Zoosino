import React from "react";

type GameHeaderProps = {
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
};

export function GameHeader({ title, subtitle, className = "" }: GameHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-primary drop-shadow-sm mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-text-muted max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}