import { DomesticSchedule } from '@/domain/model/DomesticSchedule';
import { IntlSchedule } from '@/domain/model/IntlSchedule';

export const MOCK_DOMESTIC_SCHEDULES: DomesticSchedule[] = [
  { flightNumber: 'KE 1201', airline: '대한항공', origin: 'GMP', destination: 'CJU', departureTime: '07:00', arrivalTime: '08:10', operatingDays: '매일' },
  { flightNumber: 'KE 1203', airline: '대한항공', origin: 'GMP', destination: 'CJU', departureTime: '09:00', arrivalTime: '10:10', operatingDays: '매일' },
  { flightNumber: 'OZ 8901', airline: '아시아나', origin: 'GMP', destination: 'CJU', departureTime: '08:30', arrivalTime: '09:40', operatingDays: '매일' },
  { flightNumber: '7C 101', airline: '제주항공', origin: 'GMP', destination: 'CJU', departureTime: '10:00', arrivalTime: '11:10', operatingDays: '매일' },
  { flightNumber: 'LJ 201', airline: '진에어', origin: 'GMP', destination: 'CJU', departureTime: '11:30', arrivalTime: '12:40', operatingDays: '매일' },
  { flightNumber: 'KE 1401', airline: '대한항공', origin: 'GMP', destination: 'PUS', departureTime: '07:30', arrivalTime: '08:35', operatingDays: '매일' },
  { flightNumber: 'OZ 8501', airline: '아시아나', origin: 'GMP', destination: 'PUS', departureTime: '09:00', arrivalTime: '10:05', operatingDays: '매일' },
  { flightNumber: 'KE 1205', airline: '대한항공', origin: 'ICN', destination: 'CJU', departureTime: '08:00', arrivalTime: '09:10', operatingDays: '매일' },
  { flightNumber: '7C 801', airline: '제주항공', origin: 'ICN', destination: 'CJU', departureTime: '10:30', arrivalTime: '11:40', operatingDays: '월/수/금' },
  { flightNumber: 'KE 1801', airline: '대한항공', origin: 'PUS', destination: 'GMP', departureTime: '07:00', arrivalTime: '08:05', operatingDays: '매일' },
  { flightNumber: 'OZ 8801', airline: '아시아나', origin: 'PUS', destination: 'CJU', departureTime: '09:30', arrivalTime: '10:20', operatingDays: '화/목/토' },
  { flightNumber: 'BX 117', airline: '에어부산', origin: 'PUS', destination: 'ICN', departureTime: '12:00', arrivalTime: '13:05', operatingDays: '매일' },
  { flightNumber: 'KE 1603', airline: '대한항공', origin: 'CJU', destination: 'GMP', departureTime: '08:00', arrivalTime: '09:10', operatingDays: '매일' },
  { flightNumber: '7C 102', airline: '제주항공', origin: 'CJU', destination: 'ICN', departureTime: '12:00', arrivalTime: '13:10', operatingDays: '매일' },
  { flightNumber: 'LJ 302', airline: '진에어', origin: 'CJU', destination: 'PUS', departureTime: '14:30', arrivalTime: '15:20', operatingDays: '월/수/금' },
];

export const MOCK_INTL_SCHEDULES: IntlSchedule[] = [
  { flightNumber: 'KE 703', airline: '대한항공', origin: 'ICN', destination: 'NRT', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '09:00', arrivalTime: '11:15', operatingDays: '매일' },
  { flightNumber: 'OZ 101', airline: '아시아나', origin: 'ICN', destination: 'NRT', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '10:30', arrivalTime: '12:45', operatingDays: '매일' },
  { flightNumber: 'KE 011', airline: '대한항공', origin: 'ICN', destination: 'LAX', destinationCountry: '미국', destinationFlag: '🇺🇸', departureTime: '11:00', arrivalTime: '08:50', operatingDays: '매일' },
  { flightNumber: 'OZ 202', airline: '아시아나', origin: 'ICN', destination: 'LAX', destinationCountry: '미국', destinationFlag: '🇺🇸', departureTime: '13:00', arrivalTime: '10:50', operatingDays: '월/수/금/일' },
  { flightNumber: 'KE 607', airline: '대한항공', origin: 'ICN', destination: 'SIN', destinationCountry: '싱가포르', destinationFlag: '🇸🇬', departureTime: '13:30', arrivalTime: '19:00', operatingDays: '매일' },
  { flightNumber: 'LJ 201', airline: '진에어', origin: 'ICN', destination: 'SIN', destinationCountry: '싱가포르', destinationFlag: '🇸🇬', departureTime: '15:00', arrivalTime: '20:30', operatingDays: '화/목/토' },
  { flightNumber: '7C 501', airline: '제주항공', origin: 'ICN', destination: 'BKK', destinationCountry: '태국', destinationFlag: '🇹🇭', departureTime: '10:30', arrivalTime: '14:45', operatingDays: '매일' },
  { flightNumber: 'OZ 361', airline: '아시아나', origin: 'ICN', destination: 'BKK', destinationCountry: '태국', destinationFlag: '🇹🇭', departureTime: '14:00', arrivalTime: '18:30', operatingDays: '매일' },
  { flightNumber: 'KE 851', airline: '대한항공', origin: 'ICN', destination: 'CDG', destinationCountry: '프랑스', destinationFlag: '🇫🇷', departureTime: '14:30', arrivalTime: '20:00', operatingDays: '매일' },
  { flightNumber: 'OZ 501', airline: '아시아나', origin: 'ICN', destination: 'FRA', destinationCountry: '독일', destinationFlag: '🇩🇪', departureTime: '16:00', arrivalTime: '22:00', operatingDays: '월/수/금' },
  { flightNumber: 'KE 2703', airline: '대한항공', origin: 'PUS', destination: 'NRT', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '09:30', arrivalTime: '11:40', operatingDays: '매일' },
  { flightNumber: 'BX 391', airline: '에어부산', origin: 'PUS', destination: 'NRT', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '11:00', arrivalTime: '13:10', operatingDays: '화/목/토' },
  { flightNumber: 'KE 751', airline: '대한항공', origin: 'PUS', destination: 'BKK', destinationCountry: '태국', destinationFlag: '🇹🇭', departureTime: '14:00', arrivalTime: '18:20', operatingDays: '월/수/금' },
  { flightNumber: 'RS 501', airline: '에어서울', origin: 'ICN', destination: 'HND', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '08:00', arrivalTime: '10:10', operatingDays: '매일' },
  { flightNumber: 'TW 101', airline: '티웨이', origin: 'ICN', destination: 'NRT', destinationCountry: '일본', destinationFlag: '🇯🇵', departureTime: '07:30', arrivalTime: '09:45', operatingDays: '매일' },
];
