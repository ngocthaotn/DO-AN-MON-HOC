const mysql = require('mysql');

const db = mysql.createConnection({
  database: process.env.DATABASE,
  host: 'localhost',
  user: 'root',
  password: ''
});

exports.postComment = async (req, res) => {
  const { namecmt, comment } = req.body;

  db.query ('SELECT * FROM comments', (error, results) => {
    if (error){
      console.log(error);
    }
    else if ( namecmt == '') {
      return res.render('opinion', {
        message: 'Vui lòng nhập tên của bạn'
      });
    }
    else if ( comment == '') {
      return res.render('opinion', {
        message: 'Vui lòng nhập nội dung'
      });
    }
    else {
      res.redirect('/auth/opinion');
    }

    db.query('INSERT INTO comments SET ?',{username: namecmt, comment: comment}, (error, results) => {
      if (error){
        console.log(error);
      }
      else {
        console.log('Thêm bình luận thành công!');
      }
    }); 
  })
};

exports.getComment = async (req, res) => {
  var sqlQuery =  'SELECT * FROM comments';
  db.query(sqlQuery, async (error, results) =>{
    if (error){
      console.log(error);
    } else {
      console.log(results);
      res.render('opinion', {results: results});
    }
  }); 
};