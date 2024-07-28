import { getDistance } from 'geolib';

interface Location {
  latitude: string | number;
  longitude: string | number;
}

interface Nurse {
  id: string;
  name: string;
  location: Location;
  yoe: number | string;
  acceptedOffers: number | string;
  canceledOffers: number | string;
  averageReplyTime: number | string;
}

interface ScoredNurse extends Nurse {
  score: number;
}

function parseNumber(value: any, type?: string): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) return Math.floor(parsed);
  }
  
  // If parsing fails (indicating little behavior data), generate a random number to give nurses a chance
  switch (type) {
    case 'yoe':
      return Math.floor(Math.random() * 30); // 0-30 years of experience
    case 'acceptedOffers':
      return Math.floor(Math.random() * 100); // 0-100 accepted offers
    case 'canceledOffers':
      return Math.floor(Math.random() * 100); // 0-100 canceled offers
    case 'averageReplyTime':
      return Math.floor(Math.random() * 3600); // 0-3600 seconds (up to 1 hour)
    default:
      return Math.floor(Math.random() * 100); // Default random value
  }
}

function calculateNurseScore(nurse: Nurse, facilityLocation: Location): number {
  const yoe = parseNumber(nurse.yoe, "yoe");
  const acceptedOffers = parseNumber(nurse.acceptedOffers, "acceptedOffers");
  const canceledOffers = parseNumber(nurse.canceledOffers, "canceledOffers");
  const averageReplyTime = parseNumber(nurse.averageReplyTime, "averageReplyTime");
  const distance = getDistance(
    { latitude: parseNumber(nurse.location.latitude), longitude: parseNumber(nurse.location.longitude) },
    { latitude: parseNumber(facilityLocation.latitude), longitude: parseNumber(facilityLocation.longitude) }
  );

  // Calculate score components
  const yoeScore = yoe / (yoe + 1); // Approaches 1 as yoe increases
  const distanceScore = 1 / (1 + distance / 100000); // Approaches 0 as distance increases
  const acceptedOffersScore = acceptedOffers / (acceptedOffers + 1); // Approaches 1 as acceptedOffers increases
  const canceledOffersScore = 1 / (1 + canceledOffers); // Approaches 0 as canceledOffers increases
  const replyTimeScore = 1 / (1 + averageReplyTime / 60); // Approaches 0 as averageReplyTime increases

  // Calculate weighted score
  const score = 
    (yoeScore * 1) +
    (distanceScore * 1) +
    (acceptedOffersScore * 3) +
    (canceledOffersScore * 3) +
    (replyTimeScore * 2);

  // Normalizes score - maps them from [0, 10] to [1, 10]
  return 1 + (score / 10) * 9;
}

export function rankNurses(nurses: Nurse[], facilityLocation: Location): ScoredNurse[] {
  const scoredNurses = nurses.map(nurse => ({
    ...nurse,
    score: calculateNurseScore(nurse, facilityLocation)
  }));

  // Sort nurses by score in descending order
  scoredNurses.sort((a, b) => b.score - a.score);

  return scoredNurses.slice(0, 10);
}