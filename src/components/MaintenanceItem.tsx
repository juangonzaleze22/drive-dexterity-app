import { getMaintenanceStatus, getStatusColor } from '@/lib/maintenance-defaults';
import { MaintenanceProgressBar } from '@/components/MaintenanceProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
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

export function MaintenanceItem({ name, icon, currentKm, lastServiceKm, intervalKm, lastServiceDate }: MaintenanceItemProps) {
  const { status, percentage, kmRemaining } = getMaintenanceStatus(currentKm, lastServiceKm, intervalKm);
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Wrench;

  return (
    <div className="rounded-lg border border-border/50 bg-card p-4">
      <div className="flex items-start gap-3">
        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted', getStatusColor(status))}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate text-sm font-semibold text-foreground">{name}</h4>
            <StatusBadge status={status} />
          </div>
          <MaintenanceProgressBar percentage={percentage} status={status} className="mt-2" />
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{(currentKm - lastServiceKm).toLocaleString()} / {intervalKm.toLocaleString()} km</span>
            <span>{kmRemaining > 0 ? `Faltan ${kmRemaining.toLocaleString()} km` : 'Vencido'}</span>
          </div>
          {lastServiceDate && (
            <p className="mt-1 text-xs text-muted-foreground">
              Último: {new Date(lastServiceDate).toLocaleDateString('es-ES')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
