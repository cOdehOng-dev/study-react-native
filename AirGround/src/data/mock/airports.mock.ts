import { AirportInfo } from '@/domain/model/AirportInfo';

export const MOCK_AIRPORTS: AirportInfo[] = [
  {
    iataCode: 'ICN', icaoCode: 'RKSI',
    nameKo: '인천국제공항', nameEn: 'Incheon International Airport',
    cityKo: '인천 / 서울', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['T1', 'T2'],
  },
  {
    iataCode: 'GMP', icaoCode: 'RKSS',
    nameKo: '김포국제공항', nameEn: 'Gimpo International Airport',
    cityKo: '서울', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['국내선', '국제선'],
  },
  {
    iataCode: 'PUS', icaoCode: 'RKPK',
    nameKo: '김해국제공항', nameEn: 'Gimhae International Airport',
    cityKo: '부산', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['T1'],
  },
  {
    iataCode: 'CJU', icaoCode: 'RKPC',
    nameKo: '제주국제공항', nameEn: 'Jeju International Airport',
    cityKo: '제주', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['T1'],
  },
  {
    iataCode: 'TAE', icaoCode: 'RKTN',
    nameKo: '대구국제공항', nameEn: 'Daegu International Airport',
    cityKo: '대구', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['T1'],
  },
  {
    iataCode: 'RSU', icaoCode: 'RKJY',
    nameKo: '여수공항', nameEn: 'Yeosu Airport',
    cityKo: '여수', country: '대한민국',
    timezone: 'Asia/Seoul', terminals: ['T1'],
  },
  {
    iataCode: 'NRT', icaoCode: 'RJAA',
    nameKo: '도쿄 나리타 국제공항', nameEn: 'Narita International Airport',
    cityKo: '도쿄', country: '일본',
    timezone: 'Asia/Tokyo', terminals: ['T1', 'T2', 'T3'],
  },
  {
    iataCode: 'LAX', icaoCode: 'KLAX',
    nameKo: '로스앤젤레스 국제공항', nameEn: 'Los Angeles International Airport',
    cityKo: '로스앤젤레스', country: '미국',
    timezone: 'America/Los_Angeles', terminals: ['T1','T2','T3','T4','T5','T6','T7','T8'],
  },
  {
    iataCode: 'SIN', icaoCode: 'WSSS',
    nameKo: '싱가포르 창이 공항', nameEn: 'Singapore Changi Airport',
    cityKo: '싱가포르', country: '싱가포르',
    timezone: 'Asia/Singapore', terminals: ['T1', 'T2', 'T3', 'T4'],
  },
  {
    iataCode: 'BKK', icaoCode: 'VTBS',
    nameKo: '방콕 수완나품 국제공항', nameEn: 'Suvarnabhumi Airport',
    cityKo: '방콕', country: '태국',
    timezone: 'Asia/Bangkok', terminals: ['Main'],
  },
];
