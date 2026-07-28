import { EventEmitter } from 'events';

interface ReporteVecinal {
    ubicacion: string;
    tipoIncidente: 'Sospechoso' | 'Emergencia' | 'Accidente' | 'Incidencia';
    descripcion: string;
    urgencia: 'Alta' | 'Media' | 'Baja';
}

class CentralVecinal extends EventEmitter {

    public reportarIncidente(
        ubicacion: string,
        tipoIncidente: 'Sospechoso' | 'Emergencia' | 'Accidente' | 'Incidencia',
        descripcion: string,
        urgencia: 'Alta' | 'Media' | 'Baja') {

        const reporte: ReporteVecinal = {
            ubicacion,
            tipoIncidente,
            descripcion,
            urgencia
        }

        console.log(`\nCentralVecinal: ¡ALERTA VECINAL! ${ubicacion} - ${tipoIncidente} - Urgencia: ${urgencia}`)

        this.emit('alertaVecinal', reporte);
    }
}

class PatrullaSpiderMan {
    public movilizarEquipo(incidente: ReporteVecinal): void {
        console.log((incidente.urgencia == "Alta") ?
            "Movilizando equipo completo con Spider-Man" :
            "Enviando patrulla de reconocimiento");
    }
}

class AmbulanciaComunitaria {
    public enviarEmergencia(incidente: ReporteVecinal): void {
        if (incidente.tipoIncidente == "Emergencia" || incidente.tipoIncidente == "Accidente") console.log(`Unidad médica en camino a ${incidente.ubicacion}`);
    }
}

class VecinosVigilantes {
    public activarVigilancia(incidente: ReporteVecinal): void {
        console.log(`Vecinos alertados en ${incidente.ubicacion} - Mantener vigilancia`)
    }
}

class ConsejoDelBarrio {
    public evaluarIncidente(incidente: ReporteVecinal): void {
        console.log((incidente.urgencia !== "Baja") ?
            "Convocando reunión de emergencia" :
            "Registrando incidente para informe mensual");
    }
}

const central = new CentralVecinal(),
    spidey = new PatrullaSpiderMan(),
    ambulanciaComunitaria = new AmbulanciaComunitaria(),
    vecinosVigilantes = new VecinosVigilantes(),
    consejoDelBarrio = new ConsejoDelBarrio()


central.on("alertaVecinal", (reporte: ReporteVecinal) => spidey.movilizarEquipo(reporte));

central.on("alertaVecinal", (reporte: ReporteVecinal) => ambulanciaComunitaria.enviarEmergencia(reporte));

central.on("alertaVecinal", (reporte: ReporteVecinal) => vecinosVigilantes.activarVigilancia(reporte));

central.on("alertaVecinal", (reporte: ReporteVecinal) => consejoDelBarrio.evaluarIncidente(reporte));

central.reportarIncidente("Sospechoso en Calle 23 ", 'Sospechoso', 'Hombre sospechoso merodeando', "Alta");
central.reportarIncidente("Accidente en Avenida 7", "Accidente", "Colisión entre dos vehículos", "Media")
central.reportarIncidente("Incidencia menor en Parque Central", "Incidencia", "Basura acumulada", "Baja")