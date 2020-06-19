import { Raza } from './raza';

export class Mascota {

    idPerro: number;
    nombre: string;
    cuidadosEsp: string;
    descripcion: string;
    enfermedadesPrev: string;
    fechaNacimiento: Date;
    desparasitado: number;
    paseoAlgunaVez: number;
    imagenLibretaVacunacion: string;
    imagen: string;
    paseoConUnPaseador: number;
    paseaFrecuente: number;
    paseoConOtrosPerros: number;
    raza: Raza;

    static fromJson(individuoJSON): Mascota {
        return Object.assign(new Mascota(), individuoJSON, {
            raza: Raza.fromJson(individuoJSON.raza)
           });
    }

    constructor(_idPerro?: number, _nombre?: string, _cuidadosEsp?: string, _descripcion?: string, _enfermedadesPrev?: string, _imagenLibretaVacunacion?: string, _imagen?: string,
        _paseoConOtrosPerros?: number, _fechaNacimiento?: Date, _desparasitado?: number, _paseoAlgunaVez?: number, _paseoConUnPaseador?: number, _paseaFrecuente?: number, _raza?: Raza) {
      this.idPerro = _idPerro;
      this.nombre = _nombre;
      this.cuidadosEsp = _cuidadosEsp;
      this.descripcion = _descripcion;
      this.enfermedadesPrev = _enfermedadesPrev;
      this.imagenLibretaVacunacion = _imagenLibretaVacunacion;
      this.imagen = _imagen;
      this.paseoConOtrosPerros = _paseoConOtrosPerros;
      this.fechaNacimiento = _fechaNacimiento;
      this.desparasitado = _desparasitado;
      this.paseoAlgunaVez = _paseoAlgunaVez;
      this.paseoConUnPaseador = _paseoConUnPaseador;
      this.paseaFrecuente = _paseaFrecuente;
      this.raza = _raza;
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaNacimiento);
        console.log(newDate);
        return {
            ...this,
            fechaNacimiento: this.dosDigitosDia(newDate) + '/' +
            this.dosDigitosMes(newDate) + '/' + newDate.getFullYear()
        };
    }

    dosDigitosMes(fecha: Date){
        return ('0' + (fecha.getMonth() + 1)).slice(-2);
    }

    dosDigitosDia(fecha: Date){
        return ('0' + fecha.getDate()).slice(-2);
    }

}
