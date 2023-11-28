import React, { useState } from "react";
import {ITask} from '../Models'

interface TaskProps {
    task: ITask
}

export function Truck({task}: TaskProps){
    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    const btnClasses = ['py-2 px-4 border items-center', btnBgClassName]

    return (<div className="container mx-auto ml-1 max-w-1xl border rounded-2xl mb-2 flex flex-col float-left items-center w-1/4" 
        key={task.id}>
                <h2>{task.id}) {task.header}</h2>
                <p>description: {task.description}</p>
                <p>parent: {task.parent}</p>
                <p>user: {task.user}</p>
            </div>
    )
}