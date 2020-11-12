import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private isUserLoggedIn;
  userData$ = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.isUserLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public loguear(){
    this.isUserLoggedIn = true;
  }

  // Auth Service - Definitivos

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
    this.userData$.next(res);
    });
    }

  login(postData: any): Observable<any> {
    console.log(postData);
    // return this.httpService.post('login', postData);
    return this.httpService.post('usuario/login', postData);

  }

  signupDuenio(postData: any) {
    // return this.httpService.post('usuario/createDuenio', postData);
    return this.http.post(environment.apiUrl + 'usuario/createDuenio', postData).toPromise();
  }

  signupPaseador(postData: any) {
    // return this.httpService.post('usuario/createPaseador', postData);
    return this.http.post(environment.apiUrl + 'usuario/createPaseador', postData).toPromise();
  }

  editProfile(postData: any, idUser: any){
    return this.http.post(environment.apiUrl + 'usuario/perfil/completarPerfil/' + idUser, postData).toPromise();
  }

  subirImagen(postData: any, idUser: any) {
    // return this.httpService.post('usuario/createDuenio', postData);
    //lo mismo que en el back
    let imagenjson = {
      imagen:postData
    }
    console.log("aca")
    console.log(imagenjson)
    return this.http.post(environment.apiUrl + 'usuario/perfil/cargarImagen/' + idUser, imagenjson).toPromise();
  }

  async getUserById(id) {
    const user = await this.http.get<Usuario>(environment.apiUrl + 'usuario/' + id).toPromise();
    return Usuario.fromJson(user);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.userData$.next('');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
    });
  }

}
