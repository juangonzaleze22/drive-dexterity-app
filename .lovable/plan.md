# AutoCare - App de Gestión de Mantenimiento Vehicular

## Resumen

App móvil nativa (Capacitor) para gestionar el mantenimiento de múltiples vehículos, con sistema de semáforo para alertas, sugerencias con IA, y preparada para integración futura con escáner ELM327 Bluetooth.

---

## Funcionalidades principales

### 1. Autenticación y perfil

- Login con email/contraseña usando Lovable Cloud
- Perfil de usuario con datos básicos

### 2. Gestión de vehículos

- Registrar múltiples vehículos (marca, modelo, año, kilometraje actual, placa, foto)
- Actualizar kilometraje manualmente (o vía escáner en el futuro)
- Dashboard principal con tarjetas por vehículo mostrando estado general

### 3. Registro de mantenimientos

- **Tipos predefinidos**: Aceite, filtro de aceite, filtro de aire, correa de tiempo, cauchos, frenos, batería, bujías, líquido de frenos, amortiguadores, refrigerante
- **Mantenimientos personalizados**: Crear cualquier tipo nuevo con nombre, intervalo recomendado en km y/o meses
- Registrar cada mantenimiento realizado con: fecha, kilometraje, costo, notas, taller

### 4. Sistema de semáforo (alertas)

- **🟢 Verde**: Mantenimiento al día (menos del 70% del intervalo)
- **🟡 Amarillo**: Próximo a vencer (70-90% del intervalo)
- **🔴 Rojo**: Vencido o por vencer (más del 90%)
- Vista general tipo dashboard con todos los mantenimientos y su estado
- Barra de progreso visual para cada ítem (ej: "Correa de tiempo: 10,000 / 50,000 km")

### 5. Sugerencias con IA (Lovable AI)

- Al agregar un mantenimiento, la IA sugiere el intervalo recomendado según marca/modelo/año
- Sugerencias proactivas: "Basado en tu kilometraje, considera revisar X"
- Consejos de mantenimiento preventivo personalizados

### 6. Preparación para ELM327 (fase futura)

- Sección "Escáner OBD2" en la interfaz (inicialmente con mensaje de "Próximamente")
- Estructura de datos preparada para recibir kilometraje automático y códigos de error
- La app funciona 100% sin el escáner

### 7. Historial y reportes

- Historial completo de mantenimientos por vehículo
- Resumen de gastos por período
- Timeline visual de mantenimientos realizados

---

## Pantallas principales

1. **Login/Registro**
2. **Dashboard** - Lista de vehículos con estado de semáforo general
3. **Detalle del vehículo** - Semáforo completo de todos los mantenimientos con barras de progreso
4. **Agregar/Editar mantenimiento** - Formulario con sugerencias IA
5. **Historial** - Timeline de mantenimientos realizados
6. **Configuración** - Perfil, tipos de mantenimiento personalizados
7. **Escáner OBD2** - Placeholder para futura integración

---

## Diseño

- Tema oscuro con acentos en verde/amarillo/rojo para el semáforo
- Diseño mobile-first optimizado para uso con una mano
- Iconos claros para cada tipo de mantenimiento
- Cards con progreso visual claro

---

## Stack técnico

- React + TypeScript + Tailwind + Capacitor (nativo)
- Supabase
- No apliques aun lo de sugerencia con IA 