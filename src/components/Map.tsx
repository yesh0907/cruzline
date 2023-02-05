
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Route } from '@prisma/client';
import { UserMarker } from './UserMarker';

type MapProps = {
    routes: Route[] | undefined
}

export function Map({ routes }: MapProps) {
    const center = { lat: 36.979, lng: -122.047 };
    const zoom = 13.4;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const [renderUserMarker, setRenderUserMarker] = useState(false);
    const [pos, setPos] = useState({
        lat: center.lat,
        lng: center.lng,
    });

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey
    })

    const successCallback = (position: any) => {
        console.log(position)
        if (!renderUserMarker) {
            setRenderUserMarker(true);
        }
        const { latitude, longitude } = position.coords;
        if (pos.lat !== latitude || pos.lng !== longitude) {
            setPos({
                lat: latitude,
                lng: longitude,
            });
        }
    }

    useEffect(() => {
        navigator.geolocation.watchPosition(successCallback)
    });

    const renderMap = () => {
        return (
            <GoogleMap
                center={center}
                zoom={zoom}
                mapContainerClassName="w-screen h-[50vh]"
                options={{
                    disableDefaultUI: true,
                    gestureHandling: "greedy"
                }}>
                {renderUserMarker && <UserMarker
                    lat={pos.lat}
                    lng={pos.lng}
                />}
            </GoogleMap>
        )
    }

    if (loadError) {
        return <div>Map couldn't load</div>
    }

    return isLoaded ? renderMap() : <h1>Loading!</h1>
}
