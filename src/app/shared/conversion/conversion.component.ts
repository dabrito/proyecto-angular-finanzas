import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecursosService } from '../../servicios/recursos.service';
import { ListResponse } from '../../interfaz/currencyList';
import { LiveResponse } from '../../interfaz/currencyLive';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [RecursosService],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css'
})
export class ConversionComponent implements OnInit {

  // Lista de monedas (ej. ["AED", "AFN", "ALL", ...])
  currencies: string[] = [];

  // Mapa con los tipos de cambio (ej. quotes["USDEUR"] = 0.95)
  quotes: { [key: string]: number } = {};

  // Campos para la conversión
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedValue: number = 0;

  constructor(private recursosService: RecursosService) {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadLiveRates();
  }

  // Cargar la lista de monedas
  loadCurrencies(): void {
    this.recursosService.getCurrencies().subscribe({
      next: (res: ListResponse) => {
        if (res && res.success) {
          // 'currencies' es un objeto { "AED": "United Arab Emirates Dirham", ... }
          // Nos interesan solo las keys (ej. ["AED","AFN","ALL",...])
          this.currencies = Object.keys(res.currencies);
        }
      },
      error: (err) => {
        console.error('Error al cargar lista de monedas', err);
      }
    });
  }

  // Cargar los tipos de cambio en vivo (con base en USD)
  loadLiveRates(): void {
    this.recursosService.getLiveRates().subscribe({
      next: (res: LiveResponse) => {
        if (res && res.success) {
          this.quotes = res.quotes; // Ej. { "USDAED": 3.67, "USDEUR": 0.94, ... }
        }
      },
      error: (err) => {
        console.error('Error al cargar tipos de cambio live', err);
      }
    });
  }

  convert(): void {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (!this.quotes) {
      alert('No se ha cargado la información de tipos de cambio');
      return;
    }

    let fromToUSD = 1;
    if (this.fromCurrency !== 'USD') {
      const keyFrom = `USD${this.fromCurrency}`;
      if (!this.quotes[keyFrom]) {
        alert(`No se encontró tipo de cambio para ${this.fromCurrency}`);
        return;
      }
      fromToUSD = 1 / this.quotes[keyFrom];
    }

    let usdToTo = 1;
    if (this.toCurrency !== 'USD') {
      const keyTo = `USD${this.toCurrency}`;
      if (!this.quotes[keyTo]) {
        alert(`No se encontró tipo de cambio para ${this.toCurrency}`);
        return;
      }
      usdToTo = this.quotes[keyTo];
    }

    this.convertedValue = this.amount * fromToUSD * usdToTo;
  }
}