// const express = require('express');
import express from 'express'; // esm syntax
// file extensions needed, except modules don't require express.js
import path from 'path';
// const path = require('path'); // es5/cjs syntax
import Task from '../models/db.js'
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve('./index.html')); //dirname - current working directory
})

app.get('/main.js', (req, res) => {
    return res.status(200).sendFile(path.resolve('./main.js'));
})

app.post('/list', (req, res) => {
  const { name } = req.body; // same as: const name = req.body.name
    console.log('post request received from client');
    console.log(req.body);
    Task.create( { name: name } ) // is asynchronous (will return a Promise)
        .then(response => {
            console.log(response);
            return res.status(200).json("create request sent");
        })
        .catch(err => {
            console.log(err);
            return res.status(404).send("something bad happened");
        })
})

app.delete('/list', (req, res) => {
    console.log('in delete');
    const { _id } = req.body;
    Task.findOneAndDelete( { _id } )
          .then(response => {
              console.log(response);
              return res.status(200).json(response);
          })
          .catch(err => {
              console.log(err);
              return res.status(404).send("something bad happened");
          })
  })

  app.put('/list', (req, res) => {
    const { _id, name } = req.body;
    Task.updateOne( { _id }, { name } )
          .then(response => {
              console.log(response);
              return res.sendStatus(200)
          })
          .catch(err => {
              console.log(err);
              return res.status(404).send("something bad happened");
          })
  })

  app.get('/list', (req, res) => {
    Task.find()
          .then(response => {
              console.log(response);
              return res.status(200).json(response);
          })
          .catch(err => {
              console.log(err);
              return res.status(404).send("something bad happened");
          })
  })



app.listen(PORT, () => {
    console.log('listening on port 3000')
});