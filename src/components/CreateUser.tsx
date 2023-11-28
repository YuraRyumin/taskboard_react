import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IRole, IUser } from "../Models"
import { ErrorMsg } from "./ErrorMsg"

const userData: IUser = {
    login: '',
    email: '',
    phone: '',
    password: '',
    activationCode: '',
    active: false,
    role: '',
    uuid: ''
}

interface CreateDriverProps {
    onCreate: () => void
}

export function CreateUser({onCreate}: CreateDriverProps){
    const [roles, setRoles] = useState<IRole[]>([])
    const [err, setError] = useState('')

    const [valueLogin, setValueLogin] = useState('')
    const [valueEmail, setValueEmail] = useState('')
    const [valuePhone, setValuePhone] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [valueActivationCode, setValueActivationCode] = useState('')
    const [valueActive, setValueActive] = useState(false)
    const [valueRole, setValueRole] = useState('')
    const [valueUUID, setValueUUID] = useState('')

    async function fetchCitys(){
        try{
            const response = await axios.get<IRole[]>('http://localhost:8080/roleslist')
            setRoles(response.data)
        } catch(e: unknown){
            const err = e as AxiosError
            setError(err.message)
        }
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        if(valueLogin.trim().length == 0){
            setError('Please enter valid login');
        } else if(valueEmail.trim().length == 0){
            setError('Please enter valid e-mail');
        } else if(valuePhone.trim().length == 0){
            setError('Please enter valid personal phone');
        } else if(valuePassword.trim().length == 0){
            setError('Please enter valid password');
        } else if(valueActivationCode.trim().length == 0){
            setError('Please enter valid activation code');
        } else if(valueRole.trim().length == 0){
            setError('Please enter valid role');
        } else if(valueUUID.trim().length == 0){
            setError('Please enter valid UUID');
        } else {
            setError('');
        }

        userData.login = valueLogin
        userData.email = valueEmail
        userData.phone = valuePhone
        userData.password = valuePassword
        userData.active = valueActive
        userData.activationCode = valueActivationCode
        userData.role = valueRole
        userData.uuid = valueUUID

        try{
            const response = await axios.post<IUser>('http://localhost:8080/createuser', userData)
            console.log(response)
        } catch(e: unknown){
            const err = e as AxiosError
            setError(err.message)
        }
        onCreate()
    }

    useEffect(() => {fetchCitys()}, [])

    return (
        <form onSubmit={submitHandler}>
            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter login" 
            value={valueLogin} onChange={event => setValueLogin(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter email" 
            value={valueEmail} onChange={event => setValueEmail(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter phone" 
            value={valuePhone} onChange={event => setValuePhone(event.target.value)}/>

            <input type="password" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter password" 
            value={valuePassword} onChange={event => setValuePassword(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter activation code" 
            value={valueActivationCode} onChange={event => setValueActivationCode(event.target.value)}/>

            <div key="123">
                Status: <input type="checkbox" 
                className="border py-2 px-4 mb-2 outline-0" 
                placeholder="Active" 
                checked={valueActive} onChange={event => setValueActive(event.target.checked)}/>
                
            </div>

            <select 
            className="border py-2 px-4 mb-2 w-full outline-0" placeholder="Select curent city"
            value={valueRole}
            onChange={event => setValueRole(event.target.value)}>
            {roles.map(role =><option value={role.name}>{role.name}</option>)}
            </select>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter UUID" 
            value={valueUUID} onChange={event => setValueUUID(event.target.value)}/>

            <ErrorMsg err={err}/>
            
            <button type="submit" className="py-2 px-4 border bg-blue-400 hover: text-white">Create</button>       
        </form>
    )
}