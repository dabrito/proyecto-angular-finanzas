export interface Transaccion {
  id?: number;
  amount: number;
  date: string;
  tiposId: number;
  tipo?: { nombre: string };
  categoryId: number;
  categoria?: { nombre: string };
}
