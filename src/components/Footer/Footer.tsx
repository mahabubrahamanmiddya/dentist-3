"use client";

import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Footer() {
  const treatmentLinks = [
    { label: "Dental Implants", href: "#services" },
    { label: "IPS E.max Veneers", href: "#services" },
    { label: "Teeth Whitening", href: "#services" },
    { label: "Invisible Aligners", href: "#services" }
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Clinic", href: "#about" },
    { label: "Our Dentists", href: "#dentists" },
    { label: "Smile Gallery", href: "#gallery" },
    { label: "Clinical FAQs", href: "#faq" }
  ];

  return (
    <footer className="bg-[#ece0d1] border-t border-[#967259]/15 pt-16 pb-8 select-none relative z-10">
      
      {/* Background soft layout blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#dbc1ac]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-16">
        
        {/* Brand Information */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#967259] flex items-center justify-center shadow-orange-glow-sm">
              <svg width="18" height="18" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ece0d1]">
                <path 
                  d="M 50 15 
                     C 40 15, 30 18, 25 30 
                     C 20 42, 20 60, 24 75 
                     C 26 82, 32 90, 36 96 
                     C 40 102, 42 108, 41 112
                     C 40 115, 36 118, 38 120 
                     C 40 122, 44 116, 48 108 
                     C 49 106, 50 106, 51 108
                     C 55 116, 59 122, 61 120 
                     C 63 118, 59 115, 58 112 
                     C 57 108, 59 102, 63 96 
                     C 67 90, 73 82, 75 75 
                     C 79 60, 79 42, 74 30 
                     C 69 18, 59 15, 50 15 Z" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-base font-display font-bold tracking-wider text-[#38220f] uppercase">
              Royal<span className="text-[#967259] font-medium">Smile</span>
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#634832] leading-relaxed max-w-sm">
            Royal Smile Clinic sets a global standard of dentistry, blending cutting-edge clinical scanning diagnostics with boutique medical hospitality.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-3.5 mt-4">
            <a href="#" className="w-8 h-8 rounded-lg bg-[#dbc1ac]/40 border border-[#967259]/10 flex items-center justify-center text-[#38220f] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#dbc1ac]/40 border border-[#967259]/10 flex items-center justify-center text-[#38220f] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#dbc1ac]/40 border border-[#967259]/10 flex items-center justify-center text-[#38220f] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Treatments Links */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[#967259] tracking-widest uppercase">Treatments</h4>
          <ul className="flex flex-col gap-2.5">
            {treatmentLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="text-xs md:text-sm text-[#634832] hover:text-[#967259] transition-colors duration-200 flex items-center gap-1 group cursor-none" data-cursor="">
                  {link.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Directory */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[#967259] tracking-widest uppercase">Quick Directory</h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="text-xs md:text-sm text-[#634832] hover:text-[#967259] transition-colors duration-200 flex items-center gap-1 group cursor-none" data-cursor="">
                  {link.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Timing and Newsletter Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[#967259] tracking-widest uppercase">Newsletter</h4>
          <p className="text-xs text-[#634832] max-w-sm leading-relaxed">
            Subscribe to receive clinic announcements, cosmetic dental case studies, and healthy dental blogs.
          </p>
          
          <form className="flex gap-2 w-full mt-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email address" 
              className="bg-[#dbc1ac]/40 border border-[#967259]/20 focus:border-[#967259] rounded-xl px-4 py-2.5 text-xs text-[#38220f] outline-none transition-all flex-grow cursor-none placeholder:text-[#634832]/40"
              data-cursor=""
            />
            <button 
              type="submit" 
              className="bg-[#967259] hover:bg-[#634832] text-[#ece0d1] p-2.5 rounded-xl border border-[#967259]/20 shadow-orange-glow-sm hover:shadow-orange-glow flex items-center justify-center transition-all duration-300 cursor-none"
              data-cursor="magnetic"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Solid Luxury Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="w-full h-[1px] bg-[#967259]/20 shadow-orange-glow-sm my-6" />
        
        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] md:text-xs text-[#634832]">
            &copy; {new Date().getFullYear()} Royal Smile Dental Clinic. All Rights Reserved.
          </span>
          <span className="text-[10px] md:text-xs text-[#634832] flex items-center gap-1">
            Made with luxury design aesthetics.
          </span>
        </div>
      </div>

    </footer>
  );
}
