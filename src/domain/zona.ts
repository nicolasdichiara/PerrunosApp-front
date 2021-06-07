export class Zona {

    idZona: number;
    nombreZona: string;

    static fromJson(zonaJSON): Zona {
        return Object.assign(new Zona(), zonaJSON);
    }

    constructor(_idZona?: number, _nombreZona?: string) {
        this.idZona = _idZona;
        this.nombreZona = _nombreZona;
    }
}