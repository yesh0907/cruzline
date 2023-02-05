import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Location } from "../../../utils/interfaces";

const getLocations = async(routeId: number):Promise<Location[]> => {
    const response = await axios.get(`https://cruzmetro.com/Route/${routeId}/Vehicles`);
    const locations:Location[] = [];
    for (let i = 0; i < response.data.length; i++) {
        const entry = response.data[i];
        locations.push({
            vehicleID: entry.ID,
            lat: entry.Latitude,
            lng: entry.Longitude
        } as Location);
    }
    return locations;
}

export const locationRouter = createTRPCRouter({
    getAll: publicProcedure
    .input(z.object({
        routeId: z.number()
    }))
    .query(async ({ input }) => {
        return await getLocations(input.routeId);
    }),
    get: publicProcedure
    .input(z.object({
        routeId: z.number(),
        vehicleId: z.number()
    }))
    .query(async ({ input }) => {
        const Locations = await getLocations(input.routeId);
        return Locations.filter(l => l.vehicleID === input.vehicleId);
    })
});