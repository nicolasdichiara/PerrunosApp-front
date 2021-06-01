export class TipoServicio {

    idTipoServicio: number;
    nombre: string;
    precioStandard: number;

    static fromJson(tipoServicioJSON): TipoServicio {
        return Object.assign(new TipoServicio(), tipoServicioJSON);
    }

    constructor(_idRaza?: number, _nombre?: string, _precioStandard?: number) {
        this.idTipoServicio = _idRaza;
        this.nombre = _nombre;
        this.precioStandard = _precioStandard;
    }
}