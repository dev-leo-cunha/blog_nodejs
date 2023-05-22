import mongoose from "mongoose";
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
})

const modelName = 'User'

if(mongoose.connection && mongoose.connection.models[modelName]) { // se tem conexao e se ja tem conexao com o model
    module.exports = mongoose.connection.models[modelName] // cria o model
} else {
    module.exports = mongoose.model(modelName, modelSchema) // se nao, cria o model.
}