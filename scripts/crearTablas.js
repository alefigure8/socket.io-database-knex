const options = require('../options/mysqlDB')
const knex = require('knex')(options);

knex.schema.createTable('cars', table =>{
  table.increments('id')
  table.string('nombre')
  table.integer('precio')
}).then(()=>{
  console.log('Tabla creada');
}).catch((err)=>{
  console.log(err);
}).finally(()=>{
  knex.destroy();
})