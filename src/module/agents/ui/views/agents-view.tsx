"use client"

import {  useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { Button } from "@/components/ui/button"


export const AgentsView = () =>{
    const trpc= useTRPC()
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())



    return(
        <div>     
            {JSON.stringify(data,null,2)}
        </div>
    )
}

export const AgentsViewLoading =() =>{
    return(
        <LoadingState
        title="Loading Agents" 
        description="This may take few time"/>
    )
}

export const  AgentsViewError = () =>{
    return (
        <ErrorState
                title="Error loading agents"
                description="Something went wrong"/>
    )
}