const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

dotenv.config({ path: './.env'});

var mysql = require('mysql');
const db = mysql.createConnection({
  database: process.env.DATABASE,
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect((error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL connected!")
  }
})

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(fileUpload());

//set layout main
app.engine('hbs', exphbs({
  defaultLayout: 'index',
  extname: '.hbs'
}));

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

//url
// var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.urlencoded({extended: false}));
//sent API client
app.use(express.json());

app.set('view engine', 'hbs');

//set view
app.get('/', (req, res) => {
  var sqlQuery =  'SELECT * FROM products';
  db.query(sqlQuery, async (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.render('page', {results: results});
    }
  });
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/logout', (req, res) => {
  res.render('logout');
});
app.get('/add-products', (req, res) => {
  res.render('add-products');
});
app.get('/admin', (req, res) => {
  res.render('admin');
});
app.get('/page-item', (req, res) => {
  res.render('page-item');
});
app.get('/opinion', (req, res) => {
  res.render('opinion');
});
app.get('/update-products', (req, res) => {
  res.render('update-products');
});
app.get('/all-products', (req, res) => {
  var sqlQuery =  'SELECT * FROM products';
  db.query(sqlQuery, async (error, results) =>{
    if (error){
      console.log(error);
    } else {
      res.render('all-products', {results: results});
    }
  });
});

//set partials vao layout phụ
// app.set('products', { layout: 'page' });

app.get('/search',function(req,res){
  db.query('SELECT * FROM products WHERE tieude like "%'+req.query.key+'%"',
  function(err, rows, fields) {
  if (err) throw err;
  var data=[];
  for(i=0;i<rows.length;i++)
  {
    data.push('<div class="search-dropdown"><a href=' + rows[i].linkpage + '>' + rows[i].tieude + '</a></div>');
  }
  res.end(JSON.stringify(data));
  });
});

//routes
app.use('/auth', require('./routes/auth'));
app.use('/add-products', require('./routes/auth'));
app.use('/auth/products', require('./routes/auth'));
app.use('/auth/update-products', require('./routes/auth'));

//port running
var port = 3000;
app.listen(port, () => {
  console.log('Server is running port ' + port);
});


