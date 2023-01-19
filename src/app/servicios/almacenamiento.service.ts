import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  private storage: Storage | null = null;
  constructor(
    private db: Storage
  ) {
    this.crear();
  }

  public async crear(){
    this.storage = await this.db.create()
  }

  public async guardarToken(token: string){
    this.storage?.set('token', token);
  }
  public async obtenerToken(){
    return this.storage?.get('token');
  }
}
