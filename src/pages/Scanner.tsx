import { BottomNav } from '@/components/BottomNav';
import { Bluetooth, Radio, Wifi, Activity, Gauge } from 'lucide-react';

const Scanner = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 border-b border-border/30 bg-background/90 backdrop-blur-xl px-5 py-5">
        <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>Escáner OBD2</h1>
      </div>

      <div className="flex flex-col items-center gap-6 px-5 py-12 text-center">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl gradient-primary glow-primary">
            <Bluetooth className="h-14 w-14 text-primary-foreground" />
          </div>
          <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--status-yellow))] shadow-lg">
            <Radio className="h-5 w-5 text-background" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>Próximamente</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
            La conexión con escáner ELM327 Bluetooth está en desarrollo. Podrás leer datos directamente desde tu vehículo.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          {[
            { icon: Gauge, title: 'Lectura automática de kilometraje', desc: 'Sincroniza el km real del odómetro' },
            { icon: Activity, title: 'Códigos de error (DTC)', desc: 'Lee y borra códigos de diagnóstico' },
            { icon: Wifi, title: 'Datos en tiempo real', desc: 'RPM, temperatura, velocidad y más' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-border/30 bg-card p-4 text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Scanner;
