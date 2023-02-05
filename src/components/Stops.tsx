import { type Stop, type Route, type Bus } from "@prisma/client"
import { type Arrival } from "../utils/interfaces"
import Image from "next/image"
import { useState } from "react"
import { api } from "../utils/api"

type StopsProps = {
    route: Route | undefined,
    viewTransition: (showStops: { show: boolean, route: Route | undefined }) => void
}

export const Stops = ({ route, viewTransition }: StopsProps) => {
    const [stops, setStops] = useState<Stop[]>([]);
    const [busId, setBusId] = useState<number>(0);

    if (route) {
        api.bus.getAll.useQuery({ routeId: route.id }, {
            onSuccess: (data) => {
                if (data && data[0]) {
                    setBusId(data[0].id)
                    setStops(data[0].stops);
                }
            }
        });
    }

    const handleBack = () => {
        viewTransition({ show: false, route: undefined });
    }

    return (
        <div className="flex flex-col overflow-auto">
            <div className="flex flex-row gap-8 items-center bg-yellow p-4">
                <Image
                    src="/backArrow.svg"
                    alt="blue pin"
                    width={10}
                    height={10}
                    className="ml-2"
                    onClick={handleBack}
                />
                <div className="flex flex-row gap-5 items-center flex-1">
                    <Image src="/busIcon.svg" alt="bus icon" width={25} height={25} />
                    <span className="text-sm font-semibold text-darkBlue">{route?.displayName}</span>
                </div>
            </div>

            <div className="cotainer overflow-scroll">
                {stops?.map((stop, index) => {
                    return <Stop key={index} stop={stop} busId={busId} />;
                })}
            </div>
        </div>
    )
}

const Stop = ({ busId, stop }: { key: number, stop: Stop, busId: number }) => {
    const [arrival, setArrival] = useState<Arrival | undefined>(undefined);
    api.arrival.get.useQuery({ busId, stopId: stop.id }, {
        onSuccess: (data) => {
            if (data) {
                // get earliest arrival
                setArrival(data[0]);
            }
        },
    });

    const arrivalMessage = arrival?.minutesToArrival === 0 ? "Arriving now" : `Arriving in ${arrival?.minutesToArrival} minutes`;

    return (
        <div className="flex flex-row items-start h-16 p-3 gap-5">
            <div className="items-center">
                <Image src="/bluePin.svg" alt="blue pin" width={25} height={25} />
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-semibold flex-1">{stop.name}</p>
                <p className="text-xs font-normal text-grey">
                    {
                        arrival ? arrivalMessage : "No arrivals at this stop"
                    }
                </p>
            </div>
        </div>
    )
};