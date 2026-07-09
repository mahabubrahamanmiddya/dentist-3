export interface TestimonialItem {
  id: number;
  patientName: string;
  patientImage: string;
  rating: number;
  treatment: string;
  review: string;
  verified: boolean;
}

export const testimonialData: TestimonialItem[] = [
  {
    id: 1,
    patientName: "Aria Thorne",
    patientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    treatment: "IPS E.max Veneers",
    review: "Royal Smile completely redefined my confidence. The digital smile design mockup allowed me to preview my new look. The final ceramic veneers look incredibly natural, catching light beautifully. The attention to luxury detail is unmatched.",
    verified: true
  },
  {
    id: 2,
    patientName: "Marcus Vance Jr.",
    patientImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    treatment: "Bio-Titanium Dental Implant",
    review: "As someone highly anxious about dental surgeries, the experience here was a revelation. Zero pain, high-resolution 3D intraoral diagnostics, and complete professional guidance. The implant fits perfectly and feels like my original tooth.",
    verified: true
  },
  {
    id: 3,
    patientName: "Dr. Elena Rostova",
    patientImage: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    treatment: "Invisible Aligners",
    review: "The clinical standards at Royal Smile are truly world-class. From diagnostics to shift tracking, the alignment process was entirely digital, mess-free, and predictable. Highly recommend to anyone seeking aesthetic precision.",
    verified: true
  },
  {
    id: 4,
    patientName: "Sophie Rodriguez",
    patientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    treatment: "Digital Smile Makeover",
    review: "Walking into this clinic feels like stepping into a premium resort. The soothing scents, relaxing music, and warm hospitality are outstanding. My smile redesign is a work of absolute art.",
    verified: true
  }
];
