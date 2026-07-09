"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Set initial position out of screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      if (!isActive) setIsActive(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Listen to hovering on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      
      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
          setIsHoveringText(true);
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: 'rgba(234, 88, 12, 0.15)',
            borderColor: 'rgba(234, 88, 12, 0.6)',
            borderWidth: '1px',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        } else {
          // Standard interactive element hover (e.g. standard buttons, inputs)
          gsap.to(cursor, {
            width: 45,
            height: 45,
            backgroundColor: 'transparent',
            borderColor: '#ea580c',
            borderWidth: '2px',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, { scale: 1.5, backgroundColor: '#ea580c', duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      
      if (interactiveEl) {
        setIsHoveringText(false);
        setCursorText('');
        gsap.to(cursor, {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: 'rgba(234, 88, 12, 0.4)',
          borderWidth: '1.5px',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, backgroundColor: '#ea580c', duration: 0.2 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isActive]);

  return (
    <>
      {/* Outer Cursor Aura */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full border border-accent-orange/40 pointer-events-none z-50 flex items-center justify-center text-[10px] font-bold tracking-widest text-accent-cream uppercase select-none transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        {isHoveringText && <span className="text-[10px] text-accent-cream tracking-wide font-sans">{cursorText}</span>}
      </div>

      {/* Inner Dot Cursor */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-accent-orange rounded-full pointer-events-none z-50 pointer-events-none transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
    </>
  );
}
