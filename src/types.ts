export interface TravelLog {
  id: string;
  countryCode: string;
  countryName: string;
  entryDate: string; // YYYY-MM-DD
  exitDate: string;  // YYYY-MM-DD
  isSchengen: boolean;
}

export interface Passport {
  id: string;
  name: string;
  countryCode: string; // e.g. 'TR', 'DE', 'US'
  color: 'red' | 'blue' | 'green' | 'burgundy' | 'navy';
  flag: string;
}

export interface VisaRequirement {
  destinationCode: string;
  destinationName: string;
  requirement: 'visa-free' | 'e-visa' | 'visa-required' | 'visa-on-arrival';
  durationText: string;
  details: string;
}

export type TravelerType = 'nomad' | 'tourist' | 'expat';

export interface TravelerProfile {
  id: TravelerType;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  initialTravels: TravelLog[];
  initialPassports: Passport[];
}
