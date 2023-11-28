import axios, { AxiosError } from "axios"
import { useState } from "react"
import { IRole } from "../Models"
import { ErrorMsg } from "./ErrorMsg"

const roleData: IRole = {
    name: ''
}

interface CreateRoleProps {
    onCreate: () => void
}

export function CreateRole({onCreate}: CreateRoleProps){
    const [err, setError] = useState('')

    const [valueName, setValueName] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        if(valueName.trim().length == 0){
            setError('Please enter valid name');
        } else {
            setError('');
        }

        roleData.name = valueName

        try{
            const response = await axios.post<IRole>('http://localhost:8080/createrole', roleData)
            console.log(response)
        } catch(e: unknown){
            const err = e as AxiosError
            setError(err.message)
        }
        onCreate()
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter cargo name" 
            value={valueName} onChange={event => setValueName(event.target.value)}/>

            <ErrorMsg err={err}/>
            
            <button type="submit" className="py-2 px-4 border bg-blue-400 hover: text-white">Create</button>       
        </form>
    )
}