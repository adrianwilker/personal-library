'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const BookModel = require('../models').Book;
require('../db-connection');


module.exports = function (app) {

  app.route('/api/books')

  
    .get(function (req, res){

      BookModel.find().then((books) => {
        let mappedData = books.map((item) => item);
        res.json(mappedData);
      })

      
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res) {
      let title = req.body.title;

      if (!title) {
        res.send("missing required field title");
      } else {
        const newBook = new BookModel({
          title: title,
          commentcount: 0,
          comments: []
        });
  
        newBook.save()
          .then((savedBook) => {
            res.json({ title: savedBook.title, _id: savedBook._id});
          })
          
      }



    })

    
    .delete(function(req, res){
      BookModel.deleteMany({}).then((result) => {
        res.send("complete delete successful")
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;

      BookModel.findOne({ _id: bookid }).then((bookData) => {
        if(!bookData) {
          res.send("no book exists")
        } else {
          res.json(bookData)
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      if(!comment) {
        res.send("missing required field comment");
      } else {
        BookModel.findOne({ _id: bookid }).then((bookData) => {
          if(!bookData) {
            res.send("no book exists");
          } else {
            bookData.comments.push(comment)
            bookData.commentcount += 1
            bookData.save().then((savedBook) => {
              res.json(savedBook)
            })
          }
        })
      }
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;

      BookModel.findOne({ _id: bookid }).then((bookData) => {
        if(!bookData) {
          res.send("no book exists")
        } else {
          bookData.deleteOne().then((deletedBook) => {
            res.send("delete successful")
          })
        }
      })
      //if successful response will be 'delete successful'
    });
  
};
