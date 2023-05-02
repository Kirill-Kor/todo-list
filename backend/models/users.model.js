const sql = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

const User = function (user) {
    this.text = user.text;
}


User.createUser = (request, response) => {

    const newUser = request.body;

    bcrypt.hash(newUser.password, 10)
        .then((hash) => {
            newUser.password = hash;

            sql.query('insert into users set ?', newUser, (err, res) => {
                if (err) {
                    response.status(400).send(err);
                    return;
                }

                response.status(201).send({ message: `Пользователь ${newUser["first_name"]} ${newUser["last_name"]} создан` });
            });
        })

}

User.login = (request, response) => {
    const userData = request.body;

    sql.query(`select * from users where login = ?`, userData["login"], (err, user) => {
        if (err) {
            response.status(401).send({ message: 'Неверный логин или пароль' });
            return;
        }

        if (user.length === 0) {
            response.status(401).send({ message: 'Неверный логин или пароль' });
            return;
        };

        bcrypt.compare(userData.password, user[0]["password"])
            .then((matched) => {
                if (!matched) {
                    response.status(401).send({ message: 'Неверный логин или пароль' });
                    return;
                }

                const token = jwt.sign({ id: user[0]["id"] }, JWT_SECRET);
                response.send({ token });


            })
            .catch((err) => response.status(401).send({ message: 'Неверный логин или пароль' }))


    })

}

User.getAllUsers = (request, response) => {
    sql.query(`select subs.*, leads.first_name as lead_name, leads.last_name as lead_lastname
    from users as subs 
    left join users as leads 
    on subs.lead_id = leads.id
    `, (err, res) => {
        if (err) {
            response.send(err);
            return;
        }

        response.send(res);
    });
}

User.getMyInfo = (request, response) => {
    const userId = request.user.id;

    sql.query('select * from users where id = ?', userId, (err, res) => {
        if (err) {
            response.send(err);
            return;
        }

        response.send(res);
    })
}


module.exports = User;