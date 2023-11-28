import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IRole } from "../Models"

export function useRoles(){
    const [roles, setRoles] = useState<IRole[]>([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(false)
    const [err, setError] = useState('')

    function addRole(role: IRole){
        setRoles(prev => [...prev, role])
    }

    async function fetchRoles(){
        try{
            setError('')
            setLoading(true)
            const response = await axios.get<IRole[]>('http://localhost:8080/roleslist')
            setRoles(response.data)
            setLoading(false)
        } catch(e: unknown){
            const err = e as AxiosError
            setLoading(false)
            setError(err.message)
        }
    }

    useEffect(() => {fetchRoles()}, [])

    return {roles, err, loading, addRole}
}

export default useRoles