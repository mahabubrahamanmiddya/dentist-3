"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Register ScrollTrigger to GSAP
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.8, // Increased for a more luxurious, cinematic scroll
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // Softened slightly to prevent scroll jumps
      touchMultiplier: 0.8, // Reduced touch sensitivity to prevent fast scrolling
      syncTouch: true, // Enables smooth scrolling synchronization on touch/mobile devices
      syncTouchLerp: 0.05, // Lowered value for a much softer, gentler deceleration tail
    });

    setLenisInstance(lenis);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateGSAP = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAP);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a slight delay to ensure all layout elements are loaded
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGSAP);
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
