const imagenes = [
    { name: "perro", url: "./img/perro.png" },
    { name: "gato", url: "./img/gato.png" },
    { name: "elefante", url: "./img/elefante.png" },
    { name: "tigre", url: "./img/tigre.png" },
    { name: "leon", url: "./img/leon.png" },
    { name: "jirafa", url: "./img/jirafa.png" },
    { name: "oso", url: "./img/oso.png" },
    { name: "canguro", url: "./img/canguro.png" },
    { name: "lobo", url: "./img/lobo.png" },
    { name: "aguila", url: "./img/aguila.png" }
];
// FORMULARIO
const NombreMascota = document.getElementById("nombremascota")
const Propietario = document.getElementById("propietario")
const Telefono = document.getElementById("telefono")
const Fecha = document.getElementById("fecha")
const Hora = document.getElementById("hora")
const TipoMascota = document.getElementById("tipo_mascota")
const Sintomas = document.getElementById("sintomas")
const Estado = document.getElementById("estado")
const Filtro = document.getElementById("filtro")
const Search = document.getElementById("search")
const Modal_Formulario = new bootstrap.Modal(document.getElementById("staticBackdrop"))
const LabelModal = document.getElementById("staticBackdropLabel")
const ContCitas = document.getElementById("cont_citas")
const BtnGuardar = document.getElementById("guardar")
const numero_abiertas = document.getElementById("citas_abiertas")

// VARIALES GLOBALES
let validacion = false
let CitasTotales = JSON.parse(localStorage.getItem("Citas")) || [];
console.log(CitasTotales);
let op = 0
let pos

// VALIDACIONES 
const Validaciones = () => {
    let fecha_hoy = new Date()
    let solo_fecha = fecha_hoy.toISOString().split("T")[0]
    let hora_hot = fecha_hoy.toLocaleTimeString()
    console.log(hora_hot.split(":")[0]);


    let h = Hora.value.split(":")[0]
    let m = Hora.value.split(":")[1]
    if (NombreMascota.value == "") {
        Swal.fire({
            title: "CAMPO VACIO",
            icon: "warning",
            text: "POR FAVOR COMPLETA EL CAMPO NOMBRE MASCOTA"
        })
    }
    else if (Propietario.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO PROPIETARIO"
        })
    }
    else if (Telefono.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO TELEFONO"
        })
    }
    else if (/[a-zA-Z]/.test(Telefono.value)) {
        Swal.fire({
            icon: "warning",
            title: "VALOR DEL CAMPO INCORRECTO",
            text: "EL CAMBO TELEFONO SOLO DEBE TENER NUMEROS"
        })
    }
    else if (Telefono.value.length < 10) {
        Swal.fire({
            icon: "warning",
            title: "VALOR DEL CAMPO INCORRECTO",
            text: "EL CAMBO TELEFONO DEBE TENER MINIMO 10 DIGITOS"
        })
    }
    else if (Fecha.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO FECHA"
        })
    }
    else if (Fecha.value <= solo_fecha) {
        Swal.fire({
            icon: "warning",
            title: "ERROR DE VALORES",
            text: `POR FAVOR PONGA UNA FECHA SUPERIOR`
        })
    }
    else if (Hora.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO HORA"
        })
    }
    else if (h < 8 || h > 20 || (h == 20 && m > 0)) {
        Swal.fire({
            icon: "warning",
            title: "HORARIO INVÁLIDO",
            text: "POR FAVOR CAMBIA LA HORA, LA VETERINARIA ATIENDE DE 8:00 AM A 8:00 PM"
        });
    }
    else if (TipoMascota.value == "Seleccione Uno") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO TIPO MASCOTA"
        })
    }
    else if (Sintomas.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL SINTOMAS"
        })
    }
    else {
        validacion = true
        console.log(Hora.value);

    }
}
// GUARDAR LA CITA EN EL LOCALSTORAGE
const Guardar = () => {
    Validaciones()
    if (validacion) {
        if (op == 0) {
            let numero_cita = Math.floor((new Date() * Math.random()))
            let cita = {
                NombreMascota: NombreMascota.value,
                Propietario: Propietario.value,
                Telefono: Telefono.value,
                Fecha: Fecha.value,
                Hora: Hora.value,
                TipoMascota: TipoMascota.value,
                Sintomas: Sintomas.value,
                Estado: "Abierta",
                Numero: numero_cita
            }
            CitasTotales.unshift(cita)
            localStorage.setItem("Citas", JSON.stringify(CitasTotales))
            Swal.fire({
                icon: "success",
                title: "CITA CREADA CON EXITO"
            })

            validacion = false
            document.querySelector('#staticBackdrop [data-bs-dismiss="modal"]').click()
            Filtrar()
            limpiar()

        }
        else if (op == 1) {
            console.log(pos);
            CitasTotales[pos].NombreMascota = NombreMascota.value
            CitasTotales[pos].Propietario = Propietario.value
            CitasTotales[pos].Telefono = Telefono.value
            CitasTotales[pos].Fecha = Fecha.value
            CitasTotales[pos].Hora = Hora.value
            CitasTotales[pos].TipoMascota = TipoMascota.value
            CitasTotales[pos].Sintomas = Sintomas.value

            console.log(`ELEMENTO A MODIFICAR: ${CitasTotales[pos]}, POSICION: ${pos}`);

            localStorage.setItem("Citas", JSON.stringify(CitasTotales));
            Filtrar()
            limpiar()
            BtnGuardar.textContent = "Guardar"
            LabelModal.textContent = "REGISTRAR CITA"
            op = 0

            Swal.fire({
                icon: "success",
                title: "CITA EDITADA CON EXITO"
            })

            document.querySelector('#staticBackdrop [data-bs-dismiss="modal"]').click()
            validacion = false

        }
    }



}

