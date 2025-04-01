import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaz/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private api = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.api);
  }
}