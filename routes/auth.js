const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const pageController = require('../controllers/products')
const pageitemController = require('../controllers/page-item')

router.use(express.static('public'))
router.use('/css', express.static(__dirname + 'public/css'))
router.use('/js', express.static(__dirname + 'public/js'))
router.use('/img', express.static(__dirname + 'public/img'))
router.use('/owl', express.static(__dirname + 'public/owl'))

router.post('/add-products', pageController.postProduct);
router.get('/add-products', pageController.getProduct);

router.post('/update-products', pageController.postUpdateProduct);
router.get('/update-products/:id', pageController.getUpdateProduct);

router.get('/delete-products/:id', pageController.deleteProduct);

router.get('/products/:id', pageController.getProductDetails);
router.get('/all-products', pageController.getAllProductDetails);

// router.post('/products/:id', pageController.loadComment);
// router.get('/products', pageController.getComment);

router.post('/opinion', pageitemController.postComment);
router.get('/opinion', pageitemController.getComment);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;