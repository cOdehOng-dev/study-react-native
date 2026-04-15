import { FlightStatus } from '@/domain/model/FlightStatus';

export const MOCK_FLIGHT_STATUS: FlightStatus[] = [
  { flightNumber: 'KE 123', airline: '대한항공', origin: 'ICN', destination: 'NRT', departureTime: '08:30', arrivalTime: '10:45', status: 'IN_FLIGHT' },
  { flightNumber: 'KE 203', airline: '대한항공', origin: 'ICN', destination: 'LAX', departureTime: '11:00', arrivalTime: '09:50', status: 'ON_TIME' },
  { flightNumber: 'OZ 101', airline: '아시아나', origin: 'ICN', destination: 'NRT', departureTime: '09:00', arrivalTime: '11:15', status: 'DELAYED', delayMinutes: 30 },
  { flightNumber: 'OZ 202', airline: '아시아나', origin: 'GMP', destination: 'CJU', departureTime: '09:30', arrivalTime: '10:40', status: 'IN_FLIGHT' },
  { flightNumber: '7C 101', airline: '제주항공', origin: 'GMP', destination: 'CJU', departureTime: '10:00', arrivalTime: '11:10', status: 'ON_TIME' },
  { flightNumber: '7C 501', airline: '제주항공', origin: 'ICN', destination: 'BKK', departureTime: '10:30', arrivalTime: '14:45', status: 'DELAYED', delayMinutes: 45 },
  { flightNumber: 'LJ 201', airline: '진에어', origin: 'ICN', destination: 'SIN', departureTime: '11:30', arrivalTime: '17:00', status: 'IN_FLIGHT' },
  { flightNumber: 'BX 117', airline: '에어부산', origin: 'PUS', destination: 'ICN', departureTime: '12:00', arrivalTime: '13:05', status: 'ON_TIME' },
  { flightNumber: 'TW 101', airline: '티웨이', origin: 'ICN', destination: 'NRT', departureTime: '13:00', arrivalTime: '15:15', status: 'ON_TIME' },
  { flightNumber: 'KE 607', airline: '대한항공', origin: 'ICN', destination: 'SIN', departureTime: '13:30', arrivalTime: '19:00', status: 'ON_TIME' },
  { flightNumber: 'OZ 361', airline: '아시아나', origin: 'ICN', destination: 'BKK', departureTime: '14:00', arrivalTime: '18:30', status: 'IN_FLIGHT' },
  { flightNumber: 'KE 1201', airline: '대한항공', origin: 'GMP', destination: 'CJU', departureTime: '14:30', arrivalTime: '15:40', status: 'LANDED' },
  { flightNumber: '7C 801', airline: '제주항공', origin: 'GMP', destination: 'PUS', departureTime: '15:00', arrivalTime: '16:05', status: 'ON_TIME' },
  { flightNumber: 'LJ 301', airline: '진에어', origin: 'GMP', destination: 'CJU', departureTime: '15:30', arrivalTime: '16:40', status: 'DELAYED', delayMinutes: 20 },
  { flightNumber: 'KE 703', airline: '대한항공', origin: 'ICN', destination: 'NRT', departureTime: '16:00', arrivalTime: '18:15', status: 'ON_TIME' },
  { flightNumber: 'OZ 501', airline: '아시아나', origin: 'PUS', destination: 'ICN', departureTime: '16:30', arrivalTime: '17:35', status: 'ON_TIME' },
  { flightNumber: 'RS 501', airline: '에어서울', origin: 'ICN', destination: 'NRT', departureTime: '17:00', arrivalTime: '19:15', status: 'ON_TIME' },
  { flightNumber: 'KE 1401', airline: '대한항공', origin: 'GMP', destination: 'RSU', departureTime: '17:30', arrivalTime: '18:30', status: 'CANCELLED' },
  { flightNumber: '7C 201', airline: '제주항공', origin: 'ICN', destination: 'TAE', departureTime: '18:00', arrivalTime: '18:55', status: 'ON_TIME' },
  { flightNumber: 'OZ 703', airline: '아시아나', origin: 'ICN', destination: 'SIN', departureTime: '18:30', arrivalTime: '00:10', status: 'ON_TIME' },
];
