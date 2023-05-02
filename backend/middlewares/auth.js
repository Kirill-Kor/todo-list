const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
        res.status(401).send({ message: 'Необходима авторизация' });
    }

    const token = authorization.split(' ')[1];
    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        res.status(401).send({ message: 'Необходима авторизация' });
    }
    req.user = payload;

    next();
};