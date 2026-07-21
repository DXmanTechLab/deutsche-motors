'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import { useEffect, useState } from 'react';

const luxuryCars = [
  {
    brand: 'BMW',
    model: 'M440i xDrive',
    image: '/cars/bmw.jpg',
    description: 'Ultimate driving machine',
  },
  {
    brand: 'Mercedes-Benz',
    model: 'C 63 AMG',
    image: '/cars/mercedes.jpg',
    description: 'Engineered perfection',
  },
  {
    brand: 'Audi',
    model: 'RS6 Avant',
    image: '/cars/audi.jpg',
    description: 'Vorsprung durch Technik',
  },
  {
    brand: 'Porsche',
    model: '911 Turbo',
    image: '/cars/porsche.jpg',
    description: 'The legend evolves',
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Brands Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-deutsche-dark">
            Unsere Premium-Marken
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryCars.map((car) => (
              <div
                key={car.brand}
                className="bg-gradient-to-b from-deutsche-dark to-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="bg-gray-900 h-64 flex items-center justify-center text-white text-center p-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{car.brand}</h3>
                    <p className="text-sm text-deutsche-silver mb-2">{car.model}</p>
                    <p className="text-xs italic text-deutsche-gold">{car.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-deutsche-dark text-white">
        <div className="container text-center">
          <h3 className="text-3xl font-bold mb-6">Finden Sie Ihr Traumauto</h3>
          <p className="text-lg text-deutsche-silver mb-8">
            Entdecken Sie unsere komplette Flotte deutscher Luxusfahrzeuge
          </p>
          <Link
            href="/inventory"
            className="inline-block bg-deutsche-gold text-deutsche-dark px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-opacity"
          >
            Zum Inventar
          </Link>
        </div>
      </section>
    </div>
  );
}
