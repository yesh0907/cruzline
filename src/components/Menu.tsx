import { useState } from "react"
import { type Route, type Stop } from "@prisma/client"
import { Routes } from "./Routes"
import { Search } from "./Search";
import { Stops } from "./Stops";

const Tab = ({ title, active, onClick }: { title: string, active: boolean, onClick: () => void }) => {
    let classNames = "";
    if (active) {
        classNames = 'w-1/2 pt-4 border-b-4 border-b-yellow';
    } else {
        classNames = 'w-1/2 pt-4 border-b-2 border-b-grey';
    }
    return (
        <div
            onClick={onClick}
            className={classNames}
        >
            <h3 className="font-semibold">{title}</h3>
        </div>
    )
}

type MenuProps = {
    routes: Route[] | undefined,
    stops: Stop[] | undefined
}

export const Menu = ({ routes, stops }: MenuProps) => {
    const [activeTab, setActiveTab] = useState(0)
    const [showStops, setShowStops] = useState<{ show: boolean, route: Route | undefined }>({ show: false, route: undefined })

    let className = "";
    if (showStops.show) {
        className = "-mt-6 z-10 flex flex-col rounded-t-3xl border-t-2 border-t-yellow bg-white max-h-[56vh] overflow-hidden";
    } else {
        className = "-mt-6 z-10 flex flex-col rounded-t-3xl border-t-2 border-t-white bg-white max-h-[56vh] overflow-hidden";
    }

    const menuOptions = () => {
        return (
            <>
                <div className="flex flex-row justify-between text-center pt-3">
                    <Tab title="Route" active={activeTab === 0} onClick={() => setActiveTab(0)} />
                    <Tab title="Search" active={activeTab === 1} onClick={() => setActiveTab(1)} />
                </div>
                <div className="container overflow-scroll">
                    {activeTab === 0 && <Routes routes={routes} viewTransition={setShowStops} />}
                    {activeTab === 1 && <Search routes={routes} stops={stops} />}
                </div>
            </>
        )
    }

    return (
        <div className={className}>
            {showStops.show ? <Stops route={showStops.route} viewTransition={setShowStops} /> : menuOptions()}
        </div>
    )
}