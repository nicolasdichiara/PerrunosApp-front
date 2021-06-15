export class Reporte {

    idReporte: number
    usuario: string
    detalle: string
    nombre: string
    apellido: string
    email: string

    static fromJson(reporteJSON): Reporte {
        return Object.assign(new Reporte(), reporteJSON);
    }

    constructor(_idReporte?: number, _usuario?: string, _detalle?: string, _nombre?: string, _apellido?: string, _email?: string) {
        this.idReporte = _idReporte;
        this.usuario = _usuario;
        this.detalle = _detalle
        this.nombre = _nombre
        this.apellido = _apellido
        this.email = _email
    }
}