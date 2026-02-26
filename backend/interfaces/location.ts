/**
 * Interface for charging location details for onsite display application.
 * This interface defines the structure of the data received from the backend API
 * regarding charging locations, including their availability, tariffs, and other relevant information.
 */
export interface Location {
  locationId: string;
  locationName: string;
  status: string;
  countAvailableEvse: number;
  countTotalEvse: number;
  availability: Evse[];
  tariff: Tariff;
  eHDVsOnly: boolean;
  licensePlateScanned: boolean;
  licensePlate?: string; // optional
  bayAssignment?: string; // optional
  paymentMethods: string[];
}

export interface Evse {
  evseId: string;
  available: boolean;
}

export interface Tariff {
  currency: string;
  priceComponents: PriceComponent[];
}

export interface PriceComponent {
  type: string;
  price: number;
}
