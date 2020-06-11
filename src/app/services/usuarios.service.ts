import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private isUserLoggedIn;

  constructor() {
    this.isUserLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public loguear(){
    this.isUserLoggedIn = true;
  }

}
