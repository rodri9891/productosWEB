const Sequelize = require('sequelize');
const {Modelos} = require('./modelos');

const Marcas = sequelize.define('marcas',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING,
    estado: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true}
});

Marcas.belongsTo(Modelos, {foreignKey:  {name: 'modelos_fk', allowNull:false}, targetKey: 'id', as: "modelos"});

async function getAllMarcas(){
    const datos = await Marcas.findAll(
        {
        include: 
        [
            {model: Modelos, as: "modelos"}
        ]
    });
    return datos;
}

async function getMarca(marcaId) {
  const datos = await Marcas.findAll(
    {
      where: {
        id: marcaId
      },
      include: [
        { model: Modelos, as: "modelos" }
      ]
    }
  );
  return datos[0];
}

async function eliminarMarca(id){

  await Marcas.destroy(
    {
      where:{id: id}
    }
    ).then(categoria=>{
      return 0;
    }).catch(function(err){
      console.log("algo fallo en el borrado "+err);
      return -1;
  });
}

async function guardar(datos){
  await Marcas.create({
    nombre: datos.marca,
    modelos_fk: datos.modelo 
  })
}

async function modificar(id, datos){
  const nuevaM = await Marcas.findOne({where:{id:id}});
  nuevaM.nombre = datos.marca;
  nuevaM.estado = datos.estado;
  nuevaM.modelos_fk= datos.modelo;
  nuevaM.save();
}


module.exports = {Marcas, getAllMarcas, eliminarMarca, guardar, getMarca, modificar}