"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export default function AnimatedButton({ 
  children, 
  className = "", 
  onClick, 
  href, 
  target,
  ...props 
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Mouse movements for magnetic parallax (Desktop only)
    const handleMouseMove = (e: any) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.22,
        y: y * 0.22,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x * 0.35,
          y: y * 0.35,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.1, 0.4)',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    // Tactile Touch animations (Mobile specific active scale)
    const handleTouchStart = () => {
      gsap.to(btn, {
        scale: 0.93,
        duration: 0.12,
        ease: 'power1.out'
      });
    };

    const handleTouchEnd = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.8)'
      });
    };

    // Desktop listeners
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    // Mobile listeners
    btn.addEventListener('touchstart', handleTouchStart, { passive: true });
    btn.addEventListener('touchend', handleTouchEnd, { passive: true });
    btn.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeEventListener('touchstart', handleTouchStart);
      btn.removeEventListener('touchend', handleTouchEnd);
      btn.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const buttonClasses = `
    relative overflow-hidden inline-flex items-center justify-center px-7 py-3
    rounded-full font-buttons font-bold text-xs uppercase tracking-widest text-[#ece0d1] border border-[#967259]/25 
    bg-[#967259] hover:bg-[#634832] transition-colors duration-500 shadow-orange-glow-sm 
    select-none group cursor-none
    ${className}
  `;

  const glowElement = (
    <span
      ref={glowRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#ece0d1]/10 rounded-full blur-xl pointer-events-none opacity-0 transition-opacity duration-300"
    />
  );

  const contentElement = (
    <>
      {glowElement}
      {/* Light sweep effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ece0d1]/15 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={buttonClasses}
        data-cursor="magnetic"
      >
        {contentElement}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={buttonClasses}
      onClick={onClick}
      data-cursor="magnetic"
      {...props}
    >
      {contentElement}
    </button>
  );
}
