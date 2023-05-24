import JWT from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();

export const generateToken = (email:string)=>{ // Cria um token quando é feito o cadastro e toda vez que é feito um login, já que ele expira em 2hrs.
    const token = JWT.sign({email},
        process.env.SECRET_KEY as string, {expiresIn: '2h'});
        return token;
}

export const verifyToken = (token:string)=>{ //Verifica se o token enviado é um token valido e se encontra no BD.
    try {
        JWT.verify(token, process.env.SECRET_KEY as string)
        return true;
    } catch (error) {
        console.log(JWT.verify(token, process.env.SECRET_KEY as string))
        return false;
    }
}