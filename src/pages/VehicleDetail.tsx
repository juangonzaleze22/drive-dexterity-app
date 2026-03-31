import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceItem } from '@/components/MaintenanceItem';
import { AddMaintenanceDialog } from '@/components/AddMaintenanceDialog';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Car, Gauge, Pencil, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_MAINTENANCE_TYPES } from '@/lib/maintenance-defaults';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  current_km: number;
}

interface MaintenanceType {
  id: string;
  name: string;
  icon: string;
  interval_km: number;
  interval_months: number | null;
  description: string | null;
  is_custom: boolean;
}

interface MaintenanceWithRecord extends MaintenanceType {
  lastServiceKm: number;
  lastServiceDate: string | null;
}

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [maintenances, setMaintenances] = useState<MaintenanceWithRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKm, setEditingKm] = useState(false);
  const [newKm, setNewKm] = useState(0);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    const { data: v } = await supabase.from('vehicles').select('*').eq('id', id).single();
    if (!v) { navigate('/'); return; }
    setVehicle(v);
    setNewKm(v.current_km);

    // Get maintenance types for this vehicle
    let { data: types } = await supabase.from('maintenance_types').select('*').eq('vehicle_id', id);

    // If no types yet, seed defaults
    if (!types || types.length === 0) {
      const defaults = DEFAULT_MAINTENANCE_TYPES.map((d) => ({
        vehicle_id: id,
        name: d.name,
        icon: d.icon,
        interval_km: d.default_interval_km,
        interval_months: d.default_interval_months,
        description: d.description,
        is_custom: false,
      }));
      await supabase.from('maintenance_types').insert(defaults);
      const { data: seeded } = await supabase.from('maintenance_types').select('*').eq('vehicle_id', id);
      types = seeded || [];
    }

    // For each type, get latest record
    const enriched: MaintenanceWithRecord[] = await Promise.all(
      types.map(async (t: MaintenanceType) => {
        const { data: records } = await supabase
          .from('maintenance_records')
          .select('km_at_service, service_date')
          .eq('maintenance_type_id', t.id)
          .order('service_date', { ascending: false })
          .limit(1);

        return {
          ...t,
          lastServiceKm: records && records.length > 0 ? records[0].km_at_service : 0,
          lastServiceDate: records && records.length > 0 ? records[0].service_date : null,
        };
      })
    );

    setMaintenances(enriched);
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateKm = async () => {
    if (!vehicle) return;
    await supabase.from('vehicles').update({ current_km: newKm }).eq('id', vehicle.id);
    setVehicle({ ...vehicle, current_km: newKm });
    setEditingKm(false);
    toast({ title: 'Kilometraje actualizado' });
    fetchData();
  };

  const deleteVehicle = async () => {
    if (!vehicle) return;
    if (!confirm('¿Estás seguro de eliminar este vehículo y todos sus mantenimientos?')) return;
    await supabase.from('vehicles').delete().eq('id', vehicle.id);
    toast({ title: 'Vehículo eliminado' });
    navigate('/');
  };

  if (loading || !vehicle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{vehicle.brand} {vehicle.model}</h1>
            <p className="text-xs text-muted-foreground">{vehicle.year} · {vehicle.plate}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={deleteVehicle} className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KM Card */}
      <div className="px-4 py-4">
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Kilometraje actual</p>
                {editingKm ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={newKm}
                      onChange={(e) => setNewKm(parseInt(e.target.value) || 0)}
                      className="h-8 w-28"
                    />
                    <Button size="sm" onClick={updateKm}><Save className="h-3 w-3" /></Button>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-foreground">{vehicle.current_km.toLocaleString()} km</p>
                )}
              </div>
            </div>
            {!editingKm && (
              <Button variant="ghost" size="icon" onClick={() => setEditingKm(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Maintenance List */}
      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Mantenimientos</h2>
          <AddMaintenanceDialog
            vehicleId={vehicle.id}
            currentKm={vehicle.current_km}
            onAdded={fetchData}
            existingTypes={maintenances.map((m) => ({ id: m.id, name: m.name }))}
          />
        </div>
        <div className="space-y-3">
          {maintenances.map((m) => (
            <MaintenanceItem
              key={m.id}
              name={m.name}
              icon={m.icon}
              currentKm={vehicle.current_km}
              lastServiceKm={m.lastServiceKm}
              intervalKm={m.interval_km}
              lastServiceDate={m.lastServiceDate || undefined}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default VehicleDetail;
