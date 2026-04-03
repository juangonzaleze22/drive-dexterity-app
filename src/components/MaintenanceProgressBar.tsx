import { MaintenanceStatus } from '@/lib/maintenance-defaults';
import { cn } from '@/lib/utils';

interface MaintenanceProgressBarProps {
  percentage: number;
  status: MaintenanceStatus;
  className?: string;
}

export function MaintenanceProgressBar({ percentage, status, className }: MaintenanceProgressBarProps) {
  const barColor = {
    green: 'bg-[hsl(var(--status-green))]',
    yellow: 'bg-[hsl(var(--status-yellow))]',
    red: 'bg-[hsl(var(--status-red))]',
  }[status];

  const glowColor = {
    green: 'shadow-[0_0_8px_hsl(var(--status-green)/0.4)]',
    yellow: 'shadow-[0_0_8px_hsl(var(--status-yellow)/0.4)]',
    red: 'shadow-[0_0_8px_hsl(var(--status-red)/0.4)]',
  }[status];

  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full bg-muted/60', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor, glowColor)}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}
