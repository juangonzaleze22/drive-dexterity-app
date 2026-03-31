import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, User, Car, Shield } from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Ajustes</h1>
      </div>

      <div className="space-y-4 px-4 py-4">
        {/* Profile */}
        <Card className="border-border/50 bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {user?.user_metadata?.full_name || 'Usuario'}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="border-border/50 bg-card">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium text-foreground">AutoCare</h4>
                <p className="text-xs text-muted-foreground">Versión 1.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium text-foreground">Datos seguros</h4>
                <p className="text-xs text-muted-foreground">Tu información está protegida en la nube</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign out */}
        <Button variant="destructive" className="w-full gap-2" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
