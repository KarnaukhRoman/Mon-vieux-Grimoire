const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImage = (req, res, next) => {
  if (!req.file) return next();

  const inputPath = req.file.path;
  const filename = 'compressed_' + req.file.filename;
  const outputPath = path.join('images', filename);

  sharp(inputPath)
    .resize({ width: 800 })         // зменшуємо ширину
    .jpeg({ quality: 70 })          // стискаємо якість JPEG
    .toFile(outputPath)
    .then(() => {
      // видаляємо оригінал
      fs.unlinkSync(inputPath);

      // оновлюємо req.file
      req.file.filename = filename;
      req.file.path = outputPath;

      next();
    })
    .catch(error => {
      res.status(500).json({ message: 'Image optimization failed', error });
    });
};
module.exports = optimizeImage;