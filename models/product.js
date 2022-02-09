const mysql = require('mysql');
const products = [];

const db = mysql.createConnection({
  database: process.env.DATABASE,
  host: 'localhost',
  user: 'root',
  password: ''
});

class Product {
  constructor (id, tieude, noidung, linkpage, linkimage) {
    this.id = id;
    this.tieude = tieude;
    this.noidung = noidung;
    this.linkpage = linkpage;
    this.linkimage = linkimage;
  }
  save() {
    // this.id = Math.floor(Math.random() * 100000);

    var sqlQuery =  'SELECT * FROM products WHERE id = (SELECT MAX(id) FROM products);';
    db.query(sqlQuery, async (error, results) =>{
      if (error){
        console.log(error);
      } else {
        this.id = results[0].id + 1;
      }
    });

    products.push(this);
  }

  static findAll() {
    return products;
  }
  static findById(id) {
    return products.filter(p => p.id == id);
  }
}

module.exports = Product;