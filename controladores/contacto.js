const Contacto = require('../modelos/contacto');

function getContacto(req, res){
    res.render('contacto.ejs',{
        titulo: "Contáctenos"
    });
}

async function nuevoContacto(req, res){
    let body = req.body;
    await Contacto.guardar(body);
    res.redirect('/');
}

module.exports = {getContacto, nuevoContacto}