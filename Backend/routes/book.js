const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const optimizeImg = require('../middleware/optimizeImage')
const bookCtrl = require('../controllers/book');


router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBooksBestRating);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, multer, optimizeImg, bookCtrl.createBook);
router.put('/:id', auth, multer, optimizeImg, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.createBookRating);


module.exports = router;