import { Component, OnInit } from '@angular/core';
import { RecursosService } from '../../servicios/recursos.service';
import { Meta } from '../../interfaz/metas';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregar FormsModule aqu
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  metas: Meta[] = [];
  metaSeleccionada: Meta | null = null;
  interfaz: Meta = {
    objetivoMeta: '',
    montoMeta: 0,
    fechaMeta: new Date().toISOString().split('T')[0],
    periodoId: 0
  };

  objetivosMeta = [
    { id: 1, nombre: 'Ahorro para vivienda' },
    { id: 2, nombre: 'Educación' },
    { id: 3, nombre: 'Emergencias' },
  ];

  meta = {
    objetivo: '',
    semana: 0,
    periodo: '',
    educacion: '',
    monto: 0,
    fecha: ''
  };

  trackByMeta(index: number, meta: Meta): number {
    return meta.id ?? index; // Devuelve el id o el índice como identificador único
  }

  constructor(private Service: RecursosService) {}

  ngOnInit(): void {
    this.loadMetas();
  }

  loadMetas(): void {
    this.Service.getAllMetas().subscribe((data: Meta[]) => {
      this.metas = data;
    });
  }

  eliminarMeta(id: number | undefined): void {
    if (id !== undefined) {
      this.Service.deleteMeta(id).subscribe(() => {
        this.loadMetas();
      });
    }
  }

  crearMeta(): void {
    this.Service.createMeta(this.interfaz).subscribe({
      next: () => {
        this.loadMetas();
        this.interfaz = {
          objetivoMeta: this.interfaz.objetivoMeta,
          montoMeta: this.interfaz.montoMeta,
          fechaMeta: new Date().toISOString().split('T')[0],
          periodoId: 0
        };
      }
    });
  }

  guardarNuevaMeta() {
    if (this.meta.objetivo && this.meta.semana && this.meta.periodo && this.meta.educacion && this.meta.monto && this.meta.fecha) {
      // Aquí puedes agregar la lógica para guardar la nueva meta
      console.log("Nueva meta guardada:", this.meta);
    } else {
      console.log("Formulario no válido");
    }
  }

  resetForm(): void {
    // Reiniciar los campos del formulario
    this.interfaz = {
      objetivoMeta: '',
      montoMeta: 0,
      fechaMeta: new Date().toISOString().split('T')[0],
      periodoId: 0
    };
  }
  seleccionarMeta(meta: Meta): void {
    this.metaSeleccionada = { ...meta };
  }

  actualizarMeta(): void {
    if (this.metaSeleccionada && this.metaSeleccionada.id) {
      this.Service.updateMeta(this.metaSeleccionada.id, this.metaSeleccionada).subscribe({
        next: () => {
          this.loadMetas();
          this.metaSeleccionada = null;
        }
      });
    }
  }
}

 