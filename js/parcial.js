const PRODUCTOS = [
    //TAZAS
    {
        id: '1',
        nombre: 'Dino',
        descripcion: 'Taza Dino de 11oz',
        precio: 10,
        imagen: 'assets/taza_dino.jpg',
        categoria: 'Tazas',
    },
    {
        id: '2',
        nombre: 'React JS',
        descripcion: 'Taza React JS 15oz',
        precio: 20,
        imagen: 'assets/taza_react_js.jpg',
        categoria: 'Tazas',
    },
    //REMERAS
    {
        id: '3',
        nombre: 'A Developers Design',
        descripcion: 'Remera Gris',
        precio: 30,
        imagen: 'assets/remera_gris_a_d_d.png',
        categoria: 'Remeras',
    },
    {
        id: '4',
        nombre: 'Angular',
        descripcion: 'Remera negra',
        precio: 40,
        imagen: 'assets/remera_negra_angular.png',
        categoria: 'Remeras',
    },
    //GORRAS
    {
        id: '5',
        nombre: 'Vue JS',
        descripcion: 'Gorra Blanca Talla: S',
        precio: 50,
        imagen: 'assets/gorra_vue_js.jpg',
        categoria: 'Gorras',
    },
    {
        id: '6',
        nombre: 'Bootstrap',
        descripcion: 'Gorra Blanca Talla: M',
        precio: 60,
        imagen: 'assets/gorra_bootstrap.jpg',
        categoria: 'Gorras',
    },
];

const CARRITO ={
    items: 0,
    total: 0,
    cesta:[],
    //-------------------------------------------AGREGAR AL CARRITO
    agregarAlCarrito(objeto){
        let existeProducto = this.verificarExistencia(objeto);

        if(existeProducto){
            this.incrementarCantidad(objeto);
        }else{
            objeto.cantidad = 1;
            objeto.subtotal = this.calSubtotalProductos(objeto);
            this.cesta.push(objeto)
            this.sumarAlItems();
        }
        this.calTotal();
    },
    //-------------------------------------------VERIFICAR EXISTENCIA
    verificarExistencia(objeto){
        let existeProducto = this.cesta.some(producto => producto.id === objeto.id);
        return existeProducto;
    },
    eliminarProducto(objeto){
        let indice = CARRITO.cesta.indexOf(objeto);
            CARRITO.cesta.splice(indice,1);
            this.calTotal()
            this.calItems()
    },
    //-------------------------------------------CANTIDADES INCREMENTAR/DECREMENTAR
    incrementarCantidad(objeto){
        this.cesta.forEach(producto => {
            if(producto.id === objeto.id){
                if(producto.cantidad >= 1){
                    producto.cantidad++;
                    producto.subtotal = this.calSubtotalProductos(producto);
                    this.calTotal();
                    this.sumarAlItems();
                };
            };
        });
    },
    decrementarCantidad(objeto){
        this.cesta.forEach(producto => {
            if(producto.id === objeto.id){
                if(producto.cantidad > 1){
                    producto.cantidad--;
                    producto.subtotal = this.calSubtotalProductos(producto);
                    this.calTotal();
                    this.restarAlItems();
                };
            };
        });

    },
    //-------------------------------------------ITEMS
    sumarAlItems(){
        this.items++
    },
    restarAlItems(){
        this.items--
    },
    //-------------------------------------------SUBTOTAL
    calSubtotalProductos(objeto){
        return objeto.cantidad * objeto.precio;
    },
    calTotal(){
        let acumuladorDeCostos = 0;
        this.cesta.forEach(producto => {
            acumuladorDeCostos += producto.subtotal;
        });
        this.total = acumuladorDeCostos;
    },
    calItems(){
        let acumuladorDeItems = 0;
        this.cesta.forEach(producto => {
            acumuladorDeItems += producto.cantidad;
        });
        this.items = acumuladorDeItems;
    },
    vaciarCesta(){
        this.cesta.splice(0,this.cesta.length);
        if(this.cesta.length === 0){
            this.items = 0;
            this.total = 0;
        };
    }
};

const PAISES = {
    Argentina: ['Buenos Aires','Córdoba','Santa Fé'],
    Chile: ['Antofagasta','Biobío','Santiago de Chile'],
    Colombia: ['Bogotá','Cartagena','Medellín'],
    Uruguay: ['Canelones','Maldonado','Montevideo'],
    Venezuela: ['Caracas','Mérida','Valencia']
};

    //-------------------------------------------OBJETO DE INTERFAZ DEL USUARIO
