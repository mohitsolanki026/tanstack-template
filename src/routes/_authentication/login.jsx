import { useAuth } from '@/lib/auth/authentication'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_authentication/login')({
  component: Login
})

function Login() {

  const [errors, setErrors] = useState()

  const {login, user, isError} = useAuth({
    middleware:"guest",
    redirectIfAuthenticated:"/"
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password);

    login.mutate({
      email,
      password,
      setErrors
    })

  }

  return (
    <div>
      <p>{errors}</p>
      <form onSubmit={handleSubmit} >
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}