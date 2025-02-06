import { Router } from 'express';
import { body } from 'express-validator'
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticated } from './middleware/auth';

const router = Router();

// Autenticación y registro
router.post('/auth/register',

    body(['handle', 'name', 'email', 'password'])
        .trim()
        .notEmpty()
        .withMessage('Este campo es obligatorio'),
    body('email')
        .isEmail()
        .withMessage('Correo inválido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors, // Middleware para manejar errores de validación
    createAccount);

router.post('/auth/login',
    body(['email', 'password'])
        .trim()
        .notEmpty()
        .withMessage('Este campo es obligatorio'),
    handleInputErrors, // Middleware para manejar errores de validación
    login);

router.get('/user', authenticated, getUser)

router.patch('/user',
    body(['handle', 'description'])
        .trim()
        .notEmpty()
        .withMessage('Este campo es obligatorio'),
    handleInputErrors,
    authenticated,
    updateProfile
)

router.post('/user/image',
    authenticated,
    uploadImage
)

export default router; // Exportamos el router de express