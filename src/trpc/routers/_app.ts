import { z } from 'zod';
import { agentsRouter } from '@/module/agents/server/procedures';
import { baseProcedure, createTRPCRouter } from '../init';
import { agents } from '@/db/schema';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  
});
// export type definition of API
export type AppRouter = typeof appRouter;