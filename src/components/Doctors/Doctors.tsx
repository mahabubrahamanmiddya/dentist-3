"use client";

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Star } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const doctorsList = [
  {
    name: "Dr. Marcus Vance",
    role: "Chief Implantologist",
    exp: "20+ Years Experience",
    quals: ["DDS, Harvard Dental School", "Fellow of AAID", "Implantology Specialist"],
    rating: 4.9,
    socials: { fb: "#", ig: "#", ln: "#" },
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    exp: "12+ Years Experience",
    quals: ["DDS, UC San Francisco", "Cosmetic Fellowship, London", "AACA Member"],
    rating: 5.0,
    socials: { fb: "#", ig: "#", ln: "#" },
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Invisalign Specialist",
    exp: "10+ Years Experience",
    quals: ["DDS, Kings College London", "Invisalign Elite Provider", "WFO Member"],
    rating: 5.0,
    socials: { fb: "#", ig: "#", ln: "#" },
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Dr. Aarav Mehta",
    role: "Micro-Endodontist",
    exp: "8+ Years Experience",
    quals: ["DDS, AIIMS New Delhi", "Micro-Endodontic Expert", "IES Member"],
    rating: 4.8,
    socials: { fb: "#", ig: "#", ln: "#" },
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Doctors() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const slides = containerRef.current?.querySelectorAll('.swiper-slide');

    if (!slides) return;

    mm.add("(min-width: 768px)", () => {
      // Desktop: stagger doctor cards together
      gsap.fromTo(slides,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.doctors-swiper',
            start: 'top 85%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: reveal doctor cards individually as they scroll into view
      slides.forEach((slide) => {
        gsap.fromTo(slide,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const getWhatsAppLink = (docName: string) => {
    const text = encodeURIComponent(
      `Hello Doctor,\n\nI would like to book a dental checkup session with ${docName}.\n\nPlease confirm availability.`
    );
    return `https://wa.me/919999999999?text=${text}`;
  };

  return (
    <section 
      ref={containerRef}
      id="dentists" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-[#dbc1ac]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-[500px] h-[500px] bg-[#967259]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="05 / SPECIALISTS" 
          title="Meet Our Board-Certified Dentists" 
          subtitle="Consult with our board-certified, award-winning clinicians committed to restoring your smile."
        />

        {/* Swiper Slider */}
        <div className="mt-12 md:mt-16 relative" data-cursor="DRAG">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="doctors-swiper !pb-12"
          >
            {doctorsList.map((doc, idx) => (
              <SwiperSlide key={idx}>
                <div className="group rounded-3xl overflow-hidden glass-panel border border-[#967259]/10 hover:border-[#967259]/30 hover:shadow-orange-glow transition-all duration-500 flex flex-col relative h-[500px] cursor-none bg-[#dbc1ac]/10">
                  
                  {/* Portrait */}
                  <div className="relative w-full h-[65%] overflow-hidden">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95 filter brightness-95"
                    />
                    
                    {/* Stars and Exp badge */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <div className="bg-[#ece0d1]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#967259]/20 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#967259] text-[#967259]" />
                        <span className="text-[11px] font-bold text-[#38220f]">{doc.rating}</span>
                      </div>
                      <div className="bg-[#ece0d1]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#967259]/10 text-[10px] font-bold text-[#38220f] uppercase tracking-wide">
                        {doc.exp}
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#dbc1ac]/65 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col justify-between flex-grow relative bg-[#dbc1ac]/20 z-10">
                    
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#38220f]">{doc.name}</h3>
                      <p className="text-xs font-bold text-[#967259] tracking-widest mt-1 uppercase">{doc.role}</p>
                      
                      {/* Qualifications list */}
                      <ul className="mt-4 flex flex-col gap-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-in-out">
                        {doc.quals.map((qual, qIdx) => (
                          <li key={qIdx} className="text-[11px] text-[#634832] flex items-center gap-1.5 font-sans">
                            <span className="w-1.5 h-[1px] bg-[#967259]" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action bottom */}
                    <div className="flex items-center justify-between mt-4 border-t border-[#967259]/10 pt-4 transition-all duration-500">
                      
                      <a 
                        href={getWhatsAppLink(doc.name)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-buttons font-bold uppercase tracking-widest text-[#38220f] hover:text-[#967259] transition-colors flex items-center gap-1 cursor-none"
                      >
                        Book Appointment <ArrowRight className="w-4 h-4" />
                      </a>

                      {/* Socials */}
                      <div className="flex gap-2">
                        <a href={doc.socials.fb} className="p-1.5 rounded-lg border border-[#967259]/10 text-[#634832] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </a>
                        <a href={doc.socials.ig} className="p-1.5 rounded-lg border border-[#967259]/10 text-[#634832] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
                          <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                        </a>
                        <a href={doc.socials.ln} className="p-1.5 rounded-lg border border-[#967259]/10 text-[#634832] hover:text-[#967259] hover:border-[#967259]/30 transition-all duration-300 cursor-none" data-cursor="magnetic">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                          </svg>
                        </a>
                      </div>

                    </div>

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6">
            <div className="swiper-custom-pagination flex gap-1.5 cursor-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
