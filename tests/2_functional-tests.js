/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/json')
          .send({
            title: 'Aristóteles e Dante descobrem os segredos do Universo'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.title, 'Aristóteles e Dante descobrem os segredos do Universo')
            assert.isNotNull(res.body._id)
          })
        done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/json')
          .send({
            title: ''
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.text, 'missing required field title');
          })
        done();
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.isArray(res.type.text);
          })
        done();
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books/0011b281e276e944841ae50273')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.text, 'no book exists');
          })
        done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books/65a2a754a3b79ebb1ca17458')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Aristóteles e Dante descobrem os segredos do Universo');
            assert.equal(res.body._id, '65a2a754a3b79ebb1ca17458');
            assert.equal(res.body.commentcount, 1);
            assert.equal(res.body.comments.length, 1);
          })
        done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .keepOpen()
          .post('/api/books/65a2a754a3b79ebb1ca17458')
          .set('content-type', 'application/json')
          .send({
            comment: 'Very good!'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Aristóteles e Dante descobrem os segredos do Universo');
            assert.equal(res.body._id, '65a2a754a3b79ebb1ca17458');
            assert.equal(res.body.commentcount, 1);
            assert.equal(res.body.comments.length, 1);
          })
        done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .keepOpen()
          .post('/api/books/65a2a754a3b79ebb1ca17458')
          .set('content-type', 'application/json')
          .send({
            comment: ''
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.text, 'missing required field comment')
          })
        done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .post('/api/books/123456a1c9ad87f1f64724c4')
          .set('content-type', 'application/json')
          .send({
            comment: 'oops! no book'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists')
          })
        done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

    
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .delete('/api/books/65a2a754a3b79ebb1ca17458')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful');
          }) 
        done();
      });

      test('Test DELETE /api/books/[id] with id not in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .delete('/api/books/123456310ba708f16b55b648')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
          })
        done();
      });

    });

  });

  after(function() {
    chai.request(server)
      .get('/')
  });
});
