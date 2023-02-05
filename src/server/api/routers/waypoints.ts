import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const waypointsRouter = createTRPCRouter({
    get: publicProcedure
    .input(z.object({
        busId: z.number()
    }))
    .query(async ({ ctx, input }) => {
        return await ctx.prisma.waypoint.findMany({
            where: {
                busId: input.busId
            }
        });
    }),
});