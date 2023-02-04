## APIs - RPC functions for the backend

cruzmetro apis:
- all routes: https://cruzmetro.com/Region/0/Routes
- directions (includes all stops): https://cruzmetro.com/Route/<ROUTE_ID>/Directions/
    - e.g: https://cruzmetro.com/Route/5337/Directions/ for bus 18
- stops: https://cruzmetro.com/Route/<PATTERN_ID>/Direction/<ROUTE_ID>/Stops
    - e.g: https://cruzmetro.com/Route/20395/Direction/5337/Stops for bus 18 outbound
        - pattern ID maps to 18 going outbound
- arrival: https://cruzmetro.com/Stop/<STOP_ID>/Arrivals
    - e.g: https://cruzmetro.com/Stop/4747903/Arrivals for bus 18 at some stop
- vehicle location: https://cruzmetro.com/Route/<ROUTE_ID>/Vehicles
    - e.g: https://cruzmetro.com/Route/5337/Vehicles live location for all 18 buses
- waypoints: https://cruzmetro.com/Route/<ROUTE_ID>/Waypoints
    - all stops along a route but only their lat and long coordinates
    - useful for plotting on map as marker
    - e.g: https://cruzmetro.com/Route/5337/Waypoints for bus 18

Data Models:
- Route
    - ID
    - name
    - DisplayName
    - ShortName
    - buses: Bus[]
- Bus
    - ID
    - routeID: Route
    - name
    - directionality
    - stops: Stop[]
- Stop
    - ID
    - name
    - lat
    - lng
- Waypoint
    - busID: Bus
    - lat
    - lng
- Interfaces:
    - Arrival
        - busID: string
        - stopID: string
        - vehicleID: string
        - arrivalTime: string
        - secondsToArrival: number (decimal)
        - vehicleName: string
        - minutesToArrival: number
        - timeToArrival: number
    - Location
        - vehicleID: string,
        - lat: string,
        - lng: string

## RPC functions:
### route
- getAll(): Route[]
    - gets all bus routes from db
### bus
- getAll(routeID: Route.ID): Bus[]
    - gets all the directions and stops of all the buses along a specific route from db
- get(busID: Bus.ID): Bus
    - gets the direction and stops of a specific bus from db
### stops
- get(busID: Bus.ID): Stop[]
    - gets all the stops of bus from db
### waypoints
- get(busID: Bus.ID): Waypoint[]
    - gets all the waypoints for a bus from db
### arrival
- getAll(stopID: Stop.ID): Arrival[]
    - get all the bus arrival times at a specific stop
    - if no data, then return []
- get(stopID: Stop.ID, busID: Bus.ID): Arrival
    - get the arrival time a bus at a specific stop
    - if no data, then return null
### location
- getAll(routeID: Route.ID):Location[]
    - get the live locations of all the buses on a route
    - if no data, then return []
- get(routeID: Route.ID, vehicleID: string):Location
    - get the live location of a specific bus on a specific route
    - if no data, then return null
