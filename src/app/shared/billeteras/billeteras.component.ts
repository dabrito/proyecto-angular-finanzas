import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../interfaz/transaccion';
import { RecursosService } from '../../servicios/recursos.service';

@Component({
  selector: 'app-billeteras',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './billeteras.component.html',
  styleUrl: './billeteras.component.css'
})
export class BilleterasComponent implements OnInit {
  transactions: Transaccion[] = [];

  constructor(private transaccionService: RecursosService) {}

  ngOnInit(): void {
    this.transaccionService.getAll().subscribe((data) => {
      this.transactions = data;
    });
  }

  deleteTransaction(id?: number): void {
    console.log(id)
    if (!id) {
      console.warn('ID no válido para eliminar:', id) 
      return;
    }
    this.transaccionService.delete(id).subscribe(() => {
      this.transactions = this.transactions.filter(t => t.id !== id);
    });
  }
}