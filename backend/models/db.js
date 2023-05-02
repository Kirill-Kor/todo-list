const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'kirkor',
    database: 'todo'
})

connection.connect(err => {
    if (err) throw new Error(err);
    console.log('Подключение прошло успешно');
});

module.exports = connection;