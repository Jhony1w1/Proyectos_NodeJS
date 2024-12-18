import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <>
        <div className='bg-slate-800 min-h-screen'>
            <div className=' max-w-lg mx-auto pt-10 px-5'>
                <img src="/logo.svg" alt="Devtree" />

                <div className='py-10'>
                    <Outlet /> {/* This is where the child routes will be rendered */}
                </div>

            </div>
        </div>
    </>
  )
}
