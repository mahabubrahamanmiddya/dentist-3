"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { testimonialData } from './testimonialData';
import { setupHeadingReveal, setupScrollAnimations, setupCardTilt } from './gsapAnimations';
import SectionTitle from '../SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 1. Animate Heading Reveal characters
    if (headingRef.current) {
      setupHeadingReveal(headingRef.current);
    }

    // 2. Setup Card Stack Scroll Animations
    // Filter out null refs
    const validCards = cardsRef.current.filter(Boolean);
    if (sectionRef.current && validCards.length > 0) {
      setupScrollAnimations(sectionRef.current, validCards);
    }

    // 3. Setup Card 3D Tilt on Mouse Movements
    let cleanupTilt = () => {};
    if (sectionRef.current) {
      cleanupTilt = setupCardTilt(sectionRef.current, '.testimonial-card-active');
    }

    return () => {
      // Cleanup all GSAP ScrollTriggers and contexts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cleanupTilt();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen md:h-screen bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10 flex flex-col justify-between items-center py-10 md:py-12"
    >
      {/* Background cursor spotlight glow circle */}
      <div className="spotlight-glow absolute w-[300px] h-[300px] rounded-full bg-[#dbc1ac]/40 blur-[80px] pointer-events-none hidden md:block opacity-0 md:opacity-100" />
      <div className="hidden md:block absolute top-[20%] left-[-5%] w-96 h-96 bg-[#dbc1ac]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-[20%] right-[-5%] w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center flex-grow justify-between h-full">
        {/* Animated Heading */}
        <div className="flex flex-col items-center text-center mb-6 w-full">
          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] text-[#967259] mb-3">
            <span>07 / TESTIMONIALS</span>
            <span className="w-8 h-[1px] bg-[#967259]/40" />
          </div>
          <h2 
            ref={headingRef} 
            className="font-display text-3xl md:text-5xl font-bold text-[#38220f] mt-2 mb-4 tracking-tight"
          >
            Real Smiles, Real Stories
          </h2>
          <p className="text-sm md:text-base text-[#634832] max-w-2xl font-light leading-relaxed">
            Explore how our patient-centric approach results in aesthetic clinical transformations.
          </p>
          <div className="w-full max-w-sm h-[1px] bg-gradient-to-r from-[#967259]/50 via-[#967259]/15 to-transparent mt-5" />
        </div>

        {/* Desktop Stack Container */}
        <div className="hidden md:flex relative w-full max-w-[580px] h-[400px] items-center justify-center my-auto">
          {testimonialData.map((item, idx) => {
            return (
              <div 
                key={item.id}
                ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                className="testimonial-card absolute w-full max-w-[540px] rounded-[32px] p-8 bg-[#dbc1ac]/25 backdrop-blur-xl border border-white/20 shadow-orange-glow flex flex-col justify-between will-change-transform"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  backfaceVisibility: 'hidden',
                  zIndex: idx
                }}
              >
                {/* Header: User Image, Info, verified, quote */}
                <div className="flex items-start justify-between w-full" style={{ transform: 'translateZ(20px)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[#967259]/20 shadow-orange-glow-sm">
                      <img 
                        src={item.patientImage} 
                        alt={item.patientName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-base text-[#38220f]">{item.patientName}</span>
                        {item.verified && (
                          <ShieldCheck className="w-4 h-4 text-[#967259] fill-[#967259]/10" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-[#967259] tracking-widest uppercase">
                        {item.treatment}
                      </span>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-[#967259]/20" />
                </div>

                {/* Body: Review text */}
                <p 
                  className="text-xs md:text-sm text-[#634832] leading-relaxed my-6 font-sans" 
                  style={{ transform: 'translateZ(10px)' }}
                >
                  "{item.review}"
                </p>

                {/* Footer: Rating */}
                <div 
                  className="flex items-center justify-between border-t border-[#967259]/10 pt-4" 
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#967259] text-[#967259]" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-[#967259] uppercase tracking-widest">
                    Verified Feedback
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swiper Container */}
        <div className="block md:hidden w-full max-w-[540px] px-2 my-auto">
          <Swiper
            data-lenis-prevent
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, el: '.testimonials-custom-pagination' }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full pb-10"
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial-card-mobile w-full rounded-[24px] p-6 bg-[#ebdcd0] border border-[#967259]/15 shadow-orange-glow flex flex-col justify-between min-h-[300px]">
                  {/* Header: User Image, Info, verified, quote */}
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-[#967259]/20 shadow-orange-glow-sm">
                        <img 
                          src={item.patientImage} 
                          alt={item.patientName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-sm text-[#38220f]">{item.patientName}</span>
                          {item.verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#967259] fill-[#967259]/10" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-[#967259] tracking-widest uppercase">
                          {item.treatment}
                        </span>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-[#967259]/20" />
                  </div>

                  {/* Body: Review text */}
                  <p className="text-xs text-[#634832] leading-relaxed my-4 font-sans">
                    "{item.review}"
                  </p>

                  {/* Footer: Rating */}
                  <div className="flex items-center justify-between border-t border-[#967259]/10 pt-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#967259] text-[#967259]" />
                      ))}
                    </div>
                    <span className="text-[8px] font-bold text-[#967259] uppercase tracking-widest">
                      Verified Feedback
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom dots container */}
          <div className="testimonials-custom-pagination flex justify-center gap-1.5 mt-2" />
        </div>

        {/* Small Scroll helper overlay indicator */}
        <div className="hidden md:block text-[10px] font-buttons font-bold uppercase tracking-widest text-[#967259] mt-8 animate-pulse">
          Scroll to Swivel Cards
        </div>
      </div>
    </section>
  );
}
