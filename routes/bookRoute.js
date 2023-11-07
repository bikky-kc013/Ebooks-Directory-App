const express = require("express");
const { bookModel } = require("../models/bookModels");
const { validateSchema } = require("../utils/schemaValidator");
const createError = require("http-errors");
const router = express.Router();



//This route is for adding the book in the directory
router.post("/addBook", async (req, res, next) => {
  try {
    const getBooks = await validateSchema.validateAsync(req.body);
    if (!getBooks)
      throw createError.BadRequest(
        "Please provide the full information of the books."
      );
    const doesExist = await bookModel.findOne({ bookName: getBooks.bookName });
    if (doesExist)
      throw createError.Conflict("This book already exists in the directory");
    const newBook = new bookModel(getBooks);
    const saveBooks = await newBook.save();
    res.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
});



//This route is for searching the book by it's Id
router.get("/:bookId", async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const getBook=await bookModel.findById(bookId);
    if(!getBook) throw createError.NotFound();
    res.send(getBook);
   } catch (error) {
    if(error.name==='CastError'){
     return res.sendStatus(400);;
    }
    next(error);
  }
});

//this route is for searching the book by it's id and updating the book 
router.put('/updateBook/:bookId',async(req,res,next)=>{
    try{
        const bookId = req.params.bookId;
        const updatedBook=await validateSchema.validateAsync(req.body);
        const updateBook= await bookModel.findByIdAndUpdate(bookId,updatedBook,{ new: true }); // a small bug fixed by setting the new to true 
        const saveUpdatedBook=await updateBook.save();
        res.status(200).json({
            message:"successfully Updated",
            details:updateBook
        });         

    }catch(error){
        next(error);
    };
});


//this route is for deleting the book by it's id 
router.delete('/deleteBook/:bookId',async(req,res,next)=>{
    try{
        const bookId = req.params.bookId;
        const deleteBook=await bookModel.findByIdAndDelete(bookId);
        res.json({
            message:"Successfully deleted the book"
        });   
    }catch(error){
        next(error);
    }
})

module.exports = { router };
