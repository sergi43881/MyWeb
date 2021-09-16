/*
    Validacion formulario.
*/
function mostra() {
    var Verror = valida();
    switch (Verror) {
        case 1:
            alert ("El campo NOMBRE no esta cumplimentado")
            break;
        case 2:
               alert ("El campo EMAIL no esta cumplimentado")
            break;;
        case 3:
            alert ("El campo TELEFON no esta cumplimentado")
            break;;
    }
}

// Valida campos formulario que no esten vacios.
function valida() {
    if (document.getElementById("nombre").value == "") {
        document.getElementById("nombre").className = "textoerror";
        document.getElementById("nombre").focus();
        return 1;
    }
    else {
        document.getElementById("nombre").className = "textobien";
    }
    if (document.getElementById("email").value == "") {
        document.getElementById("email").className = "textoerror";
        document.getElementById("email").focus();
        return 2;
    }
    else {
        document.getElementById("email").className = "textobien";
    }
    if (document.getElementById("telef").value == "") {
        document.getElementById("telef").className = "textoerror";
        document.getElementById("telef").focus();
        return 3;
    }
    else {
        document.getElementById("telef").className = "textobien";
    }
    return 0;
}

// Limpia campos formulario.
function esborra() {
    document.getElementById("email").className = "textobien";
    document.getElementById("telef").className = "textobien";
    document.getElementById("nombre").className = "textobien";
    document.getElementById("contactform").reset();
}