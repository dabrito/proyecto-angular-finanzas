import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../interfaz/transaccion';

@Component({
  selector: 'app-billeteras',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './billeteras.component.html',
  styleUrl: './billeteras.component.css'
})
export class BilleterasComponent implements OnInit {

  transactions: Transaccion[] = [];

  ngOnInit(): void {
    this.loadTransactionsFromLocalStorage();
  }

  loadTransactionsFromLocalStorage(): void {
    const data = localStorage.getItem('transactions');
    if (data) {
      this.transactions = JSON.parse(data);

      this.transactions.forEach(t => {
        t.date = new Date(t.date);
      });
    }
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
}