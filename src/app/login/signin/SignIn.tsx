'use client'

import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const { replace } = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function login(e: React.FormEvent) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        setError("")
        setEmail("")
        setPassword("")
        replace('/')
      })
      .catch((error) => {
        console.log(error)
        setError("Простите, но такого аккаунта нету!")
      })
  }

  return (
    <div>
      <form onSubmit={login}>
        <h1>Login in account</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit">Войти</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default SignIn
