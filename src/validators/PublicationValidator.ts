import { checkSchema } from "express-validator";

export const add = checkSchema({
        title: {
            notEmpty:true, // Não pode estar vazio
            trim:true, // remove os espaços do começo e fim da string
            isLength: { options: { min: 2 } },  // mínimo de caracters
            errorMessage: 'O titulo precisa ter pelo menos 2 caracteres' // mensagem de erro, se houver.
        },
        body: {
            notEmpty:true,// Não pode estar vazio
            isLength: { options: { min: 10 } },  // mínimo de caracters
            errorMessage:'O texto precisa ter no mínimo 20 caractes' // mensagem de erro, se houver.
        },
        category: {
            notEmpty:true, // Não pode estar vazio
            errorMessage: 'Selecione uma categoria' // mensagem de erro, se houver.
        }
    })

    export const edit = checkSchema({
        title: {
            optional:true,
            trim:true, // remove os espaços do começo e fim da string
            isLength: { options: { min: 2 } },  // mínimo de caracters
            errorMessage: 'O titulo precisa ter pelo menos 2 caracteres' // mensagem de erro, se houver.
        },
        body: {
            optional:true,
            isLength: { options: { min: 10 } },  // mínimo de caracters
            errorMessage:'O texto precisa ter no mínimo 20 caractes' // mensagem de erro, se houver.
        },
    })