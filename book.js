var mongoose = require("mongoose")
var Schema = mongoose.Schema

var bookSchema = new Schema({
      title: {
          type: String,
          required: "must provide title"
      },
      author: {
        type: String, 
        required: "must provide author"
      },
      rating: {
          type: Number,
          required: 'must provide rating'
      }
    }
)

var Book = mongoose.model('Book',bookSchema);

module.exports = Book