import mongoose, { Model } from "mongoose";

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
})

const modelName = 'User';

let User: Model<any>;

if (mongoose.connection && mongoose.connection.models[modelName]) {
    User = mongoose.connection.models[modelName];
} else {
    User = mongoose.model(modelName, modelSchema);
}

export default User;