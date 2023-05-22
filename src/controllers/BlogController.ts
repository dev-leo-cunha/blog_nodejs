import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { newDate } from "../services/formDate";
const Publication = require('../models/Publications')
const User = require('../models/User')
const Category = require('../models/Category')

export const AllPublication = async (req:Request, res:Response)=>{
    let publications = await Publication.find({}); // puxa todas as publicações do blog
    let listPubli: string[] = [];

    for(let i in publications) {
        listPubli.push(publications[i])
    }
    return res.json({list:listPubli})
}

export const addPublication = async (req:Request, res:Response)=>{
    if(req.headers.authorization) {
        const [authType, token] = req.headers.authorization.split(' ')

        const user = await User.findOne({token})

        const errors = validationResult(req) //Pega todos os resultados do Uservalidator
        if(!errors.isEmpty()) { //Se tiver erro, retorna False
            return res.json({error: errors.mapped()}) //retorna todos os erros pelo mapped
        }
        const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.

        const category = await Category.findOne({name: data.category}) //Pega a categoria

        const newPublication = new Publication({
            idUser: user.id,
            title: data.title,
            body: data.body,
            idCategory: category.id,
            datePublication: newDate()
        })
        await newPublication.save();
        return res.json({newPublication})
    }
}

export const deletePublication = async (req:Request, res:Response)=>{
    const errors = validationResult(req) //Pega todos os resultados do Uservalidator
        if(!errors.isEmpty()) { //Se tiver erro, retorna False
            return res.json({error: errors.mapped()}) //retorna todos os erros pelo mapped
        }
        const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.

        await Publication.deleteOne({_id: data.idPubli}) // Deleta a publicação onde o data.idPubli, que é o id da publicação recebido do front, seja igual o _id do BD

        return res.json({status:true})

}

export const editPublication = async (req:Request, res:Response)=>{
    const errors = validationResult(req) //Pega todos os resultados do Uservalidator
        if(!errors.isEmpty()) { //Se tiver erro, retorna False
            return res.json({error: errors.mapped()}) //retorna todos os erros pelo mapped
        }
        const data = matchedData(req) // Caso não ocorra erro, salva os dados na constante data.
        
        let publi = await Publication.findOne({_id:data.idPubli})

        if(publi) {
            if(data.title) {publi.title = data.title}// Caso tenha um titulo para substituir
            if(data.body) {publi.body = data.body;}  // Caso tenha um corpo do texto para substituir

            await publi.save(); // Após alterar, salva a publicação.

            return res.json({status:true})
        } else {
            return res.json({error: 'Publicação não encontrada, tente novamente.'})
        }
        

}

