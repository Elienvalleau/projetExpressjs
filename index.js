const db = require("./db");
const todos = require("./model/todos");
const users = require("./model/users");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8888;
const methodOverride = require('method-override');
const session = require('express-session');

app.use(session({ secret: 'superSecret', cookie: { maxAge: 60000 }}));


app.listen(PORT, () => {
  console.log('Serveur sur port : ', PORT)
});

todos.sync();
users.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
  res.redirect('/users')
});

app.all('*', (req, res, next) => {
  next();
});

app.use('/todos', require('./controllers/todoController'));
app.use('/users', require('./controllers/userController'));

app.use((req, res) => {
  res.status(404).send('Not Found')
});