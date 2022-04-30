const {Router} = require('express');
const router = Router();
const db = require('../scripts/crearTablas');

/*GET*/
router.get('/', async (req, res) => {
  try {
    const productosLista = await db.producto.listarProductos();
    const commentsList = await db.comments.listarComment();
    res.render('index', {productosLista, commentsList});
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;