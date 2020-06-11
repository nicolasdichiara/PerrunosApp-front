import { Injectable } from '@angular/core';
import { Mascota } from 'src/domain/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor() { }

}

export class StubMascotasService {
  mascotas = [
      new Mascota(1, 'Max', '', 'Descrip', '', new Date(2014, 2 , 2), 1, 1, 1, 0),
  ];

  async todasLasMascotas() {
      return this.mascotas;
  }

  async getMascotaById(id: number) {
      return this.mascotas.find((mascota) => mascota.id === id);
  }

  actualizarMascota(mascota: Mascota) { }
}
