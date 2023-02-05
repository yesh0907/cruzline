import { type Route } from "@prisma/client"
import Image from "next/image"

type RoutesProps = {
    routes: Route[] | undefined
}

export const Routes = ({ routes }: RoutesProps) => {
    return (
        <div className="flex flex-col">
            {routes?.map((route, index) => (
                <RouteItem key={index} route={route} />
            ))}
        </div>
    )
}

const RouteItem = ({ route }: { key: number, route: Route }) => {
    return (
        <div className="flex flex-row items-center h-14 border-b-[1px] border-b-grey p-3">
            <div className="flex flex-row gap-5 items-center">
                <Image src="/busIcon.svg" alt="bus icon" width={25} height={25} />
                <span className="text-sm font-semibold">{route.shortName}</span>
            </div>
            <div className="flex-1 text-right pr-4">
                <span className="text-xs text- font-semibold">{route.displayName.substring(route.displayName.indexOf("-") + 1)}</span>
            </div>
        </div>
    )
}