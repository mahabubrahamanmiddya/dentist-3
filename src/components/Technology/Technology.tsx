"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Cpu, Scan, Activity, Radio, Layers } from 'lucide-react';

const techItems = [
  {
    icon: Radio,
    title: "Digital X-Ray",
    tagline: "Instant Diagnostics. 90% Less Radiation.",
    description: "Our high-frequency digital radiology sensors identify decay, bone levels, and root structures in ultra-high resolution while minimizing exposure to negligible thresholds."
  },
  {
    icon: Scan,
    title: "3D Intraoral Scanning",
    tagline: "Zero Mess. Real-time 3D Smile Models.",
    description: "Forget sticky, uncomfortable impression trays. Our hand-held intraoral scanner captures 6,000 frames per second, crafting an exact digital replication of your mouth in under a minute."
  },
  {
    icon: Activity,
    title: "Laser Dentistry",
    tagline: "No Drills. Painless Precision.",
    description: "Advanced soft-tissue lasers replace the traditional clinical drill, cauterizing nerves instantly for clean, bleeding-free aesthetic treatments and faster cell healing cycles."
  },
  {
    icon: Cpu,
    title: "CAD/CAM 3D Milling",
    tagline: "Same-Day Permanent Crowns.",
    description: "Equipped with on-site CAD/CAM milling facilities, we scan, design, and machine custom, medical-grade solid porcelain crowns in a single clinical session."
  },
  {
    icon: Layers,
    title: "Invisible Aligners",
    tagline: "Predictable Shifts. Smart Planning.",
    description: "Utilizing AI-powered shift trackers and advanced thermoplastic polymers, we chart and fabricate customized invisible trays that guide teeth alignment with absolute predictability."
  }
];

export default function Technology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 50%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    const techNodes = containerRef.current?.querySelectorAll('.tech-card-node');
    if (techNodes) {
      techNodes.forEach((node) => {
        gsap.fromTo(node.querySelector('.tech-card-content'),
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );

        gsap.fromTo(node.querySelector('.tech-circle-indicator'),
          { scale: 0.8, backgroundColor: '#ece0d1', borderColor: 'rgba(150,114,89,0.2)' },
          {
            scale: 1.25,
            backgroundColor: '#967259',
            borderColor: '#38220f',
            duration: 0.5,
            scrollTrigger: {
              trigger: node,
              start: 'top 50%',
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
      id="technology" 
      className="relative py-24 md:py-32 bg-[#dbc1ac] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#ece0d1]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#967259]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="03 / INFRASTRUCTURE" 
          title="Futuristic Diagnostics" 
          subtitle="We invest in high-end machinery to make treatments faster, safer, and completely pain-free."
        />

        <div ref={triggerRef} className="relative mt-16 md:mt-24 max-w-4xl mx-auto pl-12 md:pl-24">
          
          {/* Vertical SVG Line */}
          <div className="absolute left-4 md:left-[51px] top-0 h-full w-[4px] pointer-events-none">
            <svg width="4" height="100%" viewBox="0 0 4 1000" preserveAspectRatio="none" className="h-full">
              <line x1="2" y1="0" x2="2" y2="1000" stroke="rgba(99, 72, 50, 0.08)" strokeWidth="4" />
              <path 
                ref={pathRef}
                d="M 2 0 L 2 1000" 
                stroke="#967259" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-24">
            {techItems.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="tech-card-node relative flex items-start">
                  
                  {/* indicator */}
                  <div className="absolute -left-[44px] md:-left-[85px] top-2 z-10 w-6 h-6 rounded-full bg-[#ece0d1] border border-[#967259]/30 flex items-center justify-center tech-circle-indicator transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#967259]" />
                  </div>

                  {/* Card Body */}
                  <div className="tech-card-content w-full glass-panel border border-[#967259]/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[#967259]/30 transition-all duration-500 hover:shadow-orange-glow relative overflow-hidden group bg-[#ece0d1]/35">
                    
                    <div className="w-14 h-14 rounded-2xl bg-[#967259]/10 flex items-center justify-center text-[#967259] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#967259] group-hover:text-[#ece0d1] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex-grow">
                      <span className="text-[10px] font-bold text-[#967259] uppercase tracking-widest block mb-1">
                        Technology 0{idx + 1}
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#38220f] mb-2">
                        {tech.title}
                      </h3>
                      <h4 className="text-sm font-bold text-[#967259] mb-3 italic">
                        {tech.tagline}
                      </h4>
                      <p className="text-xs md:text-sm text-[#634832] leading-relaxed">
                        {tech.description}
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
