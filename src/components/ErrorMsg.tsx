import React from "react";

interface ErrorMsgProps{
    err: string
}

export function ErrorMsg({err}: ErrorMsgProps){
    return (
        <p className='text-center'>{ err }</p>
    )
}