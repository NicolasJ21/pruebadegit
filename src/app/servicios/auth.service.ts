import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth, AuthRespuesta } from '../modelo/auth';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlmacenamientoService } from './almacenamiento.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login'
  public datosUsuario: AuthRespuesta | null = null;
  public cargando: boolean = false;
  constructor(
    private cliente: HttpClient,
    private router: Router,
    private alerta: AlertController,
    private db: AlmacenamientoService
  ) { }

  public autenticacion({ username, password}: Auth, activo: boolean){
    this.cargando = true;
    this.cliente.post<AuthRespuesta>(this.URL_LOGIN, {
      username,
      password
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .pipe(
      catchError(async (error: HttpErrorResponse) => {
        if(error.status === 400){
          const mensaje = await this.alerta.create({
            header: 'Advertencia',
            message: 'Datos invalidos',
            buttons: [
              {
                text: 'Ok!',
                role: 'confirm'
              }
            ]
          });
          await mensaje.present()
        }
        return null;
      })
    )
    .subscribe(async (datos) => {
      this.cargando = false;
      if(datos){
        this.datosUsuario = datos;
        if(activo){
          await this.db.guardarToken(datos.token);
        }
        this.router.navigate(['/inicio'])
      }
    })
  }

  public obtenerToken(){
    return this.datosUsuario?.token;
  }
}
