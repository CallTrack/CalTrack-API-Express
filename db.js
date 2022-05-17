const { Client } = require('pg');

module.exports = function () {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'caltrack',
        password: '',
        port: 5432
    });
    return client;
};