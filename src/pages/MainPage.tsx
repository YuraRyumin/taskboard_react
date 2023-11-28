import React, { useContext, useState } from "react"
import { ErrorMsg } from "../components/ErrorMsg"
import { LoaderMsg } from "../components/LoaderMsg"
import { ModalContext } from "../context/ModalContext"
import useMain from "../hooks/main"

export function MainPage(){
    const {tasks, err, loading} = useMain()
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)

    const [numberValue, setNumberValue] = useState('')
    const [capacityValue, setCapacityValue] = useState(0)
    const [statusTruckValue, setStatusTruckValue] = useState(false)
    const [cityValue, setCityValue] = useState('')

    const [uuidValue, setUUIDValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [producerValue, setProducerValue] = useState('')
    const [colorValue, setColorValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [shortDescriptionValue, setShortDescriptionValue] = useState('')
    const [heightValue, setHeightValue] = useState(0)
    const [widthValue, setWidthValue] = useState(0)
    const [lengthValue, setLengthValue] = useState(0)
    const [weightValue, setWeightValue] = useState(0)
    const [priceValue, setPriceValue] = useState(0)

    const [nameCityValue, setNameCityValue] = useState('')

    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    const btnClasses = ['py-2 px-4 border items-center', btnBgClassName]

    return (
        <div className="container mx-auto w-10/12 pt-5 border rounded-2xl">
            {loading && <LoaderMsg />}
            {err && <ErrorMsg err={err} />}
            <div key="DivForDriver">
                {tasks.map(task =>
                <div className="container hover:bg-slate-400 mx-auto max-w-1xl border rounded-2xl mb-2" 
                onClick={() => { 
                    setUUIDValue(task.uuid);
                    setNameValue(task.header);
                    setProducerValue(task.description);
                    setColorValue(task.parent);
                    setDescriptionValue(task.user);
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
            </div>
            <br />
        </div>
    )
}