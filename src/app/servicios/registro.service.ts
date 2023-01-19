import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs';
import { Registro } from '../modelo/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private readonly URL_REGISTRO = 'https://dummyjson.com/users/add';
  public cargando: boolean = false;
  constructor(
    private cliente: HttpClient,
    private router: Router,
    private alerta: AlertController
  ) { }

  public nuevoUsuario(usuario: Registro){
    this.cliente.post(this.URL_REGISTRO,{
      ...usuario
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .pipe(
      catchError(async (error: HttpErrorResponse)=>{
        const mensaje = await this.alerta.create({
          header: 'Ups... ',
          message: 'Algo salio mal, revise los campos'
        })
        await mensaje.present();
        return null;
      })
    )
    .subscribe(async (respuesta) => {
      if(respuesta){
        const mensaje = await this.alerta.create({
          header: 'Correcto',
          message: 'Usuario registrado'
        })
        await mensaje.present();
        this.router.navigate(['/']);
      }
    })
  }
}
