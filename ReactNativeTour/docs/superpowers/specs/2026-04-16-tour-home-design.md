# 투어 홈 화면 설계 문서

**작성일:** 2026-04-16
**플랫폼:** React Native 0.84.1 + TypeScript
**아키텍처:** Feature-Sliced MVI
**작업 유형:** 기존 프로젝트에 Feature 추가
**브랜치:** feature/tour_home

---

## 1. 기능 개요

NOL 인터파크투어 앱의 투어 홈 화면을 구현한다.
Figma 디자인(`g8VkibGFPvgKdmkkGScE9r`, nodeId: `7275:143694`)을 기준으로 전체 섹션을 구현하며,
모든 데이터는 Mock JSON으로 주입한다.

---

## 2. 플랫폼 및 아키텍처

| 항목 | 결정값 |
|------|--------|
| 플랫폼 | React Native 0.84.1 |
| 언어 | TypeScript |
| 아키텍처 | Feature-Sliced MVI |
| 테스트 | Jest |
| 내비게이션 | @react-navigation/native + @react-navigation/bottom-tabs |
| 폰트 | Pretendard (Bold, SemiBold, Regular) |
| Mock 데이터 | JSON 파일 (`src/data/mock/`) |

---

## 3. 디렉토리 구조

```
src/
├── assets/
│   └── fonts/                    # Pretendard 폰트 파일 위치
├── domain/
│   ├── model/
│   │   ├── TourProduct.ts
│   │   ├── SearchQuery.ts
│   │   └── BannerItem.ts
│   ├── repository/
│   │   ├── TourRepository.ts
│   │   └── SearchRepository.ts
│   └── usecase/
│       ├── GetHomeContentUseCase.ts
│       └── GetSearchResultUseCase.ts
├── data/
│   ├── mock/
│   │   ├── notice.json
│   │   ├── adBanner.json
│   │   ├── productSections.json
│   │   ├── guideSection.json
│   │   ├── flightDeals.json
│   │   ├── bannerList.json
│   │   ├── nolLive.json
│   │   └── searchDefaults.json
│   ├── mapper/
│   │   └── TourProductMapper.ts
│   └── repository/
│       └── TourRepositoryImpl.ts
└── presentation/
    ├── navigation/
    │   └── RootTabNavigator.tsx
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── CategoryScreen.tsx
    │   ├── SearchScreen.tsx
    │   └── MyPageScreen.tsx
    ├── components/
    │   ├── gnb/
    │   │   └── AppGnbHeader.tsx
    │   ├── search/
    │   │   ├── SearchModule.tsx
    │   │   ├── FlightSearchForm.tsx
    │   │   ├── HotelSearchForm.tsx
    │   │   ├── TourSearchForm.tsx
    │   │   └── PackageSearchForm.tsx
    │   ├── shortcuts/
    │   │   └── CategoryShortcuts.tsx
    │   ├── content/
    │   │   ├── NoticeBanner.tsx
    │   │   ├── AdBanner.tsx
    │   │   ├── ProductSection.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── GuideCard.tsx
    │   │   ├── GuideSection.tsx
    │   │   ├── FlightDealSection.tsx
    │   │   ├── BannerListSection.tsx
    │   │   └── NolLiveSection.tsx
    │   └── common/
    │       └── SectionHeader.tsx
    └── mvi/
        ├── home/
        │   ├── HomeAction.ts
        │   ├── HomeState.ts
        │   ├── HomeReducer.ts
        │   └── useHomeViewModel.ts
        └── search/
            ├── SearchAction.ts
            ├── SearchState.ts
            ├── SearchReducer.ts
            └── useSearchViewModel.ts
```

---

## 4. MVI 데이터 흐름

### HomeState
```ts
type HomeState = {
  isLoading: boolean;
  notice: Notice | null;
  adBanner: AdBanner | null;
  productSections: ProductSection[];
  guideSection: GuideSection | null;
  flightDeals: FlightDealSection | null;
  bannerList: BannerItem[];
  nolLive: NolLiveSection | null;
  error: string | null;
};
```

### HomeAction
```ts
type HomeAction =
  | { type: 'LOAD_HOME_CONTENT' }
  | { type: 'LOAD_HOME_CONTENT_SUCCESS'; payload: HomeContentPayload }
  | { type: 'LOAD_HOME_CONTENT_FAILURE'; payload: string };
```

### SearchState
```ts
type SearchTab = '항공' | '숙소' | '투어·티켓' | '해외패키지';

type SearchState = {
  activeTab: SearchTab;
  flight: FlightSearchForm;
  hotel: HotelSearchForm;
  tour: TourSearchForm;
  package: PackageSearchForm;
};
```

### SearchAction
```ts
type SearchAction =
  | { type: 'SELECT_TAB'; payload: SearchTab }
  | { type: 'UPDATE_FLIGHT_DEPARTURE'; payload: string }
  | { type: 'UPDATE_FLIGHT_ARRIVAL'; payload: string }
  | { type: 'UPDATE_FLIGHT_DATE'; payload: { departure: string; return: string } }
  | { type: 'UPDATE_PASSENGERS'; payload: { adults: number; children: number } }
  | { type: 'SWAP_FLIGHT_CITIES' }
  | { type: 'UPDATE_HOTEL_DESTINATION'; payload: string }
  | { type: 'UPDATE_HOTEL_DATE'; payload: { checkIn: string; checkOut: string } }
  | { type: 'UPDATE_TOUR_DESTINATION'; payload: string }
  | { type: 'UPDATE_PACKAGE_DESTINATION'; payload: string };
```

