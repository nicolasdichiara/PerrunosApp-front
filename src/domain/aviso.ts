import { Mascota } from './mascota';
import { IonDatetime } from '@ionic/angular';
import { Zona } from './zona';
import { TipoServicio } from './tipoServicio';
import { Usuario } from './usuario';

export class Aviso {

    id: number;
    tipoServicio: TipoServicio;
    fechaPublicacion: string;
    detalle: string;
    horario: string;
    precio: number;
    zona: Zona;
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
    idUsuario: number
    nombre: string
    apellido: string
    telefono: string
    tipoPerfil: string
    calificacion: number
    imagenPerfil: string;

    static fromJson(avisoJSON): Aviso {
        return Object.assign(new Aviso(), avisoJSON);
    }

    constructor(_detalle?: string, _tipoServicio?: TipoServicio, _horario?: string, _precio?: number, _idZona?: Zona,
        _lunes?: boolean, _martes?: boolean, _miercoles?: boolean, _jueves?: boolean, _viernes?: boolean, _sabado?: boolean,
        _domingo?: boolean, _idUsuario?:number, _nombre?: string, _apellido?: string, _telefono?: string, _tipoPerfil?: string, _calificacion?: number) {
        this.detalle = _detalle;
        this.tipoServicio = _tipoServicio;
        this.horario = _horario;
        this.precio = _precio;
        this.zona = _idZona
        this.lunes = _lunes
        this.martes = _martes
        this.miercoles = _miercoles
        this.jueves = _jueves
        this.viernes = _viernes
        this.sabado = _sabado
        this.domingo = _domingo
        this.idUsuario = _idUsuario
        this.nombre = _nombre
        this.apellido = _apellido
        this.telefono = _telefono
        this.tipoPerfil = _tipoPerfil
        this.calificacion = _calificacion
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaPublicacion);
        console.log(newDate);
        return {
            ...this,
            fecha: this.dosDigitosDia(newDate) + '/' +
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

    get calificacionFormat(){
        return this.calificacion.toFixed(2)
    }

}
