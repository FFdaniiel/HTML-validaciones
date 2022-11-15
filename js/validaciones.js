export function valida(input) {
    const tipoDeInput= input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML =''
    }else{
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput,input)

    }
}


const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]


const mensajeDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio',
    },
    email: {
        valueMissing: 'El campo correo no puede estar vacio',
        typeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: 'El campo nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe contener entre 4 a 30 caracteres.',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El estado debe contener entre 4 a 30 caracteres.',
    },

};


function mostrarMensajeDeError (tipoDeInput , input) {
    let mensaje = ''
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error)
            console.log(input.validity[error])
            console.log(mensajeDeError[tipoDeInput][error])
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}
const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);
    let mensaje =""
    if(!mayorDeEdad(fechaCliente)){
        mensaje ='Debes tener al menos 18 años de edad'
    };

    input.setCustomValidity(mensaje) //mensajes editables
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}