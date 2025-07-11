"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query"

export const MeetingsView = () =>{
   const trpc = useTRPC()
   const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <div className="overflow-x-scroll">
            {JSON.stringify(data)}
        </div>
    )
}

export const MeetingsViewLoading =() =>{
    return(
        <LoadingState
        title="Loading meetings" 
        description="This may take few time"/>
    )
}

export const  MeetingsViewError = () =>{
    return (
        <ErrorState
                title="Error loading meetings"
                description="Something went wrong"/>
    )
}