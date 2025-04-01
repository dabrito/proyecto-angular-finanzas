import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaccion  } from '../../interfaz/transaccion';
import { RecursosService } from '../../servicios/recursos.service';
import { Categoria } from '../../interfaz/categoria';
import { CategoriaService } from '../../servicios/categoria.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  transactions: Transaccion[] = [];
  categorias: Categoria[] = [];
  ingresos = 0;
  gastos = 0;
  total = 0;

  newTransactionType: 'ingreso' | 'gasto' = 'ingreso';
  newTransactionAmount = 0;
  newTransactionCategoryId: number = 0;
  newTransactionDate = '';

  constructor(
    private transaccionService: RecursosService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.newTransactionDate = new Date().toISOString().split('T')[0];
    this.loadTransacciones();
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getAll().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  loadTransacciones(): void {
    this.transaccionService.getAll().subscribe(data => {
      this.transactions = data.filter(t => t.id !== undefined).sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      this.calculateBalance();
    });
  }

  addTransaction(): void {
    if (!this.newTransactionAmount || !this.newTransactionCategoryId) {
      console.log('Faltan campos');
      alert('Por favor completa todos los campos');
      return;
    }

    const nueva: Transaccion = {
      type: this.newTransactionType,
      amount: this.newTransactionAmount,
      categoryId: this.newTransactionCategoryId,
      date: this.newTransactionDate
    };

    this.transaccionService.create(nueva).subscribe(res => {
      this.transactions.unshift(res);
      this.calculateBalance();
      this.loadTransacciones();
      this.resetForm();
    });
  }

  calculateBalance(): void {
    this.ingresos = this.transactions.filter(t => t.type === 'ingreso').reduce((s, t) => s + t.amount, 0);
    this.gastos = this.transactions.filter(t => t.type === 'gasto').reduce((s, t) => s + t.amount, 0);
    this.total = this.ingresos - this.gastos;
  }

  resetForm(): void {
    this.newTransactionType = 'ingreso';
    this.newTransactionAmount = 0;
    this.newTransactionCategoryId = 0;
    this.newTransactionDate = new Date().toISOString().split('T')[0];
  }
}