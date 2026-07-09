"use client";

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';
import SectionTitle from '../SectionTitle';

const faqList = [
  {
    id: 1,
    question: "Are dental implant surgeries painful?",
    answer: "No. The procedure is performed under local anaesthesia or mild sedation. You won't feel any pain during the surgery. Post-surgical discomfort is minimal and easily managed with prescribed mild analgesics over 2 to 3 days."
  },
  {
    id: 2,
    question: "What are IPS E.max veneers and how long do they last?",
    answer: "IPS E.max veneers are made from premium lithium disilicate glass-ceramic, renowned for its incredible strength and natural translucency. When bonded with clinical accuracy and maintained with standard hygiene, they last between 10 to 15 years."
  },
  {
    id: 3,
    question: "Do you accept emergency dental walk-ins?",
    answer: "Yes. We maintain slots daily for emergency cases (severe pain, chipped restorations, avulsed teeth, bleeding). Please call our emergency number (+91 99999 88888) directly so we can prepare a surgical room before you arrive."
  },
  {
    id: 4,
    question: "What are the benefits of 3D Intraoral Scanning?",
    answer: "3D intraoral scanning is instant, clean, and extremely accurate. It creates a digital mold of your mouth within 60 seconds. This allows us to plan teeth veneers and invisible aligner trays with sub-millimeter clinical precision, completely avoiding sticky impression trays."
  },
  {
    id: 5,
    question: "How long does an invisible aligner treatment take?",
    answer: "Orthodontic timelines depend on the severity of the misalignment. Mild cases require 4 to 6 months, while complex orthodontic adjustments take between 12 to 18 months. You will receive customized progress checkups every 6 weeks."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (id: number, idx: number) => {
    const isOpening = activeId !== id;
    
    // Close active FAQ
    if (activeId !== null) {
      const openIdx = faqList.findIndex(item => item.id === activeId);
      if (openIdx !== -1 && answersRef.current[openIdx]) {
        gsap.to(answersRef.current[openIdx], {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    }

    // Open new FAQ
    if (isOpening) {
      setActiveId(id);
      if (answersRef.current[idx]) {
        gsap.fromTo(answersRef.current[idx],
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out'
          }
        );
      }
    } else {
      setActiveId(null);
    }
  };

  return (
    <section 
      ref={containerRef}
      id="faq" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-[#dbc1ac]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="10 / QUESTIONS" 
          title="Clinical FAQ" 
          subtitle="Everything you need to know about our treatments, schedules, and emergency support."
          alignment="center"
        />

        {/* Accordions */}
        <div className="flex flex-col gap-4 mt-12 md:mt-16">
          {faqList.map((faq, idx) => {
            const isOpen = activeId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`glass-panel border rounded-3xl transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#967259]/40 bg-[#dbc1ac]/20 shadow-orange-glow-sm' 
                    : 'border-[#967259]/15 hover:border-[#967259]/30 bg-[#dbc1ac]/10'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id, idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-none"
                  data-cursor="magnetic"
                >
                  <h3 className="text-sm md:text-base font-display font-bold tracking-tight text-[#38220f] pr-4 group-hover:text-[#967259] transition-colors">
                    {faq.question}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-[#967259]/25 flex items-center justify-center text-[#967259] hover:bg-[#967259] hover:text-[#ece0d1] transition-all duration-300 flex-shrink-0 shadow-orange-glow-sm">
                    {isOpen ? (
                      <Minus className="w-4 h-4 transition-transform duration-300 rotate-180" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform duration-300" />
                    )}
                  </div>
                </button>

                <div 
                  ref={(el) => { answersRef.current[idx] = el; }}
                  className="overflow-hidden h-0 opacity-0 px-5 md:px-6"
                >
                  <div className="pb-5 md:pb-6 border-t border-[#967259]/10 pt-4 text-xs md:text-sm text-[#634832] leading-relaxed">
                    {faq.answer}
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
