/*
    Pagina blog
*/

window.onload = function() {
/*  checkCookie();
    esborra(); */
    esborra_blog();
    carga_blog();
}

// Inicializa formulario y oculta pantalla login
function esborra_blog() {
    inierr_blog();
    document.getElementById("blogform").reset();        // inicializa formulario texto
    if (texto_borrar != "") {
        borra_registro();
    }
}

// Añade comentario al contenedor
function mascoment() {
    var p_comen = tinymce.get('mensaje').getContent();   // recupera texto de Tiny
    if (p_comen == "") {                                 // Valida contenido texto
        $("#mensaje").addClass("textoerror");
        $("#mensaje").focus();
        $("#errortexto").show();  
    }
    else {
        var p_user = localStorage.getItem("usuario");  // recupera usuario del area LocalStorage
         
        var hoy = new Date();                          // Monta fecha y hora
        var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var p_ahora = fecha + ' ' + hora;

        $.ajax({
            type: "POST",
            data: {b_user: p_user, b_comen: p_comen, b_data: p_ahora},
            url: '/php/regblog.php',
            success: function(data) {
                if (data.status == "error05") {
                    $("#errorblog05").show(); 
                }
                if (data.status == "ok") {
                    carga_blog();
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

// Inicializa campos error.
function inierr_blog() {
    $("#errortexto").hide();                                  // variable control errores
    $("#errorblog05").hide();                                 // variable control errores
}

// carga comentarios.
function carga_blog() {
    var p_user = localStorage.getItem("usuario");             // recupera usuario del area LocalStorage
    $.ajax({
        type: "POST",
        data: {b_user: p_user},
        url: '/php/cargablog.php',
        success: function(data) {
            if (data.status == "ok") {
                let datos = data.comentarios;
                let times = data.tiempo;
                $("#comentarios").text("");                     // inicializa historial texto
                for (let x = 0; x < datos.length; x++) {
                    $("#comentarios").append(times[x] + " " + datos[x]);  
                }
                $("#mensaje").removeClass("textoerror");        // inicializa error texto
                $("#errortexto").hide();  
                $("#errorblog05").hide();
                document.getElementById("blogform").reset();    // inicializa formulario texto
            } else {
                alert("PETADA");
            }
        }
    });
}

function borra_registro() {
    let p_borra = texto_borrar + "";
    var p_user = localStorage.getItem("usuario");             // recupera usuario del area LocalStorage
    $.ajax({
        type: "POST",
        data: {b_user: p_user, b_texte: p_borra},
        url: '/php/borrablog.php',
        success: function(data) {
            if (data.status == "ok") {
                carga_blog();
            }
        }
    });
}

let texto_borrar = "";
function texto() {
    texto_borrar = "";
    if (window.getSelection) {
        texto_borrar = window.getSelection();
    }
}