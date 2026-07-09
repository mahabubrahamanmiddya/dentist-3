"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Cpu, Heart, Award, Coins, Monitor, Calendar, Activity } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: "Modern Equipment",
    description: "Equipped with state-of-the-art diagnostic machinery and premium EU-imported therapeutic chairs."
  },
  {
    icon: Heart,
    title: "Pain Free Treatment",
    description: "Advanced soft-tissue dental lasers and digital anaesthesia systems minimize discomfort completely."
  },
  {
    icon: Award,
    title: "Certified Doctors",
    description: "Our cosmetic and restorative surgeons hold premium degrees and clinical board certifications."
  },
  {
    icon: Coins,
    title: "Affordable Pricing",
    description: "Luxury dental treatments made accessible through flexible clinical packages and transparent pricing."
  },
  {
    icon: Monitor,
    title: "Digital Dentistry",
    description: "CAD/CAM single-visit dental crowns, 3D intraoral scanning, and precision dental simulation."
  },
  {
    icon: Calendar,
    title: "Same Day Consultation",
    description: "We offer instant consultations and same-day dental checkups for emergency or busy clients."
  },
  {
    icon: Activity,
    title: "Emergency Support",
    description: "Dedicated emergency slots and 24/7 call assistance for severe toothaches or restorations."
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const cards = gridRef.current?.querySelectorAll('.feature-card');

    if (!cards) return;

    mm.add("(min-width: 768px)", () => {
      // Desktop: Stagger cards together
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Trigger cards individually as they scroll into view
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
      id="why-choose-us" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      {/* Decorative luxury shapes */}
      <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-[#ece0d1]/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-[#967259]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="04 / EXCELLENCE" 
          title="Why Elite Patients Choose Us" 
          subtitle="Combining hospitality standards with leading medical advancements to offer clinical perfection."
        />

        {/* Feature Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16"
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="feature-card glass-panel rounded-3xl p-6 border border-[#967259]/10 hover:border-[#967259]/30 transition-all duration-500 hover:shadow-orange-glow relative group flex flex-col justify-between"
                data-cursor="view"
              >
                <div>
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-2xl bg-[#967259]/10 border border-[#967259]/25 flex items-center justify-center text-[#967259] mb-6 group-hover:scale-110 group-hover:bg-[#967259] group-hover:text-[#ece0d1] transition-all duration-300">
                    <Icon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-bold tracking-tight mb-3 text-[#38220f] group-hover:text-[#967259] transition-colors duration-300">
                    {feat.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[#634832] leading-relaxed mb-4">
                    {feat.description}
                  </p>
                </div>

                <div className="text-[10px] font-bold text-[#967259]/40 tracking-widest mt-4">
                  0{index + 1} &bull; COMPASSION
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
