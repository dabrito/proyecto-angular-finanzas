import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListResponse } from '../interfaz/currencyList';
import { LiveResponse } from '../interfaz/currencyLive';
import { Transaccion } from '../interfaz/transaccion';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  private api = 'http://localhost:3000/api/transacciones';
  private baseUrl = 'https://api.exchangerate.host';
  private apiKey = '2dfc4f27f1c8c94842dba3872ff2123c'; // tu API key
  // private apiKey = '2dfc4f27f1c8c94842dba3872ff1123c'; // API con fallo interno para que no consuma 

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<ListResponse> {
    const url = `${this.baseUrl}/list?access_key=${this.apiKey}`;
    return this.http.get<ListResponse>(url);
  }

  getLiveRates(): Observable<LiveResponse> {
    const url = `${this.baseUrl}/live?access_key=${this.apiKey}`;
    return this.http.get<LiveResponse>(url);
  }

  getAll(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.api);
  }

  create(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.api, transaccion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}