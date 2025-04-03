import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Meta } from '../../interfaz/metas';  // Aquí importas la interfaz de Meta
import { RecursosService } from '../../servicios/recursos.service';


@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})

export class MetasComponent implements OnInit {
  metas: Meta[] = [];  // Array para las metas
  tipoMeta = '';  // Campo para tipo de meta
  objetivoMeta = '';  // Campo para objetivo de la meta
  montoMeta: number | null = null;  // Campo para monto de la meta
  fechaMeta = '';  // Campo para fecha de la meta

  constructor(private service: RecursosService) {}

  ngOnInit(): void {
    this.fechaMeta = new Date().toISOString().split('T')[0];  // Establece la fecha de hoy
    this.loadMetas();
  }

  // Método para cargar las metas desde el servicio
  loadMetas(): void {
    this.service.getAllMetas().subscribe({
      next: (data) => {
        this.metas = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));  // Ordena las metas por ID
      },
      error: (err) => console.error('Error al cargar metas:', err)
    });
  }

  // Método para agregar una nueva meta
  addMeta(): void {
    if (!this.tipoMeta || !this.objetivoMeta || !this.montoMeta || this.montoMeta <= 0) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    const nuevaMeta: Meta = {
      tipoMeta: this.tipoMeta,
      objetivoMeta: this.objetivoMeta,
      montoMeta: this.montoMeta,
      fechaMeta: this.fechaMeta
    };

    this.service.createMeta(nuevaMeta).subscribe(res => {
      this.metas.unshift(res);  // Añade la nueva meta al principio de la lista
      this.resetForm();  // Resetea el formulario
    });
  }

  // Método para reiniciar el formulario
  resetForm(): void {
    this.tipoMeta = '';
    this.objetivoMeta = '';
    this.montoMeta = null;
    this.fechaMeta = new Date().toISOString().split('T')[0];  // Establece la fecha de hoy nuevamente
  }
}
