import React, { useContext } from "react"
import { ModalWindow } from "../components/ModalWindow";
import { Registration } from "../components/Registration";
import { ModalContext } from "../context/ModalContext"

export function RegistrationPage(){
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)
    openModal()

    return (
        <div className="container mx-auto max-w-2xl pt-5">    
            {modal && <ModalWindow title='Registration' onClose={() => closeModal()}>
                <Registration onCreate={() => closeModal()}/>
            </ModalWindow>}
        </div>
        );
}