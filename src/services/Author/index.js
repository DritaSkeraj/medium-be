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

module.exports = router
