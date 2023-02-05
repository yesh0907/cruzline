import { z } from "zod";
import { createTRPCRouter,publicProcedure } from "../trpc";

export const stopsRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async ({ ctx }) => {
        return await ctx.prisma.stop.findMany();
    }),
    get: publicProcedure
    .input(z.object({
        busId: z.number()
    }))
    .query(async ({ ctx, input }) => {
        const bus = await ctx.prisma.stop.findMany({
            where: {
                buses: {
                    some: {
                        id: input.busId
                    }
                }
            },
            orderBy: {
                lat: "asc",
            },
        });
        return bus;
    }),
});