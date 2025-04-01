<<<<<<< HEAD
import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../interfaz/transaccion';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';

import { Chart, DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register( DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend );
=======
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Transaccion  } from '../../interfaz/transaccion';
>>>>>>> origin/Andrea_DelPino2

@Component({
  selector: 'app-reportes',
  standalone: true,
<<<<<<< HEAD
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
=======
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChart!: ElementRef;
  chart!: Chart;

  constructor() {}

  ngAfterViewInit() {
    this.createChart();
    this.updateChart();
  }

  // Getter que accede directamente a localStorage
  get transactions(): Transaccion[] {
    const data = localStorage.getItem('transactions');
    if (data) {
      return JSON.parse(data).map((t: Transaccion) => ({
        ...t,
        date: new Date(t.date) // Convertir fecha de string a Date
      }));
    }
    return [];
  }

  createChart() {
    this.chart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Ingresos',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderWidth: 2
          },
          {
            label: 'Gastos',
            data: [],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateChart() {
    if (!this.chart) return;

    const transactions = this.transactions; // Obtiene las transacciones usando el getter

    const grouped: { [key: string]: { ingreso: number; gasto: number } } = {};

    transactions.forEach((t) => {
      const month = t.date.toLocaleString('default', { month: 'short' });

      if (!grouped[month]) {
        grouped[month] = { ingreso: 0, gasto: 0 };
      }

      if (t.type === 'ingreso') {
        grouped[month].ingreso += t.amount;
      } else {
        grouped[month].gasto += t.amount;
      }
    });

    const labels = Object.keys(grouped);
    const ingresos = labels.map((month) => grouped[month].ingreso);
    const gastos = labels.map((month) => grouped[month].gasto);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = ingresos;
    this.chart.data.datasets[1].data = gastos;
    this.chart.update();
  }
}
>>>>>>> origin/Andrea_DelPino2
