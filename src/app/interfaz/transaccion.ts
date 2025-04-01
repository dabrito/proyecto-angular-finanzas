export interface Transaccion {
  id?: number;
  type: 'ingreso' | 'gasto';
  amount: number;
  categoryId: number;
  date: string;
  categoria?: { nombre: string }; // opcional para mostrar nombre
}
