import axios, { AxiosError } from "axios"
import React, { useState } from "react"

const loginData = {
  username: '',
  password: ''
}

export function LogIn(){
  const [valueUsername, setValueUsername] = useState('')
  const [valuePassword, setValuePassword] = useState('')

    const submitLogin = async (event: React.FormEvent) => {
      event.preventDefault()
      loginData.username = valueUsername
      loginData.password = valuePassword

      try{
        console.log(loginData)
          const response = await axios.get('http://localhost:8080/driverslist', {auth: {
            username: valueUsername,
            password: valuePassword
          }})
      } catch(e: unknown){
          const err = e as AxiosError
          console.log(err.message)
      }
    }

    const goToRegistration = async (event: React.FormEvent) => {
      event.preventDefault()

    }

    return(<form id="signin" onSubmit={submitLogin}>
    <div>
        <input type="text" 
        className="border py-2 px-4 mb-2 w-full outline-0" 
        placeholder="Enter login"
        id="user" name="username" 
        value={valueUsername} onChange={event => setValueUsername(event.target.value)}/>
        <input type="password"
        className="border py-2 px-4 mb-2 w-full outline-0" 
        id="pass" name="password" placeholder="Enter password" 
        value={valuePassword} onChange={event => setValuePassword(event.target.value)}/>
    </div>
    <div><a href="/registration" className="button">Registration</a></div>
    <div><button type="submit" className="py-2 px-4 border bg-blue-400 hover: text-white" value="Sign In">Sign in!</button></div>
  </form>)
}