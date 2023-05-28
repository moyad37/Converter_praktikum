"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Schema, model, connect } from 'mongoose';
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Conversion = new Schema({
    number: Number,
    character: String,
    createdAt: Date
});
//Create a model bassed on that schema
const Article = mongoose_1.default.model("Article", Conversion);
// ready to go!
// export the model
exports.default = Article;
//module.exports = Article;
