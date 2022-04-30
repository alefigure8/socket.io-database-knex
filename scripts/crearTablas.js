const Productos = require('../api/contenedor');
const Comments = require('../api/contenedor_msg');
const options_sql = require('../options/mysqlDB');
const options_sqlite3 = require('../options/sqlite3DB');

/*Init class*/
const producto = new Productos(options_sql, 'productos_chat');
const comments = new Comments(options_sqlite3, 'comentarios_chat');



/*Verificar si existe la base de datos*/
(async ()=> {
  const db_products = await producto.existTable();
  const db_comments = await comments.existTable();

  if(!db_products){
    await producto.createTable();
  }else{
    console.log('La tabla de prodcutos que intenta crear ya existe');
  }

  if(!db_comments){
    await comments.createTable();
  }else{
    console.log('La tabla de comentarios que intenta crear ya existe');
  }
})();


/*export*/
const db = {
  producto,
  comments
}

module.exports = db;