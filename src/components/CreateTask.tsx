import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { ITask } from "../Models";
import { ErrorMsg } from "./ErrorMsg";

const taskData: ITask = {
    uuid: '',
    header: '',
    description: '',
    parent: '',
    user: ''
}

interface CreateTruckProps {
    onCreate: () => void
}

export function CreateGood({onCreate}: CreateTruckProps){
    const [citys, setCitys] = useState<ITask[]>([])
    const [err, setError] = useState('')

    const [valueUUID, setValueUUID] = useState('')
    const [valueHeader, setValueHeader] = useState('')
    const [valueDescription, setValueDescription] = useState('')
    const [valueParent, setValueParent] = useState('')
    const [valueUser, setValueUser] = useState('')

    async function fetchCitys(){
        try{
            const response = await axios.get<ITask[]>('http://localhost:8080/cityslist')
            setCitys(response.data)
        } catch(e: unknown){
            const err = e as AxiosError
            setError(err.message)
        }
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        if(valueUUID.trim().length == 0){
            setError('Please enter valid UUID');
        } else if(valueHeader.trim().length == 0){
            setError('Please enter valid header');
        } else if(valueDescription.trim().length == 0){
            setError('Please enter valid description');
        // } else if(valueParent.trim().length == 0){
        //     setError('Please enter valid parent');
        } else if(valueUser.trim().length == 0){
            setError('Please enter valid user');
        } else {
            setError('');
        }

        taskData.uuid = valueUUID
        taskData.header = valueHeader
        taskData.description = valueDescription
        taskData.parent = valueParent
        taskData.user = valueUser

        console.log(taskData)
        try{
            const response = await axios.post<ITask>('http://localhost:8080/createtask', taskData)
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
            placeholder="Enter UUID" 
            value={valueUUID} onChange={event => setValueUUID(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter name" 
            value={valueHeader} onChange={event => setValueHeader(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter description" 
            value={valueDescription} onChange={event => setValueDescription(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter short description" 
            value={valueParent} onChange={event => setValueParent(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter short description" 
            value={valueUser} onChange={event => setValueUser(event.target.value)}/>

            {/* <select 
            className="border py-2 px-4 mb-2 w-full outline-0" placeholder="Select curent city"
            value={valueCity}
            onChange={event => setValueCity(event.target.value)}>
            {citys.map(city =><option value={city.name}>{city.name}</option>)}
            </select> */}

            <ErrorMsg err={err}/>
            
            <button type="submit" className="py-2 px-4 border bg-blue-400 hover: text-white">Create</button>       
        </form>
    )
}