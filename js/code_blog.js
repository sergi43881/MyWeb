/*
    Pagina blog
*/

window.onload = function() {
/*  checkCookie();
    esborra(); */
    esborra_blog();
}

// Inicializa formulario y oculta pantalla login
function esborra_blog() {
    inierr();
    inierr_blog();
    document.getElementById("blogform").reset();        // inicializa formulario texto
    $("#comentarios").text("");                         // inicializa historial texto
}

// Añade comentario al contenedor
function mascoment() {
    var textox = tinymce.get('mensaje').getContent();   // recupera texto de Tiny
    if (textox == "") {                                 // Valida contenido texto
        $("#mensaje").addClass("textoerror");
        $("#mensaje").focus();
        $("#errortexto").show();  
    }
    else {
        var p_user = localStorage.getItem("usuario");
        alert(p_user);
/*       $.ajax({
            type: "POST",
            data: {user: p_user, e_pass: p_pass},
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
                    $("#verblog").show();
                }
            },
            error: function(e, msg) { // Si no ha podido conectar con el servidor 
                // Código en caso de fracaso en el envío. Muestra error conexio
                $("#errorconex").show();
                return true;
            }
        }); */
        $("#comentarios").append(textox);               // añade texto a historial textos
        $("#mensaje").removeClass("textoerror");        // inicializa error texto
        $("#errortexto").hide();  
        document.getElementById("blogform").reset();    // inicializa formulario texto
    }    
}

// Inicializa campos error.
function inierr_blog() {
    $("#errortexto").hide();                                  // variable control errores
}
