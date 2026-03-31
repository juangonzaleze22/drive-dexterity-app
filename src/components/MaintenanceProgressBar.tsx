import { MaintenanceStatus } from '@/lib/maintenance-defaults';
import { cn } from '@/lib/utils';

interface MaintenanceProgressBarProps {
  percentage: number;
  status: MaintenanceStatus;
  className?: string;
}

export function MaintenanceProgressBar({ percentage, status, className }: MaintenanceProgressBarProps) {
  const barColor = {
    green: 'bg-status-green',
    yellow: 'bg-status-yellow',
    red: 'bg-status-red',
  }[status];

  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', barColor)}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}
