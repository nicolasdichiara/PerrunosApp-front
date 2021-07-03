import { Mascota } from './mascota';
import { IonDatetime } from '@ionic/angular';
import { TipoServicio } from './tipoServicio';

export class Servicio {

    idServicio: number;
    activo: string;
    fechaRealizacion: Date;
    horarioInicio: string;
    calificacionDuenio: string;
    calificacionPrestador: string;
    tipoServicio: TipoServicio;
    latitudDuenio: string;
    longitudDuenio: string;
    latitudPrestador: string;
    longitudPrestador: string;
    idPrestador: number;
    nombrePrestador: string
    apellidoPrestador: string
    telefonoPrestador: string
    imagenPerfilPrestador: string
    emailPrestador: string
    idDuenio: number;
    nombreDuenio: string
    apellidoDuenio: string
    telefonoDuenio: string
    imagenPerfilDuenio: string
    emailDuenio: string
    precio: number


    static fromJson(servicioJSON): Servicio {
        return Object.assign(new Servicio(), servicioJSON);
    }

    constructor(_idServicio?: number, _activo?: string, _tipoServicio?: TipoServicio, _pago?: string,
        _fechaRealizacion?: Date, _horarioInicio?: string, _calificacionDuenio?: string, _calificacionPrestador?: string,
        _latitudDuenio?: string, _longitudDuenio?: string, _latitudPrestador?: string, _longitudPrestador?: string,
        _idPrestador?: number, _nombrePrestador?: string, _apellidoPrestador?: string, _telefonoPrestador?: string, 
        _imagenPerfilPrestador?: string, _emailPrestador?: string, _idDuenio?: number, _nombreDuenio?: string, _apellidoDuenio?: string,
        _telefonoDuenio?: string, _imagenPerfilDuenio?: string, _emailDuenio?: string, _precio?: number) {
        this.idServicio = _idServicio;
        this.activo = _activo;
        this.fechaRealizacion = _fechaRealizacion;
        this.horarioInicio = _horarioInicio;
        this.calificacionDuenio = _calificacionDuenio;
        this.calificacionPrestador = _calificacionPrestador;
        this.tipoServicio = _tipoServicio;
        this.latitudDuenio = _latitudDuenio;
        this.longitudDuenio = _longitudDuenio;
        this.latitudPrestador = _latitudPrestador;
        this.longitudPrestador = _longitudPrestador;
        this.idPrestador = _idPrestador;
        this.nombrePrestador = _nombrePrestador
        this.apellidoPrestador = _apellidoPrestador
        this.telefonoPrestador = _telefonoPrestador
        this.imagenPerfilPrestador = _imagenPerfilPrestador
        this.emailPrestador = _emailPrestador
        this.idDuenio = _idDuenio
        this.nombreDuenio = _nombreDuenio
        this.apellidoDuenio = _apellidoDuenio
        this.telefonoDuenio = _telefonoDuenio
        this.imagenPerfilDuenio = _imagenPerfilDuenio
        this.emailDuenio = _emailDuenio
        this.precio = _precio
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaRealizacion);
        const newDateHoras = new Date(this.horarioInicio);
        console.log(newDate);
        return {
            ...this,
            horario: this.dosDigitosHora(newDateHoras) + ':' + this.dosDigitosMinutos(newDateHoras) + ':00',
            fechaRealizacion: this.dosDigitosDia(newDate) + '/' +
                this.dosDigitosMes(newDate) + '/' + newDate.getFullYear()
        };
    }

    dosDigitosMes(fecha: Date) {
        return ('0' + (fecha.getMonth() + 1)).slice(-2);
    }

    dosDigitosDia(fecha: Date) {
        return ('0' + fecha.getDate()).slice(-2);
    }

    dosDigitosHora(fecha: Date) {
        return ('0' + fecha.getHours()).slice(-2);
    }

    dosDigitosMinutos(fecha: Date) {
        return ('0' + fecha.getMinutes()).slice(-2);
    }

}
