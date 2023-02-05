/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { prisma } from "../src/server/db";
import axios from "axios";

async function getAllRoutes() {
  const response = await axios.get("https://cruzmetro.com/Region/0/Routes");
  return response.data;
}

async function getAllBusInfo(routeID: number) {
  const response = await axios.get(
    `https://cruzmetro.com/Route/${routeID}/Directions/`
  );
  return response.data;
}

async function main() {
  const routes = await getAllRoutes();
  for (const route of routes) {
    const r = await prisma.route.upsert({
      where: {
        id: route.ID,
      },
      update: {},
      create: {
        id: route.ID,
        name: route.Name,
        displayName: route.DisplayName,
        shortName: route.ShortName,
      },
    });
    const allBusInfo = await getAllBusInfo(route.ID as number);
    for (const busInfo of allBusInfo) {
      const bus = await prisma.bus.upsert({
        where: {
          id: busInfo.RouteID,
        },
        create: {
          id: busInfo.RouteID,
          route: {
            connect: {
              id: r.id,
            },
          },
          name: busInfo.Name,
          directionality: busInfo.Directionality,
        },
        update: {},
      });
      for (const stop of busInfo.Stops) {
        const busStop = await prisma.stop.upsert({
          where: {
            id: stop.ID,
          },
          create: {
            id: stop.ID,
            name: stop.Name,
            lat: stop.Latitude,
            lng: stop.Longitude,
            buses: {
              connect: {
                id: bus.id,
              }
            }
          },
          update: {
            buses: {
              connect: {
                id: bus.id,
              }
            }
          },
        });
        await prisma.waypoint.upsert({
          where: {
            id: busStop.id,
          },
          create: {
            id: busStop.id,
            bus: { connect: { id: bus.id } },
            lat: busStop.lat,
            lng: busStop.lng,
          },
          update: {},
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
