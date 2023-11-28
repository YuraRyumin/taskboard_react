import React, { useContext, useState } from "react"
import { CreateUser } from "../components/CreateUser"
import { EditUser } from "../components/EditUser"
import { ErrorMsg } from "../components/ErrorMsg"
import { LoaderMsg } from "../components/LoaderMsg"
import { ModalWindow } from "../components/ModalWindow"
import { User } from "../components/User"
import { ModalContext } from "../context/ModalContext"
import useUsers from "../hooks/user"
import { IUser } from "../Models"

export function UserPage(){
    const {users, err, loading, addUser} = useUsers()
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)

    const [loginValue, setLoginValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [activationCodeValue, setActivationCodeValue] = useState('')
    const [activValue, setActivValue] = useState(false)
    const [roleValue, setRoleValue] = useState('')
    const [uuidValue, setUUIDValue] = useState('')

    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-blue-400' : 'bg-yellow-400' 
    const btnClasses = ['py-2 px-4 border', btnBgClassName]

    const createHandler = (user: IUser) => {
        closeModal()
        addUser(user)
    }

    return (
    <div className="container mx-auto max-w-2xl pt-5">
        {loading && <LoaderMsg />}
        {err && <ErrorMsg err={err} />}
        {users.map(user =>
            <div className="container hover:bg-slate-400 mx-auto max-w-1xl border rounded-2xl mb-2" 
            onClick={() => {
                setLoginValue(user.login);
                setEmailValue(user.email);
                setPhoneValue(user.phone);
                setPasswordValue(user.password);
                setActivationCodeValue(user.activationCode);
                setActivValue(user.active);
                setRoleValue(user.role);
                setUUIDValue(user.uuid);
                openModal();
            }}
            key={user.id}>
                <h2>{user.id}) {user.login}</h2>
                <button 
                className={btnClasses.join(' ')} 
                onClick={() => setDetails(prev => !prev)}>Details</button>
                {details && <div>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Active: {user.active}</p>
                    <p>Role: {user.role}</p>
                    <p>UUID: {user.uuid}</p>
                    <p>Activation code: {user.activationCode}</p>
                </div>}
            </div>)} 

        {modal && <ModalWindow title='Save user' onClose={() => closeModal()}>
            <EditUser onCreate={() => closeModal()} loginIn={loginValue} emailIn={emailValue} phoneIn={phoneValue}
                passwordIn={passwordValue} activationCodeIn={activationCodeValue} activeIn={activValue}
                roleIn={roleValue} uuidIn={uuidValue} />
        </ModalWindow>}

        <button 
        className='fixed absolute bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl py-2 px-4'
        onClick={() => {
            setLoginValue('');
            setEmailValue('');
            setPhoneValue('');
            setPasswordValue('');
            setActivationCodeValue('');
            setActivValue(false);
            setRoleValue('');
            setUUIDValue('');
            openModal();
        }}>+</button>
    </div>
    );
}