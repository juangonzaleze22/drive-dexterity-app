import { useLocation, useNavigate } from 'react-router-dom';
import { Car, Clock, Bluetooth, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Car, label: 'Vehículos' },
  { path: '/history', icon: Clock, label: 'Historial' },
  { path: '/scanner', icon: Bluetooth, label: 'OBD2' },
  { path: '/settings', icon: Settings, label: 'Ajustes' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-card/95 backdrop-blur-xl safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition-all duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-200',
                isActive && 'gradient-primary'
              )}>
                <Icon className={cn('h-5 w-5', isActive && 'text-primary-foreground')} />
              </div>
              <span className={cn('font-medium', isActive && 'font-semibold')}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
