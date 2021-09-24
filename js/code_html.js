/*
    Validacion formulario.
*/
// variables generales 
verror = false;
var mapa;

window.onload = function() {
    checkCookie();
    esborra();
    initialize();
    google.maps.event.addDomListener(window, "load", initialize);
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

// Ubicacion

function initialize() {
		// las coordenadas de Barcelona		
		var ubicacion = new google.maps.LatLng(41.216488, 1.727132)
	
		var opcionesDeMapa = {
				zoom: 17    ,
				center: ubicacion,
				mapTypeId: google.maps.MapTypeId.ROADMAP //SATELITE, HYBRID, ROADMAP, TERRAIN
		};
		// instancia un nuevo objeto Map
		mapa = new google.maps.Map(document.getElementById("mapa"), opcionesDeMapa);										
		// instancia un nuevo marcador ( la chincheta )
		var bandera = "images/bandera1.png";
		var marker = new google.maps.Marker({
				position: ubicacion,
				map: mapa,
				title: "Offing Web Solutions",
				icon: bandera
		});		
}

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

// Inicializa formulario y oculta pantalla login
function esborra() {
    inierr();
    document.getElementById("contactform").reset();     // inicializa formulario
    document.getElementById("login_form").reset();      // inicializa formulario login
    $("#login_notice").hide();                          // oculta pantalla login
}
// Inicializa campos error.
function inierr() {
    $("#errornombre").hide();                           // oculta error nombre
    $("#erroremail").hide();                            // oculta error email
    $("#errortelef").hide();                            // oculta error telefon
    $("#nombre").removeClass("textoerror");             // quita borde rojo nombre
    $("#email").removeClass("textoerror");              // quita borde rojo email
    $("#telef").removeClass("textoerror");              // quita borde rojo telef
    $("#erroruser").hide();                             // oculta error login-usuario
    $("#errorpass").hide();                             // oculta error login-pass
    $("#user").removeClass("textoerror");               // quita borde rojo login-nombre
    $("#pass").removeClass("textoerror");               // quita borde rojo login-email
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
        $("#pass").addClass("textoerror");                  // Atributos error pass
        $("#pass").focus();                                // Posiciona en pass
        $("#errorpass").show();                            // Muestra error pass
        verror = true;
    }
    if (document.getElementById("user").value == "") {
        $("#user").addClass("textoerror");                  // Atributos error user
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