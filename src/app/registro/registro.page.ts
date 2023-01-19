import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistroService } from '../servicios/registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  public fechaMaxima: Date = new Date();
  public formulario: FormGroup;
  constructor(
    private builder: FormBuilder,
    public registroS: RegistroService
  ) {
    this.formulario = builder.group({
      firstName: [''],
      lastName: [''],
      age: [0],
      username: [''],
      password: [''],
      birthDate: [this.fechaMaxima.toISOString()],
      gender: ['Male'],
    })
  }

  ionViewWillEnter() {
    this.formulario.reset();
    this.formulario.setValue({
      firstName: '',
      lastName: '',
      age: 0,
      username: '',
      password: '',
      birthDate: this.fechaMaxima.toISOString(),
      gender: 'Male'
    })
    // this.formulario.clearAsyncValidators();
  }
  public registrar(){
    this.registroS.nuevoUsuario({
      ...this.formulario.value
    });
  }
}
