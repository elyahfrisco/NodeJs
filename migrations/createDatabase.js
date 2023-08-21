const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  root:3307
};

async function createDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query('CREATE DATABASE IF NOT EXISTS moveasy');
    connection.end();
    console.log('Database moveasy has been created if it did not exist.');
  } catch (error) {
    console.error('An error occurred while creating the database:', error);
  }
}

createDatabase();
