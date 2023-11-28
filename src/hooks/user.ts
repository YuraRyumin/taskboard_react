import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../Models"

export function useUsers(){
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(false)
    const [err, setError] = useState('')

    function addUser(user: IUser){
        setUsers(prev => [...prev, user])
    }

    async function fetchUsers(){
        try{
            setError('')
            setLoading(true)
            const response = await axios.get<IUser[]>('http://localhost:8080/userslist')
            setUsers(response.data)
            setLoading(false)
        } catch(e: unknown){
            const err = e as AxiosError
            setLoading(false)
            setError(err.message)
        }
    }

    useEffect(() => {fetchUsers()}, [])

    return {users, err, loading, addUser}
}

export default useUsers