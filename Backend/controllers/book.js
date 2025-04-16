const Book = require('../models/Book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({error}));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({error}));
};

exports.getBooksBestRating = (req, res, next) => {
    Book.find()
    .sort({ averageRating: -1 }) // сортуємо за спаданням рейтингу
    .limit(3) // обмежуємо результат до 3
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({ error }));
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        averageRating: 0,
        ratings: []
    });
    book.save()
    .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
    .catch(error => { res.status(400).json( { error })})  
};

exports.createBookRating = (req, res, next) => {
    const userId = req.auth.userId;
    const rating = Number(req.body.rating);
    const bookId = req.params.id;
    if (rating < 0 || rating > 5){
        return res.status(400).json({ message: 'La note doit être comprise entre 0 et 5.' });
    }
    Book.findOne({_id: bookId})
  .then(book => {
    if (!book) {
      return res.status(404).json({ message: 'Книгу не знайдено' });
    } else {
        const hasAlreadyRated = book.ratings.some(r => r.userId === userId);
        if (hasAlreadyRated){
            return res.status(400).json({ message: 'Користувач вже оцінив цю книгу.' });
        } else {
            book.ratings.push({userId, grade: rating})
            const total = book.ratings.reduce((acc, r) => acc + r.grade, 0);
            book.averageRating = total / book.ratings.length;
            book.save()
            .then((book) => { res.status(201).json(book)})
            .catch(error => { res.status(400).json( { error })})  
        }
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject.userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre mis à jour avec succès'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};