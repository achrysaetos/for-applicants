import { readFileSync } from 'fs';
import { rankNurses } from './nurseRanking';

interface FacilityLocation {
  latitude: number;
  longitude: number;
}

export function getRankedNurses(facilityLocation: FacilityLocation): any[] {
  const nursesData = JSON.parse(readFileSync('./src/data/clinician.json', 'utf-8'));
  return rankNurses(nursesData, facilityLocation);
}