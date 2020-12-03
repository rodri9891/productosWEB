const Productos = require('../modelos/productos');

async function getListaProductos(req, res){
    let productos = await Productos.getProductos();
    //console.log(productos);
    res.render('index.ejs',{
        lista: productos,
        titulo: "Bienvenido"
    });
}

async function getProducto(req, res){
    let id = req.params.id;
    let producto = await Productos.getProducto(id);
    res.render('producto.ejs',
    {
        datos: producto,
        titulo: producto.titulo
    });
}
module.exports = {getListaProductos, getProducto}