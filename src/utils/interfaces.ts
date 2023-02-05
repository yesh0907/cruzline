export interface Arrival {
  busID: number;
  stopID: number;
  vehicleID: number;
  arrivalTime: string;
  secondsToArrival: number;
  vehicleName: string;
  minutesToArrival: number;
  timeToArrival: number;
}

export interface Location {
  vehicleID: number,
  lat: number,
  lng: number
}