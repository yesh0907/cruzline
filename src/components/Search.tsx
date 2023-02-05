import { type Route, type Stop } from "@prisma/client"
import { useState, Fragment } from "react"
import { Combobox, Transition } from '@headlessui/react'

type SearchProps = {
    routes: Route[] | undefined,
    stops: Stop[] | undefined
}

type SearchResult = {
    routeId?: number,
    stopId?: number,
    name: string
}

export const Search = ({ routes, stops }: SearchProps) => {
    const [selected, setSelected] = useState("");
    const [query, setQuery] = useState("");

    const searchSpace: SearchResult[] = [];
    for (const route of routes || []) {
        searchSpace.push({ routeId: route.id, name: route.displayName });
    }
    for (const stop of stops || []) {
        searchSpace.push({ stopId: stop.id, name: stop.name });
    }

    const filteredSearchSpace = query === ''
        ? searchSpace : searchSpace.filter((result) =>
            result.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex flex-col relative mt-3 p-2">
            {query.length === 0 ? <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg> : null}
            <div>
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative">
                        <Combobox.Input
                            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-darkBlue"
                            displayValue={(s) => selected}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}>
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredSearchSpace.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredSearchSpace.map((result, index) => (
                                        <Combobox.Option
                                            key={index}
                                            value={result.name}>
                                            {result.name}
                                        </Combobox.Option>
                                    )))}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div >
        </div >
    )
}