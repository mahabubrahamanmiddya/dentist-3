"use client";

import React, { useRef } from 'react';
import SplitText from './SplitText';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

export default function SectionTitle({ number, title, subtitle, alignment = 'left' }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const alignClasses = alignment === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div ref={containerRef} className={`flex flex-col mb-10 md:mb-14 ${alignClasses}`}>
      <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] text-accent-orange mb-3">
        <span>{number}</span>
        <span className="w-8 h-[1px] bg-accent-orange/40" />
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-accent-cream">
        <SplitText text={title} triggerRef={containerRef} />
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-accent-creamMuted max-w-2xl mt-2 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-full max-w-sm h-[1px] bg-gradient-to-r from-accent-orange/50 via-accent-orange/15 to-transparent mt-5 shadow-orange-glow-sm" />
    </div>
  );
}
