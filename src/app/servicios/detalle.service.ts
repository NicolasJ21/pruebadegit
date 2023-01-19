import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Producto } from './../modelo/catalogo';
import { catchError } from 'rxjs';
import { HttpResponse } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  public producto: Producto | null = null;
  public readonly URL_PRODUCTO: string = 'http://dummyjson.com/auth/products/';
  public cargando: boolean = false;
  constructor(
    private cliente: HttpClient,
    private authS: AuthService
  ) {

  }

  public buscarProducto(id: number){
    this.cargando = true;
    this.cliente.get<Producto>(`${this.URL_PRODUCTO}${id}`,{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${this.authS.datosUsuario?.token}`
      }
    })
    .pipe(
      catchError(async (error: HttpResponse) => {
        return null;
      })
    )
    .subscribe((datos) => {
      this.cargando = false;
      if(datos){
        this.producto = datos;
      }
    })
  }
}
