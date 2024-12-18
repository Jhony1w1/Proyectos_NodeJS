import { Link } from 'react-router'

const RegisterPage = () => {
  return (
    <>
        <h1 className='text-white'>Registro</h1>
        <nav>
            <Link to="/auth/login">¿Ya tienes una cuenta? Inicia sesión</Link>
        </nav>
    </>
  )
}

export default RegisterPage