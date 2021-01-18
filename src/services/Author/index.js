const express = require("express")
const router = express.Router()
const AuthorsModel = require("./AuthorsSchema")

router.post('/', async (req, res, next) => {
    try{
        const newAuthor = new AuthorsModel(req.body);
        const {_id} = await newAuthor.save()
        res.status(201).send({id: _id});
    } catch(error){
        console.log(error);
        next(error)
    }
})

router.get("/", async(req, res, next) => {
    try{
        const authors = await AuthorsModel.find(req.query)
        res.send(authors)
    } catch(error){
        console.log(error)
        next(error)
    }
})

router.get("/:id", async(req, res, next) => {
    try{
        const id = req.params.id;
        const author = await AuthorsModel.findById(id)
        if(author){
            res.send(author)
        } else {
            next("i made a BooBoo")
        }
    } catch (error){
        console.log(error)
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
      const author = await AuthorsModel.findByIdAndUpdate(req.params.id, req.body)
      if (author) {
        res.send("Ok")
      } else {
        const error = new Error(`author with id ${req.params.id} not found`)
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      next(error)
    }
  })

  router.delete("/:id", async (req, res, next) => {
    try {
      const author = await AuthorsModel.findByIdAndDelete(req.params.id)
      if (author) {
        res.send("Deleted")
      } else {
        const error = new Error(`author with id ${req.params.id} not found`)
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      next(error)
    }
  })

module.exports = router
