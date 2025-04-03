import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Transaccion  } from '../../interfaz/transaccion';
import { Categoria } from '../../interfaz/categoria';
import { Tipo } from '../../interfaz/tipo';

import { RecursosService } from '../../servicios/recursos.service';

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
  tipos: Tipo[] = [];
  ingresos = 0;
  gastos = 0;
  total = 0;

  // newTransactionType: 'ingreso' | 'gasto' = 'ingreso';
  newTransactionTypeId: number = 0;
  newTransactionAmount = 0;
  newTransactionCategoryId: number = 0;
  newTransactionDate = '';

  constructor(private Service: RecursosService) {}

  ngOnInit(): void {
    this.newTransactionDate = new Date().toISOString().split('T')[0];
    this.loadTipos();
    this.loadCategorias();
    this.loadTransacciones();
  }

  loadTipos(): void {
    this.Service.getAllTipos().subscribe({
      next: (data) => {this.tipos = data;},
      error: (err) => console.error('Error al cargar tipos:', err)
    });
  }

  loadCategorias(): void {
    this.Service.getAllCategorias().subscribe({
      next: (data) => {this.categorias = data;},
      error: (err) => {console.error('Error al cargar categorías:', err);}
    });
  }

  loadTransacciones(): void {
    this.Service.getAllTransacciones().subscribe(data => {
      this.transactions = data.filter(t => t.id !== undefined).sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      this.calculateBalance();
    });
  }

  addTransaction(): void {
    if (!this.newTransactionAmount || !this.newTransactionCategoryId || !this.newTransactionTypeId) {
      console.log('Faltan campos');
      alert('Por favor completa todos los campos');
      return;
    }

    const nueva: Transaccion = {
      tiposId: this.newTransactionTypeId,
      amount: this.newTransactionAmount,
      categoryId: this.newTransactionCategoryId,
      date: this.newTransactionDate
    };

    this.Service.create(nueva).subscribe(res => {
      this.transactions.unshift(res);
      this.calculateBalance();
      this.loadTransacciones();
      this.resetForm();
    });
  }

  calculateBalance(): void {
    this.ingresos = this.transactions.filter(t => t.tipo?.nombre === 'ingreso').reduce((s, t) => s + t.amount, 0);
    this.gastos = this.transactions.filter(t => t.tipo?.nombre === 'gasto').reduce((s, t) => s + t.amount, 0);
    this.total = this.ingresos - this.gastos;
  }

  resetForm(): void {
    this.newTransactionTypeId = 0;
    this.newTransactionAmount = 0;
    this.newTransactionCategoryId = 0;
    this.newTransactionDate = new Date().toISOString().split('T')[0];
  }
}