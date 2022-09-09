const mySql = require('mysql')
const {database} = require('./keys')
const {promisify} = require('util');
const pool = mySql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCAL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection){
        connection.release();
        console.log('DB is connected');
    }

    return;
})

pool.query = promisify(pool.query);

module.exports = pool;