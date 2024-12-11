import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from 'slug';

export const createAccount = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ error: 'El email ya esta registrado' });
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        return res.status(409).json({ error: 'Nombre de usuario no disponible' });
    }

    // Crear un nuevo usuario
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle // vuelve amigable la url
    // console.log(hash);

    await user.save();

    return res.status(201).json({ msg: 'Registro creado correctamente' });

    //await User.create(req.body); // Creamos un usuario en la base de datos y guardamos
}

export const login = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;

    // comprobar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(409).json({ error: 'El usuario no existe' });
    }

    // comprobar el password
    const isPasswordCorrect = await checkPassword(password, user.password);
    
    if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'El password no es correcto' });
    }
    
    res.send('Login correcto');
}
