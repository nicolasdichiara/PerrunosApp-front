export class Perfil {

    idPerfil: number;
    nombrePerfil: string;

    static fromJson(razaJSON): Perfil {
        return Object.assign(new Perfil(), razaJSON);
    }

    constructor(_idPerfil?: number, _nombre?: string) {
        this.idPerfil = _idPerfil;
        this.nombrePerfil = _nombre;

    }

}