import { Component, OnInit } from '@angular/core';
import { DetalleService } from '../servicios/detalle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage {

  constructor(
    public detalleP: DetalleService,
    private route: ActivatedRoute
  ) { }

  public ionViewWillEnter(){
    this.route.paramMap.subscribe(parametros => {
      const id = parseInt(parametros.get('id') as string);
      this.detalleP.buscarProducto(id);

    })
  }

}
