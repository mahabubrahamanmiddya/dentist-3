"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Sparkles, Smile, ShieldAlert, Layers, Palette, Baby, Shield, Activity, Crown, HeartPulse } from 'lucide-react';

const services = [
  {
    title: "Dental Implants",
    description: "World-class titanium restorations replacing missing teeth, functioning and feeling like natural teeth.",
    icon: Activity,
    benefits: ["Permanent Restoration", "Prevents Bone Loss"]
  },
  {
    title: "Cosmetic Dentistry",
    description: "Premium veneer and bonding treatments designed to improve shape, alignment, and teeth proportions.",
    icon: Sparkles,
    benefits: ["Custom Shape Design", "Natural Polish"]
  },
  {
    title: "Teeth Whitening",
    description: "Advanced laser whitening yielding immediate, bright restorations safe for tooth enamel.",
    icon: Smile,
    benefits: ["Up to 8 Shades Whiter", "Safety Guarantee"]
  },
  {
    title: "Braces",
    description: "Discreet orthodontic alignment systems tailored for children, teens, and aesthetic-conscious adults.",
    icon: Shield,
    benefits: ["Invisible Aligners", "Comfortable Fit"]
  },
  {
    title: "Root Canal",
    description: "Comfortable, painless endodontic procedures aimed at rescuing and sealing infected tooth canals.",
    icon: ShieldAlert,
    benefits: ["Painless Techniques", "Stops Infection"]
  },
  {
    title: "Smile Design",
    description: "Digital simulation and comprehensive cosmetic analysis modeling your dream smile before starting.",
    icon: Palette,
    benefits: ["3D Face Mapping", "Predictable Outcomes"]
  },
  {
    title: "Pediatric Dentistry",
    description: "Painless, gentle clinic visits built entirely around protecting children's dental development.",
    icon: Baby,
    benefits: ["Child-Friendly Clinicians", "Anxiety-free Options"]
  },
  {
    title: "Dental Crowns",
    description: "Medical-grade solid porcelain crowns milled on-site using precise CAD/CAM digital scanners.",
    icon: Crown,
    benefits: ["Same-Day Crowns", "Metal-Free Porcelain"]
  },
  {
    title: "Emergency Dental Care",
    description: "Priority appointments for acute tooth pain, fractured crowns, or dental trauma available 24/7.",
    icon: HeartPulse,
    benefits: ["Painless Relief", "On-Call Surgeons"]
  },
  {
    title: "Wisdom Tooth Extraction",
    description: "Gentle surgical removal of impacted third molars utilizing advanced painless surgical steps.",
    icon: Layers,
    benefits: ["Painless Removal", "Rapid Healing"]
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const cards = gridRef.current?.querySelectorAll('.service-card');

    if (!cards) return;

    mm.add("(min-width: 768px)", () => {
      // Desktop: Stagger all service cards
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Animate each service card on scroll entrance
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

  // 3D Tilting tilt cards effect on mouse moves
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: x * 0.06,
      rotateX: -y * 0.06,
      transformPerspective: 600,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      {/* Background shapes */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-[#dbc1ac]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="02 / CLINICAL SERVICES" 
          title="Premium Dental Specialties" 
          subtitle="Experience elite restorative and cosmetic treatments, designed for optimal comfort and perfect aesthetics."
        />

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-12 md:mt-16"
        >
          {services.map((svc, index) => {
            const Icon = svc.icon;
            let cardRef: HTMLDivElement | null = null;
            
            return (
              <div
                key={index}
                ref={(el) => { cardRef = el; }}
                onMouseMove={(e) => cardRef && handleMouseMove(e, cardRef)}
                onMouseLeave={() => cardRef && handleMouseLeave(cardRef)}
                className="service-card glass-panel rounded-3xl p-5 border border-[#967259]/10 hover:border-[#967259]/30 transition-all duration-500 hover:shadow-orange-glow group relative flex flex-col justify-between overflow-hidden cursor-none bg-[#dbc1ac]/15"
                data-cursor="view"
              >
                <div className="relative z-10">
                  {/* Glowing Icon Frame */}
                  <div className="w-10 h-10 rounded-2xl bg-[#967259]/10 border border-[#967259]/15 flex items-center justify-center text-[#967259] mb-5 group-hover:scale-110 group-hover:bg-[#967259] group-hover:text-[#ece0d1] transition-all duration-300 shadow-orange-glow-sm">
                    <Icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
                  </div>

                  <h3 className="text-base md:text-lg font-display font-bold tracking-tight mb-2 text-[#38220f] group-hover:text-[#967259] transition-colors duration-300">
                    {svc.title}
                  </h3>
                  
                  <p className="text-xs text-[#634832] mb-5 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="relative z-10 border-t border-[#967259]/10 pt-3 mt-auto">
                  <ul className="flex flex-col gap-1">
                    {svc.benefits.map((bf, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5 text-[10px] text-[#634832]/80">
                        <span className="w-1 h-1 rounded-full bg-[#967259]" />
                        <span>{bf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
