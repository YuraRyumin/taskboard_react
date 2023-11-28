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

interface CreateTuskProps {
    onCreate: () => void,
    uuidIn: string,
    headerIn: string,
    descriptionIn: string,
    parentIn: string,
    userIn: string
}

export function EditTask({onCreate, uuidIn, headerIn, descriptionIn, parentIn, userIn}: CreateTuskProps){
    const [goods, setGoods] = useState<ITask[]>([])
    const [err, setError] = useState('')

    const [valueUUID, setValueUUID] = useState(uuidIn)
    const [valueHeader, setValueHeader] = useState(headerIn)
    const [valueDescription, setValueDescription] = useState(descriptionIn)
    const [valueParent, setValueParent] = useState(parentIn)
    const [valueUser, setValueUser] = useState(userIn)

    async function fetchCitys(){
        // try{
        //     const response = await axios.get<ICity[]>('http://localhost:8080/cityslist')
        //     setCitys(response.data)
        // } catch(e: unknown){
        //     const err = e as AxiosError
        //     setError(err.message)
        // }
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        if(valueUUID.trim().length == 0){
            setError('Please enter valid UUID');
            return;
        } else if(valueHeader.trim().length == 0){
            setError('Please enter valid header');
            return;
        } else if(valueDescription.trim().length == 0){
            setError('Please enter valid description');
            return;
        // } else if(valueParent.trim().length == 0){
        //     setError('Please enter valid parent');
        //     return;
        } else if(valueUser.trim().length == 0){
            setError('Please enter valid user');
            return;
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
            const response = await axios.post<ITask>('http://localhost:8080/savetask', taskData)
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
            <div className="container flex flex-col items-center" 
                key="EditTruckDiv">
                <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter UUID" 
            value={valueUUID} onChange={event => setValueUUID(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter header" 
            value={valueHeader} onChange={event => setValueHeader(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter description" 
            value={valueDescription} onChange={event => setValueDescription(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter parent" 
            value={valueParent} onChange={event => setValueParent(event.target.value)}/>

            <input type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0" 
            placeholder="Enter short height" 
            value={valueUser} onChange={event => setValueUser(event.target.value)}/>

                {/* <select 
                className="border py-2 px-4 mb-2 w-full outline-0" placeholder="Select curent city"
                value={valueCity}
                onChange={event => setValueCity(event.target.value)}>
                {citys.map(city =><option value={city.name}>{city.name}</option>)}
                </select> */}

                <ErrorMsg err={err}/>
                
                <button type="submit" className="py-2 px-4 border bg-blue-400 hover:text-white">Save</button>    
            </div>   
        </form>
    )
}