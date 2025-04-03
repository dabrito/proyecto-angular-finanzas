import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListResponse } from '../interfaz/currencyList';
import { LiveResponse } from '../interfaz/currencyLive';

import { Transaccion } from '../interfaz/transaccion';
import { Categoria } from '../interfaz/categoria';
import { Tipo } from '../interfaz/tipo';
import { Meta } from '../interfaz/metas';
import { Periodo } from '../interfaz/periodo';


@Injectable({providedIn: 'root'})
export class RecursosService {
  private apitransacciones = 'http://localhost:3000/api/transacciones';
  private apitipos = 'http://localhost:3000/api/tipos';
  private apicategorias = 'http://localhost:3000/api/categorias';
  private apimetas = 'http://localhost:3000/api/metas';
  private apiperiodos = 'http://localhost:3000/api/periodos';

  private apiConvert = 'http://localhost:3000/api/convert';
  
  private baseUrl = 'https://api.exchangerate.host';
  private apiKey = '2dfc4f27f1c8c94842dba3872ff2123c';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<ListResponse> {
    const url = `${this.baseUrl}/list?access_key=${this.apiKey}`;
    return this.http.get<ListResponse>(url);
  }

  getLiveRates(): Observable<LiveResponse> {
    const url = `${this.baseUrl}/live?access_key=${this.apiKey}`;
    return this.http.get<LiveResponse>(url);
  }

  getAllTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.apitransacciones);
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apicategorias);
  }

  getAllTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apitipos);
  }
  getAllMetas(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.apimetas);
  }

  getAllPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.apiperiodos);
  }

  create(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.apitransacciones, transaccion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apitransacciones}/${id}`);
  }

  // Método para realizar la conversión
  convertir(montoOrigen: number, monedaOrigen: string, monedaDestino: string): Observable<any> {
    // Envía los datos al backend para realizar la conversión
    return this.http.post<any>(this.apiConvert, {
      monto_origen: montoOrigen,
      moneda_origen: monedaOrigen,
      moneda_destino: monedaDestino
    });
  }

  createMeta(meta: Meta): Observable<Meta> {
    return this.http.post<Meta>(this.apimetas, meta);
  }

  updateMeta(id: number, meta: Meta): Observable<Meta> {
    return this.http.put<Meta>(`<span class="math-inline">\{this\.apiUrl\}/metas/</span>{id}`, meta);
  }

  deleteMeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apimetas}/${id}`);
  }
}