const mysql = require('mysql');

/* This code is creating a connection to a MySQL database. It uses the `mysql` module to create a
connection object. The connection object is configured with the host, user, password, database, and
port information needed to connect to the MySQL server. Once the connection object is created, it
can be used to establish a connection to the database server. */
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'moveasy',
  port:3307

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;
