const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
  database: process.env.DATABASE,
  host: 'localhost',
  user: 'root',
  password: ''
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status(400).render('login', {
        message: 'Vui lòng cung cấp email và password!'
      });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        res.status(401).render('login', {
          message: 'Email hoặc mật khẩu không hợp lệ!'
        })
      }
      else {
        res.status(200).redirect('/admin');
      }
    })

  } catch (error) {
    console.log(error);
  }
}


exports.register = (req, res) => {
  console.log(req.body);

  const {name, email, password, passwordConfirm} = req.body;
  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if (error){
      console.log(error);
    }
    else if (results.length > 0) {
      return res.render('register', {
        message: 'Email đã tồn tại!'
      });
    }else if (password !== passwordConfirm){
      return res.render('register', {
        message: 'Mật khẩu không trùng khớp!!'
      });
    }else if(email == password) {
      console.log(results);
      return res.render('register', {
        message: 'Email không được trùng password!'
      });
    }else if (password.length < 6){
      console.log(results);
      return res.render('register', {
        message: 'Password phải có ít nhất 6 kí tự!'
      });
    }else {
      res.redirect('/login');
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', {name: name, password: hashedPassword, email: email}, (error, results) => {
      if (error){
        console.log(error);
      } else {
        console.log(results);
        return res.render('register', {
          message: 'Đăng kí tài khoản thành công!!!'
        });
      }
    })
  }); 
}