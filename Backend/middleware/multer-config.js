const multer = require('multer');
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(' ').join('_');
    const nameWithoutExt = path.parse(file.originalname).name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // callback(null, name + Date.now() + '.' + extension);
    callback(null, `${nameWithoutExt}_${Date.now()}.${extension}`);
  }
});

module.exports = multer({storage: storage}).single('image');
