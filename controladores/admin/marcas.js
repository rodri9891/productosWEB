const Marcas = require('./../../modelos/marcas');
const Modelos = require('./../../modelos/modelos');

async function getListado(req, res){
    const marcas = await Marcas.getAllMarcas();
    res.render('admin/marcas/lista.ejs',{
        lista: marcas,
        mensaje: req.flash('error')
    });
}

async function nuevaMarca(req, res){
    listaMarcas = await Marcas.getAllMarcas();
    listaModelos = await Modelos.getAllModelos();
    res.render('admin/marcas/abmForm.ejs',{
        marcas: listaMarcas,
        modelos: listaModelos,
        // se agrega data como objeto vacio ya que se reutiliza para modificar
        data : {},
    });
}

async function getEliminar(req, res){
    const id = req.params.id;
    if (await Marcas.eliminarMarca(id) != 0){
        req.flash('error', 'La Marca no puede ser eliminada. ');
    }
    res.redirect('/admin/marcas');
    
}

async function guardarMarca(req, res){
    const body = req.body;
    await Marcas.guardar(body)
    res.redirect('/admin/marcas');
        
}

async function getModificar(req, res){
    listaModelos = await Modelos.getAllModelos();
    const marca = await Marcas.getMarca(req.params.id);
    res.render('admin/marcas/abmForm.ejs',{
        data: marca,
        modelos: listaModelos
    });

}

async function postModificar(req, res){
    const id = req.params.id;
    await Marcas.modificar(id, req.body);
    res.redirect('/admin/marcas');
}

module.exports = {getListado, nuevaMarca, getEliminar, guardarMarca, getModificar, postModificar}