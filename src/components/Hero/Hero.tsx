"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, Clock, MapPin, Phone, Star } from 'lucide-react';
import AnimatedButton from '../AnimatedButton';

const featuredDoctors = [
  {
    name: "Dr. Marcus Vance",
    role: "Clinical Director & Implant Surgeon",
    exp: "20 Yrs Exp",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Cosmetic Dentist & Veneer Specialist",
    exp: "12 Yrs Exp",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const toothIllustrationRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [expCount, setExpCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto doctor slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredDoctors.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Pre-animation state setups
    gsap.set('.hero-title-char', { y: '115%', opacity: 0 });
    gsap.set('.hero-fade-up', { y: 35, opacity: 0 });
    gsap.set('.hero-bg-circle', { scale: 0, opacity: 0 });
    gsap.set(toothIllustrationRef.current, { scale: 0.7, y: -30, opacity: 0 });

    // Entrance Timeline
    tl.to('.hero-bg-circle', { scale: 1, opacity: 0.6, duration: 1.6, stagger: 0.2, ease: 'power3.out' })
      .to(toothIllustrationRef.current, { scale: 1, y: 0, opacity: 0.85, duration: 1.4, ease: 'back.out(1.1)' }, '-=1.2')
      .to('.hero-title-char', { y: '0%', opacity: 1, duration: 0.9, stagger: 0.02 }, '-=1.1')
      .to('.hero-fade-up', { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, '-=0.7');

    // Float tooth SVG continuously
    gsap.to(toothIllustrationRef.current, {
      y: -12,
      rotation: 1.5,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Mouse pointer parallax for tooth illustration and circles
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const moveX = (clientX - width / 2) * 0.02;
      const moveY = (clientY - height / 2) * 0.02;

      gsap.to(toothIllustrationRef.current, {
        x: moveX * 1.5,
        y: moveY * 1.5,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to('.hero-bg-circle', {
        x: -moveX * 0.8,
        y: -moveY * 0.8,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Number counters triggers
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: 20,
          duration: 1.4,
          ease: 'power1.out',
          onUpdate: function () {
            setExpCount(Math.floor(this.targets()[0].val));
          }
        });
        gsap.to({ val: 0 }, {
          val: 5000,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            setPatientCount(Math.floor(this.targets()[0].val));
          }
        });
        gsap.to({ val: 0 }, {
          val: 98,
          duration: 1.4,
          ease: 'power1.out',
          onUpdate: function () {
            setSuccessCount(Math.floor(this.targets()[0].val));
          }
        });
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: containerRef });

  // Word Split Setup for Hero Title Character Reveal
  const line1 = "Crafting Beautiful".split("");
  const line2 = "Smiles with Precision".split("");

  const whatsappMessage = encodeURIComponent(
    "Hello Doctor,\n\nI would like to book a private consultation appointment.\n\nPlease confirm availability."
  );
  const whatsappLink = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-[#ece0d1] select-none border-b border-[#967259]/10"
    >
      {/* Dynamic Background Circles */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[750px] md:h-[750px] bg-[#dbc1ac]/40 rounded-full blur-[110px] pointer-events-none hero-bg-circle" />
      <div className="absolute top-[15%] left-[8%] w-[250px] h-[250px] bg-[#967259]/5 rounded-full blur-[70px] pointer-events-none hero-bg-circle" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 flex-grow">
        
        {/* Left: Statistics Panel */}
        <div ref={statsRef} className="lg:col-span-3 order-2 lg:order-1 flex flex-row lg:flex-col justify-between lg:justify-center gap-6 lg:gap-12 py-4 hero-fade-up">
          <div className="flex flex-col border-l border-[#967259]/30 pl-4">
            <span className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[#967259]">
              {expCount}+
            </span>
            <span className="text-[10px] tracking-widest text-[#634832] font-bold uppercase mt-1">
              Years Experience
            </span>
          </div>

          <div className="flex flex-col border-l border-[#967259]/30 pl-4">
            <span className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[#967259]">
              {patientCount}+
            </span>
            <span className="text-[10px] tracking-widest text-[#634832] font-bold uppercase mt-1">
              Happy Patients
            </span>
          </div>

          <div className="flex flex-col border-l border-[#967259]/30 pl-4">
            <span className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[#967259]">
              {successCount}%
            </span>
            <span className="text-[10px] tracking-widest text-[#634832] font-bold uppercase mt-1">
              Success Rate
            </span>
          </div>
        </div>

        {/* Center: Main Tooth Illustration & Luxury Headline */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center text-center relative py-6 md:py-10">
          
          {/* Header Title */}
          <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-4 flex flex-col items-center gap-1 md:gap-2">
            <span className="block overflow-hidden h-fit leading-tight text-[#38220f]">
              {line1.map((char, idx) => (
                <span 
                  key={idx} 
                  className="hero-title-char inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden h-fit leading-tight text-[#967259] font-medium italic">
              {line2.map((char, idx) => (
                <span 
                  key={idx} 
                  className="hero-title-char inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Floating Premium Tooth SVG */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center my-4">
            <div className="absolute inset-0 bg-[#967259]/5 rounded-full blur-xl border border-[#967259]/10 pointer-events-none" />
            
            <svg 
              ref={toothIllustrationRef} 
              width="200" 
              height="200" 
              viewBox="0 0 100 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 filter drop-shadow-[0_15px_30px_rgba(99,72,50,0.12)] cursor-none"
              data-cursor="magnetic"
            >
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
                stroke="#967259" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="#dbc1ac"
                fillOpacity="0.15"
              />
              <circle cx="50" cy="65" r="1.5" fill="#967259" />
            </svg>

            {/* Ambient visual overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#967259]/5 via-transparent to-transparent pointer-events-none rounded-full" />
          </div>

          <p className="text-xs md:text-sm text-[#634832] max-w-md mb-8 leading-relaxed font-sans hero-fade-up">
            Experience premium dental care inside a calming luxury setting. We combine advanced cosmetic procedures, digital smile design, and elite implants to craft beautiful, natural smiles.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 hero-fade-up">
            <AnimatedButton href="#appointment">
              Book Appointment
            </AnimatedButton>
            
            <a 
              href="tel:+919999988888" 
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-[#967259]/20 bg-transparent text-[#38220f] font-buttons font-bold text-xs uppercase tracking-widest hover:bg-[#967259] hover:text-[#ece0d1] hover:border-[#967259] transition-all duration-300 cursor-none"
              data-cursor="magnetic"
            >
              Call Now
            </a>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-green-500/20 bg-green-500/5 text-green-700 font-buttons font-bold text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all duration-300 cursor-none"
              data-cursor="magnetic"
            >
              WhatsApp Appointment
            </a>
          </div>
        </div>

        {/* Right: Featured Doctor Carousel */}
        <div ref={sliderRef} className="lg:col-span-3 order-3 flex flex-col justify-center items-center lg:items-end hero-fade-up">
          <div className="w-full max-w-[260px] glass-panel rounded-3xl border border-[#967259]/10 overflow-hidden relative shadow-orange-glow-sm bg-[#dbc1ac]/10">
            <div className="p-3.5 border-b border-[#967259]/10 flex items-center justify-between">
              <span className="text-[9px] font-bold tracking-widest text-[#967259] uppercase">Featured Doctors</span>
              <div className="flex gap-1">
                {featuredDoctors.map((_, i) => (
                  <span 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'bg-[#967259] w-3.5' : 'bg-[#967259]/20'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="relative h-64 overflow-hidden">
              {featuredDoctors.map((doc, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 p-4 flex flex-col justify-end transition-all duration-700 ease-in-out ${
                    idx === activeSlide 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                  }`}
                >
                  <img 
                    src={doc.image} 
                    alt={doc.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-90 hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ece0d1] via-[#ece0d1]/35 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-1 text-[10px] text-[#967259] font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating} Rating</span>
                    </div>
                    <h3 className="text-base font-display font-bold text-[#38220f]">{doc.name}</h3>
                    <p className="text-[10px] text-[#634832] font-semibold mt-0.5">{doc.role} &bull; {doc.exp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom: Info Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 md:mt-16 relative z-10 hero-fade-up">
        <div className="glass-panel border-t border-[#967259]/15 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-6 p-6 shadow-orange-glow-sm bg-[#dbc1ac]/15">
          
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-[#967259]/10 pb-4 md:pb-0 md:pr-4">
            <div className="w-10 h-10 rounded-xl bg-[#967259]/10 flex items-center justify-center text-[#967259]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#967259] uppercase block">Our Location</span>
              <span className="text-xs md:text-sm font-bold text-[#38220f]">Bronze Boulevard, Mumbai</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-[#967259]/10 pb-4 md:pb-0 md:pr-4">
            <div className="w-10 h-10 rounded-xl bg-[#967259]/10 flex items-center justify-center text-[#967259]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#967259] uppercase block">Working Hours</span>
              <span className="text-xs md:text-sm font-bold text-[#38220f]">Mon - Sat: 9AM - 8PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-[#967259]/10 pb-4 md:pb-0 md:pr-4">
            <div className="w-10 h-10 rounded-xl bg-[#967259]/10 flex items-center justify-center text-[#967259]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#967259] uppercase block">Emergency 24/7</span>
              <span className="text-xs md:text-sm font-bold text-[#967259] underline decoration-dotted">+91 99999 88888</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pb-0">
            <div className="w-10 h-10 rounded-xl bg-[#967259]/10 flex items-center justify-center text-[#967259]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#967259] uppercase block">Trusted Excellence</span>
              <span className="text-xs md:text-sm font-bold text-[#38220f]">Awwwards & Medical Laurels</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
