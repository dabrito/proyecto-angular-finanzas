import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../interfaz/transaccion';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';

import { Chart, DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register( DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend );

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ CommonModule, BaseChartDirective ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {

  // Arreglo de transacciones
  transactions: Transaccion[] = [];

  // CONFIGURACIÓN DEL GRÁFICO DE DONA: Ingresos vs Gastos
  public doughnutChartLabels: string[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 0],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)']
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = { responsive: true };

  // CONFIGURACIÓN DEL GRÁFICO DE BARRAS: Transacciones por Categoría
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Ingresos',
        backgroundColor: 'rgba(75,192,192,0.6)'
      },
      {
        data: [],
        label: 'Gastos',
        backgroundColor: 'rgba(255,99,132,0.6)'
      }
    ]
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = { responsive: true };

  constructor() { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Cargar transacciones desde localStorage
  loadTransactions(): void {
    const data = localStorage.getItem('transactions');
    if (data) {
      this.transactions = JSON.parse(data);
      this.transactions.forEach(t => {
        t.date = new Date(t.date);
      });
    }
    this.updateCharts();
  }

  // Actualizar los datos de los gráficos
  updateCharts(): void {
    // 1. Gráfico de dona: Total de ingresos y gastos
    let totalIngresos = 0;
    let totalGastos = 0;
    this.transactions.forEach(t => {
      if (t.type === 'ingreso') {
        totalIngresos += t.amount;
      } else {
        totalGastos += t.amount;
      }
    });
    this.doughnutChartData.datasets[0].data = [totalIngresos, totalGastos];

    // 2. Gráfico de barras: Agrupar por categoría
    const ingresosPorCategoria: { [key: string]: number } = {};
    const gastosPorCategoria: { [key: string]: number } = {};

    this.transactions.forEach(t => {
      if (t.type === 'ingreso') {
        ingresosPorCategoria[t.category] = (ingresosPorCategoria[t.category] || 0) + t.amount;
      } else {
        gastosPorCategoria[t.category] = (gastosPorCategoria[t.category] || 0) + t.amount;
      }
    });

    // Crear una lista de categorías (unión de ambas)
    const categorias = Array.from(new Set([
      ...Object.keys(ingresosPorCategoria),
      ...Object.keys(gastosPorCategoria)
    ]));
    this.barChartLabels = categorias;
    this.barChartData.labels = categorias;

    // Datos para cada categoría (si no existe se asume 0)
    const ingresosData = categorias.map(cat => ingresosPorCategoria[cat] || 0);
    const gastosData = categorias.map(cat => gastosPorCategoria[cat] || 0);

    this.barChartData.datasets[0].data = ingresosData;
    this.barChartData.datasets[1].data = gastosData;
  }
}