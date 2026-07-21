'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import VehicleCard from '@/components/VehicleCard';
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
  image_url: string;
  created_at?: string;
}

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading vehicles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-deutsche-dark text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Unser Inventar</h1>
          <p className="text-deutsche-silver">Entdecken Sie unsere verfügbaren Fahrzeuge</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Keine Fahrzeuge verfügbar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
