import { Injectable } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
providedIn: 'root'
})
export class UserDataResolver {
constructor(private authService: UsuariosService) {}

resolve() {
console.log('Hola!');
return this.authService.getUserData();
}
}