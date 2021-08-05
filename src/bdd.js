const { database_user, database_password, database_base, database_host, database_port } = require('../config/config.json');
var mysql = require('mysql')

var config = {
  host: database_host,
  port: database_port,
  user: database_user,
  password: database_password,
  database: database_base
};

var connection = mysql.createConnection(config);
connection.connect(function (err) {
  if (err) {
    console.log(`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n\t» Error al conectar a la base de datos de FiveM: ${err.stack}\n╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`);
  } else {
    console.log(`╔═══════════════════════════════╗\n      » Conectado a la base \n        de datos de FiveM.\n╚═══════════════════════════════╝`);
  }
});
connection.on('error', function (err) {
  console.log(`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n\t» Error al conectar a la base de datos de FiveM: ${err.stack}\n╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect()
  } else {
    throw err;
  }
});

function handleDisconnect() {
  connection = mysql.createConnection(config);

  connection.connect(function (err) {
    if (err) {
      console.log(`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n\t» Error al conectar a la base de datos de FiveM: ${err.stack}\n╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`);
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log(`╔═══════════════════════════════╗\n      » Conectado a la base \n        de datos de FiveM.\n╚═══════════════════════════════╝`);
  });

  connection.on('error', function (err) {
    connection.log(`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n\t» Error al conectar a la base de datos de FiveM: ${err.stack}\n╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

module.exports = {
  connection: mysql.createConnection(config)
}