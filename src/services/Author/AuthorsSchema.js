const {Schema} = require("mongoose");
const mongoose = require("mongoose")

const AuthorModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
        default: "https://placehold.it/60x60"
    }
});

//schema exported as a model
module.exports = mongoose.model("Author", AuthorModel);