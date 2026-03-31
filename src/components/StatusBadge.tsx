import { MaintenanceStatus, getStatusBgColor, getStatusLabel } from '@/lib/maintenance-defaults';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: MaintenanceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-background',
        getStatusBgColor(status),
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-background/80" />
      {getStatusLabel(status)}
    </span>
  );
}
