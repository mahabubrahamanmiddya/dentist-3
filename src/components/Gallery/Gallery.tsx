"use client";

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import SectionTitle from '../SectionTitle';

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Luxury Reception Lobby",
    size: "large"
  },
  {
    src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "3D Intraoral Scanning Operatory",
    size: "medium"
  },
  {
    src: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Surgical Operatory Lounge",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Diagnostics Lab Lounge",
    size: "medium"
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "On-site CAD/CAM Milling Station",
    size: "large"
  },
  {
    src: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Cosmetic Consultation Lounge",
    size: "small"
  }
];

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = galleryGridRef.current?.querySelectorAll('.gallery-grid-item');
    if (items) {
      gsap.fromTo(items,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryGridRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="gallery" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-[#ece0d1]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="11 / GALLERY" 
          title="Clinical Infrastructure Gallery" 
          subtitle="Explore our advanced diagnostic facility, custom engineered to provide maximum relaxation and medical trust."
        />

        {/* Masonry Layout */}
        <div 
          ref={galleryGridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mt-12 md:mt-16"
        >
          {galleryImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxImg(img.src)}
              className="gallery-grid-item break-inside-avoid relative rounded-3xl overflow-hidden border border-[#967259]/10 group cursor-none shadow-orange-glow-sm hover:border-[#967259]/30 hover:shadow-orange-glow transition-all duration-500 bg-[#ece0d1]"
              data-cursor="view"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95 filter brightness-95"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#38220f]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold text-[#967259] uppercase tracking-widest block mb-1">
                  Infrastructure
                </span>
                <h3 className="text-base font-display font-bold text-[#ece0d1] tracking-tight flex items-center gap-2">
                  {img.title} <ZoomIn className="w-4 h-4 text-[#967259]" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 w-full h-full bg-[#38220f]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-none"
        >
          {/* Close */}
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#ece0d1]/10 hover:bg-[#967259] hover:text-[#ece0d1] border border-white/5 transition-all duration-300 flex items-center justify-center cursor-none"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden border border-[#967259]/30 shadow-orange-glow">
            <img 
              src={lightboxImg} 
              alt="Diagnostics Lounge" 
              className="w-full h-full object-contain filter brightness-95" 
            />
          </div>
        </div>
      )}
    </section>
  );
}
