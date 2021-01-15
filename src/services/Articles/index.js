const express = require("express")
const router = express.Router()
const ArticlesModel = require("./schema")

router.post('/', async (req, res, next) => {
    try{
        const newArticle = new ArticlesModel(req.body);
        const {_id} = await newArticle.save()
        res.status(201).send({id: _id});
    } catch(error){
        console.log(error);
        next(error)
    }
})

router.get("/", async(req, res, next)=>{
    try{
        const articles = await ArticlesModel.find().populate("author");//sends author object too
        res.status(200).send({articles})
    } catch(error){
        next(error)
    }
}) 



module.exports = router
