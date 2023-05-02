const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/users.model');
const usersRouter = require('./routes/users');

const TasksRouter = require('./routes/tasks');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');


const { PORT = 3000 } = process.env;


const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', User.createUser);
app.post('/signin', User.login);

app.get('/users', (req,res) => {
  User.getAllUsers(req, res);

})

app.use('/users', auth, usersRouter);

app.use('/tasks', auth, TasksRouter);


app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });