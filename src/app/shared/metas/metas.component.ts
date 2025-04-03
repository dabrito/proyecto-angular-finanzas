import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Meta } from '../../interfaz/metas';
import { RecursosService } from '../../servicios/recursos.service';

interface Interfaz {
  tipoMeta: string;
  objetivoMeta: string;
  montoMeta: number;
  fechaMeta: string;
}

interface MetaSeleccionada extends Meta {}

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MetasComplements implements OnInit {
  metas: Meta[] = [];
  interfaz: Interfaz = {
    tipoMeta: '',
    objetivoMeta: '',
    montoMeta: 0,
    fechaMeta: new Date().toISOString().split('T')[0],
  };
  metaSeleccionada: MetaSeleccionada | null = null; // Inicialización correcta

  constructor(private Service: RecursosService) {}

  ngOnInit(): void {
    this.cargarMetas();
  }

  cargarMetas(): void {
    this.Service.getMetas().subscribe({
      next: (metas) => {
        this.metas = metas;
      },
      error: (err: any) => {
        console.error('Error al cargar metas:', err);
        alert('Error al cargar metas. Por favor, inténtelo de nuevo.');
      },
    });
  }

  crearMeta(): void {
    this.Service.createMeta(this.interfaz).subscribe({
      next: () => {
        this.cargarMetas();
        this.interfaz = {
          tipoMeta: '',
          objetivoMeta: '',
          montoMeta: 0,
          fechaMeta: new Date().toISOString().split('T')[0],
        };
      },
      error: (err: any) => {
        console.error('Error al crear meta:', err);
        alert('Error al crear meta. Por favor, inténtelo de nuevo.');
      },
    });
  }

  seleccionarMeta(meta: Meta): void {
    this.metaSeleccionada = { ...meta };
  }

  actualizarMeta(): void {
    if (this.metaSeleccionada && this.metaSeleccionada.id) {
      this.Service.updateMeta(this.metaSeleccionada.id, this.metaSeleccionada).subscribe({
        next: () => {
          this.cargarMetas();
          this.metaSeleccionada = null; // Asignar null después de la actualización
        },
        error: (err: any) => {
          console.error('Error al actualizar meta:', err);
          alert('Error al actualizar meta. Por favor, inténtelo de nuevo.');
        },
      });
    }
  }

  eliminarMeta(id: number): void {
    this.Service.deleteMeta(id).subscribe({
      next: () => {
        this.cargarMetas();
      },
      error: (err: any) => {
        console.error('Error al eliminar meta:', err);
        alert('Error al eliminar meta. Por favor, inténtelo de nuevo.');
      },
    });
  }

  trackByMeta(index: number, meta: Meta): number {
    return meta.id || index;
  }
}