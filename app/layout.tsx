import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Deutsche Motors | Luxury German Automobiles',
  description: 'Experience premium German automobiles: BMW, Mercedes-Benz, Audi, and Porsche at Deutsche Motors dealership.',
  keywords: ['BMW', 'Mercedes', 'Audi', 'Porsche', 'German cars', 'luxury automobiles'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-white text-deutsche-dark">
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
