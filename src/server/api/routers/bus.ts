import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const busRouter = createTRPCRouter({
  getAll: publicProcedure
  .input(z.object({
    routeId: z.number(),
  }))
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.bus.findMany({
      where: {
        routeId: input.routeId,
      },
      include: {
        stops: true,
      }
    });
  }),
  get: publicProcedure
  .input(z.object({
    busId: z.number(),
  }))
  .query(async ({ ctx, input }) => {
    const bus = await ctx.prisma.bus.findUnique({
        where: {
            id: input.busId,
        },
        include: {
            stops: true,
        }
    });
    return bus;
  }),
});
