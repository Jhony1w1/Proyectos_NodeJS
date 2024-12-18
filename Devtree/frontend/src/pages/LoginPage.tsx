import { Link } from 'react-router'

const LoginPage = () => {
  return (
    <>
        <h1 className='text-white'>Login</h1>
        <nav>
            <Link to="/auth/register">
                ¿No tienes cuenta? Crea una aquí
            </Link>
        </nav>
    </>
  )
}

export default LoginPage