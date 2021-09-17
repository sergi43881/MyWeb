/*
    Validacion formulario.
*/
window.onload = function() {
    esborra();
};

// Sistema de validacion grupal. Valida campos formulario obligatorios que no esten vacios.

function valida() {

    inierr(); // inicializa errores

    if (document.getElementById("telef").value == "") {
        $("#telef").addClass("textoerror");                 // Atributos error telef
        $("#telef").focus();                                // Posiciona en telef
        $("#errortelef").show();                            // Muestra error telef
    }   
    if (document.getElementById("email").value == "") {
        $("#email").addClass("textoerror");                 // Atributos error email
        $("#email").focus();                                // Posiciona en email
        $("#erroremail").show();                            // Muestra error email
    }
    if (document.getElementById("nombre").value == "") {
        $("#nombre").addClass("textoerror");                // Atributos error nombre
        $("#nombre").focus();                               // Posiciona en nombre
        $("#errornombre").show();                           // Muestra error nombre
    }
}

// Inicializa formulario.
function esborra() {
    inierr();
    document.getElementById("contactform").reset();
}
// Inicializa campos error.
function inierr() {
    $("#errornombre").hide();                           // oculta error nombre
    $("#erroremail").hide();                            // oculta error email
    $("#errortelef").hide();                            // oculta error telefon
    $("#nombre").removeClass("textoerror");             // quita borde rojo nombre
    $("#email").removeClass("textoerror");              // quita borde rojo email
    $("#telef").removeClass("textoerror");              // quita borde rojo telef
}

/* Sistema de validacion campo a campo

function mostra() {
    var Verror = valida();
    switch (Verror) {
        case 1:
            $("#errornombre").show();  // muestra error nombre
            break;
        case 2:
            $("#erroremail").show();   // muestra error email
            break;;
        case 3:
            $("#errortelef").show();   // muestra error telef
            break;;
    }
}

// Valida campos formulario que no esten vacios.
function valida() {

    inierr(); // inicializa errores
    
    if (document.getElementById("nombre").value == "") {
        $("#nombre").addClass("textoerror");
        $("#nombre").focus();
        return 1;
    }
    if (document.getElementById("email").value == "") {
        $("#email").addClass("textoerror");
        $("#email").focus();
        return 2;
    }
    if (document.getElementById("telef").value == "") {
        $("#telef").addClass("textoerror");
        $("#telef").focus();
        return 3;
    }
    return 0;
} */