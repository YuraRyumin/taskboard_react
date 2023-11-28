import React, { useState } from "react";
import { IRole } from "../Models";

interface RoleProps {
    role: IRole
}

export function Role({role}: RoleProps){
    const [details, setDetails] = useState(false)

    const btnBgClassName = details ? 'bg-blue-400' : 'bg-yellow-400' 
    const btnClasses = ['py-2 px-4 border', btnBgClassName]

    return (<div className="container mx-auto max-w-1xl border rounded-2xl mb-2" 
        key={role.id}>
                <h2>{role.id}) {role.name}</h2>
            </div>
    )
}