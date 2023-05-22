import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/tokenHandler";

// middleware para fazer a verificação se o usuário está conectado (Utilizando JWT). 
export const AuthToken = async (req:Request, res:Response, next:NextFunction) => {
        let success = false;
        if(req.headers.authorization) { // verifica se foi mandado o token de autorização pelo header
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer' && token) { // verifica se o token é valido
                
                try {
                    if(verifyToken(token)) {
                        success = true;
                    }
                } catch (error) {
                    return res.json({error:'Faça o Login!'})
                }
            }
        }
        if(success) {
            return next();
        } else {
            return res.json({error:'Não Autorizado!'})
        }
    }
