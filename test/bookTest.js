process.env.NODE_ENV = 'test';

let Book = require('../api/Books/models/book');
let chai = require('chai');
let chaiHttp = require('chai-http');
const constant = require('../utils/constant');
let API = 'http://localhost:3001';
let should = chai.should();
global.id = 'test';

chai.use(chaiHttp);

describe('Books', () => {
    // beforeEach(async(done) => {
    //     // await Book.deleteMany();  
    //      done();      
    // });
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
            chai.request(API)
            .get('/book')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                //   res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST book', () => {
      it('it should not POST a book without pages field', (done) => {
          let book = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954
          }
            chai.request(API)
            .post('/book')
            .send(book)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a book ', (done) => {
          let book = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954,
              pages: 1170
          }
            chai.request(API)
            .post('/book')
            .send(book)
            .end((err, res) => {
                global.id=res.body.book._id;
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Book successfully added!');
                  res.body.book.should.have.property('title');
                  res.body.book.should.have.property('author');
                  res.body.book.should.have.property('pages');
                  res.body.book.should.have.property('year');
              done();
            });
      });
  });
  describe('/GET/:id book', () => {
      it('it should GET a book by the given id', (done) => {
        chai.request(API)
        .get('/book/'+global.id)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('author');
              res.body.should.have.property('pages');
              res.body.should.have.property('year');
              res.body.should.have.property('_id').eql(global.id);
          done();
        });
      });
  });
  describe('/PUT/:id book', () => {
      it('it should UPDATE a book given the id', (done) => {
          let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
          chai.request(API)
          .put('/book/' + global.id)
          .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book updated!');
                res.body.book.should.have.property('year').eql(1950);
            done();
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id book', () => {
      it('it should DELETE a book given the id', (done) => {
          let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
          chai.request(API)
          .delete('/book/' + global.id)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book successfully deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
  });
});