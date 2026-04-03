export interface CarBrand {
  name: string;
  models: string[];
}

export const CAR_BRANDS: CarBrand[] = [
  { name: 'Acura', models: ['ILX', 'Integra', 'MDX', 'NSX', 'RDX', 'TLX', 'TSX'] },
  { name: 'Alfa Romeo', models: ['Giulia', 'Stelvio', 'Tonale', '4C', 'Giulietta'] },
  { name: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'RS3', 'RS5', 'RS6', 'RS7', 'S3', 'S4', 'S5', 'TT'] },
  { name: 'BMW', models: ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 4', 'Serie 5', 'Serie 7', 'Serie 8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'M3', 'M4', 'M5', 'iX', 'i4'] },
  { name: 'Buick', models: ['Enclave', 'Encore', 'Encore GX', 'Envision'] },
  { name: 'Cadillac', models: ['CT4', 'CT5', 'Escalade', 'XT4', 'XT5', 'XT6', 'Lyriq'] },
  { name: 'Changan', models: ['CS35', 'CS55', 'CS75', 'Alsvin', 'Eado', 'UNI-T', 'UNI-K'] },
  { name: 'Chery', models: ['Tiggo 2', 'Tiggo 3', 'Tiggo 4', 'Tiggo 5X', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 6'] },
  { name: 'Chevrolet', models: ['Aveo', 'Blazer', 'Camaro', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Grand Vitara', 'Malibu', 'Onix', 'Orlando', 'Sail', 'Silverado', 'Spark', 'Suburban', 'Tahoe', 'Tracker', 'Traverse', 'Trax'] },
  { name: 'Chrysler', models: ['300', 'Pacifica', 'Voyager'] },
  { name: 'Citroën', models: ['Berlingo', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C5 Aircross'] },
  { name: 'Dodge', models: ['Challenger', 'Charger', 'Durango', 'Journey', 'RAM 1500', 'RAM 2500'] },
  { name: 'Fiat', models: ['500', '500X', 'Argo', 'Cronos', 'Ducato', 'Mobi', 'Pulse', 'Strada', 'Toro', 'Uno'] },
  { name: 'Ford', models: ['Bronco', 'EcoSport', 'Edge', 'Escape', 'Explorer', 'Expedition', 'F-150', 'F-250', 'Fiesta', 'Focus', 'Fusion', 'Maverick', 'Mustang', 'Ranger', 'Territory', 'Transit'] },
  { name: 'Genesis', models: ['G70', 'G80', 'G90', 'GV70', 'GV80'] },
  { name: 'GMC', models: ['Acadia', 'Canyon', 'Sierra', 'Terrain', 'Yukon'] },
  { name: 'Great Wall', models: ['Haval H2', 'Haval H6', 'Haval Jolion', 'Poer', 'Wingle'] },
  { name: 'Honda', models: ['Accord', 'BR-V', 'City', 'Civic', 'CR-V', 'Fit', 'HR-V', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline', 'WR-V'] },
  { name: 'Hyundai', models: ['Accent', 'Creta', 'Elantra', 'Grand i10', 'i10', 'i20', 'i30', 'Ioniq', 'Kona', 'Palisade', 'Santa Cruz', 'Santa Fe', 'Sonata', 'Tucson', 'Venue'] },
  { name: 'Infiniti', models: ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'] },
  { name: 'Isuzu', models: ['D-Max', 'MU-X'] },
  { name: 'JAC', models: ['J4', 'S2', 'S3', 'S4', 'S7', 'T6', 'T8'] },
  { name: 'Jaguar', models: ['E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF'] },
  { name: 'Jeep', models: ['Cherokee', 'Compass', 'Commander', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'] },
  { name: 'Kia', models: ['Carnival', 'Cerato', 'EV6', 'Forte', 'K5', 'Niro', 'Picanto', 'Rio', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Telluride'] },
  { name: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'] },
  { name: 'Lexus', models: ['ES', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'] },
  { name: 'Lincoln', models: ['Aviator', 'Corsair', 'Nautilus', 'Navigator'] },
  { name: 'Mazda', models: ['CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-9', 'CX-90', 'Mazda2', 'Mazda3', 'Mazda6', 'MX-5'] },
  { name: 'Mercedes-Benz', models: ['Clase A', 'Clase B', 'Clase C', 'Clase E', 'Clase G', 'Clase S', 'CLA', 'CLS', 'EQE', 'EQS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'AMG GT', 'Sprinter', 'Vito'] },
  { name: 'MG', models: ['3', '5', 'GT', 'HS', 'RX5', 'ZS', 'ZS EV', 'Marvel R'] },
  { name: 'Mini', models: ['Clubman', 'Convertible', 'Cooper', 'Countryman', 'Hardtop'] },
  { name: 'Mitsubishi', models: ['ASX', 'Eclipse Cross', 'L200', 'Mirage', 'Montero Sport', 'Outlander', 'Pajero', 'Xpander'] },
  { name: 'Nissan', models: ['370Z', 'Altima', 'Ariya', 'Frontier', 'Kicks', 'Leaf', 'March', 'Maxima', 'Murano', 'Navara', 'Note', 'NP300', 'Pathfinder', 'Qashqai', 'Rogue', 'Sentra', 'Terra', 'Tiida', 'Titan', 'Versa', 'X-Trail'] },
  { name: 'Peugeot', models: ['2008', '208', '3008', '301', '308', '5008', '508', 'Partner', 'Rifter'] },
  { name: 'Porsche', models: ['718', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'] },
  { name: 'RAM', models: ['1500', '2500', '3500', '700', 'ProMaster'] },
  { name: 'Renault', models: ['Captur', 'Clio', 'Duster', 'Kangoo', 'Koleos', 'Kwid', 'Logan', 'Master', 'Megane', 'Oroch', 'Sandero', 'Stepway', 'Symbol'] },
  { name: 'Seat', models: ['Arona', 'Ateca', 'Ibiza', 'León', 'Tarraco'] },
  { name: 'Skoda', models: ['Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Scala', 'Superb'] },
  { name: 'Subaru', models: ['BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX'] },
  { name: 'Suzuki', models: ['Alto', 'Baleno', 'Celerio', 'Ciaz', 'Ertiga', 'Grand Vitara', 'Ignis', 'Jimny', 'S-Cross', 'Swift', 'Vitara', 'XL7'] },
  { name: 'Tesla', models: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'] },
  { name: 'Toyota', models: ['4Runner', 'Agya', 'Avanza', 'C-HR', 'Camry', 'Corolla', 'Corolla Cross', 'Fortuner', 'GR86', 'Hilux', 'Land Cruiser', 'Prado', 'RAV4', 'Rush', 'Sequoia', 'Supra', 'Tacoma', 'Tundra', 'Venza', 'Yaris', 'Yaris Cross'] },
  { name: 'Volkswagen', models: ['Amarok', 'Arteon', 'Atlas', 'Caddy', 'CrossFox', 'Gol', 'Golf', 'ID.3', 'ID.4', 'Jetta', 'Nivus', 'Passat', 'Polo', 'Saveiro', 'T-Cross', 'Taos', 'Tiguan', 'Touareg', 'Transporter', 'Virtus', 'Vento'] },
  { name: 'Volvo', models: ['C40', 'S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'] },
  { name: 'Otro', models: [] },
];

export function getBrandNames(): string[] {
  return CAR_BRANDS.map((b) => b.name);
}

export function getModelsByBrand(brand: string): string[] {
  const found = CAR_BRANDS.find((b) => b.name.toLowerCase() === brand.toLowerCase());
  return found?.models ?? [];
}
