export interface DefaultMaintenanceType {
  name: string;
  icon: string;
  default_interval_km: number;
  default_interval_months: number | null;
  description: string;
}

export const DEFAULT_MAINTENANCE_TYPES: DefaultMaintenanceType[] = [
  { name: 'Aceite de motor', icon: 'Droplets', default_interval_km: 10000, default_interval_months: 6, description: 'Cambio de aceite y filtro de aceite' },
  { name: 'Filtro de aceite', icon: 'Filter', default_interval_km: 10000, default_interval_months: 6, description: 'Reemplazo del filtro de aceite' },
  { name: 'Filtro de aire', icon: 'Wind', default_interval_km: 20000, default_interval_months: 12, description: 'Reemplazo del filtro de aire del motor' },
  { name: 'Correa de tiempo', icon: 'Cog', default_interval_km: 60000, default_interval_months: 48, description: 'Cambio de correa de distribución' },
  { name: 'Cauchos', icon: 'Circle', default_interval_km: 50000, default_interval_months: 48, description: 'Cambio de neumáticos' },
  { name: 'Pastillas de freno', icon: 'Shield', default_interval_km: 40000, default_interval_months: 24, description: 'Reemplazo de pastillas de freno' },
  { name: 'Batería', icon: 'Battery', default_interval_km: 60000, default_interval_months: 36, description: 'Cambio de batería del vehículo' },
  { name: 'Bujías', icon: 'Zap', default_interval_km: 30000, default_interval_months: 24, description: 'Cambio de bujías de encendido' },
  { name: 'Líquido de frenos', icon: 'Droplet', default_interval_km: 40000, default_interval_months: 24, description: 'Cambio de líquido de frenos' },
  { name: 'Amortiguadores', icon: 'ArrowDownUp', default_interval_km: 80000, default_interval_months: 48, description: 'Reemplazo de amortiguadores' },
  { name: 'Refrigerante', icon: 'Thermometer', default_interval_km: 40000, default_interval_months: 24, description: 'Cambio de líquido refrigerante' },
  { name: 'Alineación y balanceo', icon: 'Target', default_interval_km: 10000, default_interval_months: 6, description: 'Alineación y balanceo de ruedas' },
];

export type MaintenanceStatus = 'green' | 'yellow' | 'red';

export function getMaintenanceStatus(
  currentKm: number,
  lastServiceKm: number,
  intervalKm: number
): { status: MaintenanceStatus; percentage: number; kmRemaining: number } {
  const kmSinceService = currentKm - lastServiceKm;
  const percentage = Math.min((kmSinceService / intervalKm) * 100, 100);
  const kmRemaining = Math.max(intervalKm - kmSinceService, 0);

  let status: MaintenanceStatus = 'green';
  if (percentage >= 90) status = 'red';
  else if (percentage >= 70) status = 'yellow';

  return { status, percentage, kmRemaining };
}

export function getStatusColor(status: MaintenanceStatus): string {
  switch (status) {
    case 'green': return 'text-status-green';
    case 'yellow': return 'text-status-yellow';
    case 'red': return 'text-status-red';
  }
}

export function getStatusBgColor(status: MaintenanceStatus): string {
  switch (status) {
    case 'green': return 'bg-status-green';
    case 'yellow': return 'bg-status-yellow';
    case 'red': return 'bg-status-red';
  }
}

export function getStatusLabel(status: MaintenanceStatus): string {
  switch (status) {
    case 'green': return 'Al día';
    case 'yellow': return 'Próximo';
    case 'red': return 'Vencido';
  }
}
