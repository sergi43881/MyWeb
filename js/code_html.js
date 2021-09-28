/*
    Validacion formulario.
*/
// variables generales 
verror = false;
var mapa;
let hola = "";

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
        if (logueado == "si") {
            $("#salgo").show();
            hola = getCookie("hola");
            document.getElementById("hola").innerHTML = hola;   // Mensaje bienvenida login.
            $("#hola").show();
        } else {
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
    document.getElementById("registro_form").reset();   // inicializa formulario registro
    $("#login_notice").hide();                          // oculta pantalla login
    $("#registro_notice").hide();                       // oculta pantalla registro
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
    $("#errormail").hide();                             // oculta error registro email
    $("#errorpassw").hide();                            // oculta error registro pass
    $("#errornom").hide();                              // oculta error registro nombre 
    $("#errorape").hide();                              // oculta error registro apellido 
    $("#r_ape").removeClass("textoerror");              // quita borde rojo registro apellido
    $("#r_nom").removeClass("textoerror");              // quita borde rojo registro nombre
    $("#r_pass").removeClass("textoerror");             // quita borde rojo registro pass
    $("#r_user").removeClass("textoerror");             // quita borde rojo registro email
    $("#errorconex").hide();                            // oculta error conexion BD
    $("#errorlogin01").hide();                          // oculta error usuario no valido.
    $("#errorlogin02").hide();                          // oculta error password no valida.
    $("#errorreg01").hide();                            // oculta error registro.
}

function log_in() {
    inierr();
    $("#login_notice").addClass("login_notice");
    $("#login_notice").show(); 
}

function log_out() {
    inierr();
    setCookie("logueado", "no", 20);
    hola = "";
    setCookie("hola", hola, 20);
    $("#salgo").hide();
    $("#entro").show();
    $("#hola").hide();
}

function login_cancela() {
    $("#login_notice").removeClass("login_notice");
    $("#login_notice").hide (); 
    document.getElementById("login_form").reset();      // inicializa formulario login
}

function login_valida() {

    inierr(); // inicializa errores
 
    if (document.getElementById("pass").value == "") {
        $("#pass").addClass("textoerror");                  // Atributos error pass
        $("#pass").focus();                                // Posiciona en pass
        $("#errorpass").show();                            // Muestra error pass
        verror = true;
    }
    else {
        var p_pass = document.getElementById("pass").value;
    }
    if (document.getElementById("user").value == "") {
        $("#user").addClass("textoerror");                 // Atributos error user
        $("#user").focus();                                // Posiciona en user
        $("#erroruser").show();                            // Muestra error user
        verror = true;
    }
    else {
        var p_user = document.getElementById("user").value;
    }

    if (verror == true) {
        return;
    }
    
    $.ajax({
        type: "POST",
        data: {e_user: p_user, e_pass: p_pass},
        url: '/php/valuser.php',
        success: function(data) {
            if (data.status == "error01") {
                $("#errorlogin01").show(); 
            }
            if (data.status == "error02") {
                $("#errorlogin02").show(); 
            }
            if (data.status == "ok") {
                var nombcli = (data.nomcli);
                $("#login_notice").removeClass("login_notice");
                $("#login_notice").hide (); 
                $("#entro").hide();
                $("#salgo").show();
                setCookie("logueado", "si", 20);                    // cambia cookie logueado SI
                document.getElementById("login_form").reset();      // inicializa formulario login
                hola = "Hola " + nombcli;
                setCookie("hola", hola, 20);                        // cambia cookie bienvenida user
                document.getElementById("hola").innerHTML = hola;   // Mensaje bienvenida login.
                $("#hola").show();
            }
        },
        error: function(e, msg) { // Si no ha podido conectar con el servidor 
            // Código en caso de fracaso en el envío. Muestra error conexio
            $("#errorconex").show();
            return true;
        }
    });
}

function registro() {
    $("#login_notice").removeClass("login_notice");
    $("#login_notice").hide (); 
    inierr();
    $("#registro_notice").addClass("registro_notice");
    $("#registro_notice").show();
}

function reg_cancela() {
    $("#registro_notice").removeClass("registro_notice");
    $("#registro_notice").hide (); 
    document.getElementById("registro_form").reset();    // inicializa formulario registro
}

function reg_valida() {

    inierr(); // inicializa errores

    if (document.getElementById("r_ape").value == "") {
        $("#r_ape").addClass("textoerror");                 // Atributos error apellido
        $("#r_ape").focus();                                // Posiciona en apellido
        $("#errorape").show();                              // Muestra error apellido
        verror = true;
    }
    else {
        var reg_ape = document.getElementById("r_ape").value;
    }
    if (document.getElementById("r_nom").value == "") {
        $("#r_nom").addClass("textoerror");                 // Atributos error nombre
        $("#r_nom").focus();                                // Posiciona en nombre
        $("#errornom").show();                              // Muestra error nombre
        verror = true;
    }
    else {
        var reg_nom = document.getElementById("r_nom").value;
    }
    if (document.getElementById("r_pass").value == "") {
        $("#r_pass").addClass("textoerror");                 // Atributos error pass
        $("#r_pass").focus();                                // Posiciona en pass
        $("#errorpassw").show();                              // Muestra error pass
        verror = true;
    }
    else {
        var reg_pass = document.getElementById("r_pass").value;
    }
    if (document.getElementById("r_user").value == "") {
        $("#r_user").addClass("textoerror");                 // Atributos error user
        $("#r_user").focus();                                // Posiciona en user
        $("#errormail").show();                             // Muestra error user
        verror = true;
    }
    else {
        var reg_user = document.getElementById("r_user").value;
    }
    if (verror == false) {
        $.ajax({
            type: "POST",
            data: {rp_user: reg_user, rp_pass: reg_pass, rp_nom: reg_nom, rp_ape: reg_ape},
            url: '/php/reguser.php',
            success: function(data) {
                 if (data.status == "error03") {    
                    $("#errorreg01").show(); 
                }
                if (data.status == "ok") {
                    var nombcli = reg_nom;
                    $("#login_notice").removeClass("login_notice");
                    $("#login_notice").hide (); 
                    $("#entro").hide();
                    $("#salgo").show();
                    setCookie("logueado", "si", 20);                    // cambia cookie logueado SI
                    document.getElementById("login_form").reset();      // inicializa formulario login
                    hola = "Hola " + nombcli;
                    setCookie("hola", hola, 20);                        // cambia cookie bienvenida user
                    document.getElementById("hola").innerHTML = hola;   // Mensaje bienvenida login.
                    $("#hola").show();
                    $("#registro_notice").removeClass("registro_notice");
                    $("#registro_notice").hide (); 
                    document.getElementById("registro_form").reset();    // inicializa formulario registro
                }
            },
            error: function(e, msg) { // Si no ha podido conectar con el servidor 
                // Código en caso de fracaso en el envío. Muestra error conexio
                $("#errorconex").show();
                return true;
            }
        });

    }
}