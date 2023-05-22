import express, {Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import path from 'path'
require('dotenv').config();
import cors from 'cors';
import router from './routes/api';
import mongoose from 'mongoose';

const port = process.env.PORT;
mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE as string) // conectando no mongodb
mongoose.Promise = global.Promise; 
mongoose.connection.on('error', (error)=>{ // em caso de erro com a conexão.
    console.log('Erro:'+error.menssage)
})

const server = express();

server.use(cors())// é responsável por fornecer ao Express um middleware que permite lidar com requisições externas.
server.use(express.json())// é um método embutido no express para reconhecer o objeto de solicitação de entrada como um objeto JSON
server.use(express.urlencoded({extended:true}))// é um método embutido no express para reconhecer o objeto de solicitação de entrada como strings ou arrays .

server.use(express.static(__dirname+'/public')) // seta a pasta para arquivos estáticos.

server.use(router)//Usando as rotas do /routes/api

server.use((req:Request, res:Response)=>{//Caso a rota não exista em router, retorna 404, com error.
    res.status(404);
    res.json( { error: 'Endpoint não encontrado.' } )
})

const errorHandler: ErrorRequestHandler = (err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

// Declarando a porta que o server irá ler.
server.listen(port, ()=>{
    console.log(`rodando em: http://localhost:${port}/`)
});