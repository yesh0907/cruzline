import { createTRPCRouter } from "./trpc";
import { routeRouter } from "./routers/route";
import { busRouter } from "./routers/bus";
import { stopsRouter } from "./routers/stops";
import { waypointsRouter } from "./routers/waypoints";
import { arrivalRouter } from "./routers/arrival";
import { locationRouter } from "./routers/location";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  route: routeRouter,
  bus: busRouter,
  stops: stopsRouter,
  waypoints: waypointsRouter,
  arrival: arrivalRouter,
  location: locationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
