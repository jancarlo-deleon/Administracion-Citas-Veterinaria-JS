import { citaObj,editando } from "./variables.js";
import AdminCitas from "./clases/AdminCitas.js";
import Notificacion from "./clases/Notificacion.js";
import { formulario,formularioInput,pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput } from "./selectores.js";

const citas = new AdminCitas();

//Funciones
export function datosCita(e) {

    citaObj[e.target.name] = e.target.value

}

export function submitCita(e) {

    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === "")) {

        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: "error"
        });

        return;
    }

    if (editando.value) {
        citas.editar({...citaObj});

        new Notificacion({
            texto: "Actualizado Correctamente",
            tipo: "exito"
        });

    } else {
        citas.agregar({ ...citaObj });

        new Notificacion({
            texto: "Paciente Registrado",
            tipo: "exito"
        });
    }

    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = "Registrar Paciente";
    editando.value = false;

}

export function reiniciarObjetoCita() {

    Object.assign(citaObj, {
        id: generarId(),
        paciente: "",
        propietario: "",
        email: "",
        fecha: "",
        sintomas: ""

    });

}

export function generarId() {

    return Math.random().toString(36).substring(2) + Date.now();

}

export function cargarEdicion(cita) {

    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;
    formularioInput.value = "Actualizar Información";

}