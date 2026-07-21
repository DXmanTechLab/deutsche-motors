'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contacts').insert([formData]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-deutsche-dark text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Kontaktieren Sie uns</h1>
          <p className="text-deutsche-silver">Wir freuen uns auf Ihre Anfrage</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Deutsche Motors</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Adresse</h3>
                <p className="text-gray-600">
                  Hauptstraße 123<br />
                  10115 Berlin, Deutschland
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Telefon</h3>
                <p className="text-gray-600">+49 (0) 30 123456789</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">E-Mail</h3>
                <p className="text-gray-600">info@deutschemotors.de</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Öffnungszeiten</h3>
                <p className="text-gray-600">
                  Montag - Freitag: 09:00 - 18:00<br />
                  Samstag: 10:00 - 16:00<br />
                  Sonntag: Geschlossen
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>Vielen Dank! Wir werden Sie in Kürze kontaktieren.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deutsche-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deutsche-gold"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deutsche-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deutsche-gold"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-deutsche-gold text-deutsche-dark px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Wird gesendet...' : 'Senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
