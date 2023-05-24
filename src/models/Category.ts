import mongoose, { Model } from "mongoose";

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String
})

const modelName = 'categories';

let Category: Model<any>;

if (mongoose.connection && mongoose.connection.models[modelName]) {
    Category = mongoose.connection.models[modelName];
} else {
    Category = mongoose.model(modelName, modelSchema);
}

export default Category;