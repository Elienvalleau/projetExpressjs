const express = require('express');
const router = express.Router();
const pug = require('pug');
const users = require("../model/users");
const bcrypt = require('bcrypt');
const session = require('express-session');

router.post('/', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else{
    res.type('html');
  }

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    try{
      users.create({
        nom: req.body.nom,
        password: hash,
        createdAt: new Date()
      }).then( () =>
      res.format({
        html: () => {
          res.redirect('/users') },
        json: () => { res.send({ message: 'success !' }) }
      })
      );
    } catch (err){
      console.log(err);
    }
  });
});

router.get('/', (req, res, next) => {
  const tplIndexPath = './views/indexUser.pug';
  const renderIndex = pug.compileFile(tplIndexPath);


  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else{
    res.type('html');
  }

  users.findAll().then( (result) =>
  res.format({
    html: () => {
      const html = renderIndex({
        title: 'Users',
        users: result
      });
      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  }));

});

router.post('/login', (req, res, next) => {

  // users.find({
  //   where: {
  //     id: req.body.id
  //   }
  // }).then( (result) => {
  //
  //   req.session.userLog = req.body.id;
  // })
});

router.get('/login', (req, res, next) => {
  const tplIndexPath = './views/login.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  res.format({
    html: () => {
      const html = renderIndex({
        title: 'Login',
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })

});

router.get('/add', (req, res, next) => {
  const tplIndexPath = './views/addUser.pug';
  const renderIndex = pug.compileFile(tplIndexPath);
  const html = renderIndex({
    title: 'add'
  });

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  res.format({
    html: () => {
      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html); },
    json: (result) => { res.json(result) }
  });

  res.end();
});

router.get('/:userId', (req, res, next) => {
  const tplIndexPath = './views/showUser.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  users.find({
    where: {
      id: req.params.userId
    }
  }).then( (result) =>
  res.format({
    html: () => {
      const html = renderIndex({
        title: 'show',
        resultName: result.nom,
        resultDateCre: result.createdAt,
        resultDateUpd: result.updateddAt,
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })
  );

});


router.delete('/:userId', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  users.destroy({
    where: {
      id: req.params.userId
    }
  }).then(()=>
  res.format({
    html: () => {
      res.redirect('/users'); },
    json: () => { res.send({ message: 'success !' }) }
  })
  );
});


router.patch('/:userId', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    users.update(
    {
      nom: req.body.nom,
      password: hash
    },
    {
      where: {
        id: req.params.userId
      }
    }
    ).then(()=>
    res.format({
      html: () => {
        res.redirect('/users'); },
      json: () => { res.send({ message: 'success !' }) }
    }));
  });
});

router.get('/:userId/edit', (req, res, next) => {
  const tplIndexPath = './views/editUser.pug';
  const renderIndex = pug.compileFile(tplIndexPath);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  users.find({
    where: {
      id: req.params.userId
    }
  }).then( (result) =>
  res.format({
    html: () => {
      const html = renderIndex({
        title: 'edit',
        user: result,
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })
  );

});

module.exports = router;