import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../interfaz/transaccion';
import { RecursosService } from '../../servicios/recursos.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Chart, DoughnutController, BarController, LineController, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
Chart.register( DoughnutController, BarController, LineController, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend );

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  chart!: Chart;

  transactions: Transaccion[] = [];

  // CONFIGURACIÓN DEL GRÁFICO DE DONA: Ingresos vs Gastos
  public doughnutChartLabels: string[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [0, 0],
        borderColor: ['blue', 'red'],
        backgroundColor: ['rgba(0, 0, 255, 0.2)', 'rgba(255,99,132,0.6)'],
      },
    ],
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
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
      {
        data: [],
        label: 'Gastos',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
    ],
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = { responsive: true };

  constructor(private transaccionService: RecursosService) {}

  ngOnInit(): void {
    this.transaccionService.getAll().subscribe((data) => {
      this.transactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      // this.transactions = data;
      this.updateCharts();
    });
  }

  // Se utiliza AfterViewInit para garantizar que el canvas ya esté disponible
  ngAfterViewInit(): void {
    this.createLineChart();
    this.updateLineChart();
  }

  // Actualizar los datos de los gráficos de dona y barras, y el de líneas si existe
  updateCharts(): void {
    // 1. Gráfico de dona: Total de ingresos y gastos
    let totalIngresos = 0;
    let totalGastos = 0;
    this.transactions.forEach((t) => {
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

    this.transactions.forEach((t) => {
      const categoriaKey = `Categoria ${t.categoryId}`; // puedes cambiar esto si tienes el nombre real
      if (t.type === 'ingreso') {
        ingresosPorCategoria[categoriaKey] = (ingresosPorCategoria[categoriaKey] || 0) + t.amount;
      } else {
        gastosPorCategoria[categoriaKey] = (gastosPorCategoria[categoriaKey] || 0) + t.amount;
      }
    });

    // Crear una lista de categorías (unión de ambas)
    const categorias = Array.from(
      new Set([
        ...Object.keys(ingresosPorCategoria),
        ...Object.keys(gastosPorCategoria),
      ])
    );
    this.barChartLabels = categorias;
    this.barChartData.labels = categorias;

    // Datos para cada categoría (si no existe se asume 0)
    const ingresosData = categorias.map(
      (cat) => ingresosPorCategoria[cat] || 0
    );
    const gastosData = categorias.map((cat) => gastosPorCategoria[cat] || 0);

    this.barChartData.datasets[0].data = ingresosData;
    this.barChartData.datasets[1].data = gastosData;

    // Actualizar el gráfico de líneas solo si ya se ha creado la instancia
    if (this.chart) {
      this.updateLineChart();
    }
  }

  // Crear el gráfico de líneas
  createLineChart(): void {
    if (!this.lineChart) return;

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
            borderWidth: 2,
          },
          {
            label: 'Gastos',
            data: [],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Actualizar gráfico de líneas con datos (versión ordenada por mes)
  updateLineChart(): void {
    if (!this.chart) return;

    // Agrupar las transacciones usando el índice del mes (0 = enero, 11 = diciembre)
    const grouped: {
      [monthIndex: number]: { ingreso: number; gasto: number };
    } = {};

    this.transactions.forEach((t) => {
      const monthIndex = new Date(t.date).getMonth();
      if (!grouped[monthIndex]) {
        grouped[monthIndex] = { ingreso: 0, gasto: 0 };
      }
      if (t.type === 'ingreso') {
        grouped[monthIndex].ingreso += t.amount;
      } else {
        grouped[monthIndex].gasto += t.amount;
      }
    });

    // Obtener los índices de mes en orden ascendente
    const sortedMonthIndices = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    const labels = sortedMonthIndices.map((monthIndex) =>
      new Date(0, monthIndex).toLocaleString('default', { month: 'short' })
    );
    const ingresos = sortedMonthIndices.map(
      (monthIndex) => grouped[monthIndex].ingreso
    );
    const gastos = sortedMonthIndices.map(
      (monthIndex) => grouped[monthIndex].gasto
    );

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = ingresos;
    this.chart.data.datasets[1].data = gastos;
    this.chart.update();
  }
}