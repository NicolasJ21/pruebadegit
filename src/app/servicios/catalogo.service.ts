import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Producto, RespuestaProducto } from './../modelo/catalogo';
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  public catalogo: RespuestaProducto | null = null;
  private skip: number = 0;
  private total: number = 0;
  public cargando: boolean = false;
  private readonly URL_PRODUCTO: string = 'https://dummyjson.com/auth/products';
  constructor(
    private authS: AuthService,
    private cliente: HttpClient
  ) { }

  public obtenerProducto() {
    this.cargando = true;
    this.cliente.get<RespuestaProducto>(`${this.URL_PRODUCTO}?skip=${this.skip}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${this.authS.datosUsuario?.token}`
      }
    })
      .subscribe((datos => {
        this.cargando = false;
        if (datos) {
          this.catalogo = datos;
          this.skip = datos.skip;
          this.skip = datos.total;
        }
      }))
  }
}
