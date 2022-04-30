const knewLib = require('knex');

class Comments {
  constructor(config, dbname){
    this.knex = knewLib(config)
    this.dbname = dbname
  }

  async createTable(){
    return await this.knex.schema.createTable(this.dbname, table => {
      table.increments('id').primary();
      table.string('mail', 50).notNullable();
      table.string('message', 50).notNullable();
    })
  }

  async existTable(){
    return await this.knex.schema.hasTable(this.dbname);
  }

  async insertComment(userComment){
    return this.knex(this.dbname).insert(userComment);
  }

  async listarComment(){
    return this.knex(this.dbname).select('*');
  }

  async borrarCommentPorId(id){
    return this.knex.from(this.dbname).where('id', id);
  }

  async close(){
    this.knex.destroy();
  }
}

module.exports = Comments;