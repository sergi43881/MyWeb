/*
    Pagina blog
*/

window.onload = function() {
    checkCookie();
    esborra();
};

// Cookies
function checkCookie() {
    let visita = getCookie("visitado");
    if (visita == "") {
        $("#window-notice").addClass("window-notice"); 
        $("#entro").show();
    }
    else {
        $("#window-notice").hide(); 
        let logueado = getCookie("logueado");
        if (logueado == "si")
            $("#salgo").show();
        else {
            $("#entro").show();
        }    
    }   
}
function checkLogin() {
    let visita = getCookie("visitado");
    if (visita == "") {
        $("#window-notice").addClass("window-notice"); 
    }
}
function veurecookies() {
    visita = "si";
    setCookie("visitado", visita, 20);
    setCookie("logueado", "no", 20);
    $("#window-notice").hide(); 
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Inicializa formulario y oculta pantalla login
function esborra() {
    inierr();
    document.getElementById("blogform").reset(); 
    document.getElementById("login_form").reset();      // inicializa formulario login
    $('#comentarios').text("");
    $("#login_notice").hide();                          // oculta pantalla login
}

// Añade comentario al contenedor
function mascoment() {
    var textox = tinymce.get('mensaje').getContent();
    if (textox == "") {
        $("#mensaje").addClass("errortexto");                        // Atributos error texto
        $("#mensaje").focus();                                      // Posiciona en texto
        $("#errortexto").show();  
    }
    else {
        $("#mensaje").removeClass("errortexto");                    // Atributos error text                                 // Posiciona en texto
        $("#errortexto").hide();  
    }    
    $("#comentarios").append(textox);
}

// Inicializa campos error.
function inierr() {
    $("#errortexto").hide();
    $("#erroruser").hide();                             // oculta error login-usuario
    $("#errorpass").hide();                             // oculta error login-pass
    $("#user").removeClass("erroruser");                // quita borde rojo login-nombre
    $("#pass").removeClass("errorpass");                // quita borde rojo login-email
    verror = false;                                     // variable control errores
}

function log_in() {
    inierr();
    $("#login_notice").addClass("login_notice");
    $("#login_notice").show(); 
}

function log_out() {
    inierr();
    setCookie("logueado", "no", 20);
    $("#salgo").hide();
    $("#entro").show();
}

function login_cancela() {
    $("#login_notice").removeClass("login_notice");
    $("#login_notice").hide (); 
}
function login_valida() {

    inierr(); // inicializa errores

    if (document.getElementById("pass").value == "") {
        $("#pass").addClass("errorpass");                  // Atributos error pass
        $("#pass").focus();                                // Posiciona en pass
        $("#errorpass").show();                            // Muestra error pass
        verror = true;
    }
    if (document.getElementById("user").value == "") {
        $("#user").addClass("erroruser");                  // Atributos error user
        $("#user").focus();                                // Posiciona en user
        $("#erroruser").show();                            // Muestra error user
        verror = true;
    }
    if (verror == false) {
        $("#login_notice").removeClass("login_notice");
        $("#login_notice").hide (); 
        $("#entro").hide();
        $("#salgo").show();
        setCookie("logueado", "si", 20);                    // cambia cookie logueado SI
        document.getElementById("login_form").reset();      // inicializa formulario login
    }
}
