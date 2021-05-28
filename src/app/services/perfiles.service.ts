import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from 'src/domain/perfil';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {
  }

  async getTodosLosPerfiles() {
    const perfiles: Perfil[] = await this.http.get<any>(environment.apiUrl + 'perfiles').toPromise();
    return perfiles.map((perfil)=> Perfil.fromJson(perfil));
  }

}
