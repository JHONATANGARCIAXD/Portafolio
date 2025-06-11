
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
const Modal_Eliminar = document.getElementById("staticeliminar")
const Confirmar_Eliminar = document.getElementById("eliminar")
const ContCitas = document.getElementById("cont_citas")
const BtnGuardar = document.getElementById("guardar")

// VARIALES GLOBALES
let validacion = false
let CitasTotales = JSON.parse(localStorage.getItem("Citas")) || [];
console.log(CitasTotales);
let op = 0
let pos = 0

// VALIDACIONES 
const Validaciones = () => {
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
    else if (Fecha.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO FECHA"
        })
    }
    else if (Hora.value == "") {
        Swal.fire({
            icon: "warning",
            title: "CAMPO VACIO",
            text: "POR FAVOR COMPLETA EL CAMPO HORA"
        })
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
    } else {
        validacion = true
    }
}

// GUARDAR LA CITA EN EL LOCALSTORAGE
const Guardar = () => {
    console.log(pos, op);
    Validaciones()
    if (op == 0) {
        if (validacion) {
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
            Filtrar()
            limpiar()

            Swal.fire({
                icon: "success",
                title: "CITA CREADA CON EXITO"
            })

            document.querySelector('#staticBackdrop [data-bs-dismiss="modal"]').click()

        }
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


        BtnGuardar.textContent = "Guardar"
        localStorage.setItem("Citas", JSON.stringify(CitasTotales));
        Filtrar()
        limpiar()
        op = 0

        Swal.fire({
            icon: "success",
            title: "CITA EDITADA CON EXITO"
        })

        document.querySelector('#staticBackdrop [data-bs-dismiss="modal"]').click()
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
    if (CitasAMostrar.length == 0) {
        ContCitas.textContent = "NO HAY CITAS PROGRAMADAS";
        return;
    } else {
        ContCitas.innerHTML = "";
        CitasAMostrar.sort((a, b) => a < b ? -1 : 1)
        CitasAMostrar.forEach((elemento) => {
            ContCitas.innerHTML += `
                <div class="CardCita">
                    <h3>${elemento.Numero}</h3>
                    <h1>${elemento.NombreMascota}</h1>
                    <p>Propietario: ${elemento.Propietario}</p>
                    <p>Telefono: ${elemento.Telefono}</p>
                    <p>Fecha: ${elemento.Fecha}</p>
                    <p>Hora: ${elemento.Hora}</p>
                    <p>Sintomas: ${elemento.Sintomas}</p>
                    <select class="form-select" name="select_estado">
                        <option value="Abierta">Abierta</option>
                        <option value="Terminada">Terminada</option>
                        <option value="Anulada">Anulada</option>
                    </select>
                    <div>
                        <button name="editar">📝</button>
                        <button name="eliminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">❌</button>
                    </div>
                </div>
            `;
        });

        const selects = ContCitas.querySelectorAll("select[name='select_estado']");
        const botonesEliminar = ContCitas.querySelectorAll("button[name='eliminar']");
        const botonesEditar = ContCitas.querySelectorAll("button[name='editar']");

        selects.forEach((select, i) => {
            select.value = CitasAMostrar[i].Estado;

            select.addEventListener("change", () => {
                CitasTotales[i].Estado = select.value;
                localStorage.setItem("Citas", JSON.stringify(CitasTotales));
                Filtrar();

            });
        });

        botonesEditar.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                BtnGuardar.textContent = "Editar";
                op = 1;
                pos = i
                const cita = CitasTotales[pos];
                NombreMascota.value = cita.NombreMascota;
                Propietario.value = cita.Propietario;
                Telefono.value = cita.Telefono;
                Fecha.value = cita.Fecha;
                Hora.value = cita.Hora;
                TipoMascota.value = cita.TipoMascota;
                Sintomas.value = cita.Sintomas;

                Modal_Formulario.toggle();
            });
        });

        botonesEliminar.forEach((btn, i) => {
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
                        eliminar(i)
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
};

Filtro.addEventListener("input", () => {
    Filtrar()
})


// FILTRAR LAS CITAS POR EL NOMBRE DEL PROPIETARIO
const Filtrar_Nombres = (nombres) => {
    if (nombres == "") {
        Filtrar()
    } else {
        let Citasfiltradas = CitasTotales.filter(elemento => elemento.Propietario.toUpperCase().includes(nombres.toUpperCase()) || elemento.NombreMascota.toUpperCase().includes(nombres.toUpperCase()))
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

