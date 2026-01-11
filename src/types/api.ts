export interface BoardingPassType {
  passId: string
  hash: string
  pnr: string
  isConnectingFlight: boolean
  paxNumber: number
  paxType: string
  name: Name
  barcode: string
  departure: AirportDateTime
  arrival: AirportDateTime
  ssrsDetails: SsrsDetail[]
  seat: Seat
  priority: boolean
  fast: boolean
  leisurePlus: boolean
  timeSaver: boolean
  businessPlus: boolean
  familyPlus: boolean
  regular: boolean
  sequence: number
  boardingTime: string
  boardingTimeEpoch: number
  flight: Flight
  ticketType: string
  discount: string
  docNationality: string
  docCountryOfIssue: string
  authorizationStatus: string
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface AirportDateTime {
  code: string
  name: string
  date: string
  dateUTC: string
  dateUTCOffset: string
  epoch: number
}

export interface SsrsDetail {
  code: string
  qty: number
}

export interface Seat {
  designator: string
  location: string
  paid: boolean
  door: number
  isPrime: boolean
}

export interface Flight {
  carrierCode: string
  number: string
  label: string
}
