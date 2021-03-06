import { Raza } from './raza';

export class Mascota {
    //se declaran los mismos nombres que hay en el back
    idPerro: number;
    nombre: string;
    cuidadosEspeciales: string;
    descripcion: string;
    enfermedadesPrevias: string;
    fechaNacimiento: Date;
    desparasitado: boolean;
    paseoAlgunaVez: boolean;
    imagenLibretaVacunacion: string;
    imagen: string;
    paseoConUnPaseador: boolean;
    paseaFrecuente: boolean;
    paseoConOtrosPerros: boolean;
    raza: Raza;
    poseeLibretaSanitaria: boolean;
    vacunaDeLaRabia: boolean;
    vacunaSextuple: boolean
    sexo: string


    static fromJson(individuoJSON): Mascota {
        return Object.assign(new Mascota(), individuoJSON, {
            raza: Raza.fromJson(individuoJSON.raza)
        });
    }
    //el constructor lo armas como quieras pero cuando lo invocas, se declaran los mismos nombres que hay en el back
    constructor(_idPerro?: number, _nombre?: string, _cuidadosEsp?: string, _descripcion?: string, _enfermedadesPrev?: string, _imagenLibretaVacunacion?: string, _imagen?: string,
        _paseoConOtrosPerros?: boolean, _fechaNacimiento?: Date, _desparasitado?: boolean, _paseoAlgunaVez?: boolean, _paseoConUnPaseador?: boolean, _paseaFrecuente?: boolean, _raza?: Raza,
        _poseeLibretaSanitaria?: boolean, _vacunaDeLaRabia?: boolean, _vacunaSextuple?: boolean, _sexo?: string) {
        this.idPerro = _idPerro;
        this.nombre = _nombre;
        this.cuidadosEspeciales = _cuidadosEsp;
        this.descripcion = _descripcion;
        this.enfermedadesPrevias = _enfermedadesPrev;
        this.imagenLibretaVacunacion = _imagenLibretaVacunacion;
        this.imagen = _imagen;
        this.paseoConOtrosPerros = _paseoConOtrosPerros;
        this.fechaNacimiento = _fechaNacimiento;
        this.desparasitado = _desparasitado;
        this.paseoAlgunaVez = _paseoAlgunaVez;
        this.paseoConUnPaseador = _paseoConUnPaseador;
        this.paseaFrecuente = _paseaFrecuente;
        this.raza = _raza;
        this.poseeLibretaSanitaria = _poseeLibretaSanitaria;
        this.vacunaDeLaRabia = _vacunaDeLaRabia;
        this.vacunaSextuple = _vacunaSextuple
        this.sexo = _sexo
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaNacimiento);
        console.log(newDate);
        return {
            ...this,
            // desparasitado: this.desparasitado == 1 ? 'true' : 'false',
            // paseaFrecuente: this.paseaFrecuente == 1 ? 'true' : 'false',
            // paseoAlgunaVez: this.paseoAlgunaVez == 1 ? 'true' : 'false',
            // paseoConUnPaseador: this.paseoConUnPaseador == 1 ? 'true' : 'false',
            // paseoConOtrosPerros: this.paseoConOtrosPerros == 1 ? 'true' : 'false',
            fechaNacimiento: this.dosDigitosDia(newDate) + '/' +
                this.dosDigitosMes(newDate) + '/' + newDate.getFullYear()
        };
    }

    dosDigitosMes(fecha: Date) {
        return ('0' + (fecha.getMonth() + 1)).slice(-2);
    }

    dosDigitosDia(fecha: Date) {
        return ('0' + fecha.getDate()).slice(-2);
    }

    muestroImagen() {
        if (this.imagen == null) {
            return "../../assets/img/" + this.raza.nombre + ".jpg"
        } else {
            return this.imagen
        }
    }

}
