import { MarkerF } from "@react-google-maps/api";

export function BusStop(props: { lat: number, lng: number }) {
    return (
        <MarkerF
            position={{ lat: props.lat, lng: props.lng }}
            icon="/redMarker.svg"
        />
    )
}
