
function getInicio(req,res){
     res.render('admin/index.ejs',{  
          //permisos: req.user.permisos
     });
 }
 
 module.exports = {getInicio}