import { ReactNode } from 'react'

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className='text-red-600 font-bold text-sm'>{children}</p>
  )
}
