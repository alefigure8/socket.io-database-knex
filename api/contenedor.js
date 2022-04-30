const knewLib = require('knex');

class Contendedor {
  constructor(config, dbname){
    this.knex = knewLib(config)
    this.dbname = dbname
  }

  async createTable(){
    return await this.knex.schema.createTable(this.dbname, table => {
      table.increments('id').primary();
      table.string('title', 50).notNullable();
      table.string('thumbnail', 250).notNullable();
      table.float('price');
    })
  }

  async existTable(){
    return await this.knex.schema.hasTable(this.dbname);
  }

  async insertProductos(articulos){
    return this.knex(this.dbname).insert(articulos);
  }

  async listarProductos(){
    return this.knex(this.dbname).select('*');
  }

  async borrarProductosPorId(id){
    return this.knex.from(this.dbname).where('id', id);
  }

  async  actualizarStockPorId(stock, id){
    return this.knex.from(this.dbname).where('id', id).update({stock: stock});
  }

  async close(){
    this.knex.destroy();
  }
}

module.exports = Contendedor;