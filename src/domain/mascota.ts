export class Mascota {

    id: number;
    nombre: string;
    cuidadosEsp: string;
    descripcion: string;
    enfermedadesPrev: string;
    fechaNacimiento: Date;
    desparasitado: number;
    paseoAlgunaVez: number;
    paseoConPaseadores: number;
    interactua: number;

    static fromJson(individuoJSON): Mascota {
        return Object.assign(new Mascota(), individuoJSON);
    }

    constructor(_id?: number, _nombre?: string, _cuidadosEsp?: string, _descripcion?: string, _enfermedadesPrev?: string,
         _fechaNacimiento?: Date, _desparasitado?: number, _paseoAlgunaVez?: number, _paseoConPaseadores?: number, _interactua?: number) {
      this.nombre = _nombre;
      this.cuidadosEsp = _cuidadosEsp;
      this.descripcion = _descripcion;
      this.enfermedadesPrev = _enfermedadesPrev;
      this.fechaNacimiento = _fechaNacimiento;
      this.desparasitado = _desparasitado;
      this.paseoAlgunaVez = _paseoAlgunaVez;
      this.paseoConPaseadores = _paseoConPaseadores;
      this.interactua = _interactua;

    }

}