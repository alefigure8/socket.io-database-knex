const {Router} = require('express');
const router = Router();
const Productos = require('../api/contenedor')
const Cometario = require('../api/contenedor_msg')

const comentario = new Cometario('comentarios_chat');
const producto = new Productos('productos_chat');

/*Crear base de datos si no existe*/
(async ()=> {
  const db = await producto.existTable();
  if(!db){
    await producto.creatTabla();
  }else{
    console.log('La tabla que intenta crear ya existe');
  }
})();


router.get('/', async (req, res) => {
  const productosLista = await producto.getAll();
  const commentsList = await comentario.getAll();
  res.render('index', {productosLista, commentsList});
})

module.exports = router;