---

## 5. 내비게이션

```
RootTabNavigator (Bottom Tab)
├── 홈       → HomeScreen     (아이콘: home, 활성: bold)
├── 카테고리  → CategoryScreen (아이콘: list, 빈 화면)
├── 검색     → SearchScreen   (아이콘: search, 빈 화면)
└── 마이     → MyPageScreen   (아이콘: person, 빈 화면)
```

탭바 색상:
- 활성: `#29292d` (텍스트 Bold)
- 비활성: `#7e7e81` (텍스트 Regular)
- 배경: `#ffffff`
- 상단 구분선: `rgba(41,41,45,0.1)`

---

## 6. 화면 섹션 구성 (HomeScreen 렌더링 순서)

| # | 컴포넌트 | 높이(Figma) | 비고 |
|---|---------|------------|------|
| 1 | `AppGnbHeader` | 52px | 로고 + 검색 아이콘 |
| 2 | `SearchModule` | 266px | 탭 4개 + 탭별 폼 |
| 3 | `CategoryShortcuts` | 158px | 아이콘 10개, 2행 |
| 4 | `NoticeBanner` | 94px | 공지 1줄 |
| 5 | `AdBanner` | 84px | 이미지 + 텍스트 + AD 뱃지 |
| 6 | `ProductSection` (horizontal_small_card) | 184px | 가로 스크롤 |
| 7 | `ProductSection` (horizontal_poi_card) | 374px | 가로 스크롤 |
| 8 | `ProductSection` (horizontal_destination_chip) | 140px | 가로 스크롤 |
| 9 | `ProductSection` (horizontal_poi_card) | 291px | 가로 스크롤 |
| 10 | `ProductSection` (horizontal_poi_card) | 655px | 전체 폭 카드 |
| 11 | `GuideSection` | 296px | 가이드 카드 |
| 12 | `ProductSection` + `BannerListSection` | 325px | 목록 + 배너 |
| 13 | `ProductSection` (two_column_grid) | 294px | 2열 그리드 |
| 14 | `FlightDealSection` | 714px | 배경 이미지 + 항공 목록 |
| 15 | `ProductSection` (행 리스트) | 276px | 텍스트 행 목록 |
| 16 | `ProductSection` (horizontal_poi_card) | 334px | 가로 스크롤 |
| 17 | `NolLiveSection` | ~ | UI만, 영상 연결 없음 |

---

## 7. 색상 토큰

```ts
// src/presentation/theme/colors.ts
export const colors = {
  primary: '#4154ff',
  textPrimary: '#29292d',
  textSecondary: 'rgba(41,41,45,0.8)',
  textDisabled: 'rgba(41,41,45,0.3)',
  bgInput: 'rgba(41,41,45,0.04)',
  bgShortcutActive: '#f0f1ff',
  white: '#ffffff',
  divider: 'rgba(41,41,45,0.1)',
  gnbInactive: '#7e7e81',
  black: '#29292d',
};
```

---

## 8. 폰트 설정 (Pretendard)

- 파일 위치: `src/assets/fonts/`
- 자동 링크: `react-native.config.js`의 `assets` 경로 등록
- 적용 방법: `npx react-native-asset` 실행 후 iOS/Android 자동 링크
- Fallback: `System` (폰트 파일 없을 시)

```ts
// src/presentation/theme/typography.ts
export const typography = {
  bold: 'Pretendard-Bold',
  semiBold: 'Pretendard-SemiBold',
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  light: 'Pretendard-Light',
};
```

---

## 9. Mock 데이터 파일 목록

| 파일 | 설명 |
|------|------|
| `notice.json` | 공지 배너 |
| `adBanner.json` | 광고 배너 |
| `productSections.json` | 전체 Product Set 섹션 (6개) |
| `guideSection.json` | 여행 가이드 카드 섹션 |
| `flightDeals.json` | 땡처리 항공 섹션 |
| `bannerList.json` | 배너 리스트 |
| `nolLive.json` | NOL LIVE 섹션 |
| `searchDefaults.json` | 검색 기본값 (탭별) |

---

## 10. 에러 처리

- UseCase 내부에서 try/catch로 에러 처리
- `HomeState.error` 에 에러 메시지 저장
- 에러 발생 시 화면에 `ErrorView` 컴포넌트 표시 (재시도 버튼 포함)
- Mock 데이터 로딩 실패는 런타임 에러로 간주

---

## 11. 테스트 전략

| 대상 | 테스트 유형 | 프레임워크 |
|------|-----------|-----------|
| HomeReducer | 단위 테스트 | Jest |
| SearchReducer | 단위 테스트 | Jest |
| useHomeViewModel | Hook 테스트 | Jest + @testing-library/react-native |
| useSearchViewModel | Hook 테스트 | Jest + @testing-library/react-native |
| HomeScreen | 스냅샷 테스트 | Jest |

---

## 12. 제약 사항

- NOL LIVE 섹션: UI만 구현, 영상 스트리밍 연결 없음
- 검색 버튼(최저가 검색): UI만 구현, 실제 검색 결과 화면 없음
- 카테고리/검색/마이 탭: 빈 화면으로 구현
- 이미지: Figma 에셋 URL 만료(7일) 후 대체 이미지 사용
- 폰트: `src/assets/fonts/` 에 Pretendard 파일 추가 필요
