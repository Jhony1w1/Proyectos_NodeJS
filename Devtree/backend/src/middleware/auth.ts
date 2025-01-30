import { validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from 'jsonwebtoken';

// reeinscribiendo la sintxis de express

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {

    // Manejar errores de validación de express-validator
    let errors = validationResult(req);
    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message })
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message })
        return
    }


    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)

        if (typeof result === 'object') {
            const user = await User.findById(result.id).select('-password')
            if (!user) {
                const error = new Error("El usuario no existe")
                res.status(404).json({ error: error.message })
                return
            }
            req.user = user
            // Si no hay errores, continuar con la siguiente función o middleware
            next();
        }
    } catch (error) {
        res.status(500).json({ error: "token no válido" })
    }


}
