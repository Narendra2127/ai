import {db} from "@/db"
import { agents } from "@/db/schema";
import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { promise, z } from "zod";
import { agentsInsertSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    //TODO: change 'getOne' to use protected procedure
        getOne: protectedProcedure.input(z.object({ id: z.string()})).query(async({input})=>{
        const [existingAgent] = await db
         .select()
         .from(agents)
         .where(eq(agents.id, input.id))

        return existingAgent
    }),

    //TODO: change 'getmany' to use protected procedure
    getMany: protectedProcedure.query(async()=>{
        const data = await db
         .select()
         .from(agents)

        return data
    }),

    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({input,ctx})=>{
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning()

        return createdAgent
    })

})
