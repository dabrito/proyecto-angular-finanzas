import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Transaccion  } from '../../interfaz/transaccion';

@Component({
  selector: 'app-reportes',
  standalone: true,
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
