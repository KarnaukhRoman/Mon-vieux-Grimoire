require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const appName = process.env.DB_APP_NAME;
const db_name = process.env.DB_NAME;

const uri = `mongodb+srv://${user}:${password}@${cluster}/${db_name}?retryWrites=true&w=majority&appName=${appName}`;

mongoose.connect(uri)
    .then(() => console.log('Connection to MongoDB successfully'))
    .catch(err => console.error(err));
// mongoose.set('debug', true);
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// templates for working with api

app.post('/api/auth/signup',(req, res, next) => {

});

app.post('/api/auth/login', (req, res, next) => {

});

 app.get('/api/books', (req, res, next) => {
  
 });
 app.get('/api/books/:id', (req, res, next) => {
  
 });
 app.get('/api/books/bestrating', (req, res, next) => {
  
 });
 app.post('/api/books', (req, res, next) => {
 
  
 });

 app.put('/api/books/:id', (req, res, next) => {
  
 });

 app.delete('/api/books/:id', (req, res, next) => {
  
 });
 app.post('/api/books/:id/rating', (req, res, next) => {
  
 });


module.exports = app;