const INTERFAZ = {
    //-------------------------------------------CREADOR DE ETIQUETAS
    crearHTML(elemento = 'div',posicion = 'body') {
        let etiqueta = document.createElement(elemento);
        if(posicion instanceof HTMLElement){
            posicion.append(etiqueta)
        }else{
           document.querySelector(posicion).append(etiqueta);
        }
        return etiqueta
    },
    //-------------------------------------------CREADOR DE ETIQUETAS
    eliminarHTML(selector) {
        let etiqueta;
        if(selector instanceof HTMLElement){
            etiqueta = selector
            etiqueta.remove()
        }else{
            etiqueta = document.querySelector(selector);
           etiqueta.remove();
        };
    },
    //-------------------------------------------REEMPLAZAR ETIQUETA
    reemplazarHTML(nuevoNodo,nodoAnterior) {
        let nuevaEtiqueta = this.crearHTML(nuevoNodo);
        let etiquetaExistente= document.querySelector(nodoAnterior);
        etiquetaExistente.parentNode.replaceChild(nuevaEtiqueta,etiquetaExistente);
        return nuevaEtiqueta;
    },
    actualizarDatoEnEtiqueta(posicion,texto ='',valor = ''){
        let etiqueta = document.querySelector(posicion);
            etiqueta.innerText = `${texto}${valor}`;
    },
    //-------------------------------------------CONSTRUIR PÁGINA
    iniciarWeb(){
        this.vistaPreviaNav();
        this.carousel();
        this.titulo();
        this.mostrarCatalogo(PRODUCTOS);
    },
    //-------------------------------------------CATEGORIAS
    categorias: ['Todos','Tazas','Remeras','Gorras'],
    //-------------------------------------------VISTA PREVIA EN NAVBAR CANT-ITEMS, TOTAL Y VER CARRITO
    vistaPreviaNav(){
        const NAV = document.querySelector('#navBar');
            NAV.innerHTML = '';

        const LOGO = this.crearHTML('h1',NAV);
            LOGO.innerText = 'LOGO';
            LOGO.id = 'logo';

        // const ITEMS = this.crearHTML('span',NAV);
        //     ITEMS.id = 'itemHeader';


        // const TOTAL = this.crearHTML('span',NAV);
        //     TOTAL.id = 'totalHeader';

        const CONTENEDORBTNSNAV = this.crearHTML('div',NAV);
            CONTENEDORBTNSNAV.classList.add('contenedorBtnsNav');

        const DIVFILTROS = this.crearHTML('div',CONTENEDORBTNSNAV);
        DIVFILTROS.classList.add('divFiltros');

        const BTNVERFILTROS = this.crearHTML('i',DIVFILTROS);
            BTNVERFILTROS.classList.add('bi', 'bi-sliders','iconoFilter');
            // BTNVERFILTROS.innerText = 'Filtros';
            BTNVERFILTROS.id = 'btnVerFiltros';

        const CONTENEDORCATEGORIAS = this.crearHTML('div',DIVFILTROS);
            CONTENEDORCATEGORIAS.classList.add('contenedorCategorias');

            this.crearCategorias(this.categorias);

        const DIVCARRITO = this.crearHTML('div',CONTENEDORBTNSNAV);
            DIVCARRITO.classList.add('divCarrito');

        const BTNVERCARRITO = this.crearHTML('i',DIVCARRITO);
            BTNVERCARRITO.classList.add('bi','bi-handbag','carrito');
            // BTNVERCARRITO.innerText = 'Ver carrito';
            BTNVERCARRITO.id = 'verCarrito';

        const ITEMS = this.crearHTML('span',DIVCARRITO);
            ITEMS.id = 'itemHeader';

        const TOTAL = this.crearHTML('span',DIVCARRITO);
            TOTAL.id = 'totalHeader';

        this.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
        this.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
    },
    //-------------------------------------------CANTIDAD ITEMS
    crearCategorias(array,posicion = '.contenedorCategorias'){
        array.forEach(categoria =>{
            const CATEGORIAFILTRO = this.crearHTML('p',posicion);
                CATEGORIAFILTRO.innerText = categoria;
        });
    },
    //-------------------------------------------RESTAURAR HTML DE CAROUSEL
    restaurarCarousel(){
        const CAROUSELCONTENEDOR = this.crearHTML('div','#contenido');
        CAROUSELCONTENEDOR.id = 'carouselProductos';
        CAROUSELCONTENEDOR.classList.add('carousel','slide','carousel-fade','carousel-dark');
        CAROUSELCONTENEDOR.setAttribute('data-bs-ride','carousel');

        const CAROUSELINNER = this.crearHTML('div',CAROUSELCONTENEDOR);
        CAROUSELINNER.id = 'contenedorIMGS';
        CAROUSELINNER.classList.add('carousel-inner');

        const BTNPREV = this.crearHTML('button',CAROUSELCONTENEDOR);
        BTNPREV.classList.add('carousel-control-prev');
        BTNPREV.setAttribute('type','button');
        BTNPREV.setAttribute('data-bs-target','#carouselProductos');
        BTNPREV.setAttribute('data-bs-slide','prev');

        const SPANPREV1 = this.crearHTML('span',BTNPREV);
        SPANPREV1.classList.add('carousel-control-prev-icon');
        SPANPREV1.setAttribute('aria-hidden','true');

        const SPANPREV2 = this.crearHTML('span',BTNPREV);
        SPANPREV2.classList.add('visually-hidden');
        SPANPREV2.innerText = 'Previous';

        const BTNNEXT = this.crearHTML('button',CAROUSELCONTENEDOR);
        BTNNEXT.classList.add('carousel-control-next');
        BTNNEXT.setAttribute('type','button');
        BTNNEXT.setAttribute('data-bs-target','#carouselProductos');
        BTNNEXT.setAttribute('data-bs-slide','next');

        const SPANNEXT1 = this.crearHTML('span',BTNNEXT);
        SPANNEXT1.classList.add('carousel-control-next-icon');
        SPANNEXT1.setAttribute('aria-hidden','true');

        const SPANNEXT2 = this.crearHTML('span',BTNNEXT);
        SPANNEXT2.classList.add('visually-hidden');
        SPANNEXT2.innerText = 'Next';

    },
    //-------------------------------------------CAROUSEL
    carousel(categoria = 'Todos'){
        const CAROUSELCONTENEDORIMGS = document.querySelector('#contenedorIMGS');
        switch(categoria){
            case 'Todos':
                this.verCarousel(PRODUCTOS,CAROUSELCONTENEDORIMGS);
            break;
            default:
                // let filtro = PRODUCTOS.filter(producto => producto.categoria === categoria);
                let filtro = this.filtroProductosXCategoria(PRODUCTOS,categoria);
                this.verCarousel(filtro,CAROUSELCONTENEDORIMGS);
            break;
        };
    },
    verCarousel(array,contenedor){
        contenedor.innerHTML = '';
        array.forEach((producto,indice) => {
            const DIVITEM = this.crearHTML('div',contenedor);
                DIVITEM.classList.add('carousel-item');
            if(indice === 0){
                DIVITEM.classList.add('active');
            };
            const IMG = this.crearHTML('img',DIVITEM);
                IMG.setAttribute('src',producto.imagen);
                IMG.setAttribute('alt',producto.nombre);
                IMG.classList.add('d-block','w-100');
        });
    },
    //-------------------------------------------FILTRO DE CATEGORIAS DE PRODUCTOS
    filtroProductosXCategoria(array, categoria){
        let filtro = array.filter(producto => producto.categoria === categoria);
        return filtro;
    },
    //-------------------------------------------TITULO
    titulo(){
        const H2 = this.crearHTML('h2','#contenido');
            H2.classList.add('titulo');
            H2.innerText = 'Nuestro Catálogo';
    },
    //-------------------------------------------CATALOGO DE PRODUCTOS
    mostrarCatalogo(array){
        const DIVCONTENEDOR = this.crearHTML('div','main');
            DIVCONTENEDOR.id = 'catalogo';

        array.forEach(producto => {

            const PASTILLAPRODUCTO = this.crearHTML('div',DIVCONTENEDOR);

            const FIGURE = this.crearHTML('figure',PASTILLAPRODUCTO);

            const IMAGENPRODUCTO = this.crearHTML('img',FIGURE);
                IMAGENPRODUCTO.src = producto.imagen;
                IMAGENPRODUCTO.alt = producto.nombre;

            const NOMBREPRODUCTO = this.crearHTML('h3',PASTILLAPRODUCTO);
                NOMBREPRODUCTO.innerText = producto.nombre;

            const DESCRIPCIONPRODUCTO = this.crearHTML('p',PASTILLAPRODUCTO)
                DESCRIPCIONPRODUCTO.innerText = producto.descripcion;

            const PRECIOPRODUCTO = this.crearHTML('p',PASTILLAPRODUCTO);
                PRECIOPRODUCTO.innerText = `$${producto.precio}`;

            const CATEGORIAPRODUCTO = this.crearHTML('p',PASTILLAPRODUCTO);
                CATEGORIAPRODUCTO.innerText = producto.categoria;

            const BTNAGREGAR = this.crearHTML('button',PASTILLAPRODUCTO);
                BTNAGREGAR.innerText = 'agregar';
                BTNAGREGAR.setAttribute('data-id',producto.id);
                BTNAGREGAR.classList.add('agregarAlCarrito');

            const BTNINFO = this.crearHTML('button',PASTILLAPRODUCTO);
                BTNINFO.innerText = '+Info';
                BTNINFO.setAttribute('data-id',producto.id);
                BTNINFO.classList.add('info');
        });
    },
    //-------------------------------------------MODAL CARRITO
    modalCarrito(){
        const MAIN = document.querySelector('#contenido');

        const DIVMODALFONDO = this.crearHTML('div', MAIN);
            DIVMODALFONDO.classList.add('modalFondo');

        const MODAL = this.crearHTML('div',DIVMODALFONDO);
            MODAL.classList.add('modalCarrito');

        const MODALHEADER = this.crearHTML('div', MODAL);
            MODALHEADER.classList.add('modalHeaderCarrito');

        const ITEMSHEADERMODAL = this.crearHTML('p',MODALHEADER);
            ITEMSHEADERMODAL.id = 'itemModal';

        const TOTALHEADERMODAL = this.crearHTML('p',MODALHEADER);
            TOTALHEADERMODAL.id = 'totalModal';

        this.actualizarDatoEnEtiqueta('#itemModal','Items: ',CARRITO.items);
        this.actualizarDatoEnEtiqueta('#totalModal','Total: $',CARRITO.total);

        const DIVPRODUCTOSLISTA = this.crearHTML('div','.modalCarrito');
            DIVPRODUCTOSLISTA.innerHTML = '';
            DIVPRODUCTOSLISTA.id = 'divProductosLista';

        this.listarProductosModal('#divProductosLista');

        const CONTENEDORBTNS = this.crearHTML('div',MODAL);
            CONTENEDORBTNS.classList.add('contenedorDeBtns');

        const BTNVACIAR = this.crearHTML('button',CONTENEDORBTNS);
            BTNVACIAR.innerText = 'Vaciar';
            BTNVACIAR.id = 'vaciar';

        const BTNCOMPRAR = this.crearHTML('button',CONTENEDORBTNS);
            BTNCOMPRAR.innerText = 'Comprar';
            BTNCOMPRAR.id = 'comprar';

    },
    listarProductosModal(posicion){
        let contenedor = document.querySelector(posicion)
        if(CARRITO.cesta.length === 0){
            // const CARRITOVACIO = this.crearHTML('p','.modalCarrito');
            const CARRITOVACIO = this.crearHTML('p',contenedor);
                CARRITOVACIO.innerText = 'El carrito está vacío';
                CARRITOVACIO.classList.add('carritoVacio');
        }else{
            // let contenedor = document.querySelector(posicion)
            const TABLA = this.crearHTML('table',contenedor);
                TABLA.innerHTML = '';

            const TABLAROW = this.crearHTML('tr', TABLA);

            const DATOS = ['Producto','Precio Und.','','Cantidad','','Subtotal','Categoría',''];
                DATOS.forEach(dato => {
                    const TABLAHEADER = this.crearHTML('th', TABLAROW);
                        TABLAHEADER.innerText = dato;
                });

            CARRITO.cesta.forEach(producto => {
                const TABLAROW = this.crearHTML('tr', TABLA);
                    TABLAROW.setAttribute('data-prod',producto.id);

                const NOMBREPRODUCTO = this.crearHTML('td',TABLAROW);
                    NOMBREPRODUCTO.innerText = producto.nombre;

                const PRECIOPRODUCTO = this.crearHTML('td',TABLAROW);
                    PRECIOPRODUCTO.innerText = `$${producto.precio}`;


                const INCREMENTAR = this.crearHTML('td',TABLAROW); //DEBERIA SER UN ICONO DE BOOSTRAP
                const ICOINCREMENTAR = this.crearHTML('i',INCREMENTAR);
                    ICOINCREMENTAR.classList.add('incrementar','bi','bi-plus-circle');
                    ICOINCREMENTAR.setAttribute('data-id',producto.id);
                    INCREMENTAR.classList.add('incrementar');
                    INCREMENTAR.setAttribute('data-id',producto.id);

                const CANTIDADPRODUCTO = this.crearHTML('td',TABLAROW);
                    CANTIDADPRODUCTO.innerText = producto.cantidad;
                    CANTIDADPRODUCTO.setAttribute('data-cant',producto.id);

                const DECREMENTAR = this.crearHTML('td',TABLAROW); //DEBERIA SER UN ICONO DE BOOSTRAP
                const ICODECREMENTAR = this.crearHTML('i',DECREMENTAR);
                    ICODECREMENTAR.classList.add('decrementar','bi','bi-dash-circle');
                    ICODECREMENTAR.setAttribute('data-id',producto.id);
                    DECREMENTAR.classList.add('decrementar');
                    DECREMENTAR.setAttribute('data-id',producto.id);

                const SUBTOTALPRODUCTO = this.crearHTML('td',TABLAROW);
                    SUBTOTALPRODUCTO.innerText = `${producto.subtotal}`; //OJO QUE AQINTERFAZ HAY QUE MODIFICAR SEGÚN SUBA LA CANTIDAD DEL PRODUCTO
                    SUBTOTALPRODUCTO.setAttribute('data-sub',producto.id);

                const CATEGORIAPRODUCTO = this.crearHTML('td',TABLAROW);
                    CATEGORIAPRODUCTO.innerText = producto.categoria;

                const BTNELIMINARROW = this.crearHTML('td',TABLAROW);
                const ICOELIMINAR = this.crearHTML('i',BTNELIMINARROW);
                    ICOELIMINAR.classList.add('bi','bi-trash','eliminar');
                    ICOELIMINAR.setAttribute('data-id',producto.id);
                    BTNELIMINARROW.classList.add('eliminar');
                    BTNELIMINARROW.setAttribute('data-id',producto.id);
            });
        };
    },
    actualizarListaCarrito(objeto){
        this.mostrarItemsXProducto(objeto);
        this.mostrarSubtotalXProducto(objeto);
    },
    mostrarItemsXProducto(objeto){
        const ITEMSXPRODUCTO = document.querySelector(`[data-cant="${objeto.id}"]`);
            ITEMSXPRODUCTO.innerText = objeto.cantidad;
    },
    mostrarSubtotalXProducto(objeto){
        const SUBXPRODUCTO = document.querySelector(`[data-sub="${objeto.id}"]`);
            SUBXPRODUCTO.innerText = objeto.subtotal;
    },
    vaciarListaProductos(){
        if(CARRITO.cesta.length > 0){
            let remplazoHTML = this.reemplazarHTML('p','table');
                remplazoHTML.classList.add('carritoVacio');
                remplazoHTML.innerText = 'El carrito está vacío';
        }else{
            this.carritoVacio();
        }
    },
    carritoVacio(){
        let colorearParrafo = document.querySelector('.carritoVacio');
        colorearParrafo.classList.toggle('rojoVacio');
        setTimeout(() => {
            colorearParrafo.classList.toggle('rojoVacio');
        }, 1000);
    },
    //-------------------------------------------MODAL INFO
    modalInfo(objeto){
        const MODALFONDO = this.crearHTML('div','#contenido');
            MODALFONDO.classList.add('modalFondo');

        const MODALINFO = this.crearHTML('div',MODALFONDO);
            MODALINFO.classList.add('modalInfo');

        const DIVIMG = this.crearHTML('div',MODALINFO);

        const IMG = this.crearHTML('img',DIVIMG);
            IMG.setAttribute('src',objeto.imagen);
            IMG.setAttribute('alt',objeto.nombre);

        const DIVINFO = this.crearHTML('div',MODALINFO);
            
        const NOMBRE = this.crearHTML('h3',DIVINFO);
            NOMBRE.innerText = objeto.nombre;

        const DESCRIPCION = this.crearHTML('p',DIVINFO);
            DESCRIPCION.innerText = `Descripción: ${objeto.descripcion}`;

        const PRECIO = this.crearHTML('p',DIVINFO);
            PRECIO.innerText = `Precio: $${objeto.precio}`;

        const CATEGORIA = this.crearHTML('p',DIVINFO);
            CATEGORIA.innerText = `Categoría: ${objeto.categoria}`;

        const BTNAGREGAR = this.crearHTML('button',DIVINFO);
            BTNAGREGAR.innerText = 'agregar';
            BTNAGREGAR.setAttribute('data-id',objeto.id);
            BTNAGREGAR.classList.add('agregarAlCarrito');
    },
    //-------------------------------------------CHECKOUT
    checkOut(){
        const CONTENEDORCHECKOUT = this.crearHTML('div','#contenido');
            CONTENEDORCHECKOUT.id = 'checkOut';
            this.formularioCompra();
            this.mostrarFactura();
    },
    formularioCompra(){
        const DIVFORMULARIO = this.crearHTML('div','#checkOut');
        DIVFORMULARIO.classList.add('divFormulario');

        const FORMULARIO = this.crearHTML('form',DIVFORMULARIO);
            FORMULARIO.id = 'datosCliente';
            FORMULARIO.setAttribute('action', '#');
            FORMULARIO.setAttribute('enctype', 'multipart/form-data');
            FORMULARIO.setAttribute('method', 'POST');

        const DIVNOMBRE = this.crearHTML('div',FORMULARIO);
        const LABELNOMBRE = this.crearHTML('label',DIVNOMBRE);
            LABELNOMBRE.setAttribute('for','nombre');
            LABELNOMBRE.innerText = 'Nombre';
        const INPUTNOMBRE = this.crearHTML('input',DIVNOMBRE);
            INPUTNOMBRE.id = 'nombre';
            INPUTNOMBRE.setAttribute('type','text');
            INPUTNOMBRE.setAttribute('name','nombre');
            INPUTNOMBRE.setAttribute('placeholder','Ingrese su nombre');
            INPUTNOMBRE.setAttribute('require','');
        
        const NOMBREWARNING = this.crearHTML('p',DIVNOMBRE);
            NOMBREWARNING.classList.add('warningOcultoNomb');


        const DIVTLF = this.crearHTML('div',FORMULARIO);
        const LABELTLF = this.crearHTML('label',DIVTLF);
            LABELTLF.setAttribute('for','telefono');
            LABELTLF.innerText = 'Telefono';
        const INPUTTLF = this.crearHTML('input',DIVTLF);
            INPUTTLF.id = 'telefono';
            INPUTTLF.setAttribute('type','text');
            INPUTTLF.setAttribute('name','telefono');
            INPUTTLF.setAttribute('placeholder','Ingrese su numero telefónico');
            INPUTTLF.setAttribute('require','');

            const TELFWARNING = this.crearHTML('p',DIVTLF);
                TELFWARNING.classList.add('warningOcultoTLF');

        const DIVEMAIL = this.crearHTML('div',FORMULARIO);
        const LABELEMAIL = this.crearHTML('label',DIVEMAIL);
            LABELEMAIL.setAttribute('for','email');
            LABELEMAIL.innerText = 'Email';
        const INPUTEMAIL = this.crearHTML('input',DIVEMAIL);
            INPUTEMAIL.id = 'email';
            INPUTEMAIL.setAttribute('type','email');
            INPUTEMAIL.setAttribute('name','email');
            INPUTEMAIL.setAttribute('placeholder','Ingrese su correo electrónico');
            INPUTEMAIL.setAttribute('require','');

            const EMAILWARNING = this.crearHTML('p',DIVEMAIL);
                EMAILWARNING.classList.add('warningOcultoMail');

        //--------------------------------------SELECTE PAISES Y PROVINCIAAASSSS
        const SELECTPAIS = this.crearHTML('select',FORMULARIO);
            SELECTPAIS.setAttribute('name','pais');
            SELECTPAIS.id = 'paises';

        this.crearPaises(PAISES);

        const SELECTPROVINCIAS = this.crearHTML('select',FORMULARIO);
            SELECTPROVINCIAS.setAttribute('name','provincias');
            SELECTPROVINCIAS.id = 'provincias';

        this.crearProvincias('Argentina');

        const DIVDIRECCION = this.crearHTML('div',FORMULARIO);
        const LABELDIRECCION = this.crearHTML('label',DIVDIRECCION);
            LABELDIRECCION.setAttribute('for','direccion');
            LABELDIRECCION.innerText = 'Dirección';
        const INPUTDIRECCION = this.crearHTML('input',DIVDIRECCION);
            INPUTDIRECCION.id = 'direccion';
            INPUTDIRECCION.setAttribute('type','text');
            INPUTDIRECCION.setAttribute('name','direccion');
            INPUTDIRECCION.setAttribute('placeholder','Ingrese su dirección');
            INPUTDIRECCION.setAttribute('require','');

            const DIRECCIONWARNIGN = this.crearHTML('p',DIVDIRECCION);
                DIRECCIONWARNIGN.classList.add('warningOcultoDirec');

        const DIVFECHA = this.crearHTML('div',FORMULARIO);
        const LABELFECHA = this.crearHTML('label',DIVFECHA);
            LABELFECHA.setAttribute('for','fecha');
            LABELFECHA.innerText = 'Fecha de entrega';
        const INPUTFECHA = this.crearHTML('input',DIVFECHA);
            INPUTFECHA.id = 'fecha';
            INPUTFECHA.setAttribute('type','date');
            INPUTFECHA.setAttribute('name','fecha');
            INPUTFECHA.setAttribute('require','');

        const DIVPAGOS = this.crearHTML('div',FORMULARIO);
            DIVPAGOS.classList.add('divPagos');

        const DIVTARJETA = this.crearHTML('div',DIVPAGOS);
        const INPUTTARJETA = this.crearHTML('input',DIVTARJETA);
            INPUTTARJETA.id = 'tarjeta';
            INPUTTARJETA.setAttribute('type','radio');
            INPUTTARJETA.setAttribute('name','tipoDePago');
            INPUTTARJETA.setAttribute('value','tarjeta');
            INPUTTARJETA.setAttribute('checked','');
            INPUTTARJETA.setAttribute('require','');

        const TARJETA = this.crearHTML('label',DIVTARJETA);
            TARJETA.innerText = 'Tarjeta';

        const DIVEFECTIVO = this.crearHTML('div',DIVPAGOS);
        const INPUTEFECTICO = this.crearHTML('input',DIVEFECTIVO);
            INPUTEFECTICO.id = 'efectivo';
            INPUTEFECTICO.setAttribute('type','radio');
            INPUTEFECTICO.setAttribute('name','tipoDePago');
            INPUTEFECTICO.setAttribute('value','efectivo');

        const EFECTIVO = this.crearHTML('label',DIVEFECTIVO);
            EFECTIVO.innerText = 'Contra entrega';

        const DIVTIPOPAGO = this.crearHTML('div',FORMULARIO);
            DIVTIPOPAGO.classList.add('divTipoPago')

            this.mostrarInputPago();

        const DIVDBTNS = this.crearHTML('div',FORMULARIO);
            DIVDBTNS.classList.add('divBtns');
        const CANCELARBTN = this.crearHTML('button',DIVDBTNS);
            CANCELARBTN.innerText = 'Cancelar';
            CANCELARBTN.id = 'cancelar';
            CANCELARBTN.setAttribute('type','button');


        const PAGARBTN = this.crearHTML('button',DIVDBTNS);
            PAGARBTN.innerText = 'Pagar';
            PAGARBTN.id = 'pagar';
            PAGARBTN.setAttribute('type','submit');

            this.warning();
    },
    crearPaises(objeto){
        let selectPais = document.querySelector('#paises');
        let opciones;
        for (let pais in objeto) {
            options = this.crearHTML('option',selectPais);
            options.value = pais;
            options.innerText = pais;
        };
    },
    crearProvincias(pais) {
        selectProvincias = document.querySelector('#provincias');
        selectProvincias.innerHTML = '';
        let opciones;
        // pais.forEach(provincia => {
        //     opciones = this.crearHTML('option',selectProvincias);
        //     opciones.value = provincia;
        //     opciones.innerText = provincia;
        // });
        for (let provincia of PAISES[pais]) {
            options = this.crearHTML('option',selectProvincias);
            options.value = provincia;
            options.innerText = provincia;
            // selectProvincias.append(options);
        };
    },
    mostrarInputPago(){
        const TARJETA = document.querySelector('#tarjeta');
        const EFECTIVO = document.querySelector('#efectivo');
        const DIVTIPOPAGO = document.querySelector('.divTipoPago');

            // DIVTIPOPAGO.id = 'divDatosTarjeta';

        if(TARJETA.checked){
            DIVTIPOPAGO.innerHTML = '';

            const LABELTARJETA = this.crearHTML('label',DIVTIPOPAGO);
                LABELTARJETA.innerText = 'N° Tarjeta';

            const INPUTTARJETA = this.crearHTML('input',LABELTARJETA);
                INPUTTARJETA.id = 'pagoTarjeta';
                INPUTTARJETA.setAttribute('type','text');
                INPUTTARJETA.setAttribute('placeholder','XXX-XXX-XXX');

            const TARJETAWARNING = this.crearHTML('p',DIVTIPOPAGO);
                TARJETAWARNING.classList.add('warningOcultoTarj');

        }else if(EFECTIVO.checked){
            DIVTIPOPAGO.innerHTML = '';
            const TOTALPAGAR = this.crearHTML('p',DIVTIPOPAGO);
                TOTALPAGAR.innerText = `Total efectivo: $${CARRITO.total}`
        }
    },
    mostrarFactura(){
        const DIVFACTURA = this.crearHTML('div','#checkOut');
            DIVFACTURA.classList.add('divFactura');

        const FACTURA = this.crearHTML('h3',DIVFACTURA);
            FACTURA.innerText = 'Ticket';
        
        const TABLA = this.crearHTML('table',DIVFACTURA);

        const TABLAROW = this.crearHTML('tr', TABLA);

        const DATOS = ['Categoría','Producto','Precio und.','Cantidad','Subtotal'];
            DATOS.forEach(dato => {
                const TABLAHEADER = this.crearHTML('th', TABLAROW);
                    TABLAHEADER.innerText = dato;
            });

        CARRITO.cesta.forEach(producto => {
            const TABLAROW = this.crearHTML('tr', TABLA);

            const CATEGORIAPRODUCTO = this.crearHTML('td',TABLAROW);
                CATEGORIAPRODUCTO.innerText = producto.categoria;

            const NOMBREPRODUCTO = this.crearHTML('td',TABLAROW);
                NOMBREPRODUCTO.innerText = producto.nombre;

            const CANTIDADPRODUCTO = this.crearHTML('td',TABLAROW);
                CANTIDADPRODUCTO.innerText = producto.cantidad;
                CANTIDADPRODUCTO.setAttribute('data-cant',producto.id);

            const PRECIOPRODUCTO = this.crearHTML('td',TABLAROW);
                PRECIOPRODUCTO.innerText = `$${producto.precio}`;

            const SUBTOTALPRODUCTO = this.crearHTML('td',TABLAROW);
                SUBTOTALPRODUCTO.innerText = `$${producto.subtotal}`;
                SUBTOTALPRODUCTO.setAttribute('data-sub',producto.id);
        });

        const TABLARFOOTER = this.crearHTML('tfoot', TABLA);
        const TABLAROWFOOTER = this.crearHTML('tr', TABLARFOOTER);
            // TABLAROWFOOTER.setAttribute('colspan', '5')
        const ITEMS = this.crearHTML('td', TABLAROWFOOTER);
            ITEMS.innerText = `Items: ${CARRITO.items}`;
            ITEMS.setAttribute('colspan','3');

        const TOTAL = this.crearHTML('td', TABLAROWFOOTER);
            TOTAL.innerText = `Total: $${CARRITO.total}`;
            TOTAL.setAttribute('colspan','2');

    },
    descuentos(categoria){
        let bono;
        const bannerPublicitario = this.crearHTML('div', '#contenido');
        bannerPublicitario.classList.add('divPublicidad');
        bannerPublicitario.innerHTML = '';
        
        const publicidad = this.crearHTML('p',bannerPublicitario);
        switch (categoria) {
            case 'Tazas':
                bono = '20%';
                publicidad.innerText = `Tienes ${bono} de descuento en ${categoria}`;
                

                setTimeout(() => {
                    this.eliminarHTML(bannerPublicitario)
                }, 10000);
                break;
            case 'Remeras':
                bono = '10%';
                publicidad.innerText = `Tienes ${bono} de descuento en ${categoria}`;

                setTimeout(() => {
                    this.eliminarHTML(bannerPublicitario)
                }, 10000);
                break;
            case 'Gorras':
                bono = '50%';
                publicidad.innerText = `Tienes ${bono} de descuento en ${categoria}`;

                setTimeout(() => {
                    this.eliminarHTML(bannerPublicitario)
                }, 10000);
                break;
        
            default:
                mostrarProductos(productos);
                this.eliminarHTML('.divPublicidad')
                break;
        };
    },
    modalGracias(nombre,direccion,provincia,pais,email,fecha){
        const MODALFONDO = this.crearHTML('div', '#contenido');
            MODALFONDO.classList.add('modalFondoGracias');

        const MODALINFO = this.crearHTML('div', MODALFONDO);
            MODALINFO.classList.add('modalGracias');

        const NOMBRE = this.crearHTML('h3', MODALINFO);
            NOMBRE.innerHTML = `¡Gracias ${nombre}!`;

        const INFO = this.crearHTML('p', MODALINFO);
            INFO.innerHTML = `Hemos recibido tu pedido y estamos preparando el envío a:`;

        const TABLA = this.crearHTML('table', MODALINFO);

        const DIRECCIONROW = this.crearHTML('tr', TABLA);
        const DIRECCION = this.crearHTML('td', DIRECCIONROW);
            DIRECCION.innerHTML = 'Dirección:';

        const DIRECCIONDATO = this.crearHTML('td', DIRECCIONROW);
            DIRECCIONDATO.innerHTML = `${direccion}, ${provincia}, ${pais}.`;

        const FECHAROW = this.crearHTML('tr', TABLA);
        const FECHA = this.crearHTML('td', FECHAROW);
            FECHA.innerHTML = 'Fecha de entrega';
        
        const FECHADATO = this.crearHTML('td', FECHAROW);
            FECHADATO.innerHTML = fecha;

        const CORREOROW = this.crearHTML('tr', TABLA);
        const CORREO = this.crearHTML('td', CORREOROW);
            CORREO.innerHTML = 'Correo:';
        
        const CORREODATO = this.crearHTML('td', CORREOROW);
            CORREODATO.innerHTML = email;

        const GRACIAS = this.crearHTML('p', MODALINFO);
        GRACIAS.innerHTML = `¡Gracias por elegirnos!`;
        const EQUIPO = this.crearHTML('p', MODALINFO);
        EQUIPO.innerHTML = `Equipo de A Developer's Design.`;

        const BTNVOLVER = this.crearHTML('button', MODALINFO);
        BTNVOLVER.id = 'volver';
        BTNVOLVER.innerText = 'Volver';
    },
    warning(){
        const WARNING = this.crearHTML('p','#datosCliente');
            WARNING.classList.add('warning');
            WARNING.innerText = 'Falta rellenar algunos campos'
    },
};

    //-------------------------------------------FUNCIONES SCOPE GLOBAL
    const identificarProducto = (e) => {
        let productoId = e.target.getAttribute('data-id');
        let producto = PRODUCTOS.find(objeto => objeto.id === productoId);
        return producto;
    };

    //-------------------------------------------INICIALIZACION
    INTERFAZ.iniciarWeb();

    //-------------------------------------------DELEGACION DE EVENTOS
    document.addEventListener('click', (e) => {
        //-------------------------------------------BOTON + INFO
        if(e.target.classList.contains('info')){
            let producto = identificarProducto(e);
            INTERFAZ.modalInfo(producto);
        }
        //-------------------------------------------BOTON VER CARRITO
        if(e.target.id === 'verCarrito'){
            INTERFAZ.modalCarrito();
        };
        //-------------------------------------------BTN AGREGAR AL CARRITO
        if(e.target.classList.contains('agregarAlCarrito')){
            let producto = identificarProducto(e)
            CARRITO.agregarAlCarrito(producto);
            INTERFAZ.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
        };

        //-------------------------------------------BTN VER FILTROS MOSTRAR Y OCULTAR CATEGORIAS
        if(e.target.id === 'btnVerFiltros'){
            let categorias = document.querySelector('.contenedorCategorias');
                categorias.classList.toggle('mostrando');
        };

        //-------------------------------------------BTNS CATEGORIAS
        let filtro;
        switch (e.target.textContent) {
            case 'Todos':
                INTERFAZ.carousel();
                INTERFAZ.eliminarHTML('#catalogo');
                INTERFAZ.mostrarCatalogo(PRODUCTOS);
                break;
            case 'Tazas':
                INTERFAZ.carousel('Tazas');
                INTERFAZ.descuentos('Tazas');
                INTERFAZ.eliminarHTML('#catalogo');
                filtro = INTERFAZ.filtroProductosXCategoria(PRODUCTOS,'Tazas');
                INTERFAZ.mostrarCatalogo(filtro);
                break;
            case 'Remeras':
                INTERFAZ.carousel('Remeras');
                INTERFAZ.descuentos('Remeras');
                INTERFAZ.eliminarHTML('#catalogo');
                filtro = INTERFAZ.filtroProductosXCategoria(PRODUCTOS,'Remeras');
                INTERFAZ.mostrarCatalogo(filtro)
                break;
            case 'Gorras':
                INTERFAZ.carousel('Gorras');
                INTERFAZ.descuentos('Gorras');
                INTERFAZ.eliminarHTML('#catalogo');
                filtro = INTERFAZ.filtroProductosXCategoria(PRODUCTOS,'Gorras');
                INTERFAZ.mostrarCatalogo(filtro);
                break;
        }

        //-------------------------------------------CERRAR MODAL
        if(e.target.classList.contains('modalFondo')){
            document.querySelector('.modalFondo').remove();
        };

        //-------------------------------------------INCREMENTAR 1 AL PRODUCTO
        if(e.target.classList.contains('incrementar')){
            let producto = identificarProducto(e);
            CARRITO.incrementarCantidad(producto);
            /**ACTUALIZA LA CANTIDAD Y EL SUBTOTAL DEL PRODUCTO */
            INTERFAZ.actualizarListaCarrito(producto);
            /**ACTUALIZA EL NAVBAR */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
            /**ACTUALIZA EL HEADER DEL MODAL */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemModal','Items: ',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalModal','Total: $',CARRITO.total);
        };

        //-------------------------------------------DECREMENTAR -1 AL PRODUCTO
        if(e.target.classList.contains('decrementar')){
            let producto = identificarProducto(e);
            CARRITO.decrementarCantidad(producto);
            /**ACTUALIZA LA CANTIDAD Y EL SUBTOTAL DEL PRODUCTO */
            INTERFAZ.actualizarListaCarrito(producto);
            /**ACTUALIZA EL NAVBAR */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
            /**ACTUALIZA EL HEADER DEL MODAL */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemModal','Items: ',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalModal','Total: $',CARRITO.total);
        };
        //-------------------------------------------BOTON ELIMINAR PRODUCTO
        if(e.target.classList.contains('eliminar')){
            let producto = identificarProducto(e);
            CARRITO.eliminarProducto(producto);
            INTERFAZ.eliminarHTML('#divProductosLista > table');
            INTERFAZ.listarProductosModal('#divProductosLista');
             /**ACTUALIZA EL NAVBAR */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
            /**ACTUALIZA EL HEADER DEL MODAL */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemModal','Items: ',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalModal','Total: $',CARRITO.total);


        }
        //-------------------------------------------BOTON VACIAR CARRITO
        if(e.target.id === 'vaciar'){
            INTERFAZ.vaciarListaProductos();
            CARRITO.vaciarCesta();
            /**ACTUALIZA EL NAVBAR */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemHeader','',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalHeader','$',CARRITO.total);
            /**ACTUALIZA EL HEADER DEL MODAL */
            INTERFAZ.actualizarDatoEnEtiqueta('#itemModal','Items: ',CARRITO.items);
            INTERFAZ.actualizarDatoEnEtiqueta('#totalModal','Total: $',CARRITO.total);
        };

        //-------------------------------------------BOTON COMPRAR
        if(e.target.id === 'comprar'){
            if(CARRITO.cesta.length === 0){
                INTERFAZ.carritoVacio();
            }else{
                //-------------------------------------------CAMBIOS EN NAVBAR
                INTERFAZ.eliminarHTML('#itemHeader');
                INTERFAZ.eliminarHTML('#totalHeader');
                INTERFAZ.eliminarHTML('.contenedorBtnsNav');
                document.querySelector('#contenido').innerHTML = '';
                INTERFAZ.titulo();
                INTERFAZ.actualizarDatoEnEtiqueta('.titulo','Checkout');
                INTERFAZ.checkOut();
                //-------------------------------------------VALIDACIONES DE FORMULARIO
                const FORMDATOSCLIENTE = document.querySelector('#datosCliente');
                        FORMDATOSCLIENTE.addEventListener('input',(e) => {
                            switch(e.target.id){
                                case 'nombre':{
                                    let input = e.target;
                                    if(input.value.length <= 3){
                                        input.setCustomValidity('El nombre debe tener al menos 4 caracteres');
                                        input.classList.add('noCumple');
                                        input.classList.remove('cumple');

                                        let warning = document.querySelector('.warningOcultoNomb');

                                        warning.classList.add('warningActivo');
                                        warning.innerText = 'El nombre debe tener al menos 4 caracteres';

                                    }else{
                                        input.setCustomValidity('');
                                        input.classList.add('cumple');
                                        input.classList.remove('noCumple');

                                        let warning = document.querySelector('.warningOcultoNomb');

                                        warning.classList.remove('warningActivo');
                                    }
                                };
                                break;

                                case 'telefono':{
                                    let input = e.target;
                                    if(input.value.length <8 || input.value.length > 10 || isNaN(input.value)){
                                        e.target.setCustomValidity('Solo números, minimo 8 hasta 10 dígitos');
                                        input.classList.add('noCumple');
                                        input.classList.remove('cumple');

                                        let warning = document.querySelector('.warningOcultoTLF');

                                        warning.classList.add('warningActivo');
                                        warning.innerText = 'Solo números, minimo 8 hasta 10 dígitos';
                                    }else{
                                        e.target.setCustomValidity('');
                                        input.classList.add('cumple');
                                        input.classList.remove('noCumple');

                                        let warning = document.querySelector('.warningOcultoTLF');

                                        warning.classList.remove('warningActivo');
                                    };
                                };
                                break;

                                case 'email':{
                                    let input = e.target;
                                    if(input.value.length < 5){
                                        input.setCustomValidity('El correo debe tener al menos 5 caracteres');
                                        input.classList.add('noCumple');
                                        input.classList.remove('cumple');

                                        let warning = document.querySelector('.warningOcultoMail');

                                        warning.classList.add('warningActivo');
                                        warning.innerText = 'El correo debe tener al menos 5 caracteres';
                                    }else{
                                        input.setCustomValidity('');
                                        input.classList.add('cumple');
                                        input.classList.remove('noCumple');

                                        let warning = document.querySelector('.warningOcultoMail');

                                        warning.classList.remove('warningActivo');
                                    }
                                };
                                break;

                                case 'direccion':{
                                    let input = e.target;
                                    if(input.value.length <= 5){
                                        input.setCustomValidity('La direccion no puede estar vacía');
                                        input.classList.add('noCumple');
                                        input.classList.remove('cumple');

                                        let warning = document.querySelector('.warningOcultoDirec');

                                        warning.classList.add('warningActivo');
                                        warning.innerText = 'La direccion no puede estar vacía';
                                    }else{
                                        input.setCustomValidity('');
                                        input.classList.add('cumple');
                                        input.classList.remove('noCumple');

                                        let warning = document.querySelector('.warningOcultoDirec');

                                        warning.classList.remove('warningActivo');
                                    }
                                };
                                break;

                                case 'pagoTarjeta':{
                                    let input = e.target;

                                    if(input.value.length < 9 || input.value.length > 9 || isNaN(input.value)){
                                        input.classList.add('noCumple');
                                        input.classList.remove('cumple');

                                        let warning = document.querySelector('.warningOcultoTarj');

                                        warning.classList.add('warningActivo');
                                        warning.innerText = 'Solo números, hasta 9 dígitos';
                                    }else{
                                        input.classList.add('cumple');
                                        input.classList.remove('noCumple');

                                        let warning = document.querySelector('.warningOcultoTarj');

                                        warning.classList.remove('warningActivo');
                                    }
                                };
                                break;
                            };
                        });
            };
        };

        //-------------------------------------------SELECTOR PAIS
        if(e.target.id === 'paises'){
            const SELECTPAISES = e.target;
                SELECTPAISES.addEventListener('change', (e) => {
                    INTERFAZ.crearProvincias(e.target.value);
                });
        };
        //-------------------------------------------METODO DE PAGO
        if(e.target.id === 'tarjeta' && e.target.checked){
            INTERFAZ.mostrarInputPago();
        };
        if(e.target.id === 'efectivo' && e.target.checked){
            INTERFAZ.mostrarInputPago();
        };
        //-------------------------------------------BOTON CANCELAR
        if(e.target.id === 'cancelar'){
            INTERFAZ.vistaPreviaNav();
            INTERFAZ.actualizarDatoEnEtiqueta('#contenido');
            INTERFAZ.restaurarCarousel();
            INTERFAZ.carousel('Todos');
            INTERFAZ.titulo('Nuestro Catálogo');
            INTERFAZ.mostrarCatalogo(PRODUCTOS);
        };
        //-------------------------------------------BTN VOLVER (COMPRA REALIZADA)
        if(e.target.id === 'volver'){
            CARRITO.vaciarCesta()
            INTERFAZ.vistaPreviaNav();
            INTERFAZ.actualizarDatoEnEtiqueta('#contenido');
            INTERFAZ.restaurarCarousel();
            INTERFAZ.carousel('Todos');
            INTERFAZ.titulo('Nuestro Catálogo');
            INTERFAZ.mostrarCatalogo(PRODUCTOS);
        }
    });

        //-------------------------------------------EVENTO SUBMIT
    document.addEventListener('submit', (e) => {
        e.preventDefault();

        let inputs = e.target.querySelectorAll('input')
        let bandera = false;
        inputs.forEach(e => {
            if(e.classList.contains('noCumple') || e.value.length == 0){
                bandera = true;
            };
        });

        let pais = document.querySelector('#paises');
        let provincia = document.querySelector('#provincias');

        if(!bandera){
            INTERFAZ.modalGracias(inputs[0].value,inputs[3].value,provincia.value,pais.value,inputs[2].value,inputs[4].value);
            const WARNING = document.querySelector('.warning');
            WARNING.classList.remove('activee');
        }else{
            const WARNING = document.querySelector('.warning');
                WARNING.classList.add('activee');
        }
    });