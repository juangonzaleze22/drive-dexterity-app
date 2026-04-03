import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Car, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CAR_BRANDS, getModelsByBrand } from '@/lib/car-data';
import { cn } from '@/lib/utils';

interface AddVehicleDialogProps {
  onAdded: () => void;
}

function SearchableSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            disabled && 'cursor-not-allowed opacity-50',
            !value && 'text-muted-foreground'
          )}
        >
          {value || placeholder}
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover p-1 shadow-xl">
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-lg bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <div className="mt-1 max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-xs text-muted-foreground">Sin resultados</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); setSearch(''); }}
                    className={cn(
                      'flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                      value === opt && 'bg-primary/10 text-primary font-medium'
                    )}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AddVehicleDialog({ onAdded }: AddVehicleDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ brand: '', model: '', year: new Date().getFullYear(), plate: '', current_km: 0 });

  const modelOptions = useMemo(() => {
    if (form.brand === 'Otro') return [];
    return getModelsByBrand(form.brand);
  }, [form.brand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.brand) {
      toast({ title: 'Selecciona una marca', variant: 'destructive' });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from('vehicles').insert({
      user_id: user.id,
      brand: form.brand,
      model: form.model,
      year: form.year,
      plate: form.plate,
      current_km: form.current_km,
    });

    if (error) {
      toast({ title: 'Error al guardar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: '¡Vehículo agregado!', description: `${form.brand} ${form.model} registrado exitosamente.` });
      setOpen(false);
      setForm({ brand: '', model: '', year: new Date().getFullYear(), plate: '', current_km: 0 });
      onAdded();
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Agregar vehículo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border/30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            Nuevo vehículo
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <SearchableSelect
              label="Marca"
              placeholder="Seleccionar marca"
              options={CAR_BRANDS.map((b) => b.name)}
              value={form.brand}
              onChange={(val) => setForm({ ...form, brand: val, model: '' })}
            />
            {form.brand === 'Otro' ? (
              <div className="space-y-2">
                <Label>Modelo</Label>
                <Input
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  placeholder="Modelo del vehículo"
                  className="rounded-xl"
                  required
                />
              </div>
            ) : (
              <SearchableSelect
                label="Modelo"
                placeholder="Seleccionar modelo"
                options={modelOptions}
                value={form.model}
                onChange={(val) => setForm({ ...form, model: val })}
                disabled={!form.brand}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Año</Label>
              <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label>Placa</Label>
              <Input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value.toUpperCase() })} placeholder="ABC123" className="rounded-xl" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Kilometraje actual</Label>
            <Input type="number" value={form.current_km} onChange={(e) => setForm({ ...form, current_km: parseInt(e.target.value) || 0 })} placeholder="50000" className="rounded-xl" required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold rounded-xl" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Agregar vehículo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
