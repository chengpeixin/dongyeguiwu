const mongoose = require('mongoose')
bookList = mongoose.model('KeigoHigashinoNovel'),
  URL = require('url');
class BookList {
  static async getBookList(ctx) {
    const result = await bookList.find(),
      data = [];
    result.forEach((v, i) => {
      data.push({
        img: v.imgSrc,
        bookName: v.bookName,
        summery: v.summery,
        author: v.author,
        chapterNum: i
      })
    })
    ctx.body = {
      data
    }
  }
  static async getBook(ctx) {
    const params = ctx.request.body;
    console.log(ctx.params)
    if (!params.bookName) {
      ctx.body = {
        data: ['无数据']
      }
      return;
    }
    const result = await Question.findOne({
      bookName: params.bookName
    })
    ctx.body = {
      data: result
    }
  }
}

module.exports = BookList;
