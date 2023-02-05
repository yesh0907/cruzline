import { type Route } from "@prisma/client"
import Image from "next/image"

type RoutesProps = {
    routes: Route[] | undefined,
    viewTransition: (showStops: { show: boolean, route: Route | undefined}) => void
}

export const Routes = ({ routes, viewTransition }: RoutesProps) => {
    return (
        <div className="flex flex-col">
            {routes?.map((route, index) => (
                <RouteItem key={index} route={route} viewTransition={viewTransition} />
            ))}
        </div>
    )
}

type RouteItemProps = { 
    key: number, 
    route: Route, 
    viewTransition: (viewTransition: { show: boolean, route: Route | undefined}) => void 
};


const RouteItem = ({ route, viewTransition }: RouteItemProps) => {
    const onClick = () => {
        viewTransition({ show: true, route: route })
    }

    return (
        <div className="flex flex-row items-center h-14 border-b-[1px] border-b-grey p-3" onClick={onClick}>
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