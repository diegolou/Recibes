import { PacPlanes } from '@app/Entities/pac-planes';

export const PACPLANES: PacPlanes[] = [
  {
    code: 1001,
    name: 'Basico',
    value: 10000,
    description: 'Plan Basico Sin Descuento',
    descuento: 0,
  },
  {
    code: 1002,
    name: 'Bronce',
    value: 100000,
    description: 'Plan Bronce 1% de descuento sobre el precio base',
    descuento: 0.01,
  },
  {
    code: 1003,
    name: 'Plata',
    value: 200000,
    description: 'Plan Bronce 2% de descuento sobre el precio base',
    descuento: 0.02,
  },
  {
    code: 1004,
    name: 'Oro',
    value: 300000,
    description: 'Plan Bronce 3% de descuento sobre el precio base',
    descuento: 0.03,
  },
  {
    code: 1005,
    name: 'Diamante',
    value: 500000,
    description: 'Plan Bronce 5% de descuento sobre el precio base',
    descuento: 0.05,
  },
  {
    code: 1005,
    name: 'Platino',
    value: 1000000,
    description: 'Plan Bronce 7% de descuento sobre el precio base',
    descuento: 0.07,
  },
];
