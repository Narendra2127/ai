"use client"

import {  useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { Button } from "@/components/ui/button"
import { columns, } from "../components/columns"
import { EmptyState } from "@/components/empty-state"
import { useAgentFilters } from "../../hooks/use-agents-filters"
import { DataPagination } from "../components/data-pagination"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/data-table"


export const AgentsView = () =>{
    const router = useRouter()
    const [filters, setFilters] = useAgentFilters()

    const trpc= useTRPC()
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }))


    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">     
            <DataTable
            data = {data.items} 
            columns={columns}
            onRowClick={(row) =>router.push(`/agents/${row.id}`)}
            />
            <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page)=> setFilters({page})}
            />
            {data.items.length === 0 && (
                <EmptyState 
                title="Create your first agent"
                description="Create a agent to join your meetings. Each agent will follow your instructions and can intrect with participants during the call"
                />
            )}
        </div>
    )
}

export const AgentsViewLoading =() =>{
    return(
        <LoadingState
        title="Loading agents" 
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