/*
    Validacion formulario.
*/
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
var mapa;
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