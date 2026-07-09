"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { ShieldCheck, Award, Zap } from 'lucide-react';

const milestones = [
  {
    year: "2011",
    title: "Clinic Foundation",
    description: "Royal Smile was founded with a singular focus on luxury dental experiences.",
    icon: ShieldCheck
  },
  {
    year: "2016",
    title: "Digital Lab Adoption",
    description: "Equipped our facility with custom CAD/CAM 3D restoration mills.",
    icon: Zap
  },
  {
    year: "2021",
    title: "Global Recognition",
    description: "Named leading aesthetic clinic by international cosmetic forums.",
    icon: Award
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Image clip path reveal
    gsap.fromTo(imageWrapperRef.current,
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Image scale zoom out
    gsap.fromTo('.about-img-target',
      { scale: 1.3 },
      {
        scale: 1,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: 'top 80%',
        }
      }
    );

    // Badge float entrance
    gsap.fromTo('.about-badge-float',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: 'top 60%',
        }
      }
    );

    // Paragraph stagger entrance
    const paragraphs = containerRef.current?.querySelectorAll('.about-reveal-p');
    if (paragraphs) {
      gsap.fromTo(paragraphs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraphs[0],
            start: 'top 85%',
          }
        }
      );
    }

    // Milestones timeline entrance
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-node');
    if (timelineItems) {
      gsap.fromTo(timelineItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      {/* Decorative luxury shapes */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ece0d1]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#967259]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* Left Column: Image with luxury frame */}
        <div className="lg:col-span-6 relative">
          <div 
            ref={imageWrapperRef} 
            className="w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-orange-glow relative border border-[#967259]/15 bg-[#ece0d1]"
          >
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Elite Dental Clinic Interior" 
              className="about-img-target w-full h-full object-cover filter brightness-95 contrast-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#dbc1ac]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating badge */}
          <div className="about-badge-float absolute -bottom-6 -right-4 md:-right-6 glass-panel border border-[#967259]/20 rounded-3xl p-5 w-40 flex flex-col items-center justify-center text-center shadow-orange-glow select-none animate-float">
            <span className="text-4xl font-display font-extrabold tracking-tight text-[#967259]">20+</span>
            <span className="text-[10px] font-bold tracking-widest text-[#38220f] uppercase mt-1">
              Years Trust
            </span>
          </div>
        </div>

        {/* Right Column: Text Story & Milestones Timeline */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <SectionTitle 
            number="01 / STORY" 
            title="Luxurious Comfort. Clinical Perfection." 
            subtitle="Redefining dental wellness by marrying medical innovation with five-star hospitality."
          />

          <div className="flex flex-col gap-6 mb-10">
            <p className="about-reveal-p text-sm md:text-base text-[#634832] leading-relaxed">
              At Royal Smile Clinic, we believe dentistry should be an art form. Inspired by premium minimalism, our custom-designed clinic creates a calming, warm environment to remove standard dental anxiety.
            </p>
            <p className="about-reveal-p text-sm md:text-base text-[#634832] leading-relaxed">
              Our clinicians are globally certified cosmetic and reconstructive surgeons dedicated to bespoke smile makeovers, using precise 3D intraoral scans and CAD/CAM milling to secure predictable outcomes.
            </p>
          </div>

          {/* Vertical Milestone timeline */}
          <div ref={timelineRef} className="relative pl-6 border-l border-[#967259]/20 flex flex-col gap-8">
            {milestones.map((node, index) => {
              const Icon = node.icon;
              return (
                <div key={index} className="timeline-node relative flex gap-6 items-start">
                  
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#ece0d1] border-2 border-[#967259] flex items-center justify-center shadow-orange-glow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#967259]" />
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-[#967259]/10 border border-[#967259]/15 flex items-center justify-center text-[#967259] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#967259] tracking-widest">{node.year}</span>
                      <h4 className="text-sm font-display font-bold text-[#38220f]">{node.title}</h4>
                    </div>
                    <p className="text-xs text-[#634832] mt-1 leading-relaxed max-w-md">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
