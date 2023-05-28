'use client'
import { ContextEditor } from "@/context/ContextEditor"
import { useContext, useState } from "react"

export const UseEditor=()=> {
    const Context = useContext(ContextEditor)
    return Context
}