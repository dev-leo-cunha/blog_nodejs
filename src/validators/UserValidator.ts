import { checkSchema } from "express-validator";

export const signup = checkSchema({
        name: {
            notEmpty:true, // Não pode estar vazio
            trim:true, // remove os espaços do começo e fim da string
            isLength: { options: { min: 2 } },  // mínimo de caracters
            errorMessage: 'O Nome precisa ter pelo menos 2 caracteres' // mensagem de erro, se houver.
        },
        email: {
            notEmpty:true,// Não pode estar vazio
            isEmail:true, // verifica se é um email valido
            normalizeEmail:true, // altera as letras maiusculas e tira os espaçamentos
            errorMessage:'Email Inválido' // mensagem de erro, se houver
        },
        password: {
            notEmpty:true,// Não pode estar vazio
            isLength: { options: { min:4 } },// mínimo de caracters
            errorMessage: 'A senha precisa ter pelo menos 4 caracteres'// mensagem de erro, se houver.
        },
        passwordRepeat: {
            notEmpty:true,// Não pode estar vazio
            isLength: { options: { min:4 } },// mínimo de caracters
            errorMessage: 'A senha precisa ter pelo menos 4 caracteres'// mensagem de erro, se houver.
        }
    })
export const signin = checkSchema({
        email: {
            notEmpty:true,// Não pode estar vazio
            isEmail:true, // verifica se é um email valido
            normalizeEmail:true, // altera as letras maiusculas e tira os espaçamentos
            errorMessage:'Email e/ou senha Inválido' // mensagem de erro, se houver
        },
        password: {
            notEmpty:true,// Não pode estar vazio
            isLength: { options: { min:4 } },// mínimo de caracters
            errorMessage: 'A senha precisa ter pelo menos 4 caracteres'// mensagem de erro, se houver.
        }
    })

export const edit = checkSchema({
        newName: {
            optional:true, // Não pode estar vazio
            trim:true, // remove os espaços do começo e fim da string
            isLength: { options: { min: 2 } },  // mínimo de caracters
            errorMessage: 'O Nome precisa ter pelo menos 2 caracteres' // mensagem de erro, se houver.
        },
        newEmail: {
            optional:true,// Não pode estar vazio
            isEmail:true, // verifica se é um email valido
            normalizeEmail:true, // altera as letras maiusculas e tira os espaçamentos
            errorMessage:'Email Inválido!' // mensagem de erro, se houver
        },
        newPassword: {
            optional:true, // Não pode estar vazio
            isLength: { options: { min:4 } },// mínimo de caracters
            errorMessage: 'A senha precisa ter pelo menos 4 caracteres'// mensagem de erro, se houver.
        }
    })
