import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: 'Error al iniciar sesión', description: error.message, variant: 'destructive' });
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: 'Error al registrarse', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: '¡Cuenta creada!', description: 'Revisa tu email para confirmar tu cuenta.' });
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary glow-primary">
          <Car className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-black text-gradient" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            AutoCare
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestión inteligente de mantenimiento vehicular
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm rounded-2xl border border-border/30 bg-card p-6 shadow-xl">
        <h2 className="mb-6 text-center text-xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                className="rounded-xl"
                required={!isLogin}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold rounded-xl" disabled={submitting}>
            {submitting ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
