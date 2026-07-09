"use client";

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { CalendarCheck, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  email: z.string().email("Invalid email address"),
  treatment: z.string().min(1, "Please select a treatment"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional()
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function Appointment() {
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      treatment: "Implants",
      time: "09:00 AM"
    }
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.appointment-reveal',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.appointment-reveal',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const onSubmit = (data: AppointmentFormValues) => {
    setIsSuccess(true);
    
    // GSAP Animation for success screen
    gsap.fromTo(successRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
    );

    // Format WhatsApp text
    const text = `Hello Doctor,

I would like to book an appointment.

Name: ${data.name}
Phone: ${data.phone}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
Treatment: ${data.treatment}
Message: ${data.message || 'None'}

Please confirm my appointment.`;

    const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
      reset();
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <section 
      ref={containerRef}
      id="appointment" 
      className="relative py-24 md:py-32 bg-[#ece0d1] overflow-hidden select-none border-b border-[#967259]/10"
    >
      <div className="absolute top-[20%] left-[-5%] w-96 h-96 bg-[#dbc1ac]/40 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          number="07 / RESERVATION" 
          title="Book Private Consultation" 
          subtitle="Submit your clinical checkup details below to launch WhatsApp booking instantly."
          alignment="center"
        />

        <div className="appointment-reveal mt-12 md:mt-16 w-full glass-panel border border-[#967259]/15 rounded-3xl p-6 md:p-10 shadow-orange-glow relative overflow-hidden bg-[#dbc1ac]/20">
          
          {/* Success Overlay Panel */}
          {isSuccess && (
            <div 
              ref={successRef} 
              className="absolute inset-0 bg-[#ece0d1]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#967259]/10 border-2 border-[#967259] flex items-center justify-center text-[#967259] mb-6 animate-bounce">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#38220f] mb-2">Details Validated!</h3>
              <p className="text-sm text-[#634832] max-w-sm leading-relaxed mb-6">
                Redirecting to WhatsApp to send secure message...
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#967259] uppercase tracking-widest animate-pulse">
                <span>Connecting to WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Input Row: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Liam Vance" 
                  {...register("name")}
                  className={`bg-[#ece0d1]/50 border rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all placeholder:text-[#634832]/30 cursor-none ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#967259]/20 focus:border-[#967259]'
                  }`}
                />
                {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 99999 88888" 
                  {...register("phone")}
                  className={`bg-[#ece0d1]/50 border rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all placeholder:text-[#634832]/30 cursor-none ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#967259]/20 focus:border-[#967259]'
                  }`}
                />
                {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone.message}</span>}
              </div>
            </div>

            {/* Input Row: Email & Treatment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. name@domain.com" 
                  {...register("email")}
                  className={`bg-[#ece0d1]/50 border rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all placeholder:text-[#634832]/30 cursor-none ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#967259]/20 focus:border-[#967259]'
                  }`}
                />
                {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Treatment Category</label>
                <select 
                  {...register("treatment")}
                  className="bg-[#ece0d1]/50 border border-[#967259]/20 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none appearance-none"
                >
                  <option value="Implants">Dental Implants</option>
                  <option value="Veneers">IPS E.max Veneers</option>
                  <option value="Whitening">Laser Teeth Whitening</option>
                  <option value="Aligners">Invisible Aligners</option>
                  <option value="Root Canal">Micro Root Canal</option>
                  <option value="Smile Design">Digital Smile Design</option>
                </select>
              </div>
            </div>

            {/* Input Row: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Preferred Date</label>
                <input 
                  type="date" 
                  {...register("date")}
                  className={`bg-[#ece0d1]/50 border rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none ${
                    errors.date ? 'border-red-500 focus:border-red-500' : 'border-[#967259]/20 focus:border-[#967259]'
                  }`}
                />
                {errors.date && <span className="text-[10px] text-red-500 font-semibold">{errors.date.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Preferred Time</label>
                <select 
                  {...register("time")}
                  className="bg-[#ece0d1]/50 border border-[#967259]/20 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all cursor-none appearance-none"
                >
                  <option value="09:00 AM">Morning: 09:00 AM - 12:00 PM</option>
                  <option value="01:00 PM">Afternoon: 01:00 PM - 04:00 PM</option>
                  <option value="05:00 PM">Evening: 05:00 PM - 08:00 PM</option>
                </select>
              </div>
            </div>

            {/* Input Row: Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#967259] uppercase tracking-widest">Message Notes (Optional)</label>
              <textarea 
                rows={3} 
                placeholder="Write custom symptoms or schedule requirements..." 
                {...register("message")}
                className="bg-[#ece0d1]/50 border border-[#967259]/20 focus:border-[#967259] rounded-xl px-4 py-3 text-xs md:text-sm text-[#38220f] outline-none transition-all placeholder:text-[#634832]/30 resize-none cursor-none"
              />
            </div>

            {/* Action CTA Button */}
            <button 
              type="submit" 
              className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#967259] text-[#ece0d1] hover:bg-[#634832] font-buttons font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-orange-glow cursor-none"
            >
              Confirm Booking via WhatsApp <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
