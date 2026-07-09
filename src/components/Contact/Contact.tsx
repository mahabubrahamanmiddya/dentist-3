"use client";

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';
import AnimatedButton from '../AnimatedButton';
import SectionTitle from '../SectionTitle';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: 'Implants',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.contact-reveal-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Doctor,

I would like to request a callback consultation.

Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Preferred Service: ${formData.service}
Message: ${formData.message || 'None'}`
    );
    return `https://wa.me/919999999999?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('success');

    setTimeout(() => {
      window.open(getWhatsAppLink(), '_blank');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        service: 'Implants',
        message: ''
      });
      setIsSubmitting(false);
      setSubmitStatus('idle');
    }, 1500);
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative bg-[#ece0d1] overflow-hidden border-b border-[#967259]/10 select-none"
    >
      
      {/* 1. Emergency Section Banner */}
      <div className="w-full bg-[#dbc1ac] border-y border-[#967259]/20 py-8 relative overflow-hidden flex items-center justify-center">
        
        {/* Pulsing glow line */}
        <div className="absolute inset-0 bg-[#967259]/5 animate-pulse-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {/* Pulsing indicator */}
            <div className="relative w-12 h-12 rounded-full bg-[#967259]/10 flex items-center justify-center text-[#967259] flex-shrink-0 shadow-orange-glow-sm">
              <span className="absolute inset-0 rounded-full bg-[#967259]/25 animate-ping" />
              <ShieldAlert className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <h3 className="text-lg font-display font-extrabold tracking-tight text-[#38220f]">Dental Emergency Support?</h3>
              <p className="text-xs text-[#634832] mt-0.5 font-sans">Severe nerve pain, broken crowns, or bleeding? Contact us immediately.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="tel:+919999988888" 
              className="text-base md:text-lg font-buttons font-bold text-[#967259] hover:text-[#634832] transition-colors flex items-center gap-1.5 cursor-none"
              data-cursor="magnetic"
            >
              Hotline: +91 99999 88888
            </a>
            <AnimatedButton href="tel:+919999988888" className="bg-[#967259] shadow-orange-glow text-[#ece0d1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider">
              Call Hotline
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* 2. Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#dbc1ac]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="contact-section-grid grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Map & Coordinates */}
          <div className="lg:col-span-5 flex flex-col gap-8 contact-reveal-item">
            <SectionTitle 
              number="12 / CONNECT" 
              title="Schedule Callback Visit" 
              subtitle="Submit details to request a callback from our client coordination desk, or write to us directly."
            />

            {/* Coordinates List */}
            <div className="flex flex-col gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#967259]/10 border border-[#967259]/20 flex items-center justify-center text-[#967259] flex-shrink-0 shadow-orange-glow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#967259] uppercase tracking-widest">Clinic Address</h4>
                  <p className="text-sm font-medium text-[#38220f] mt-1 leading-relaxed">
                    Suite 500, Bronze Boulevard,<br />Bandra West, Mumbai, MH 400050
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#967259]/10 border border-[#967259]/20 flex items-center justify-center text-[#967259] flex-shrink-0 shadow-orange-glow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#967259] uppercase tracking-widest">Front Desk Phone</h4>
                  <p className="text-sm font-bold text-[#38220f] mt-1">
                    +91 99999 77777 / +91 22 4444 8888
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#967259]/10 border border-[#967259]/20 flex items-center justify-center text-[#967259] flex-shrink-0 shadow-orange-glow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#967259] uppercase tracking-widest">Email Inquiry</h4>
                  <p className="text-sm font-medium text-[#38220f] mt-1">
                    concierge@royalsmileclinic.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#967259]/10 border border-[#967259]/20 flex items-center justify-center text-[#967259] flex-shrink-0 shadow-orange-glow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#967259] uppercase tracking-widest">Opening Hours</h4>
                  <p className="text-sm font-medium text-[#38220f] mt-1">
                    Monday - Saturday: 09:00 AM - 08:00 PM<br />
                    Sunday: Emergency Support Only
                  </p>
                </div>
              </div>

            </div>

            {/* Google Map Mockup */}
            <div className="w-full h-56 rounded-3xl overflow-hidden border border-[#967259]/15 shadow-orange-glow-sm relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8037929424177!2d72.82583857500588!3d19.028352653457597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cec088e89f81%3A0xe54e6fc2303534d0!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "sepia(25%) contrast(95%) brightness(95%)" }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-auto"
              />
            </div>
          </div>

          {/* Right Column: Callback Form */}
          <div className="lg:col-span-7 contact-reveal-item">
            <div className="w-full glass-panel border border-[#967259]/15 rounded-3xl p-6 md:p-8 shadow-orange-glow-sm relative overflow-hidden bg-[#dbc1ac]/15">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#967259]/5 via-transparent to-transparent pointer-events-none" />

              <h3 className="text-xl font-display font-bold tracking-tight text-[#38220f] mb-6">Request Callback Consultation</h3>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">First Name</label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Liam"
                      className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none placeholder:text-[#634832]/35"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Vance"
                      className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none placeholder:text-[#634832]/35"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99999 88888"
                      className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none placeholder:text-[#634832]/35"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@domain.com"
                      className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none placeholder:text-[#634832]/35"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Aesthetic Service</label>
                  <select 
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none appearance-none"
                  >
                    <option value="Implants" className="bg-[#ece0d1]">Dental Implants</option>
                    <option value="Veneers" className="bg-[#ece0d1]"> IPS E.max Veneers</option>
                    <option value="Whitening" className="bg-[#ece0d1]">Laser Whitening</option>
                    <option value="Aligners" className="bg-[#ece0d1]">Invisible Aligners</option>
                    <option value="RootCanal" className="bg-[#ece0d1]">Micro Root Canal</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Consultation Notes (Optional)</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details about your conditions..."
                    className="bg-[#ece0d1]/60 border border-[#967259]/10 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none resize-none placeholder:text-[#634832]/35"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-[#967259]/10 border border-[#967259]/20 text-[#967259] p-4 rounded-xl text-xs font-semibold">
                    Callback validated! Redirecting to WhatsApp to complete secure booking...
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <AnimatedButton 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full sm:w-auto bg-[#967259] text-[#ece0d1] shadow-orange-glow text-xs uppercase tracking-widest font-bold font-buttons"
                  >
                    {isSubmitting ? 'Connecting...' : 'Request Callback'} <Send className="w-3.5 h-3.5" />
                  </AnimatedButton>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
