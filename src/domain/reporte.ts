export class Reporte {

    idReporte: number
    usuario: string
    detalle: string

    static fromJson(reporteJSON): Reporte {
        return Object.assign(new Reporte(), reporteJSON);
    }

    constructor(_idReporte?: number, _usuario?: string, _detalle?: string) {
        this.idReporte = _idReporte;
        this.usuario = _usuario;
        this.detalle = _detalle
    }
}