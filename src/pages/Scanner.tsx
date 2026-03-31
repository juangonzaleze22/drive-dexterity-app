import { BottomNav } from '@/components/BottomNav';
import { Bluetooth, Radio } from 'lucide-react';

const Scanner = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Escáner OBD2</h1>
      </div>

      <div className="flex flex-col items-center gap-6 px-4 py-16 text-center">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <Bluetooth className="h-12 w-12 text-primary" />
          </div>
          <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-status-yellow">
            <Radio className="h-4 w-4 text-background" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground">Próximamente</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            La conexión con escáner ELM327 Bluetooth está en desarrollo.
            Podrás leer el kilometraje, códigos de error y datos del motor directamente desde tu vehículo.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <div className="rounded-lg border border-border/50 bg-card p-4 text-left">
            <h3 className="text-sm font-semibold text-foreground">Funciones planeadas</h3>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              <li>• Lectura automática de kilometraje</li>
              <li>• Códigos de error del motor (DTC)</li>
              <li>• RPM, temperatura, velocidad en tiempo real</li>
              <li>• Actualización automática de km en mantenimientos</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Scanner;
