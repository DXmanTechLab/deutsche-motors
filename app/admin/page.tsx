'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Loading from '@/components/Loading';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch vehicles
      const { data: vehiclesData, count: vehicleCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' })
        .limit(5);

      // Fetch contacts count
      const { count: contactCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' });

      setVehicles(vehiclesData || []);
      setStats({
        totalVehicles: vehicleCount || 0,
        totalContacts: contactCount || 0,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-deutsche-dark text-white py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-deutsche-silver">Verwalten Sie Deutsche Motors</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Fahrzeuge</h3>
            <p className="text-3xl font-bold text-deutsche-dark mt-2">{stats.totalVehicles}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Kontakte</h3>
            <p className="text-3xl font-bold text-deutsche-dark mt-2">{stats.totalContacts}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/vehicles"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">Fahrzeuge verwalten</h3>
            <p className="text-gray-600 text-sm">Fahrzeuge hinzufügen, bearbeiten oder löschen</p>
          </Link>
          <Link
            href="/admin/contacts"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">Kontakte anzeigen</h3>
            <p className="text-gray-600 text-sm">Kundenkontakte und Anfragen verwalten</p>
          </Link>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Letzte Fahrzeuge</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Marke</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Modell</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Jahr</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Preis</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{vehicle.brand}</td>
                    <td className="px-6 py-4 text-sm">{vehicle.model}</td>
                    <td className="px-6 py-4 text-sm">{vehicle.year}</td>
                    <td className="px-6 py-4 text-sm">€{vehicle.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
