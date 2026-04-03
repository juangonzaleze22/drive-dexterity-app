import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { LogOut, User, Car, Shield } from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 border-b border-border/30 bg-background/90 backdrop-blur-xl px-5 py-5">
        <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>Ajustes</h1>
      </div>

      <div className="space-y-4 px-5 py-5">
        {/* Profile */}
        <div className="overflow-hidden rounded-2xl border border-border/30 bg-card">
          <div className="gradient-primary p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {user?.user_metadata?.full_name || 'Usuario'}
                </h3>
                <p className="text-sm text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-2xl border border-border/30 bg-card p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">AutoCare</h4>
              <p className="text-xs text-muted-foreground">Versión 1.0.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--status-green)/0.1)]">
              <Shield className="h-5 w-5 text-[hsl(var(--status-green))]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Datos seguros</h4>
              <p className="text-xs text-muted-foreground">Tu información está protegida en la nube</p>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <Button variant="destructive" className="w-full gap-2 rounded-xl font-semibold" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
