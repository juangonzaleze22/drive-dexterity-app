import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_MAINTENANCE_TYPES } from '@/lib/maintenance-defaults';

interface AddMaintenanceDialogProps {
  vehicleId: string;
  currentKm: number;
  onAdded: () => void;
  existingTypes?: Array<{ id: string; name: string }>;
}

export function AddMaintenanceDialog({ vehicleId, currentKm, onAdded, existingTypes = [] }: AddMaintenanceDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [form, setForm] = useState({
    maintenance_type_id: '',
    custom_name: '',
    custom_interval_km: 10000,
    custom_interval_months: 6,
    custom_description: '',
    km_at_service: currentKm,
    cost: 0,
    notes: '',
    workshop: '',
    service_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let typeId = form.maintenance_type_id;

    // If custom, create the type first
    if (isCustom) {
      const { data: newType, error: typeError } = await supabase
        .from('maintenance_types')
        .insert({
          vehicle_id: vehicleId,
          name: form.custom_name,
          interval_km: form.custom_interval_km,
          interval_months: form.custom_interval_months,
          description: form.custom_description,
          is_custom: true,
        })
        .select('id')
        .single();

      if (typeError) {
        toast({ title: 'Error', description: typeError.message, variant: 'destructive' });
        setSubmitting(false);
        return;
      }
      typeId = newType.id;
    }

    const { error } = await supabase.from('maintenance_records').insert({
      vehicle_id: vehicleId,
      maintenance_type_id: typeId,
      km_at_service: form.km_at_service,
      cost: form.cost || null,
      notes: form.notes || null,
      workshop: form.workshop || null,
      service_date: form.service_date,
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Mantenimiento registrado' });
      setOpen(false);
      onAdded();
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Registrar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Registrar mantenimiento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button type="button" size="sm" variant={!isCustom ? 'default' : 'outline'} onClick={() => setIsCustom(false)}>
              Existente
            </Button>
            <Button type="button" size="sm" variant={isCustom ? 'default' : 'outline'} onClick={() => setIsCustom(true)}>
              Personalizado
            </Button>
          </div>

          {!isCustom ? (
            <div className="space-y-2">
              <Label>Tipo de mantenimiento</Label>
              <Select value={form.maintenance_type_id} onValueChange={(v) => setForm({ ...form, maintenance_type_id: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                <SelectContent>
                  {existingTypes.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input value={form.custom_name} onChange={(e) => setForm({ ...form, custom_name: e.target.value })} placeholder="Ej: Cambio de correa" required={isCustom} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Intervalo (km)</Label>
                  <Input type="number" value={form.custom_interval_km} onChange={(e) => setForm({ ...form, custom_interval_km: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="space-y-2">
                  <Label>Intervalo (meses)</Label>
                  <Input type="number" value={form.custom_interval_months} onChange={(e) => setForm({ ...form, custom_interval_months: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input value={form.custom_description} onChange={(e) => setForm({ ...form, custom_description: e.target.value })} placeholder="Descripción opcional" />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="date" value={form.service_date} onChange={(e) => setForm({ ...form, service_date: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Km al servicio</Label>
              <Input type="number" value={form.km_at_service} onChange={(e) => setForm({ ...form, km_at_service: parseInt(e.target.value) || 0 })} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Costo</Label>
              <Input type="number" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) || 0 })} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Taller</Label>
              <Input value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })} placeholder="Nombre del taller" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notas adicionales..." rows={2} />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Registrar mantenimiento'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
