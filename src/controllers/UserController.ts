import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

import { generateToken } from "../services/tokenHandler";
import { CompareHash, encryptHash } from "../services/bcryptHash";

const User = require('../models/User')

export const ping = async (req:Request, res:Response) => {res.json({ping:true})}

export const register = async (req:Request, res:Response) =>{
    const errors = validationResult(req) //Pega todos os resultados do Uservalidator
    if(!errors.isEmpty()) { //Se tiver erro, retorna False
        return res.json({error: errors.mapped()});//retorna todos os erros pelo mapped
    }
    
    const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.
    if(data.password !== data.passwordRepeat) {
        return res.json({ error: { password: { msg:'As senhas não batem!'}}})
    }

    const user = await User.findOne({email:data.email}) // tenta achar um usuario no BD com o mesmo email.

    if(user) { // Caso ache um usuario, retorna error.
       return res.json({ error: { email: { msg:'Email ja existente'}}})
    }

    const passwordHash = await encryptHash(data.password) //cryptograda a senha
    const token = generateToken(data.email); // Gera um token unico

    const newUser = new User({ //Adicionando os dados para colocar no BD
        name: data.name,
        email: data.email,
        password: passwordHash,
        token: token
    })
    await newUser.save(); // salvando no BD
    return res.json({token});
}

export const login = async (req:Request, res:Response) => {
    const errors = validationResult(req) //Pega todos os resultados do Uservalidator

    if(!errors.isEmpty()) { //Se tiver erro, retorna False
        return res.json({error: errors.mapped()}) //retorna todos os erros pelo mapped
    }

    const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.

    const user = await User.findOne({email:data.email}) // tenta achar um usuario no BD com o mesmo email.

    if(!user) { // Caso não ache um usuario, retorna error.
       return res.json({ error: { email: { msg:'Email e/ou senha Invalido'}}})
    }

    const match = await CompareHash(data.password, user.password); // comparando a senha enviada com a senha do BD

    if(!match) { // Caso a senha não bata com a do BD, retorna error.
        return res.json({ error: { email: { msg:'Email e/ou senha Invalido'}}})
    }
    let newToken = generateToken(user.email); //Gera um novo token a cada login, ele expira em 2hrs.
    user.token = newToken;
    await user.save();
    return res.json({email: user.email, name: user.name, token: user.token, id:user.id});
    

}

export const edit = async(req:Request, res:Response)=>{
    const errors = validationResult(req) //Pega todos os resultados do Uservalidator

    if(!errors.isEmpty()) { //Se tiver erro, retorna False
        return res.json({error: errors.mapped()}) //retorna todos os erros pelo mapped
    }
    const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.

    const user = await User.findOne({_id: data.idUser})

    if(user) {
        if(data.newPassword) { //Caso tenha um novo password para alterar.
            const passwordHash = await encryptHash(data.newPassword) //cryptograda a senha 
            user.password = passwordHash;
        }
        if(data.newEmail) { // Caso tenha um email para alterar
            const emailVerify = await User.findOne({email:data.newEmail}) //verifica se ja existe um email cadastrado.
            if(emailVerify) { // Caso ache um usuario, retorna error.
                return res.json({ error: { email: { msg:'Email já cadastrado.'}}})
             }
            user.email = data.newEmail;
        }
        if(data.newName) { // Caso tenha um novo nome para alterar.
            user.name = data.newName;
        }
        await user.save();
        return res.json({status:true})

    } else {
        return res.json({error: 'Você precisa estar logado.'})
    }
}