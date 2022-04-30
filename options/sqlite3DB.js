const path = require('path');

const options = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/mydb.sqlite')
  },
  useNullAsDefault: true
}

module.exports = options;