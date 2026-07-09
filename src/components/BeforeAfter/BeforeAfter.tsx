"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { ArrowLeftRight, Clock, Star, Smile } from 'lucide-react';

const cases = [
  {
    patient: "Aria Thorne",
    treatment: "Full Ceramic Veneers & Realignment",
    duration: "2 Sessions (10 Days)",
    satisfaction: "100%",
    quote: "Royal Smile completely changed how I present myself. The digital mapping showed me exactly what I would get, and the actual porcelain veneers are incredibly natural and comfortable.",
    beforeImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.ba-metric-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const handleMove = (clientX: number) => {
    const sliderBox = sliderBoxRef.current;
    if (!sliderBox) return;

    const rect = sliderBox.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const activeCase = cases[0];

  return (
    <section 
      ref={containerRef}
      id="gallery" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] left-0 w-96 h-96 bg-[#ece0d1]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Drag Slider */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[10px] font-bold text-[#967259] tracking-widest uppercase mb-4 block">Interactive Gallery</span>
          
          <div 
            ref={sliderBoxRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#967259]/15 shadow-orange-glow relative select-none cursor-none bg-[#ece0d1]"
            data-cursor="DRAG"
          >
            
            {/* Before (Underneath) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Teeth Smile Before Reconstruction" 
                className="w-full h-full object-cover filter brightness-[0.8] grayscale"
              />
              <span className="absolute bottom-4 left-4 bg-[#ece0d1]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#967259]/20 text-[10px] font-bold text-[#38220f] tracking-widest uppercase z-10">
                Before
              </span>
            </div>

            {/* After (Overlay Clip) */}
            <div 
              className="absolute inset-0 w-full h-full select-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Teeth Smile After Restoration" 
                className="w-full h-full object-cover filter brightness-95"
              />
              <span className="absolute bottom-4 right-4 bg-[#967259]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#967259]/25 text-[10px] font-bold text-[#ece0d1] tracking-widest uppercase z-10">
                After
              </span>
            </div>

            {/* Drag Handle Divider */}
            <div 
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="absolute top-0 bottom-0 w-[2px] bg-[#967259] cursor-none flex items-center justify-center z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#967259] border border-[#ece0d1] text-[#ece0d1] flex items-center justify-center shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-200">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Case Study Description */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <SectionTitle 
            number="06 / GALLERY" 
            title="Before & After Smile Makeover" 
            subtitle="Explore real restorative treatments and experience the clinical precision."
          />

          <div className="glass-panel border border-[#967259]/10 rounded-3xl p-6 md:p-8 shadow-orange-glow-sm bg-[#ece0d1]/10">
            <h3 className="text-lg md:text-xl font-display font-bold text-[#38220f] mb-1">
              {activeCase.treatment}
            </h3>
            <p className="text-[10px] font-bold text-[#967259] tracking-widest uppercase mb-4">
              Patient Case Study: {activeCase.patient}
            </p>

            <blockquote className="text-xs md:text-sm text-[#634832] italic leading-relaxed border-l-2 border-[#967259] pl-4 mb-6">
              "{activeCase.quote}"
            </blockquote>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#967259]/10 pt-6 mt-4">
              <div className="ba-metric-card flex flex-col pl-2 border-l border-[#967259]/20">
                <div className="flex items-center gap-1 text-[#967259] text-[10px] font-bold uppercase tracking-widest mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-[#38220f]">{activeCase.duration}</span>
              </div>

              <div className="ba-metric-card flex flex-col pl-2 border-l border-[#967259]/20">
                <div className="flex items-center gap-1 text-[#967259] text-[10px] font-bold uppercase tracking-widest mb-1">
                  <Smile className="w-3.5 h-3.5" />
                  <span>Success</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-[#38220f]">{activeCase.satisfaction} Rate</span>
              </div>

              <div className="ba-metric-card flex flex-col pl-2 border-l border-[#967259]/20">
                <div className="flex items-center gap-1 text-[#967259] text-[10px] font-bold uppercase tracking-widest mb-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Rating</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-[#38220f]">5.0 Star</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
