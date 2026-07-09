"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import AnimatedButton from '../AnimatedButton';
import { Check, ShieldCheck } from 'lucide-react';

const plans = [
  {
    name: "Preventive Care",
    price: "₹4,999",
    description: "Ideal for maintaining clinical oral hygiene and basic diagnostics.",
    features: [
      "Ultrasonic Deep Scaling & Polish",
      "Digital X-Ray Assessment",
      "Comprehensive Dental Audit",
      "Personalized Hygiene Plan"
    ],
    whatsappMsg: "I am interested in the Preventive Care package."
  },
  {
    name: "Smile Makeover",
    price: "₹89,999",
    description: "Premium cosmetic restorations using digital teeth veneers.",
    isPopular: true,
    features: [
      "4 Custom IPS E.max Veneers",
      "Digital Smile Design Try-On",
      "Laser Smile Whitening",
      "Gingival Aesthetic Reshaping"
    ],
    whatsappMsg: "I am interested in the Smile Makeover package."
  },
  {
    name: "Premium Implants",
    price: "₹59,999",
    description: "Elite titanium implants replacing single teeth permanently.",
    features: [
      "Grade 5 Bio-Titanium Screw",
      "Custom CAD/CAM Abutment",
      "Zirconia Crown Attachment",
      "3D Intraoral Diagnostic Scan"
    ],
    whatsappMsg: "I am interested in the Premium Implants package."
  },
  {
    name: "Invisible Aligners",
    price: "₹1,49,999",
    description: "Orthodontic alignment without metal wires or brackets.",
    features: [
      "Complete Set of Aligner Trays",
      "3D Dental Movement Maps",
      "Bi-Weekly Progress Trackers",
      "Post-Treatment Retainers"
    ],
    whatsappMsg: "I am interested in the Invisible Aligners package."
  }
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const cards = gridRef.current?.querySelectorAll('.pricing-card');

    if (!cards) return;

    mm.add("(min-width: 768px)", () => {
      // Desktop: Stagger all pricing cards together
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Trigger each pricing card individually
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

  const getWhatsAppLink = (planName: string, message: string) => {
    const text = encodeURIComponent(
      `Hello Doctor,\n\nI would like to book the "${planName}" package.\n\nNote: ${message}`
    );
    return `https://wa.me/919999999999?text=${text}`;
  };

  return (
    <section 
      ref={containerRef}
      id="pricing" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#dbc1ac]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="08 / INVESTMENT" 
          title="Luxury Treatment Pricing Plans" 
          subtitle="Select standard treatment plans designed to deliver premium outcomes with flexible packages."
        />

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16"
        >
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`pricing-card rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 relative cursor-none hover:-translate-y-2 select-none ${
                plan.isPopular 
                  ? 'bg-[#dbc1ac]/40 border-2 border-[#967259] shadow-orange-glow' 
                  : 'glass-panel border border-[#967259]/15 hover:border-[#967259]/30 hover:shadow-orange-glow-sm bg-[#dbc1ac]/15'
              }`}
              data-cursor="magnetic"
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 bg-[#967259] text-[#ece0d1] px-3 py-1 rounded-full text-[9px] font-buttons font-bold tracking-widest uppercase shadow-orange-glow-sm flex items-center gap-1 animate-pulse-slow">
                  <ShieldCheck className="w-3 h-3" /> Featured Package
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold text-[#967259] tracking-widest uppercase block mb-1">
                  Option 0{idx + 1}
                </span>
                <h3 className="text-xl font-display font-bold text-[#38220f]">{plan.name}</h3>
                
                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-[#38220f]">{plan.price}</span>
                  <span className="text-xs text-[#634832] font-semibold">/ session</span>
                </div>

                <p className="text-xs text-[#634832] leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3.5 mb-8 border-t border-[#967259]/10 pt-6">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#634832] leading-tight">
                      <Check className="w-4 h-4 text-[#967259] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AnimatedButton 
                href={getWhatsAppLink(plan.name, plan.whatsappMsg)}
                target="_blank"
                className={`w-full text-xs font-bold uppercase tracking-wider ${
                  plan.isPopular 
                    ? 'bg-[#967259] hover:bg-[#634832] text-[#ece0d1] shadow-orange-glow' 
                    : 'bg-transparent border border-[#967259]/20 text-[#38220f] hover:bg-[#967259] hover:text-[#ece0d1] hover:border-[#967259]'
                }`}
              >
                Book Package
              </AnimatedButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
