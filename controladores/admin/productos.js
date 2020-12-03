const Productos = require('./../../modelos/productos');
const Marcas = require('./../../modelos/marcas');
const Modelos = require('./../../modelos/modelos');
const Categorias = require('./../../modelos/categorias');
const Usuarios = require('./../../modelos/usuarios');

async function getListado(req, res){
    const productos = await Productos.getAllProductosAdmin();
    res.render('admin/productos/lista.ejs',{
        lista: productos
    });
}

async function getEliminar(req, res){
    const id = req.params.id;
    if (await Productos.eliminarProducto(id) != 0){
        req.flash('error', 'El producto no puede ser eliminado. ');
    }
    res.redirect('/admin/productos');
    
}

async function nuevoProducto(req, res){
    listaMarcas = await Marcas.getAllMarcas();
    listaModelos = await Modelos.getAllModelos();
    // se pone 0 porque solicita id la funcion
    listaCategorias = await Categorias.getLista(0);
    listaUsuarios = await Usuarios.getAllUsuarios();
    res.render('admin/productos/abmForm.ejs',{
        marcas: listaMarcas,
        modelos: listaModelos,
        categorias: listaCategorias,
        usuarios: listaUsuarios,
        // se agrega data como objeto vacio ya que se reutiliza en modificacion
        data: {},
    });
}

async function guardarProducto(req, res){
    const body = req.body;
    await Productos.guardar(body)
    res.redirect('/admin/productos');
        
}

async function getModificar(req, res){
    listaMarcas = await Marcas.getAllMarcas();
    listaModelos = await Modelos.getAllModelos();
    // se pone 0 porque solicita id la funcion
    listaCategorias = await Categorias.getLista(0);
    listaUsuarios = await Usuarios.getAllUsuarios();
    producto = await Productos.getProducto(req.params.id);
    res.render('admin/productos/abmForm.ejs',{
        marcas: listaMarcas,
        modelos: listaModelos,
        categorias: listaCategorias,
        usuarios: listaUsuarios,
        data: producto
    });
}

async function postModificar(req, res){
    const id = req.params.id;
    await Productos.modificar(id, req.body);
    res.redirect('/admin/productos');
}

module.exports = {getListado, getEliminar, nuevoProducto, guardarProducto, getModificar, postModificar}