import React, { useContext, useState } from "react";
import { CreateGood } from "../components/CreateTask";
import { EditTask } from "../components/EditTask";
import { ErrorMsg } from "../components/ErrorMsg";
import { LoaderMsg } from "../components/LoaderMsg";
import { ModalWindow } from "../components/ModalWindow";
import { Truck } from "../components/Task";
import { ModalContext } from "../context/ModalContext";
import useTrucks, { useTasks } from "../hooks/task";
import { ITask } from "../Models";

export function TaskPage(){
    const {tasks, err, loading, addTask} = useTasks()
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)

    const [uuidValue, setUUIDValue] = useState('')
    const [headerValue, setHeaderValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [parentValue, setParentValue] = useState('')
    const [userValue, setUserValue] = useState('')

    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    const btnClasses = ['py-2 px-4 border items-center', btnBgClassName]

    const createHandler = (task: ITask) => {
        closeModal()
        addTask(task)
    }

    return (
    <div className="container mx-auto w-10/12 pt-5 border rounded-2xl">
        {loading && <LoaderMsg />}
        {err && <ErrorMsg err={err} />}
        {tasks.map(task =>
            <div className="container hover:bg-slate-400 mx-auto ml-1 max-w-1xl border rounded-2xl mb-2 flex flex-col float-left items-center w-1/4" 
            onClick={() => {
                setUUIDValue(task.uuid);
                setHeaderValue(task.header);
                setDescriptionValue(task.description);
                setParentValue(task.parent);
                setUserValue(task.user);
                openModal();
            }}
            key={task.id}>
                <h2>{task.id}) {task.uuid} / {task.header}</h2>
                <h4> Description: {task.description} </h4>
                <h4> Parent: {task.parent} </h4>
                <h4> User: {task.user} </h4>
                <button 
                className={btnClasses.join(' ')} 
                onClick={() => setDetails(prev => !prev)}>Details</button>
                {details && <div>
                    <p>Description: {task.description}</p>
                </div>}
            </div>)} 

        {modal && <ModalWindow title='Save truck' onClose={() => closeModal()}>
            <EditTask onCreate={() => closeModal()} uuidIn={uuidValue} headerIn={headerValue} descriptionIn={descriptionValue} 
            parentIn={parentValue} userIn={userValue} />
        </ModalWindow>}

        <button 
        className='fixed absolute bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl py-2 px-4'
        onClick={() => {
            setUUIDValue('');
            setHeaderValue('');
            setDescriptionValue('');
            setParentValue('');
            setUserValue('');
            openModal();
        }}>+</button>
    </div>
    );
}