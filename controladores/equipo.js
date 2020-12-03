function getEquipo(req, res){
    res.render('equipo.ejs',{
        titulo: "Equipo"
    });
}
module.exports = {getEquipo}