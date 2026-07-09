// Types for Dentist, FAQ, Pricing, Services, etc.

export interface Doctor {
  id: number;
  name: string;
  role: string;
  experience: string;
  qualifications: string[];
  rating: number;
  image: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface TechnologyItem {
  id: number;
  title: string;
  description: string;
  tagline: string;
  image: string;
}
