const {Schema} = require("mongoose");
const mongoose = require("mongoose")

const AuthorSchema = new Schema({
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

//this is a model not a schema
module.exports = mongoose.model("Author", AuthorSchema);