const mongoose = require('mongoose')
Schema = mongoose.Schema;

const book_schema = new Schema({
  id: {
    type: Number
  },
  text: [{
    text: [String],
    title: String
  }],
  imgSrc: String,
  bookId: Number,
  bookName: String,
  summery: String,
  author: String,
  href: String
})
book_schema.pre('save', function (next) {
  next()
})

mongoose.model('KeigoHigashinoNovel', book_schema)
