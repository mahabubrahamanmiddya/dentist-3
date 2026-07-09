"use client";

import React, { useState } from 'react';
import LenisProvider from '../components/LenisProvider';
import CustomCursor from '../components/Cursor/CustomCursor';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Technology from '../components/Technology/Technology';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Doctors from '../components/Doctors/Doctors';
import BeforeAfter from '../components/BeforeAfter/BeforeAfter';
import Testimonials from '../components/Testimonials/Testimonials';
import Process from '../components/Process/Process';
import Pricing from '../components/Pricing/Pricing';
import FAQ from '../components/FAQ/FAQ';
import Blog from '../components/Blog/Blog';
import Appointment from '../components/Appointment/Appointment';
import Gallery from '../components/Gallery/Gallery';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Loader from '../components/Loader/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />
      {!loading && (
        <LenisProvider>
          <div className="min-h-screen bg-[#ece0d1] text-[#38220f] relative overflow-x-hidden selection:bg-[#967259] selection:text-[#ece0d1]">
            <CustomCursor />
            <Header />
            <main>
              <Hero />
              <About />
              <Services />
              <Technology />
              <WhyChooseUs />
              <Doctors />
              <BeforeAfter />
              <Testimonials />
              <Process />
              <Pricing />
              <FAQ />
              <Blog />
              <Appointment />
              <Gallery />
            </main>
            <Contact />
            <Footer />
            <WhatsAppButton />
          </div>
        </LenisProvider>
      )}
    </>
  );
}
