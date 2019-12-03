const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./book.js');
// var http = require('http');
// var express = require('express');
// var app = express();
// var server = http.Server(app);
// var bodyParser = require('body-parser');
// //var mongo = require('mongodb');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/bootstrap-4.0.0-dist"));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/library", {useNewUrlParser:true});


app.get('/', function(req, res){
    res.render('form');
})


app.post('/add_book', function(req, res){
    let book = new Book(req.body);

    book.save(function(err, data){
        if(err){
            return  res.status(400).json({msg: "Something went wrong"})
        }
        else {
            return res.status(200).json({article:data})
        }
    })
})

app.get('/book/:id', function(req, res){
    Book.find({'_id': req.params.id}, function(err, data){
        if (err){
            return res.status(400).json({msg: 'book not found'});
        }
        // console.log(data);
        return res.status(200).json({msg: data});
    })
})

app.get('/bookview', function(req, res){
    Book.find({}, function(err, data){
        if (err){
            return res.status(400).json({msg: 'Couldn\'t fetch database'});
        }
        else {
            return res.render('bookView', {books: data});
        }
    })
})

app.listen(3000, 'localhost', function(){
    console.log('server listening...')
})