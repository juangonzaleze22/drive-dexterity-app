import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { Calendar, DollarSign, Wrench } from 'lucide-react';

interface HistoryRecord {
  id: string;
  service_date: string;
  km_at_service: number;
  cost: number | null;
  notes: string | null;
  workshop: string | null;
  maintenance_type_name: string;
  vehicle_name: string;
}

const History = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const { data: vehicles } = await supabase
        .from('vehicles')
        .select('id, brand, model')
        .eq('user_id', user.id);

      if (!vehicles || vehicles.length === 0) {
        setLoading(false);
        return;
      }

      const allRecords: HistoryRecord[] = [];

      for (const v of vehicles) {
        const { data: types } = await supabase
          .from('maintenance_types')
          .select('id, name')
          .eq('vehicle_id', v.id);

        if (!types) continue;

        for (const t of types) {
          const { data: recs } = await supabase
            .from('maintenance_records')
            .select('*')
            .eq('maintenance_type_id', t.id)
            .order('service_date', { ascending: false });

          if (recs) {
            allRecords.push(
              ...recs.map((r: any) => ({
                ...r,
                maintenance_type_name: t.name,
                vehicle_name: `${v.brand} ${v.model}`,
              }))
            );
          }
        }
      }

      allRecords.sort((a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime());
      setRecords(allRecords);
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Historial</h1>
      </div>

      <div className="px-4 py-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-card" />)}
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No hay registros de mantenimiento aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((r) => (
              <div key={r.id} className="rounded-lg border border-border/50 bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{r.maintenance_type_name}</h3>
                    <p className="text-xs text-muted-foreground">{r.vehicle_name}</p>
                  </div>
                  {r.cost && (
                    <span className="flex items-center gap-1 text-sm font-mono font-semibold text-primary">
                      <DollarSign className="h-3 w-3" />
                      {r.cost.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(r.service_date).toLocaleDateString('es-ES')}
                  </span>
                  <span>{r.km_at_service.toLocaleString()} km</span>
                  {r.workshop && <span>📍 {r.workshop}</span>}
                </div>
                {r.notes && <p className="mt-2 text-xs text-muted-foreground">{r.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default History;
