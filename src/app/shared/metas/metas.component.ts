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

  guardarNuevaMeta(): void {
    // Crear el objeto nuevaMeta con los valores de la propiedad interfaz
    const nuevaMeta: Meta = {
      objetivoMeta: this.interfaz.objetivoMeta,
      montoMeta: this.interfaz.montoMeta,
      fechaMeta: this.interfaz.fechaMeta,
      periodoId: this.interfaz.periodoId
    };

    // Verificar que el servicio esté definido antes de usarlo
    if (this.Service) {
      // Llamar al servicio para guardar la nueva meta en la base de datos
      this.Service.createMeta(nuevaMeta).subscribe(res => {
        // Lógica posterior: agregar la nueva meta a la lista o limpiar el formulario
        this.metas.push(res); // Añadir la nueva meta a la lista de metas
        alert('Meta agregada exitosamente');
        this.resetForm(); // Limpiar el formulario después de agregar
      });
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

 