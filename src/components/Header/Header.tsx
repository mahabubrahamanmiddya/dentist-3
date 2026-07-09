"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import AnimatedButton from '../AnimatedButton';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP for Mobile Menu Opening & Closing
  useGSAP(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // Fullscreen menu clip path reveal
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(150% at 90% 10%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });

      // Links reveal
      if (menuLinksRef.current) {
        const links = menuLinksRef.current.querySelectorAll('a');
        gsap.fromTo(links, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.25 }
        );
      }
    } else {
      document.body.style.overflow = '';
      
      // Close transition
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(0% at 90% 10%)',
        duration: 0.6,
        ease: 'power4.inOut',
      });
    }
  }, { dependencies: [mobileMenuOpen] });

  // Magnetic logo and buttons logic
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, target: HTMLElement, force = 0.25) => {
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * force;
    const y = (e.clientY - rect.top - rect.height / 2) * force;

    gsap.to(target, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-choose-us' },
    { label: 'Dentists', href: '#dentists' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const whatsappMessage = encodeURIComponent("Hello Doctor, I would like to book an appointment.");
  const whatsappLink = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 select-none ${
          isScrolled 
            ? 'py-4 bg-[#ece0d1]/80 backdrop-blur-md border-b border-[#967259]/15 shadow-orange-glow-sm' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with magnetic effect */}
          <a 
            ref={logoRef}
            href="#home" 
            onMouseMove={(e) => logoRef.current && handleMouseMove(e, logoRef.current, 0.15)}
            onMouseLeave={() => logoRef.current && handleMouseLeave(logoRef.current)}
            className="flex items-center gap-2 group cursor-none"
            data-cursor=""
          >
            <div className="w-9 h-9 rounded-xl bg-[#967259] flex items-center justify-center shadow-orange-glow-sm group-hover:scale-105 transition-all duration-300">
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
            <span className="text-base md:text-lg font-display font-bold tracking-wider text-[#38220f] uppercase">
              Royal<span className="text-[#967259] font-medium">Smile</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-[11px] font-buttons font-bold tracking-widest text-[#634832] uppercase transition-colors duration-300 hover:text-[#967259] relative py-1 block group cursor-none"
                    data-cursor=""
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#967259] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Book Appointment CTA (Magnetic) & Hamburger */}
          <div className="flex items-center gap-4">
            <div 
              onMouseMove={(e) => {
                const btn = headerRef.current?.querySelector('.header-cta-btn') as HTMLElement;
                if (btn) handleMouseMove(e, btn, 0.2);
              }}
              onMouseLeave={() => {
                const btn = headerRef.current?.querySelector('.header-cta-btn') as HTMLElement;
                if (btn) handleMouseLeave(btn);
              }}
              className="hidden md:block"
            >
              <div className="header-cta-btn">
                <AnimatedButton 
                  href={whatsappLink} 
                  target="_blank"
                  className="px-6 py-2.5 text-[10px] font-bold tracking-widest"
                >
                  Book Appointment <ArrowUpRight className="w-3.5 h-3.5" />
                </AnimatedButton>
              </div>
            </div>

            {/* Mobile / General Hamburger */}
            <button 
              ref={hamburgerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseMove={(e) => hamburgerRef.current && handleMouseMove(e, hamburgerRef.current, 0.35)}
              onMouseLeave={() => hamburgerRef.current && handleMouseLeave(hamburgerRef.current)}
              className="p-2.5 text-[#38220f] hover:text-[#967259] transition-colors relative z-50 cursor-none flex flex-col gap-1.5 items-center justify-center w-10 h-10 rounded-full bg-[#dbc1ac]/30 border border-[#967259]/10"
              aria-label="Toggle Menu"
              data-cursor=""
            >
              <span className={`w-5 h-[2px] bg-[#38220f] transition-transform duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`w-5 h-[2px] bg-[#38220f] transition-transform duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 w-full h-full bg-[#ece0d1] z-40 flex flex-col justify-center items-center pointer-events-auto"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center gap-5 md:gap-7">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl md:text-3xl font-display font-bold tracking-widest text-[#38220f] uppercase hover:text-[#967259] transition-colors duration-300 cursor-none"
              data-cursor="view"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <AnimatedButton 
              href={whatsappLink} 
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 text-xs tracking-widest"
            >
              Book Appointment <ArrowUpRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
}
