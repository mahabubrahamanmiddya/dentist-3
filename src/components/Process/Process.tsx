"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Calendar, UserCheck, Eye, Shield, Sparkles } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Book Appointment",
    description: "Fill out our digital request form to book a private clinical session. Our coordinators confirm within minutes.",
    icon: Calendar
  },
  {
    step: "02",
    title: "Detailed Consultation",
    description: "Meet our cosmetic specialist to outline your aesthetic expectations, health history, and budget details.",
    icon: UserCheck
  },
  {
    step: "03",
    title: "Digital Scanning",
    description: "Using zero-mess 3D intraoral scanners, we capture full-mouth mappings to design custom restoration models.",
    icon: Eye
  },
  {
    step: "04",
    title: "Clinical Treatment",
    description: "Our specialists execute the restorative plan with soft-tissue lasers and advanced porcelain restorations.",
    icon: Sparkles
  },
  {
    step: "05",
    title: "Comprehensive Aftercare",
    description: "Complete post-treatment polish checks and receive luxury aftercare kits to protect your new smile.",
    icon: Shield
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = lineRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    
    // Set initial stroke dash setup
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Animate drawing path on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 45%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    // Stagger animate nodes entrance
    const nodes = timelineRef.current?.querySelectorAll('.process-node');
    if (nodes) {
      nodes.forEach((node) => {
        gsap.fromTo(node.querySelector('.process-node-card'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Dot highlight trigger
        gsap.fromTo(node.querySelector('.process-node-dot'),
          { scale: 0.8, backgroundColor: '#ece0d1', borderColor: 'rgba(150,114,89,0.3)' },
          {
            scale: 1.25,
            backgroundColor: '#967259',
            borderColor: '#38220f',
            duration: 0.4,
            scrollTrigger: {
              trigger: node,
              start: 'top 45%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[30%] right-[-5%] w-96 h-96 bg-[#dbc1ac]/40 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-80 h-80 bg-[#967259]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="06 / JOURNEY" 
          title="Clinical Treatment Process" 
          subtitle="How we guide your aesthetic transformation, from booking to your new polished smile."
          alignment="center"
        />

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-20 max-w-4xl mx-auto pl-12 md:pl-24">
          
          {/* SVG Connector Drawing Line */}
          <div className="absolute left-4 md:left-[51px] top-0 h-full w-[4px] pointer-events-none">
            <svg width="4" height="100%" viewBox="0 0 4 1000" preserveAspectRatio="none" className="h-full">
              {/* Back track */}
              <line x1="2" y1="0" x2="2" y2="1000" stroke="rgba(99, 72, 50, 0.08)" strokeWidth="4" />
              {/* Active path drawing */}
              <path 
                ref={lineRef}
                d="M 2 0 L 2 1000" 
                stroke="#967259" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="process-node relative flex items-start">
                  
                  {/* Dot point */}
                  <div className="process-node-dot absolute -left-[44px] md:-left-[85px] top-2 z-10 w-6 h-6 rounded-full bg-[#ece0d1] border border-[#967259]/30 flex items-center justify-center transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#967259]" />
                  </div>

                  {/* Step Card Body */}
                  <div className="process-node-card w-full glass-panel border border-[#967259]/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[#967259]/35 transition-all duration-500 hover:shadow-orange-glow relative group">
                    {/* Glowing Icon Frame */}
                    <div className="w-14 h-14 rounded-2xl bg-[#967259]/10 flex items-center justify-center text-[#967259] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#967259] group-hover:text-[#ece0d1] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex-grow">
                      <span className="text-[10px] font-bold text-[#967259] uppercase tracking-widest block mb-1">
                        Step {st.step}
                      </span>
                      <h3 className="text-xl font-display font-bold tracking-tight text-[#38220f] mb-3">
                        {st.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#634832] leading-relaxed">
                        {st.description}
                      </p>
                    </div>
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
