"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling when loader is active
    document.body.style.overflow = 'hidden';

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    
    // Set initial dasharray and offset for SVG stroke drawing
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0.1
    });

    const tl = gsap.timeline();

    // Fade in path outline
    tl.to(path, {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power1.out'
    });

    // Draw path
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.inOut'
    }, '-=0.3');

    // Float animation for tooth icon
    gsap.to(wrapperRef.current, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Count percentage up
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
      },
      onComplete: () => {
        // Exit screen transition animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsActive(false);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });

        exitTl.to(wrapperRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut'
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'power4.inOut'
        }, '-=0.3');
      }
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isActive) return null;

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 w-full h-full bg-[#ece0d1] z-50 flex flex-col items-center justify-center select-none"
    >
      <div 
        ref={wrapperRef}
        className="flex flex-col items-center justify-center gap-6"
      >
        {/* Animated Tooth SVG (Outline vector drawing) */}
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_12px_rgba(99,72,50,0.1)]"
          >
            {/* Elegant luxury tooth vector path */}
            <path 
              ref={pathRef}
              d="M 50 15 
                 C 40 15, 30 18, 25 30 
                 C 20 42, 20 60, 24 75 
                 C 26 82, 32 90, 36 96 
                 C 40 102, 42 108, 41 112
                 C 40 115, 36 118, 38 120 
                 C 40 122, 44 116, 48 108 
                 C 49 106, 50 106, 51 108
                 C 55 116, 59 122, 61 120 
                 C 63 118, 59 115, 58 112 
                 C 57 108, 59 102, 63 96 
                 C 67 90, 73 82, 75 75 
                 C 79 60, 79 42, 74 30 
                 C 69 18, 59 15, 50 15 Z" 
              stroke="#967259" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          {/* Subtle inside glowing point */}
          <div className="absolute w-2 h-2 rounded-full bg-[#967259] animate-ping" />
        </div>

        {/* Counter and Text */}
        <div className="text-center font-buttons">
          <div 
            ref={percentageRef}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#38220f] font-mono tabular-nums"
          >
            {percent}%
          </div>
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#967259] uppercase mt-2">
            Crafting Your Experience
          </div>
        </div>
      </div>
    </div>
  );
}
