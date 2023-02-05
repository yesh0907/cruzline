import { Bus } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter,publicProcedure } from "../trpc";

export const stopsRouter = createTRPCRouter({
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
            }
        });
        return bus;
    }),
});