import { validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Manejar errores de validación de express-validator
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }
    // Si no hay errores, continuar con la siguiente función o middleware
    next();
}