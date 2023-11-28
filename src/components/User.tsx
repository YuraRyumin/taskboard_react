import React, { useState } from "react";
import { IUser } from "../Models";

interface UserProps {
    user: IUser
}

export function User({user}: UserProps){
    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-blue-400' : 'bg-yellow-400' 
    const btnClasses = ['py-2 px-4 border', btnBgClassName]

    return (<div className="container mx-auto max-w-1xl border rounded-2xl mb-2" 
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
            </div>
    )
}