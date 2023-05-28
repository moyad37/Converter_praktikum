//import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const Conversion  = new Schema ({
    number: Number,
    character: String,
    createdAt: Date
});

//Create a model bassed on that schema
const Article = mongoose.model("Article", Conversion);
// ready to go!

// export the model
export default Article
//module.exports = Article;