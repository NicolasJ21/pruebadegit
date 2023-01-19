import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../servicios/catalogo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {

  constructor(
    public catalogoS: CatalogoService
  ) {

   }

  public ionViewWillEnter(){
    this.catalogoS.obtenerProducto();
  }

}
