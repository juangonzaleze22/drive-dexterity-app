import { MaintenanceStatus, getStatusLabel } from '@/lib/maintenance-defaults';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: MaintenanceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = {
    green: 'bg-[hsl(var(--status-green)/0.15)] text-[hsl(var(--status-green))]',
    yellow: 'bg-[hsl(var(--status-yellow)/0.15)] text-[hsl(var(--status-yellow))]',
    red: 'bg-[hsl(var(--status-red)/0.15)] text-[hsl(var(--status-red))]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold',
        colors[status],
        className
      )}
    >
      <span className={cn(
        'h-2 w-2 rounded-full',
        status === 'green' && 'bg-[hsl(var(--status-green))]',
        status === 'yellow' && 'bg-[hsl(var(--status-yellow))]',
        status === 'red' && 'bg-[hsl(var(--status-red))]',
      )} />
      {getStatusLabel(status)}
    </span>
  );
}
