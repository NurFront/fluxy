'use client'

import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/app/firebase'
import { useRouter } from 'next/navigation'

const SignUp = () => {

  const { replace } = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [copyPassword, setCopyPassword] = useState("")
  const [error, setError] = useState("")
  function register(e: React.FormEvent) {
    e.preventDefault()
    if(copyPassword != password) {
      setError("Пароли не совпадают!")
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      setError("")
      setEmail("")
      setCopyPassword("")
      setPassword("")
      replace('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <form action="" onSubmit={register}>
        <h1>Create in account</h1>
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="email" />

        <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}type="password" 
        />

        <input
        value={copyPassword} 
        onChange={(e) => setCopyPassword(e.target.value)} type="password" />
        <button>Создать</button>
      </form>
    </div>
  )
}

export default SignUp