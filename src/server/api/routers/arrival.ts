import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Arrival } from "../../../utils/interfaces";

const getArrivals = async(stopId: number):Promise<Arrival[]> => {
    const response = await axios.get(`https://cruzmetro.com/Stop/${stopId}/Arrivals`);
    const arrivals:Arrival[] = [];
    for (let i = 0; i < response.data.length; i++) {
        for (const a of response.data[i].Arrivals) {
            arrivals.push({
                busID: a.BusID,
                stopID: a.StopID,
                vehicleID: a.VehicleID,
                arrivalTime: a.ArriveTime,
                minutesToArrival: a.Minutes,
                secondsToArrival: a.SecondsToArrival,
                timeToArrival: a.Time,
                vehicleName: a.VehicleName
            } as Arrival)
        }
    }
    return arrivals;
}

export const arrivalRouter = createTRPCRouter({
    getAll: publicProcedure
    .input(z.object({
        stopId: z.number()
    }))
    .query(async ({ input }) => {
        return await getArrivals(input.stopId);
    }),
    get: publicProcedure
    .input(z.object({
        stopId: z.number(),
        busId: z.number()
    }))
    .query(async ({ input }) => {
        const arrivals = await getArrivals(input.stopId);
        return arrivals.filter(a => a.busID === input.busId);
    })
});