<?php
$base="ntlight_uva";                               /* definimos base de datos a conectar */
$tabla_afiliados="ps_megaaffiliates_orders";       /* definimos tabla pedidos realizado desde links de afiliados */
$tabla_grupos="ps_customer_group";                 /* definimos tabla grupos de precios por cliente */
$tabla_pedidos="ps_order_detail";                  /* definimos tabla pedidos */
$tabla_reducciones="ps_specific_price";            /* definimos tabla de precios */

/* establecemos una conexión con el servidor de base de datos MySQL */
$conexion=mysql_connect("localhost","ntlight_uva","CACAFACA1123581321");
if (!$conexion) {
    die('Error de conexion con localhost: ' . mysql_error());
}
/* establecemos una conexión con la base de datos MySQL */
$bd_seleccionada = mysql_select_db($base,$conexion);
if (!$bd_seleccionada) {
    die ('Error de apertura de UV_LED: ' . mysql_error());
}

/*leemos todos los campos de la tabla ps_megaaffiliates_orders con todos los registros que su comision no haya sido calculada*/
$res_afiliados= mysql_query("SELECT * FROM $tabla_afiliados WHERE (comission=0) " ,$conexion) or die("No se han encontrado resultados en tabla PS_MEGAAFFILIATES_ORDERS");

    for($x1 = 0 ; $x1 < mysql_num_rows($res_afiliados) ; $x1++){
    $fila1 = mysql_fetch_assoc($res_afiliados);
    /* Cargamos campo de afilado para buscar en base de datos PS_CUSTOMER_GROUP */
    $codafi = $fila1['id_affiliate'];
    /* Cargamos campo pedido para buscar en base de datos PS_ORDER_DETAIL */
    $codped = $fila1['id_order'];

    /* echo "<h2>Orden</h2>";         */
    /* echo "<h2>",$codped,"</h2>";   */
    /* echo "<h2>Afiliado</h2>";      */
    /* echo "<h2>",$codafi,"</h2>";   */

    /*leemos un unico registro de la tabla ps_customer_group para recoger el grupo de cliente*/
    $res_grupo= mysql_query("SELECT * FROM $tabla_grupos WHERE ($tabla_grupos.id_customer=$codafi)" ,$conexion) or die("No se han encontrado resultados en tabla PS_CUSTOMER_GROUP");
        $fila2 = mysql_fetch_assoc($res_grupo);
        /* Cargamos campo grupo de precios para busquedas en bases de datos */
        $grupo = $fila2['id_group'];

    /*leemos todos los registros de la tabla ps_orders_detail del pedido inicial*/
    $res_pedidos= mysql_query("SELECT * FROM $tabla_pedidos WHERE ($tabla_pedidos.id_order=$codped)" ,$conexion) or die("No se han encontrado resultados en tabla PS_ORDER_DETAIL");
    for($x2 = 0 ; $x2 < mysql_num_rows($res_pedidos) ; $x2++){
        $fila3 = mysql_fetch_assoc($res_pedidos);
        /* Cargamos campo precio sin IVA */
        $presim = $fila3['unit_price_tax_excl'];
        /* Cargamos campo cantidad */
        $artcan = $fila3['product_quantity'];
        /* Cargamos campo precio con IVA */
        $precim = $fila3['unit_price_tax_incl'];
        /* Cargamos codigo producto para buscar en base de datos PS_SPECIFIC_PRICE */
        $codpro = $fila3['product_id'];

    /* echo "<h2>Grupo de Precios</h2>";   */
    /* echo "<h2>",$grupo ,"</h2>";        */
    /* echo "<h2>Precio sin IVA</h2>";     */
    /* echo "<h2>",$presim,"</h2>";        */
    /* echo "<h2>Cantidad articulo</h2>";  */
    /* echo "<h2>",$artcan,"</h2>";        */
    /* echo "<h2>Precio con IVA</h2>";     */
    /* echo "<h2>",$precim,"</h2>";        */
    /* echo "<h2>Producto</h2>";           */
    /* echo "<h2>",$codpro,"</h2>";        */

        /*leemos un unico registro de la tabla ps_specific_price para recoger el precio del articulo por grupo de cliente*/
        $res_reducciones= mysql_query("SELECT * FROM $tabla_reducciones WHERE ($tabla_reducciones.id_product=$codpro and $tabla_reducciones.id_group=$grupo)" ,$conexion) or die("No se han encontrado resultados en tabla PS_SPECIFIC_PRICE");
        $fila4 = mysql_fetch_assoc($res_reducciones);
        /* Cargamos campo importe reduccion */
        $prered = $fila4['price'];

        /*Calcula precio cliente. Precio sin IVA * cantidad */
        $precli=($presim*$artcan);
        /*Calcula precio afiliado Precio sin IVA * cantidad */
        $preafi=($prered*$artcan);
        /*Calcula comision para afiliado */
        $precom=($precli-$preafi);

    /* echo "<h2>Precio cliente presim * artcan</h2>";               */
    /* echo "<h2>",$precli,"</h2>";                                  */
    /* echo "<h2>Precio afiliado precim - prered * artcan</h2>";     */
    /* echo "<h2>",$preafi,"</h2>";                                  */
    /* echo "<h2>Comision precli - preafi</h2>";                     */
    /* echo "<h2>",$precom,"</h2>";                                  */

        /*Graba la comision en archivo ps_megaafiliates_orders */
        $grabar  = "UPDATE $tabla_afiliados SET comission='$precom',state='2' WHERE id_affiliate=$codafi and id_order=$codped ";
        $grabaBD = mysql_query($grabar);
    }
}

/* cerramos la conexión con la base de datos */
mysql_close();

    /* echo "<h2>--------------------------------------------------------------</h2>";                                                */
    /* echo "<h2>CALCULO DE COMISIONES EFECTUADA</h2>";                                                                               */
    /* echo "<h2>--------------------------------------------------------------</h2>";                                                */
    /* echo "<h2>Puede proceder a realizar los pagos desde el panel de control de afiliados ( CLIENTES/GESTION AFILIADOS)</h2>";      */


?>