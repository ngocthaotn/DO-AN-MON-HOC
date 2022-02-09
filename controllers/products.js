const mysql = require('mysql');

const db = mysql.createConnection({
  database: process.env.DATABASE,
  host: 'localhost',
  user: 'root',
  password: ''
});

exports.getProduct = (req, res) => {
  res.render('add-products');
}

exports.postProduct = (req, res) => {
  const { tieude, trichdan, noidung, linkpage} = req.body;

  if ( tieude == '') {
    return res.render('add-products', {
      message: 'Vui lòng nhập tiêu đề'
    });
  }
  else if ( trichdan == '') {
    return res.render('add-products', {
      message: 'Vui lòng nhập trích dẫn'
    });
  }
  else if ( noidung == '' ) {
    return res.render('add-products', {
      message: 'Vui lòng nhập nội dung'
    });
  }
  // else if (linkpage == '' ) {
  //   return res.render('add-products', {
  //     message: 'Vui lòng nhập link bài viết'
  //   });
  // }
  else {
    if (req.files) {
      var file = req.files.linkimage;
      var file_name = file.name;
  
      file.mv('public/img/products/' + file_name, function(error){
        if(error) {
          res.send(error);
        }
        else {
          db.query('INSERT INTO products SET ?',{tieude: tieude, noidung: noidung, linkpage: linkpage, linkimage: 'img/products/' + file_name, trichdan: trichdan}, (error, results) => {
            if (error){
              console.log(error);
            }
            else {
              console.log('Thêm bài viết thành công!');
              res.redirect('/');
            }
          });     
        }
      })
    }
    else {
      return res.render('add-products', {
        message: 'Vui lòng chọn ảnh bài viết'
      });
    }
  }
}

exports.getProductDetails = (req, res) => {
  var sqlQuery =  'SELECT * FROM products WHERE id = ?';
  db.query(sqlQuery, [req.params.id] , (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.render('page-item', {prod: results});
    }
  });
}

exports.getAllProductDetails = (req, res) => {
  var sqlQuery = 'SELECT * FROM products';
  db.query(sqlQuery, (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.render('all-products', {results: results});
    }
  });
}

exports.getUpdateProduct = async (req, res) => {
  var sqlQuery =  'SELECT * FROM products WHERE id = ?';
  db.query(sqlQuery, [req.params.id] , (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.render('update-products', {prod: results});
    }
  });
};

exports.postUpdateProduct = async (req, res) => {
  const { tieude, trichdan, noidung, linkpage} = req.body;

  if (req.files) {
    var file = req.files.linkimage;
    var file_name = file.name;

    file.mv('public/img/products/' + file_name, function(error){
      if(error) {
        res.send(error);
      }
      else {
        db.query('UPDATE products SET ? WHERE id = '+ req.body.id +'',{tieude: tieude, noidung: noidung, linkpage: linkpage, linkimage: 'img/products/' + file_name, trichdan: trichdan},function(error, results){
          if (error){
            console.log(error);
          }
          else {
            res.redirect('/all-products');
          }
        });     
      }
    })
  }
};

exports.deleteProduct = async (req, res) => {
  var sqlQuery = 'DELETE FROM products WHERE id = ?';
  db.query(sqlQuery, [req.params.id] , (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.redirect('/all-products');
    }
  }); 
};
