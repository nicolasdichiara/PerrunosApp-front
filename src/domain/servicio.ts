import { Mascota } from './mascota';
import { IonDatetime } from '@ionic/angular';

export class Servicio {

    idServicio: number;
    idPerro: number;
    activo: string;
    fechaRealizacion: Date;
    horario: string;
    pago: string;
    calificacionDuenio: string;
    calificacionPrestador: string;
    tipoServicio: string;
    latitudDuenio: string;
    longitudDuenio: string;
    latitudPrestador: string;
    longitudPrestador: string;


    static fromJson(servicioJSON): Servicio {
        return Object.assign(new Servicio(), servicioJSON);
    }

    constructor(_idServicio?: number, _idPerro?: number, _activo?: string, _tipoServicio?: string, _pago?: string,
        _fechaRealizacion?: Date, _horario?: string, _calificacionDuenio?: string, _calificacionPrestador?: string,
        _latitudDuenio?: string, _longitudDuenio?: string, _latitudPrestador?: string, _longitudPrestador?: string) {
            this.idServicio = _idServicio;
            this.idPerro = _idPerro;
            this.activo = _activo;
            this.fechaRealizacion = _fechaRealizacion;
            this.horario = _horario;
            this.pago = _pago;
            this.calificacionDuenio = _calificacionDuenio;
            this.calificacionPrestador = _calificacionPrestador;
            this.tipoServicio = _tipoServicio;
            this.latitudDuenio = _latitudDuenio;
            this.longitudDuenio = _longitudDuenio;
            this.latitudPrestador = _latitudPrestador;
            this.longitudPrestador = _longitudPrestador;
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaRealizacion);
        const newDateHoras = new Date(this.horario);
        console.log(newDate);
        return {
            ...this,
            horario: this.dosDigitosHora(newDateHoras) + ':' + this.dosDigitosMinutos(newDateHoras) + ':00',
            fechaRealizacion: this.dosDigitosDia(newDate) + '/' +
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
