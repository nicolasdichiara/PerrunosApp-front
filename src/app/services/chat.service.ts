import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Mensaje } from '../../domain/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  /*async getMensajesRoom(room) {
    const mensajes: Mensaje[] = await this.http.get<any>(environment.apiRealTimeUrl + 'api/mensajes/room/' + room).toPromise();
    return mensajes.map((cat) => Mensaje.fromJson(cat));
  }*/

}