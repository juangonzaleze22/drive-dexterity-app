import { useNavigate } from 'react-router-dom';
import { Car, ChevronRight, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { MaintenanceStatus } from '@/lib/maintenance-defaults';

interface VehicleCardProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  current_km: number;
  worstStatus: MaintenanceStatus;
  pendingCount: number;
}

export function VehicleCard({ id, brand, model, year, plate, current_km, worstStatus, pendingCount }: VehicleCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
      onClick={() => navigate(`/vehicle/${id}`)}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Car className="h-7 w-7 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {brand} {model}
            </h3>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{plate}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Gauge className="h-3 w-3" />
              {current_km.toLocaleString()} km
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={worstStatus} />
            {pendingCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {pendingCount} pendiente{pendingCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}
