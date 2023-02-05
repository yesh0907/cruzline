import { Marker } from "@react-google-maps/api";

export function BusStop(props: { lat: number, lng: number }) {
    return (
        <Marker
            position={{ lat: props.lat, lng: props.lng }}
            icon="/bluePin.png"
        />
    )
}
