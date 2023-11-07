const mongoose=require("mongoose");
const bookSchema= new mongoose.Schema({
    bookName:{
        required:true,
        type:String,
        unique:true
    },
    price:{
        required:true,
        type:Number
    },
    rating:{
        required:true,
        default:2.5,
        type:Number
    }
});

const bookModel= mongoose.model("bookModel",bookSchema);

module.exports={ bookModel };