import { MarkerF } from "@react-google-maps/api";

export function BusMarker(props: {
    vehicleID: number, lat: number, lng: number
}) {
    return (
        <MarkerF
            position={{lat: props.lat, lng: props.lng }}
            icon="/busIcon.svg"
            
        />
    )
}