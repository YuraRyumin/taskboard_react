import React from "react";
import {Link} from "react-router-dom";

export function Navigation(){
    return(
        <nav className="h-[50px] flex justify-between px-5 bg-green-900 items-center text-white">
            <span className="font-bold">Online-shop!</span>
            <span>
                <Link to="/" className="mr-2">Main</Link>
                <Link to="/tasks" className="mr-2">Tasks</Link>
                <Link to="/roles" className="mr-2">Roles</Link>
                <Link to="/users" className="mr-2">Users</Link>
                <Link to="/about">About</Link>
            </span>
        </nav>
    )
}