import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { ITask } from "../Models"

export function useTasks(){
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(false)
    const [err, setError] = useState('')

    function addTask(task: ITask){
        setTasks(prev => [...prev, task])
    }

    async function fetchTasks(){
        try{
            setError('')
            setLoading(true)
            const response = await axios.get<ITask[]>('http://localhost:8080/taskslist')
            setTasks(response.data)
            setLoading(false)
        } catch(e: unknown){
            const err = e as AxiosError
            setLoading(false)
            setError(err.message)
        }
    }

    useEffect(() => {fetchTasks()}, [])

    return {tasks, err, loading, addTask}
}

export default useTasks