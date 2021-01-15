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
        console.log(error)
        next(error)
    }
}) 

router.get("/:id", async(req, res, next) => {
    try{
        const article = await ArticlesModel.findById(req.params.id).populate("author")//author should be same as the property name
        res.status(200).send({article})
    }catch(error){
        console.log(error)
        next(error)
    }
})

router.put("/:id", async(req, res, next) => {
    try{
        const article = await ArticlesModel.findByIdAndUpdate(req.params.id, req.body, 
            {
                runValidators: true,
                new: true,
            })
        if(article)
            res.status(200).send({article})
        else{
            const error = new Error(`User with id ${req.params.id} not found`);
            error.httpStatusCode = 404
            next(error)
        }
    }catch(error){
        console.log(error)
        next(error)
    }
})

router.delete("/:id", async(req, res, next) => {
    try{
        const article = await ArticlesModel.findByIdAndDelete(req.params.id)
        if(article){
            res.status(200).send({article})
        } else {
            const error = new Error(`User ${req.params.id} not found`)
            error.httpStatusCode = 404
            next(error)
        }
    }catch(error){
        console.log(error);
        next(error)
    }
})
module.exports = router
