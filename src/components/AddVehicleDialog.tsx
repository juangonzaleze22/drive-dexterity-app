import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AddVehicleDialogProps {
  onAdded: () => void;
}

export function AddVehicleDialog({ onAdded }: AddVehicleDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ brand: '', model: '', year: new Date().getFullYear(), plate: '', current_km: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
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
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Vehículo agregado' });
      setOpen(false);
      setForm({ brand: '', model: '', year: new Date().getFullYear(), plate: '', current_km: 0 });
      onAdded();
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar vehículo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Nuevo vehículo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Toyota" required />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Corolla" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Año</Label>
              <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} required />
            </div>
            <div className="space-y-2">
              <Label>Placa</Label>
              <Input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value.toUpperCase() })} placeholder="ABC123" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Kilometraje actual</Label>
            <Input type="number" value={form.current_km} onChange={(e) => setForm({ ...form, current_km: parseInt(e.target.value) || 0 })} placeholder="50000" required />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Agregar vehículo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
