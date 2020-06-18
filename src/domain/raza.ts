export class Raza {

    idRaza: number;
    nombre: string;

    static fromJson(razaJSON): Raza {
        return Object.assign(new Raza(), razaJSON);
    }

    constructor(_idRaza?: number, _nombre?: string) {
        this.idRaza = _idRaza;
        this.nombre = _nombre;

    }

}
