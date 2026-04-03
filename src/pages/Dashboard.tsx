import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { VehicleCard } from '@/components/VehicleCard';
import { AddVehicleDialog } from '@/components/AddVehicleDialog';
import { BottomNav } from '@/components/BottomNav';
import { Car, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMaintenanceStatus, MaintenanceStatus } from '@/lib/maintenance-defaults';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  current_km: number;
}

interface VehicleWithStatus extends Vehicle {
  worstStatus: MaintenanceStatus;
  pendingCount: number;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [vehicles, setVehicles] = useState<VehicleWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data: vehiclesData } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!vehiclesData) {
      setLoading(false);
      return;
    }

    const enriched: VehicleWithStatus[] = await Promise.all(
      vehiclesData.map(async (v: Vehicle) => {
        const { data: types } = await supabase
          .from('maintenance_types')
          .select('id, interval_km')
          .eq('vehicle_id', v.id);

        if (!types || types.length === 0) {
          return { ...v, worstStatus: 'green' as MaintenanceStatus, pendingCount: 0 };
        }

        let worstStatus: MaintenanceStatus = 'green';
        let pendingCount = 0;

        for (const t of types) {
          const { data: records } = await supabase
            .from('maintenance_records')
            .select('km_at_service')
            .eq('maintenance_type_id', t.id)
            .order('service_date', { ascending: false })
            .limit(1);

          const lastKm = records && records.length > 0 ? records[0].km_at_service : 0;
          const { status } = getMaintenanceStatus(v.current_km, lastKm, t.interval_km);

          if (status === 'red') { worstStatus = 'red'; pendingCount++; }
          else if (status === 'yellow' && worstStatus !== 'red') { worstStatus = 'yellow'; pendingCount++; }
        }

        return { ...v, worstStatus, pendingCount };
      })
    );

    setVehicles(enriched);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  const userName = user?.user_metadata?.full_name || 'Usuario';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/30 bg-background/90 backdrop-blur-xl px-5 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Bienvenido,</p>
            <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {userName}
            </h1>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Mis vehículos
          </h2>
          <AddVehicleDialog onAdded={fetchVehicles} />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-card border border-border/20" />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl gradient-primary glow-primary">
              <Car className="h-12 w-12 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sin vehículos
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega tu primer vehículo para comenzar a gestionar su mantenimiento
              </p>
            </div>
            <AddVehicleDialog onAdded={fetchVehicles} />
          </div>
        ) : (
          <div className="space-y-4">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} {...v} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
