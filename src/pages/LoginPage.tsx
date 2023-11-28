import React, { useContext } from "react"
import { LogIn } from "../components/LogIn";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext"

export function LoginPage(){
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)
    openModal()

    return (
        <div className="container mx-auto max-w-2xl pt-5">    
            {modal && <ModalWindow title='Please enter your login and password' onClose={() => closeModal()}>
                <LogIn />
            </ModalWindow>}
        </div>
        );
}