BtnGuardar.addEventListener("click", () => {
    Guardar()
})


// LIMPIAR EL FORMULARIO
const limpiar = () => {
    NombreMascota.value = ""
    Propietario.value = ""
    Telefono.value = ""
    Fecha.value = ""
    Hora.value = ""
    TipoMascota.value = "Seleccione Uno"
    Sintomas.value = ""
}



// ELIMINAR X CITA
const eliminar = (indexeliminar) => {
    CitasTotales.splice(indexeliminar, 1)
    console.log(indexeliminar);
    localStorage.setItem("Citas", JSON.stringify(CitasTotales));
    Filtrar()
    if (CitasTotales.length == 0) {
        localStorage.removeItem("Citas")
    }

}


// MOSTRAR EN PANTALLA LAS CITAS
const PintarCita = (CitasAMostrar) => {
    ContCitas.textContent = ""
    if (CitasAMostrar.length == 0) {
        document.getElementById("texto").textContent = "NO HAY CITAS PROGRAMADAS"
        return;
    } else {
        document.getElementById("texto").textContent = "CITAS PROGRAMADAS"
        ContCitas.innerHTML = "";
        CitasAMostrar.sort((a, b) => a.Hora < b.Hora ? -1 : 1)
        CitasAMostrar.sort((a, b) => a.Fecha < b.Fecha ? -1 : 1)
        CitasAMostrar.forEach((elemento) => {
            let url2 = imagenes.find((imagen) => { return imagen.name == elemento.TipoMascota })
            ContCitas.innerHTML += `
                <div class="CardCita">
                    <div class="contenido_cita">
                        <h3 class="numero_cita">#${elemento.Numero}</h3>
                        <div class="cont_img_nombre">
                        <h2>${elemento.NombreMascota}</h2>
                        <img src = ${url2.url} class="img_animal">
                        </div>
                        <div class="info_conte">
                            <p> <i class="bi bi-person-fill"></i> <span class="negrilla">Propietario: </span> ${elemento.Propietario.toUpperCase()}</p>
                            <p> <i class="bi bi-telephone-fill"></i> <span class="negrilla">Telefono: </span> ${elemento.Telefono}</p>
                            <p> <i class="bi bi-calendar2-week-fill"></i> <span class="negrilla">Fecha: </span> ${elemento.Fecha}</p>
                            <p> <i class="bi bi-clock-fill"></i> <span class="negrilla">Hora: </span>${elemento.Hora}</p>
                            <p> <i class="bi bi-clipboard2-heart-fill"></i>  <span class="negrilla">Sintomas: </span> ${elemento.Sintomas}</p>
                        </div>
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select class="form-select" name="select_estado">
                            <option value="Abierta">Abierta</option>
                            <option value="Terminada">Terminada</option>
                            <option value="Anulada">Anulada</option>
                        </select>
                    </div>
                    <div class="cont_buttons">
                        <button name="editar">Editar</button>
                        <button name="eliminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Eliminar</button>
                    </div>
                </div>
            `;
        });

        const selects = ContCitas.querySelectorAll("select[name='select_estado']");
        const botonesEliminar = ContCitas.querySelectorAll("button[name='eliminar']");
        const botonesEditar = ContCitas.querySelectorAll("button[name='editar']");

        selects.forEach((select, i) => {
            const numeroCita = CitasAMostrar[i].Numero;
            const index = CitasTotales.findIndex(cita => cita.Numero === numeroCita);
            select.value = CitasAMostrar[i].Estado;
            select.addEventListener("change", () => {
                console.log(index);
                CitasTotales[index].Estado = select.value;
                localStorage.setItem("Citas", JSON.stringify(CitasTotales));
                Filtrar();
            });
        });

        botonesEditar.forEach((btn, i) => {
            const numeroCita = CitasAMostrar[i].Numero;
            const index = CitasTotales.findIndex(cita => cita.Numero === numeroCita);
            btn.addEventListener("click", () => {
                BtnGuardar.textContent = "Editar";
                LabelModal.textContent = "EDITAR CITA"
                op = 1;
                pos = index
                NombreMascota.value = CitasTotales[index].NombreMascota;
                Propietario.value = CitasTotales[index].Propietario;
                Telefono.value = CitasTotales[index].Telefono;
                Fecha.value = CitasTotales[index].Fecha;
                Hora.value = CitasTotales[index].Hora;
                TipoMascota.value = CitasTotales[index].TipoMascota;
                Sintomas.value = CitasTotales[index].Sintomas;

                Modal_Formulario.toggle();
            });
        });

        botonesEliminar.forEach((btn, i) => {
            const numeroCita = CitasAMostrar[i].Numero;
            const index = CitasTotales.findIndex(cita => cita.Numero === numeroCita);
            btn.addEventListener("click", () => {
                Swal.fire({
                    title: "ESTAS SEGURO DE ELIMINAR LA CITA?",
                    text: "NO PUEDES REVERTIR ESTO",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "SI"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(index)
                        Swal.fire({
                            title: "ELIMINADA!",
                            text: "LA CITA HA SIDO ELIMINADA.",
                            icon: "success"
                        });
                    }
                });
            });
        });
    }
};


// FILTRAR LAS CITAS POR UN ESTADO
const Filtrar = () => {
    const estadoSeleccionado = Filtro.value;
    const CitasFiltrada = CitasTotales.filter(cita => cita.Estado == estadoSeleccionado);
    PintarCita(CitasFiltrada);
    return CitasFiltrada
};

Filtro.addEventListener("input", () => {
    Filtrar()
})


// FILTRAR LAS CITAS POR EL NOMBRE DEL PROPIETARIO
const Filtrar_Nombres = (nombres) => {
    if (nombres == "") {
        Filtrar()
    } else {
        let citas = Filtrar()
        let Citasfiltradas = citas.filter(elemento => elemento.Propietario.toUpperCase().includes(nombres.toUpperCase()) || elemento.NombreMascota.toUpperCase().includes(nombres.toUpperCase()))
        PintarCita(Citasfiltradas);
    }
}

Search.addEventListener("input", () => {
    Filtrar_Nombres(Search.value)
})



document.getElementById("cerrar").addEventListener("click", () => {
    limpiar()
    BtnGuardar.textContent = "Guardar"
    op = 0
})


document.addEventListener("DOMContentLoaded", () => {
    Filtrar()
})

