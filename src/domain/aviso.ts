import { Mascota } from './mascota';
import { IonDatetime } from '@ionic/angular';

export class Aviso {

    id: number;
    tipoServicio: number;
    idPerro: number;
    fechaParticular: string;
    detalle: string;
    fecha: Date;
    horario: string;

    static fromJson(avisoJSON): Aviso {
        return Object.assign(new Aviso(), avisoJSON);
    }

    constructor(_idPerro?: number, _detalle?: string, _tipoServicio?: number, _fechaParticular?: string,
        _fecha?: Date, _horario?: string) {
      this.idPerro = _idPerro;
      this.detalle = _detalle;
      this.tipoServicio = _tipoServicio;
      this.fecha = _fecha;
      this.fechaParticular = _fechaParticular;
      this.horario = _horario;

    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fecha);
        const newDateHoras = new Date(this.horario);
        console.log(newDate);
        return {
            ...this,
            horario: this.dosDigitosHora(newDateHoras) + ':' + this.dosDigitosMinutos(newDateHoras) + ':00',
            fecha: this.dosDigitosDia(newDate) + '/' +
                this.dosDigitosMes(newDate) + '/' + newDate.getFullYear()
        };
    }

    dosDigitosMes(fecha: Date){
        return ('0' + (fecha.getMonth() + 1)).slice(-2);
    }

    dosDigitosDia(fecha: Date){
        return ('0' + fecha.getDate()).slice(-2);
    }

    dosDigitosHora(fecha: Date){
        return ('0' + fecha.getHours()).slice(-2);
    }

    dosDigitosMinutos(fecha: Date){
        return ('0' + fecha.getMinutes()).slice(-2);
    }

}
