import { rankNurses } from '../src/nurseRanking';

// Mock the geolib library
jest.mock('geolib', () => ({
  getDistance: jest.fn().mockReturnValue(10000), // Default mock distance
}));

describe('Nurse Ranking System', () => {
  const facilityLocation = { latitude: 40.7128, longitude: -74.0060 };

  const mockNurses = [
    {
      id: '1',
      name: 'Nurse 1',
      location: { latitude: 40.7589, longitude: -73.9851 },
      yoe: 5,
      acceptedOffers: 20,
      canceledOffers: 5,
      averageReplyTime: 300,
    },
    {
      id: '2',
      name: 'Nurse 2',
      location: { latitude: 40.7549, longitude: -73.9840 },
      yoe: '10',
      acceptedOffers: 30,
      canceledOffers: '3',
      averageReplyTime: '200',
    },
    {
      id: '3',
      name: 'Nurse 3',
      location: { latitude: '40.7489', longitude: '-73.9680' },
      yoe: 'fifteen',
      acceptedOffers: 'forty',
      canceledOffers: 'two',
      averageReplyTime: 'fast',
    },
  ];

  test('rankNurses returns the correct number of nurses', () => {
    const result = rankNurses(mockNurses, facilityLocation);
    expect(result).toHaveLength(3);
  });

  test('rankNurses sorts nurses by score in descending order', () => {
    const result = rankNurses(mockNurses, facilityLocation);
    expect(result[0].score).toBeGreaterThanOrEqual(result[1].score);
    expect(result[1].score).toBeGreaterThanOrEqual(result[2].score);
  });

  test('rankNurses handles numeric string values', () => {
    const result = rankNurses([mockNurses[1]], facilityLocation);
    expect(result[0].score).toBeGreaterThan(0);
  });

  test('rankNurses handles non-numeric string values', () => {
    const result = rankNurses([mockNurses[2]], facilityLocation);
    expect(result[0].score).toBeGreaterThan(0);
  });

  test('rankNurses returns scores between 1 and 10', () => {
    const result = rankNurses(mockNurses, facilityLocation);
    result.forEach((nurse) => {
      expect(nurse.score).toBeGreaterThanOrEqual(1);
      expect(nurse.score).toBeLessThanOrEqual(10);
    });
  });

  test('rankNurses limits output to 10 nurses when input is larger', () => {
    const largeInput = Array(20).fill(mockNurses[0]);
    const result = rankNurses(largeInput, facilityLocation);
    expect(result).toHaveLength(10);
  });

  test('rankNurses weights categories correctly', () => {
    const nurse1 = { ...mockNurses[0], yoe: 20, acceptedOffers: 50, canceledOffers: 0, averageReplyTime: 60 };
    const nurse2 = { ...mockNurses[0], yoe: 1, acceptedOffers: 10, canceledOffers: 10, averageReplyTime: 3600 };
    const result = rankNurses([nurse1, nurse2], facilityLocation);
    expect(result[0].id).toBe(nurse1.id);
    expect(result[0].score).toBeGreaterThan(result[1].score);
  });

  test('rankNurses handles null values', () => {
    const nurseWithNulls = {
      ...mockNurses[0],
      yoe: "null",
      acceptedOffers: "null",
      canceledOffers: "null",
      averageReplyTime: "null",
    };
    const result = rankNurses([nurseWithNulls], facilityLocation);
    expect(result[0].score).toBeGreaterThan(0);
  });

  test('rankNurses includes nurses with little behavioral data', () => {
    const experiencedNurse = { ...mockNurses[0], acceptedOffers: 100, canceledOffers: 0 };
    const newNurse = { ...mockNurses[0], acceptedOffers: 1, canceledOffers: 0 };
    const result = rankNurses([experiencedNurse, newNurse], facilityLocation);
    expect(result).toContainEqual(expect.objectContaining({ id: newNurse.id }));
  });
});