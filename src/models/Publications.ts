import mongoose, { Model } from "mongoose";

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,
    idCategory: String,
    title: String,
    body: String,
    datePublication: String
});

const modelName = 'Publications';

let Publication: Model<any>;

if (mongoose.connection && mongoose.connection.models[modelName]) {
    Publication = mongoose.connection.models[modelName];
} else {
    Publication = mongoose.model(modelName, modelSchema);
}

export default Publication;