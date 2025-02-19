import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaccion  } from '../../interfaz/transaccion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  // Arreglo de transacciones
  transactions: Transaccion[] = [];

  // Variables para el balance
  ingresos: number = 0;
  gastos: number = 0;
  total: number = 0;

  // Campos para la nueva transacción
  newTransactionType: 'ingreso' | 'gasto' = 'ingreso';
  newTransactionAmount: number = 0;
  newTransactionCategory: string = '';
  // Usamos string aquí para luego parsearlo a Date
  newTransactionDate: string = '';

  ngOnInit(): void {
    this.loadTransactionsFromLocalStorage();
    this.calculateBalance();
    // Por defecto, fecha de hoy en formato YYYY-MM-DD
    this.newTransactionDate = new Date().toISOString().split('T')[0];
  }

  // Cargar transacciones de localStorage
  loadTransactionsFromLocalStorage(): void {
    const data = localStorage.getItem('transactions');
    if (data) {
      this.transactions = JSON.parse(data);
    }
  }

  // Guardar transacciones en localStorage
  saveTransactionsToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  // Agregar nueva transacción
  addTransaction(): void {
    // Validar campos
    if (!this.newTransactionAmount || !this.newTransactionCategory) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newTrans: Transaccion = {
      id: Date.now(), // identificador sencillo basado en la hora actual
      type: this.newTransactionType,
      amount: this.newTransactionAmount,
      category: this.newTransactionCategory,
      date: new Date(this.newTransactionDate)
    };

    // Agregamos al arreglo
    this.transactions.push(newTrans);
    // Guardamos en localStorage
    this.saveTransactionsToLocalStorage();
    // Recalculamos el balance
    this.calculateBalance();
    // Reseteamos el formulario
    this.resetForm();
  }

  // Calcular los totales
  calculateBalance(): void {
    this.ingresos = 0;
    this.gastos = 0;

    for (const trans of this.transactions) {
      if (trans.type === 'ingreso') {
        this.ingresos += trans.amount;
      } else {
        this.gastos += trans.amount;
      }
    }

    this.total = this.ingresos - this.gastos;
  }

  // Reiniciar los campos del formulario
  resetForm(): void {
    this.newTransactionType = 'ingreso';
    this.newTransactionAmount = 0;
    this.newTransactionCategory = '';
    this.newTransactionDate = new Date().toISOString().split('T')[0];
  }
}
