import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from 'slug';
import { generateJWT } from "../utils/jwt";

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

    const token = generateJWT({ id: user.id })
    res.send(token);
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const { description } = req.body

        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({ handle });
        if (handleExists && handleExists.email !== req.user.email) {
            return res.status(409).json({ error: 'Nombre de usuario no disponible' });
        }

        // Actualizar el usuario
        req.user.description = description
        req.user.handle = handle
        await req.user.save()
        res.send('Perfil actualizado correctamente')

    } catch (e) {
        const error = new Error('Hubon un error')
        return res.status(500).json({ error: error.message })
    }
}
