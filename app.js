const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = 3000;

// conexion a la base de datos 

const sequelize = new Sequelize('productosweb', 'root', '', {
    host:'localhost',
    dialect:'mysql',
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('BDD conectado')
    })
    .catch(err => {
        console.log('la BDD no se conecto')
    });

global.sequelize = sequelize;

//sequelize.sync({ force: true });// DE ALGUNA FORMA SEQUELIZE TE CREA LAS TABLAS CON TERMINACION "S"

app.set('port', port);
app.set('views', __dirname + '/vistas');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//cfg flash y session
app.use(session({
    secret:'qwerty',
    saveUninitialized: 'true',
    resave: true
}));
app.use(flash());

//FRONTEND
// controladores

const contacto = require('./controladores/contacto');
const acercaDe = require('./controladores/acercaDe');
const equipo = require('./controladores/equipo');
const index = require('./controladores/productosIndex');
const listaProductos = require('./controladores/listaProductos');

// rutas

app.get('/contacto', contacto.getContacto);
app.post('/contacto', contacto.nuevoContacto);
app.get('/acercaDe', acercaDe.getAcercaDe);
app.get('/equipo', equipo.getEquipo);
app.get('/', index.getListaProductos);
app.get('/producto/:id', index.getProducto);
app.get('/listaProductos', listaProductos.getListaDeProductos);

//BACKEND
//controladores

const admin = require('./controladores/admin/inicio');
const catABM = require('./controladores/admin/categorias');
const marcasABM = require('./controladores/admin/marcas');
const productosABM = require('./controladores/admin/productos');

//rutas

app.get('/admin', admin.getInicio);
app.get('/admin/categorias/:idPadre', catABM.getListado);
app.post('/admin/categorias/:idPadre', catABM.guardarCategoria);
app.get('/admin/categorias/:idPadre/modif/:id', catABM.getModificar);
app.post('/admin/categorias/:idPadre/modif/:id', catABM.postModificar);
app.get('/admin/categorias/:idPadre/elim/:id', catABM.getEliminar);
app.get('/admin/marcas', marcasABM.getListado);
app.get('/admin/marcas/add', marcasABM.nuevaMarca);
app.post('/admin/marcas/add', marcasABM.guardarMarca);
app.get('/admin/marcas/elim/:id', marcasABM.getEliminar);
app.get('/admin/marcas/modif/:id', marcasABM.getModificar);
app.post('/admin/marcas/modif/:id', marcasABM.postModificar);
app.get('/admin/productos', productosABM.getListado);
app.get('/admin/productos/elim/:id', productosABM.getEliminar);
app.get('/admin/productos/add', productosABM.nuevoProducto);
app.post('/admin/productos/add', productosABM.guardarProducto);
app.get('/admin/productos/modif/:id', productosABM.getModificar);
app.post('/admin/productos/modif/:id', productosABM.postModificar);




app.listen(port, ()=>{
    console.log(`servidor en puerto: ${port}`);
})