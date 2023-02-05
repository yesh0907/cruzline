import { createTRPCRouter, publicProcedure } from "../trpc";

export const routeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.route.findMany();
  }),
});
