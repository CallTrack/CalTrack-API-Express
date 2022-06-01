const { Client } = require('pg');

module.exports = function () {
    const client = new Client({
        user: 'postgres',
        host: '34.101.73.30',
        database: 'caltrack',
        password: 'admin',
        port: 5432
    });
    return client;
};