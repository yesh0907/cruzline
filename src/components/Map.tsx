
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { BusStop } from './BusStop';

export function Map() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey
    })

    const renderMap = () => {
        const center = { lat: 36.979, lng: -122.047 };
        const zoom = 13.4;
        const busStops: Array<google.maps.LatLng> = [new google.maps.LatLng(36.9776195, -122.0536106), new google.maps.LatLng(36.9773813, -122.0542297)];
        const busStopPins = busStops.map((stop, index) => {
            return (<BusStop
                key={index}
                lat={stop.lat()}
                lng={stop.lng()}
            />)
        });

        return (
            <GoogleMap
                center={center}
                zoom={zoom}
                mapContainerClassName="w-screen h-[50vh]"
                options={{
                    disableDefaultUI: true,
                    gestureHandling: "greedy"
                }}>
                {busStopPins}
            </GoogleMap>
        )
    }

    if (loadError) {
        return <div>Map couldn't load</div>
    }

    return isLoaded ? renderMap() : <h1>Loading!</h1>
}
