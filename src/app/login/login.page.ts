import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  public formulario: FormGroup;
  constructor(
    public auth: AuthService,
    private builder: FormBuilder
  ) {
    this.formulario = builder.group({
      username: ['',],
      password: ['',],
      activo: [false,]
    })
   }

  public ionViewWillEnter(){
    this.formulario.reset();
    this.formulario.get('username')?.setValue('');
    this.formulario.get('password')?.setValue('');
    this.formulario.clearAsyncValidators();

  }

  public enviar(){
    this.auth.autenticacion({
      username: this.formulario.value.username,
      password: this.formulario.value.password
    }, this.formulario.value.activo);
  }

}
