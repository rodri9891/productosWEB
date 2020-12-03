const Categorias = require('./../../modelos/categorias');

async function getListado(req,res){
    const idPadre = req.params.idPadre;
    const listado = await Categorias.getLista(idPadre);
    res.render('admin/categorias/lista.ejs',{
        lista: listado,
        data: {},
        mensaje: req.flash('error')
    });
}

async function guardarCategoria(req, res){
    const idPadre = req.params.idPadre;
    const nombre = req.body.nombre;
    const result = await Categorias.GuardarCategoria(nombre, idPadre )
    res.redirect('/admin/categorias/'+idPadre);
        
}

async function getModificar(req, res){
    const idPadre = req.params.idPadre;
    const id = req.params.id;
    const listado = await Categorias.getLista(idPadre);
    const categoria = await Categorias.getCategoria(id);
    res.render('admin/categorias/lista.ejs',{
        lista: listado,
        data: categoria,
    });

}

async function postModificar(req, res){
    const idPadre = req.params.idPadre;
    const id = req.params.id;
    const nombre = req.body.nombre;
    await Categorias.modificarCategoria(id, nombre, idPadre);
    // el ordenamiento de tabla y enviarlo com parametro debe ser el mismo sino no funciona
    res.redirect('/admin/categorias/'+idPadre);
}
// algo se saltea y envio error y eliminar.. ------------------------------------------------------------> a verificar
async function getEliminar(req, res){
    const idPadre = req.params.idPadre;
    const id = req.params.id;
    if (await Categorias.eliminarCategoria(id) != 0){
        req.flash('error', 'La categoria no puede ser eliminada, es dependiente.');
    }
    res.redirect('/admin/categorias/'+idPadre);
    
}

module.exports = {getListado, guardarCategoria, getModificar, postModificar, getEliminar}