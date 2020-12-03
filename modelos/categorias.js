const Sequelize = require('sequelize');

const Categorias = sequelize.define('categorias',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING,
    id_padre: Sequelize.INTEGER,
    estado: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true}
});

async function getLista(idPadre){
  const datos = await Categorias.findAll({
      where:{
        id_padre: idPadre
      }
  });
  return datos;  
}

async function GuardarCategoria(nombre, idPadre){
  await Categorias.create({
    id_padre: idPadre,
    nombre: nombre
  })
}

async function getCategoria(id){
  const datos = await Categorias.findAll({
    where:{
      id: id
    }
  })
  return datos[0];
}

async function modificarCategoria(id, nombre, idPadre){
  await Categorias.update({
    id_padre:idPadre,
    nombre: nombre
  },
  { 
    where:{
      id:id
    } 
  }
  ).then(categoria =>{
    return categoria.id;
  }).catch(function(err){
    console.log("fallo la modificación"+err);
    return -1;
});
}

async function eliminarCategoria(id){

    // evitar borrar id padre con hijas

  const lista = getLista(id);
  if (lista.length > 0){
    return - 2;
  }

  await Categorias.destroy(
    {
      where:{id: id}
    }
    ).then(categoria=>{
      return 0;
    }).catch(function(err){
      console.log("algo fallo"+err);
      return -1;
  });
}
  
module.exports = {Categorias, getLista, GuardarCategoria, getCategoria, modificarCategoria, eliminarCategoria}