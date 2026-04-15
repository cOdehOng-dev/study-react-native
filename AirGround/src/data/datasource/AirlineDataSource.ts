import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirlineEntry } from '@/domain/model/AirlineEntry';

const CACHE_KEY = '@airground/airlines_cache';
const CSV_URL =
  'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat';

let _cache: AirlineEntry[] = [];

async function _fetchAndParseCSV(): Promise<AirlineEntry[]> {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const text = await response.text();
    const entries: AirlineEntry[] = [];
    for (const line of text.split('\n')) {
      const cols = line.split(',');
      if (cols.length < 4) continue;
      const iata = cols[3]?.replace(/"/g, '').trim();
      const icao = cols[4]?.replace(/"/g, '').trim();
      if (iata && iata !== '\\N' && iata.length === 2) {
        entries.push({ iata, icao: icao || '' });
      }
    }
    return entries;
  } catch (error) {
    throw new Error(`CSV 패치 실패: ${error}`);
  }
}

export async function loadAirlines(): Promise<void> {
  if (_cache.length > 0) return;

  try {
    const stored = await AsyncStorage.getItem(CACHE_KEY);
    if (stored) {
      _cache = JSON.parse(stored) as AirlineEntry[];
      return;
    }
  } catch {
    // AsyncStorage 읽기 실패 시 네트워크 패치로 폴백
  }

  const entries = await _fetchAndParseCSV();
  _cache = entries;

  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(entries));
  } catch {
    // 캐시 저장 실패는 무시 (메모리 캐시로 동작)
  }
}

export function getAirlines(): AirlineEntry[] {
  return _cache;
}

export function resetAirlinesCache(): void {
  _cache = [];
}
