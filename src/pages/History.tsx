import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { Calendar, DollarSign, Wrench, MapPin } from 'lucide-react';

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
      <div className="sticky top-0 z-40 border-b border-border/30 bg-background/90 backdrop-blur-xl px-5 py-5">
        <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>Historial</h1>
      </div>

      <div className="px-5 py-5">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-card border border-border/20" />)}
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted">
              <Wrench className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sin registros</h3>
              <p className="mt-1 text-sm text-muted-foreground">Aún no has registrado ningún mantenimiento</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border/30 bg-card p-4 transition-all hover:border-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{r.maintenance_type_name}</h3>
                    <p className="text-xs text-muted-foreground">{r.vehicle_name}</p>
                  </div>
                  {r.cost != null && r.cost > 0 && (
                    <span className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-mono font-bold text-primary">
                      <DollarSign className="h-3.5 w-3.5" />
                      {r.cost.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(r.service_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1">
                    {r.km_at_service.toLocaleString()} km
                  </span>
                  {r.workshop && (
                    <span className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {r.workshop}
                    </span>
                  )}
                </div>
                {r.notes && <p className="mt-2 text-xs text-muted-foreground italic">{r.notes}</p>}
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
