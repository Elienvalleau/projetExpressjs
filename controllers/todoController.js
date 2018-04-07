const express = require('express');
const router = express.Router();
const pug = require('pug');
const todos = require("../model/todos");
const session = require('express-session');

router.post('/', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else{
    res.type('html');
  }

  try{
    todos.create({
      message: req.body.message,
      completion: false,
      idUser: req.session.userLog,
      createdAt: new Date()
    }).then( () =>
    res.format({
      html: () => {
        res.redirect('/todos') },
      json: () => { res.send({ message: 'success !' }) }
    })
    );
  } catch (err){
    console.log(err);
  }

});

router.get('/', (req, res, next) => {
  const tplIndexPath = './views/index.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else{
    res.type('html');
  }

  if (!req.session.userLog) {
    res.redirect('/users/login');
  }
  else{
    todos.findAll({
      where: {
        idUser: req.session.userLog,
      }
    }).then( (result) =>
    res.format({
      html: () => {
        const html = renderIndex({
          title: 'todos',
          todos: result
        });
        res.writeHead(200, { 'Content-Type': 'text/html' } );
        res.write(html);
        res.end();},
      json: (result) => { res.json(result) }
    }));
  }
});

router.get('/add', (req, res, next) => {
  const tplIndexPath = './views/add.pug';
  const renderIndex = pug.compileFile(tplIndexPath);
  const html = renderIndex({
    title: 'add'
  });

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  if (!req.session.userLog) {
    res.redirect('/users/login');
  }
  else{
    res.format({
      html: () => {
        res.writeHead(200, { 'Content-Type': 'text/html' } );
        res.write(html); },
      json: (result) => { res.json(result) }
    });

    res.end();
  }
});

router.get('/:todoId', (req, res, next) => {
  const tplIndexPath = './views/show.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  if (!req.session.userLog) {
    res.redirect('/users/login');
  }
  else{
    todos.find({
      where: {
        id: req.params.todoId
      }
    }).then( (result) =>
    res.format({
      html: () => {
        const html = renderIndex({
          title: 'show',
          resultMessage: result.message,
          resultCompletion: result.completion,
          resultDateCre: result.createdAt,
          resultDateUpd: result.updateddAt,
        });

        res.writeHead(200, { 'Content-Type': 'text/html' } );
        res.write(html);
        res.end();},
      json: (result) => { res.json(result) }
    })
    );
  }
});


router.delete('/:todoId', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  todos.destroy({
    where: {
      id: req.params.todoId
    }
  }).then(()=>
  res.format({
    html: () => {
      res.redirect('/todos'); },
    json: () => { res.send({ message: 'success !' }) }
  })
  );
});


router.patch('/:todoId', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  todos.update(
  {
    message: req.body.message,
    completion: req.body.completion
  },
  {
    where: {
      id: req.params.todoId
    }
  }
  ).then(()=>
  res.format({
    html: () => {
      res.redirect('/todos'); },
    json: () => { res.send({ message: 'success !' }) }
  }));
});


router.get('/:todoId/edit', (req, res, next) => {
  const tplIndexPath = './views/edit.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  if (!req.session.userLog) {
    res.redirect('/users/login');
  }
  else{
    todos.find({
      where: {
        id: req.params.todoId
      }
    }).then( (result) =>
    res.format({
      html: () => {
        const html = renderIndex({
          title: 'edit',
          todo: result,
        });

        res.writeHead(200, { 'Content-Type': 'text/html' } );
        res.write(html);
        res.end();},
      json: (result) => { res.json(result) }
    })
    );
  }
});

module.exports = router;