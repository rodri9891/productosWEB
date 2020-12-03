const Productos = require('../modelos/productos');

async function getListaDeProductos(req, res){
    let productos = await Productos.getAllProductosE();
    //console.log(productos);
    res.render('listaProductos.ejs',{
        lista: productos,
        titulo: "Lista de Productos"
    });
}
module.exports = {getListaDeProductos}