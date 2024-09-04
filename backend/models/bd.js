var mysql = require('mysql2');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit:10,
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});


pool.query = util.promisify(pool.query);

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW() AS currentTime');
        console.log('Conectado a la base de datos, hora actual:', result[0].currentTime);
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
    }
}

testConnection();



module.exports = pool;