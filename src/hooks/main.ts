import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { ITask } from "../Models"

export function useMain(){
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(false)
    const [err, setError] = useState('')

    function addTask(task: ITask){
        setTasks(prev => [...prev, task])
    }

    async function fetchTasks(){
        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:8080',
            headers: {
                Authorization: 'Basic YWRtaW46MTIz',//`Bearer YWRtaW46MTIz`,
            },
            params: {}
        }
        try{
            setError('')
            setLoading(true)
            const response = await axios.get('http://localhost:8080/driverbylogin/admin')// axios.get('http://localhost:8080/driverbylogin/admin')//axios.get('http://localhost:8080/driverslist')
            console.log(response)
            setTasks(response.data)
            setLoading(false)
        } catch(e: unknown){
            console.log(e)
            const err = e as AxiosError
            setLoading(false)
            setError(err.message + "_" + err.stack + "_" + err.cause)
        }
    }

    useEffect(() => {fetchTasks()}, [])

    return {tasks, err, loading}
}

export default useMain