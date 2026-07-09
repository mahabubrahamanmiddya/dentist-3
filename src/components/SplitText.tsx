"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  triggerRef?: React.RefObject<any>;
}

export default function SplitText({ text, className = "", delay = 0, triggerRef }: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Make sure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    // Reset inside content if it has already split to avoid double nesting
    const charsAlreadySplit = el.querySelectorAll('.char-span');
    if (charsAlreadySplit.length > 0) return;

    const originalText = el.textContent || '';
    el.innerHTML = '';

    // Create wrapper spans
    originalText.split('').forEach((char) => {
      const outerSpan = document.createElement('span');
      outerSpan.className = 'inline-block overflow-hidden vertical-align-middle';
      
      const innerSpan = document.createElement('span');
      innerSpan.className = 'char-span inline-block';
      innerSpan.style.transform = 'translate3d(0, 110%, 0)';
      innerSpan.textContent = char === ' ' ? '\u00A0' : char;

      outerSpan.appendChild(innerSpan);
      el.appendChild(outerSpan);
    });

    const targetSpans = el.querySelectorAll('.char-span');

    const animConfig: gsap.TweenVars = {
      y: '0%',
      duration: 1.0,
      stagger: 0.02,
      ease: 'power4.out',
      delay: delay,
    };

    if (triggerRef && triggerRef.current) {
      animConfig.scrollTrigger = {
        trigger: triggerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      };
    }

    const anim = gsap.to(targetSpans, animConfig);

    return () => {
      anim.kill();
      if (animConfig.scrollTrigger && (animConfig.scrollTrigger as any).kill) {
        (animConfig.scrollTrigger as any).kill();
      }
    };
  }, [text, delay, triggerRef]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text}
    </span>
  );
}
