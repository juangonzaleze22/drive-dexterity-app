import { getMaintenanceStatus, getStatusColor, MaintenanceStatus } from '@/lib/maintenance-defaults';
import { MaintenanceProgressBar } from '@/components/MaintenanceProgressBar';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface MaintenanceItemProps {
  name: string;
  icon: string;
  currentKm: number;
  lastServiceKm: number;
  intervalKm: number;
  lastServiceDate?: string;
}

function getStatusGlow(status: MaintenanceStatus) {
  switch (status) {
    case 'green': return 'shadow-[0_0_12px_hsl(var(--status-green)/0.1)]';
    case 'yellow': return 'shadow-[0_0_12px_hsl(var(--status-yellow)/0.1)]';
    case 'red': return 'shadow-[0_0_12px_hsl(var(--status-red)/0.15)]';
  }
}

function getIconBg(status: MaintenanceStatus) {
  switch (status) {
    case 'green': return 'bg-[hsl(var(--status-green)/0.12)]';
    case 'yellow': return 'bg-[hsl(var(--status-yellow)/0.12)]';
    case 'red': return 'bg-[hsl(var(--status-red)/0.12)]';
  }
}

function getStatusBadge(status: MaintenanceStatus) {
  const labels = { green: 'Al día', yellow: 'Próximo', red: 'Vencido' };
  const colors = {
    green: 'bg-[hsl(var(--status-green)/0.15)] text-[hsl(var(--status-green))]',
    yellow: 'bg-[hsl(var(--status-yellow)/0.15)] text-[hsl(var(--status-yellow))]',
    red: 'bg-[hsl(var(--status-red)/0.15)] text-[hsl(var(--status-red))]',
  };
  return { label: labels[status], color: colors[status] };
}

export function MaintenanceItem({ name, icon, currentKm, lastServiceKm, intervalKm, lastServiceDate }: MaintenanceItemProps) {
  const hasRecord = lastServiceKm > 0;
  const { status, percentage, kmRemaining } = getMaintenanceStatus(currentKm, lastServiceKm, intervalKm);
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Wrench;
  const badge = getStatusBadge(hasRecord ? status : 'green');

  if (!hasRecord) {
    return (
      <div className="rounded-2xl border border-border/30 bg-card/50 p-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/50">
            <IconComponent className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-muted-foreground">{name}</h4>
            <p className="mt-0.5 text-xs text-muted-foreground/70">Sin registro · cada {intervalKm.toLocaleString()} km</p>
          </div>
          <span className="rounded-lg bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Sin datos
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-2xl border border-border/30 bg-card p-4 transition-all duration-200',
      getStatusGlow(status)
    )}>
      <div className="flex items-start gap-3">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', getIconBg(status))}>
          <IconComponent className={cn('h-5 w-5', getStatusColor(status))} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate text-sm font-semibold text-foreground">{name}</h4>
            <span className={cn('shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold', badge.color)}>
              {badge.label}
            </span>
          </div>

          <MaintenanceProgressBar percentage={percentage} status={status} className="mt-3" />

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">
              {(currentKm - lastServiceKm).toLocaleString()} / {intervalKm.toLocaleString()} km
            </span>
            <span className={cn('font-semibold', getStatusColor(status))}>
              {kmRemaining > 0 ? `Faltan ${kmRemaining.toLocaleString()} km` : '¡Vencido!'}
            </span>
          </div>

          {lastServiceDate && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              Último servicio: {new Date(lastServiceDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
