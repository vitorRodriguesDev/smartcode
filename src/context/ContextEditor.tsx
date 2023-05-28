'use client'
import { createContext, useState } from "react";

interface IEditor {
    requestMessage?: string,
    responseMessage?: string, 
    setRequestMessage: (value: any) => void, 
    setResponseMessage: (value: any) => void
}

export const ContextEditor = createContext<IEditor>({} as IEditor)

export const ProviderEditor=({children}: any)=> {

    const [requestMessage, setRequestMessage] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');

    return (
        <ContextEditor.Provider value={{
            requestMessage, 
            setRequestMessage, 
            responseMessage, 
            setResponseMessage}} >
            {children}
        </ContextEditor.Provider>
    )
}