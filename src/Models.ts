export interface ITask{
    id?: number
    uuid: string
    header: string
    description: string
    parent: string
    user: string
}

export interface IRole{
    id?: number
    name: string
}

export interface IUser{
    id?: number
    uuid: string
    email: string
    phone: string
    role: string
    login: string
    password: string
    active: boolean
    activationCode: string
}

export interface Headers{
    [key: string]: string
}
