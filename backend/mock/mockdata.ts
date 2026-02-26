/**
 * Mock data for charging locations
 */
export const mockLocations = [
  {
    locationId: 'S0017DE',
    locationName: 'Milence Charging Hub Venlo',
    status: 'Available',
    countAvailableEvse: 2,
    countTotalEvse: 5,
    availability: [
      { evseId: 'DE*MIL*E000015*1', available: true },
      { evseId: 'DE*MIL*E000015*2', available: true },
      { evseId: 'DE*MIL*E000016*1', available: false },
      { evseId: 'DE*MIL*E000016*2', available: false },
      { evseId: 'DE*MIL*E000017*1', available: false },
    ],
    tariff: {
      currency: 'EUR',
      priceComponents: [{ type: 'energy', price: 0.4 }],
    },
    eHDVsOnly: false,
    licensePlateScanned: false,
    paymentMethods: [
      'Mastercard',
      'Visa',
      'Google Pay',
      'Apple Pay',
      'Credit Card',
      'MSP',
    ],
  },
  {
    locationId: 'S0018NL',
    locationName: 'Milence Charging Hub Venlo',
    status: 'Occupied',
    countAvailableEvse: 0,
    countTotalEvse: 5,
    availability: [
      { evseId: 'DE*MIL*E000015*1', available: false },
      { evseId: 'DE*MIL*E000015*2', available: false },
      { evseId: 'DE*MIL*E000016*1', available: false },
      { evseId: 'DE*MIL*E000016*2', available: false },
      { evseId: 'DE*MIL*E000017*1', available: false },
    ],
    tariff: {
      currency: 'EUR',
      priceComponents: [{ type: 'energy', price: 0.4 }],
    },
    eHDVsOnly: false,
    licensePlateScanned: true,
    licensePlate: 'ABC-1234',
    bayAssignment: 'Bay 3',
    paymentMethods: [
      'Mastercard',
      'Visa',
      'Google Pay',
      'Apple Pay',
      'Credit Card',
      'MSP',
    ],
  },
];
