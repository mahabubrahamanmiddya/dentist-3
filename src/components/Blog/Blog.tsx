"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    title: "The Art and Science of Digital Smile Design",
    category: "Aesthetics",
    readTime: "4 Min Read",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 08, 2026"
  },
  {
    title: "Why Porcelain Veneers Outshine Resin Restorations",
    category: "Cosmetic",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 02, 2026"
  },
  {
    title: "What to Expect During Dental Implant Surgery",
    category: "Surgery",
    readTime: "6 Min Read",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "June 25, 2026"
  }
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const cards = gridRef.current?.querySelectorAll('.blog-card');

    if (!cards) return;

    mm.add("(min-width: 768px)", () => {
      // Desktop: Stagger all blog cards together
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Animate each blog card individually
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="blog" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] left-0 w-80 h-80 bg-[#ece0d1]/35 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="09 / INSIGHTS" 
          title="Latest Clinical Articles" 
          subtitle="Explore research details, advice, and diagnostic guides written directly by our surgeons."
        />

        {/* Blog Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16"
        >
          {articles.map((art, idx) => {
            return (
              <div 
                key={idx}
                className="blog-card bg-[#ece0d1]/40 border border-[#967259]/10 rounded-3xl overflow-hidden group hover:border-[#967259]/30 transition-all duration-500 hover:shadow-orange-glow flex flex-col justify-between"
                data-cursor="view"
              >
                <div>
                  {/* Image Container with Zoom Reveal */}
                  <div className="relative aspect-[16/10] overflow-hidden w-full border-b border-[#967259]/10">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      loading="lazy"
                    />
                    {/* Category Overlay */}
                    <div className="absolute top-4 left-4 bg-[#ece0d1] border border-[#967259]/15 text-[#38220f] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      {art.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] text-[#634832] font-semibold tracking-wider mb-3">
                      <span>{art.date}</span>
                      <span>&bull;</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-display font-bold text-[#38220f] group-hover:text-[#967259] leading-tight transition-colors duration-300">
                      {art.title}
                    </h3>
                  </div>
                </div>

                {/* Read More Footer */}
                <div className="p-6 pt-0 mt-auto border-t border-[#967259]/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#38220f] group-hover:text-[#967259] transition-colors duration-300">Read Article</span>
                  <div className="w-8 h-8 rounded-full border border-[#967259]/10 flex items-center justify-center text-[#38220f] group-hover:bg-[#967259] group-hover:text-[#ece0d1] group-hover:border-[#967259] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
