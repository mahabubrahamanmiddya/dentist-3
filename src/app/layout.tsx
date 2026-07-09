import { Playfair_Display, Inter, Poppins } from 'next/font/google';
import '../styles/global.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: "Royal Smile Dental Clinic | Advanced Dentistry. Beautiful Smiles.",
  description: "Discover a new standard of dental luxury. We combine advanced cosmetic procedures, digital smile design, and elite implants in a world-class environment.",
  openGraph: {
    title: "Royal Smile Dental Clinic | Premium Smile Care",
    description: "Combining medical technology and premium luxury for a perfect smile.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Royal Smile Dental Clinic",
    "image": "https://royalsmileclinic.com/implant-display.png",
    "url": "https://royalsmileclinic.com",
    "telephone": "+919999999999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Royal Smile Boulevard, Suite 500",
      "addressLocality": "Mumbai",
      "addressRegion": "MH",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="antialiased bg-bg-dark text-accent-cream" suppressHydrationWarning>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
