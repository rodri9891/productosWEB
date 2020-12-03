function getAcercaDe(req, res){
    res.render('acercaDe.ejs',{
        titulo: "Acerca de Nosotros"
    });
}

module.exports = {getAcercaDe}