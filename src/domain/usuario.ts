export class Usuario {

    id: number;
    email: string;
    nombre: string;
    apellido: string;
    apodo: string;
    fechaAlta: Date;
    fechaNacimiento: Date;
    dni: string;
    telefono: string;
    direccion: string;
    tipoPerfil: string;
    imagenPerfil: string;

    static fromJson(individuoJSON): Usuario {
        return Object.assign(new Usuario(), individuoJSON);
    }

    constructor(_id?: number, _email?: string, _nombre?: string, _apellido?: string, _apodo?: string, _fechaAlta?: Date,
        _fechaNacimiento?: Date,
        _dni?: string,
        _telefono?: string,
        _direccion?: string,
        _tipoPerfil?: string, _imagenPerfil?: string) {
      this.nombre = _nombre;
      this.email = _email;
      this.apellido = _apellido;
      this.apodo = _apodo;
      this.fechaAlta = _fechaAlta;
      this.fechaNacimiento = _fechaNacimiento;
      this.dni = _dni;
      this.telefono = _telefono;
      this.direccion = _direccion;
      this.tipoPerfil = _tipoPerfil;
      this.imagenPerfil = _imagenPerfil;
    }

}