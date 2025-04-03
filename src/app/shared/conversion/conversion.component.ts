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
  styleUrls: ['./conversion.component.css']
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
  historial: any;

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

  // Método para hacer la conversión utilizando el backend
  convert(): void {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Llamar al backend para hacer la conversión
    this.recursosService.convertir(this.amount, this.fromCurrency, this.toCurrency).subscribe(
      (response) => {
        // Recibimos el historial de la conversión
        this.historial = response.historial;
        this.convertedValue = this.historial.monto_convertido;
      },
      (error) => {
        console.error('Error en la conversión:', error);
        alert('Hubo un error al realizar la conversión');
      }
    );
  }
}
