import { getRankedNurses } from "./api";

const facilityLocation = { latitude: 40.7128, longitude: -74.006 };
const rankedNurseIds = getRankedNurses(facilityLocation);

// Print top nurses from clinician.json
console.log(rankedNurseIds);



// Example outputs from test run
// [
//   {
//     id: "1aea7600-84b3-47b7-a229-7b1d7039ad78",
//     name: "Lila Leannon",
//     location: {
//       latitude: "-75.4711",
//       longitude: "-143.6682",
//     },
//     yoe: 24,
//     acceptedOffers: 54,
//     canceledOffers: 0,
//     averageReplyTime: 5,
//     score: 8.882881477821167,
//   },
//   {
//     id: "0039a74f-0e30-40f4-8de1-32e67d431aa6",
//     name: "Elias Zieme",
//     location: {
//       latitude: "42.7458",
//       longitude: "-150.8113",
//     },
//     yoe: 1,
//     acceptedOffers: 93,
//     canceledOffers: 0,
//     averageReplyTime: 3,
//     score: 8.549841609963917,
//   },
//   {
//     id: "1f166ca3-e193-4b33-aae3-7486dc6b6478",
//     name: "Ray Herzog",
//     location: {
//       latitude: "-36.3919",
//       longitude: "-79.8641",
//     },
//     yoe: "sixteen",
//     acceptedOffers: 54,
//     canceledOffers: 0,
//     averageReplyTime: 50,
//     score: 8.195618132191298,
//   },
//   {
//     id: "d9e455e0-99ec-4803-b5dc-146c65e943ab",
//     name: "Yolanda Renner",
//     location: {
//       latitude: "-59.1112",
//       longitude: "136.4995",
//     },
//     yoe: 1,
//     acceptedOffers: 55,
//     canceledOffers: 0,
//     averageReplyTime: "null",
//     score: 7.82589804718211,
//   },
//   {
//     id: "3d6cd9b5-24f6-493b-9090-603e14da4be2",
//     name: "Mr. Kelly Hahn",
//     location: {
//       latitude: "-24.3534",
//       longitude: "157.2955",
//     },
//     yoe: 17,
//     acceptedOffers: 11,
//     canceledOffers: 0,
//     averageReplyTime: 113,
//     score: 7.655223720655971,
//   },
//   {
//     id: "17b3c57f-1f09-43a7-9281-57a407a97fce",
//     name: "Donnie Green",
//     location: {
//       latitude: "16.8686",
//       longitude: "-167.0713",
//     },
//     yoe: 23,
//     acceptedOffers: 95,
//     canceledOffers: "null",
//     averageReplyTime: 221,
//     score: 7.62840090407952,
//   },
//   {
//     id: "9e0dd1c3-1a5f-4bd5-b46d-33afdf3e2efe",
//     name: "Lynne Hessel",
//     location: {
//       latitude: "-23.6088",
//       longitude: "-40.5594",
//     },
//     yoe: 3,
//     acceptedOffers: 36,
//     canceledOffers: 0,
//     averageReplyTime: 173,
//     score: 7.476695812509541,
//   },
//   {
//     id: "0ed8cc59-73bf-4048-8f09-5c31fc04cebf",
//     name: "Sandra Abshire",
//     location: {
//       latitude: "86.4050",
//       longitude: "141.0546",
//     },
//     yoe: 5,
//     acceptedOffers: 26,
//     canceledOffers: 0,
//     averageReplyTime: 251,
//     score: 7.412379076486717,
//   },
//   {
//     id: "70372f7d-f8b1-4087-97ad-15566a022e5d",
//     name: "Carmen Boyer",
//     location: {
//       latitude: "39.7575",
//       longitude: "114.5477",
//     },
//     yoe: 21,
//     acceptedOffers: 95,
//     canceledOffers: 0,
//     averageReplyTime: 609,
//     score: 7.400417474236084,
//   },
//   {
//     id: "cb0e20c0-f96e-4427-99b8-f1ab815ffb8a",
//     name: "Harvey Crist",
//     location: {
//       latitude: "-4.1085",
//       longitude: "-154.7705",
//     },
//     yoe: 14,
//     acceptedOffers: 51,
//     canceledOffers: 0,
//     averageReplyTime: 519,
//     score: 7.3838578384771845,
//   },
// ];
