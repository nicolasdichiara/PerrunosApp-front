export class Promocion {

    idPromocion: number;
    imagenPromo: string
    fechaVigencia: Date
    activa: string
    detalle: string
    cantidadPaseos: number

    static fromJson(razaJSON): Promocion {
        return Object.assign(new Promocion(), razaJSON);
    }

    constructor(_idPromocion?: number, _imagenPromo?: string, _fechaVigencia?: Date, _activa?: string, _detalle?: string,
        _cantidadPaseos?: number) {
        this.idPromocion = _idPromocion;
        this.imagenPromo = _imagenPromo
        this.fechaVigencia = _fechaVigencia
        this.activa = _activa
        this.detalle = _detalle;
        this.cantidadPaseos = _cantidadPaseos
    }

    toJSON(): any {
        // console.log(this);
        const newDate = new Date(this.fechaVigencia);
        console.log(newDate);
        return {
            ...this,
            fechaVigencia: this.dosDigitosDia(newDate) + '/' +
                this.dosDigitosMes(newDate) + '/' + newDate.getFullYear()
        };
    }

    dosDigitosMes(fecha: Date) {
        return ('0' + (fecha.getMonth() + 1)).slice(-2);
    }

    dosDigitosDia(fecha: Date) {
        return ('0' + fecha.getDate()).slice(-2);
    }

    dosDigitosHora(fecha: Date) {
        return ('0' + fecha.getHours()).slice(-2);
    }

    dosDigitosMinutos(fecha: Date) {
        return ('0' + fecha.getMinutes()).slice(-2);
    }

}
