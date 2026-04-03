import { useNavigate } from 'react-router-dom';
import { Car, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MaintenanceStatus, getStatusBgColor } from '@/lib/maintenance-defaults';
import { cn } from '@/lib/utils';

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

  const statusGlow = {
    green: 'shadow-[0_0_15px_hsl(var(--status-green)/0.15)]',
    yellow: 'shadow-[0_0_15px_hsl(var(--status-yellow)/0.15)]',
    red: 'shadow-[0_0_15px_hsl(var(--status-red)/0.2)]',
  }[worstStatus];

  const statusBorderColor = {
    green: 'border-[hsl(var(--status-green)/0.3)]',
    yellow: 'border-[hsl(var(--status-yellow)/0.3)]',
    red: 'border-[hsl(var(--status-red)/0.3)]',
  }[worstStatus];

  return (
    <div
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl border bg-card p-4 transition-all duration-300',
        'hover:scale-[1.02] active:scale-[0.98]',
        statusBorderColor,
        statusGlow
      )}
      onClick={() => navigate(`/vehicle/${id}`)}
    >
      {/* Top row: icon + info */}
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Car className="h-8 w-8 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {brand} {model}
          </h3>
          <p className="text-sm text-muted-foreground">{year} · <span className="uppercase tracking-wider">{plate}</span></p>
        </div>
      </div>

      {/* Bottom row: km + status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground font-mono">{current_km.toLocaleString()} km</span>
        </div>

        {pendingCount > 0 ? (
          <div className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold',
            worstStatus === 'red' ? 'bg-[hsl(var(--status-red)/0.15)] text-[hsl(var(--status-red))]' : 'bg-[hsl(var(--status-yellow)/0.15)] text-[hsl(var(--status-yellow))]'
          )}>
            <AlertTriangle className="h-3.5 w-3.5" />
            {pendingCount} pendiente{pendingCount > 1 ? 's' : ''}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--status-green)/0.15)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--status-green))]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Al día
          </div>
        )}
      </div>

      {/* Decorative accent line at bottom */}
      <div className={cn(
        'absolute bottom-0 left-0 h-1 w-full',
        getStatusBgColor(worstStatus),
        'opacity-60'
      )} />
    </div>
  );
}
