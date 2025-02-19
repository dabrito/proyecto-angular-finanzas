export interface Transaccion {
  id: number;
  type: 'ingreso' | 'gasto';
  amount: number;
  category: string;
  date: Date;
}
