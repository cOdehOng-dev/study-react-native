import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAllMockStorages } from '@react-native-async-storage/async-storage/jest';
import { loadAirlines, getAirlines, resetAirlinesCache } from '@/data/datasource/AirlineDataSource';

const MOCK_ENTRIES = [{ iata: 'KE', icao: 'KAL' }, { iata: 'OZ', icao: 'AAR' }];
const CACHE_KEY = '@airground/airlines_cache';

describe('AirlineDataSource', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(async () => {
    jest.clearAllMocks();
    resetAirlinesCache();
    clearAllMockStorages();
    originalFetch = global.fetch;
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('AsyncStorage에 캐시가 있으면 fetch를 호출하지 않는다', async () => {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(MOCK_ENTRIES));
    await loadAirlines();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(getAirlines()).toEqual(MOCK_ENTRIES);
  });

  it('메모리 캐시가 있으면 AsyncStorage도 조회하지 않는다', async () => {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(MOCK_ENTRIES));
    await loadAirlines();
    // 두 번째 호출 - 메모리 캐시에서 반환
    const getItemSpy = jest.spyOn(AsyncStorage, 'getItem');
    await loadAirlines();
    expect(getItemSpy).not.toHaveBeenCalled();
    getItemSpy.mockRestore();
  });

  it('캐시가 없고 fetch 성공 시 AsyncStorage에 저장한다', async () => {
    const mockCSV = `0,"Fake","-","\\N","\\N","","Y"\n1,"Korean Air","KE","KE","KAL","","Y"`;
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });
    await loadAirlines();
    const stored = await AsyncStorage.getItem(CACHE_KEY);
    expect(stored).not.toBeNull();
  });
});
