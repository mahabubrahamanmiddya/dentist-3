import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Setup heading characters reveal with opacity, blur and slight y translation stagger
export const setupHeadingReveal = (headingEl: HTMLElement | null) => {
  if (!headingEl) return;

  // Split text by characters
  const text = headingEl.innerText;
  headingEl.innerHTML = '';
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.display = 'inline-block';
    span.style.whiteSpace = char === ' ' ? 'pre' : 'normal';
    span.className = 'char-item';
    headingEl.appendChild(span);
    return span;
  });

  gsap.fromTo(chars,
    { filter: 'blur(8px)', opacity: 0, y: 25 },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingEl,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  );
};

// Setup card stack scroll animation with matchMedia responsiveness
export const setupScrollAnimations = (
  sectionEl: HTMLElement | null,
  cardsEl: HTMLElement[]
) => {
  if (!sectionEl || cardsEl.length === 0) return () => {};

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // Desktop / Laptop views
  mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top top',
        end: '+=2500',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    const totalCards = cardsEl.length;

    cardsEl.forEach((card, idx) => {
      const depthIdx = totalCards - 1 - idx; // 3, 2, 1, 0
      if (depthIdx > 0) {
        gsap.set(card, {
          y: depthIdx * 35,
          scale: 1 - depthIdx * 0.05,
          rotate: depthIdx % 2 === 0 ? depthIdx * 1.5 : -depthIdx * 1.5,
          opacity: 1 - depthIdx * 0.2,
          z: -depthIdx * 15,
          transformOrigin: 'bottom center',
          pointerEvents: 'none'
        });
      } else {
        gsap.set(card, {
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          z: 0,
          transformOrigin: 'bottom center',
          pointerEvents: 'auto'
        });
        card.classList.add('testimonial-card-active');
      }
    });

    for (let i = totalCards - 1; i > 0; i--) {
      const currentCard = cardsEl[i];
      const nextCard = cardsEl[i - 1];

      tl.to(currentCard, {
        y: -750,
        opacity: 0,
        rotate: i % 2 === 0 ? -12 : 12,
        scale: 0.9,
        ease: 'power1.inOut',
        duration: 1
      }, `card-${i}`);

      tl.call(() => {
        currentCard.classList.remove('testimonial-card-active');
        nextCard.classList.add('testimonial-card-active');
      }, [], `card-${i}+=0.5`);

      for (let j = i - 1; j >= 0; j--) {
        const cardToUpdate = cardsEl[j];
        const targetDepth = i - 1 - j;

        tl.to(cardToUpdate, {
          y: targetDepth * 35,
          scale: 1 - targetDepth * 0.05,
          rotate: targetDepth === 0 ? 0 : (targetDepth % 2 === 0 ? targetDepth * 1.5 : -targetDepth * 1.5),
          opacity: 1 - targetDepth * 0.2,
          z: -targetDepth * 15,
          pointerEvents: targetDepth === 0 ? 'auto' : 'none',
          ease: 'power1.inOut',
          duration: 1
        }, `card-${i}`);
      }
      
      tl.to({}, { duration: 0.3 });
    }
  });

  // Mobile viewports (simplified parameters to prevent overflow and screen limits)
  mm.add("(max-width: 767px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    const totalCards = cardsEl.length;

    cardsEl.forEach((card, idx) => {
      const depthIdx = totalCards - 1 - idx;
      if (depthIdx > 0) {
        gsap.set(card, {
          y: depthIdx * 18, // shorter stacked layout for mobile
          scale: 1 - depthIdx * 0.04,
          rotate: depthIdx % 2 === 0 ? depthIdx * 1 : -depthIdx * 1,
          opacity: 1 - depthIdx * 0.25,
          z: -depthIdx * 10,
          transformOrigin: 'bottom center',
          pointerEvents: 'none'
        });
      } else {
        gsap.set(card, {
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          z: 0,
          transformOrigin: 'bottom center',
          pointerEvents: 'auto'
        });
        card.classList.add('testimonial-card-active');
      }
    });

    for (let i = totalCards - 1; i > 0; i--) {
      const currentCard = cardsEl[i];
      const nextCard = cardsEl[i - 1];

      tl.to(currentCard, {
        y: -480, // smaller slide-out distance for mobile screens
        opacity: 0,
        rotate: i % 2 === 0 ? -8 : 8,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1
      }, `card-${i}`);

      tl.call(() => {
        currentCard.classList.remove('testimonial-card-active');
        nextCard.classList.add('testimonial-card-active');
      }, [], `card-${i}+=0.5`);

      for (let j = i - 1; j >= 0; j--) {
        const cardToUpdate = cardsEl[j];
        const targetDepth = i - 1 - j;

        tl.to(cardToUpdate, {
          y: targetDepth * 18,
          scale: 1 - targetDepth * 0.04,
          rotate: targetDepth === 0 ? 0 : (targetDepth % 2 === 0 ? targetDepth * 1 : -targetDepth * 1),
          opacity: 1 - targetDepth * 0.25,
          z: -targetDepth * 10,
          pointerEvents: targetDepth === 0 ? 'auto' : 'none',
          ease: 'power1.inOut',
          duration: 1
        }, `card-${i}`);
      }
      
      tl.to({}, { duration: 0.3 });
    }
  });

  return () => mm.revert();
};

// Setup 3D mouse card tilt effect with inertia
export const setupCardTilt = (
  containerEl: HTMLElement | null,
  activeCardSelector: string
) => {
  if (!containerEl) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const activeCard = containerEl.querySelector(activeCardSelector);
    if (!activeCard) return;

    const rect = containerEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply tilt to the active card
    gsap.to(activeCard, {
      rotateY: x * 0.035,
      rotateX: -y * 0.035,
      transformPerspective: 1000,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Update cursor spotlight glow coordinate
    const glow = containerEl.querySelector('.spotlight-glow');
    if (glow) {
      gsap.to(glow, {
        x: e.clientX - rect.left - 150, // center 300px glow
        y: e.clientY - rect.top - 150,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    const activeCard = containerEl.querySelector(activeCardSelector);
    if (activeCard) {
      gsap.to(activeCard, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  containerEl.addEventListener('mousemove', handleMouseMove);
  containerEl.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    containerEl.removeEventListener('mousemove', handleMouseMove);
    containerEl.removeEventListener('mouseleave', handleMouseLeave);
  };
};
