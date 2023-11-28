import React, { useContext, useState } from "react"
import { CreateRole } from "../components/CreateRole"
import { EditRole } from "../components/EditRole"
import { ErrorMsg } from "../components/ErrorMsg"
import { LoaderMsg } from "../components/LoaderMsg"
import { ModalWindow } from "../components/ModalWindow"
import { Role } from "../components/Role"
import { ModalContext } from "../context/ModalContext"
import useRoles from "../hooks/role"
import { IRole } from "../Models"

export function RolePage(){
    const {roles, err, loading, addRole} = useRoles()
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)

    const [nameValue, setNameValue] = useState('')

    const createHandler = (role: IRole) => {
        closeModal()
        addRole(role)
    }

    return (
    <div className="container mx-auto max-w-2xl pt-5">
        {loading && <LoaderMsg />}
        {err && <ErrorMsg err={err} />}
        {roles.map(role =>
            <div className="container hover:bg-slate-400 mx-auto max-w-1xl border rounded-2xl mb-2" 
            onClick={() => {
                setNameValue(role.name);
                openModal();
             }}
            key={role.id}>
                <h2>{role.id}) {role.name}</h2>
            </div>)} 

        {modal && <ModalWindow title='Save role' onClose={() => closeModal()}>
            <EditRole onCreate={() => closeModal()} nameIn={nameValue} />
        </ModalWindow>}

        <button 
        className='fixed absolute bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl py-2 px-4'
        onClick={() => {
            setNameValue('');
            openModal();
         }}>+</button>
    </div>
    );
}