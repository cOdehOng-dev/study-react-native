# KREAM Clone — Plan 6: MY 탭 (MyPage) Feature (5개 화면)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MY 탭을 실제 마이페이지로 구현한다. 프로필 메인, 구매/판매 내역, 관심 상품, 내 스타일, 계정 설정 5개 화면을 Clean Architecture + MVI 패턴으로 구성한다.

**Architecture:** `MyPageStackParamList` + `MyPageStackNavigator` 추가 후 MainNavigator My 탭에 연결. 기존 `UserModel`·`OrderModel`·`MOCK_ORDERS`·`MOCK_STYLES` 재사용. 새 UseCase 1개(`GetMyPageUseCase`) 추가.

**Tech Stack:** React Native 0.84.1 · TypeScript · React Navigation v7 (NativeStack) · Mock 데이터

> **시리즈:** Plan 6/8. Plan 5(Search Feature) 완료 상태에서 시작.

---

## 파일 맵

```
src/
├── domain/usecase/
│   └── GetMyPageUseCase.ts       (new)
└── presentation/
    ├── navigation/
    │   ├── types.ts               (modify: append MyPageStackParamList)
    │   ├── MyPageStackNavigator.tsx  (new)
    │   └── MainNavigator.tsx      (modify: wire MyPageStackNavigator)
    └── mypage/
        ├── mvi/
        │   ├── MyPageAction.ts
        │   ├── MyPageState.ts
        │   ├── MyPageReducer.ts
        │   └── useMyPageViewModel.ts
        ├── MyPageScreen.tsx
        ├── OrderHistoryScreen.tsx
        ├── WishlistScreen.tsx
        ├── MyStylesScreen.tsx
        └── AccountSettingsScreen.tsx

__tests__/
├── domain/GetMyPageUseCase.test.ts     (new)
└── presentation/MyPageReducer.test.ts  (new)
```

---

## Task 1: GetMyPageUseCase + 테스트

**Files:**
- Create: `src/domain/usecase/GetMyPageUseCase.ts`
- Create: `__tests__/domain/GetMyPageUseCase.test.ts`

기존 `UserModel`, `OrderModel`, `MOCK_ORDERS`, `authMock.ts` 재사용.

- [ ] **Step 1: authMock.ts 구조 확인**

Read `src/data/mock/authMock.ts` to find the mock user object.

- [ ] **Step 2: 테스트 먼저 작성 (RED)**

`__tests__/domain/GetMyPageUseCase.test.ts`:
```typescript
import { GetMyPageUseCase } from '../../src/domain/usecase/GetMyPageUseCase';

describe('GetMyPageUseCase', () => {
  const useCase = new GetMyPageUseCase();

  it('execute: mock 유저 정보 반환', async () => {
    const result = await useCase.execute(true);
    expect(result.user).toBeDefined();
    expect(result.user.id).toBeTruthy();
    expect(result.user.email).toBeTruthy();
  });

  it('execute: mock 주문 내역 반환', async () => {
    const result = await useCase.execute(true);
    expect(Array.isArray(result.orders)).toBe(true);
    expect(result.orders.length).toBeGreaterThan(0);
  });

  it('execute: 구매 주문과 판매 주문 모두 포함', async () => {
    const result = await useCase.execute(true);
    const types = result.orders.map((o) => o.type);
    expect(types).toContain('구매');
    expect(types).toContain('판매');
  });

  it('execute: useMock=false 시 에러 발생', async () => {
    await expect(useCase.execute(false)).rejects.toThrow('Repository not configured');
  });
});
```

- [ ] **Step 3: 테스트 실행 — 실패 확인**

Run: `npx jest __tests__/domain/GetMyPageUseCase.test.ts --no-coverage`
Expected: FAIL

- [ ] **Step 4: GetMyPageUseCase.ts 구현**

Read `src/data/mock/authMock.ts` to find the mock user export name. Then implement:

`src/domain/usecase/GetMyPageUseCase.ts`:
```typescript
import { UserModel } from '../model/UserModel';
import { OrderModel } from '../model/OrderModel';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
// Import the mock user from authMock — check the actual export name first
// Likely: import { MOCK_USER } from '../../data/mock/authMock';

export interface MyPageData {
  user: UserModel;
  orders: OrderModel[];
}

export class GetMyPageUseCase {
  async execute(useMock = true): Promise<MyPageData> {
    if (!useMock) {
      // TODO: API 연동 필요 — GET /api/v1/me
      throw new Error('Repository not configured');
    }
    // Use the mock user from authMock
    const user: UserModel = {
      id: 'u001',
      email: 'test@kream.co.kr',
      name: '크림유저',
      profileImage: null,
    };
    return { user, orders: MOCK_ORDERS };
  }
}
```

**IMPORTANT:** Read `src/data/mock/authMock.ts` first to check if there's already a mock user defined. If `MOCK_USER` exists, import it instead of hardcoding. If the file doesn't have a UserModel-compatible export, use the hardcoded fallback.

- [ ] **Step 5: 테스트 실행 — 통과 확인**

Run: `npx jest __tests__/domain/GetMyPageUseCase.test.ts --no-coverage`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add src/domain/usecase/GetMyPageUseCase.ts __tests__/domain/GetMyPageUseCase.test.ts
git commit -m "feat: add GetMyPageUseCase with TDD"
```

---

## Task 2: MyPage MVI

**Files:**
- Create: `src/presentation/mypage/mvi/MyPageAction.ts`
- Create: `src/presentation/mypage/mvi/MyPageState.ts`
- Create: `src/presentation/mypage/mvi/MyPageReducer.ts`
- Create: `src/presentation/mypage/mvi/useMyPageViewModel.ts`
- Create: `__tests__/presentation/MyPageReducer.test.ts`

- [ ] **Step 1: MyPageAction.ts 작성**

`src/presentation/mypage/mvi/MyPageAction.ts`:
```typescript
import { UserModel } from '../../../../domain/model/UserModel';
import { OrderModel } from '../../../../domain/model/OrderModel';
import { ProductModel } from '../../../../domain/model/ProductModel';

export type MyPageAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; user: UserModel; orders: OrderModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'TOGGLE_WISH'; product: ProductModel };
```

- [ ] **Step 2: MyPageState.ts 작성**

`src/presentation/mypage/mvi/MyPageState.ts`:
```typescript
import { UserModel } from '../../../../domain/model/UserModel';
import { OrderModel } from '../../../../domain/model/OrderModel';
import { ProductModel } from '../../../../domain/model/ProductModel';

export interface MyPageState {
  user: UserModel | null;
  orders: OrderModel[];
  wishlist: ProductModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialMyPageState: MyPageState = {
  user: null,
  orders: [],
  wishlist: [],
  isLoading: false,
  error: null,
};
```

- [ ] **Step 3: MyPageReducer 테스트 작성 (RED)**

`__tests__/presentation/MyPageReducer.test.ts`:
```typescript
import { myPageReducer } from '../../src/presentation/mypage/mvi/MyPageReducer';
import { initialMyPageState } from '../../src/presentation/mypage/mvi/MyPageState';
import { UserModel } from '../../src/domain/model/UserModel';
import { OrderModel } from '../../src/domain/model/OrderModel';
import { ProductModel } from '../../src/domain/model/ProductModel';

const mockUser: UserModel = { id: 'u001', email: 'test@kream.co.kr', name: '크림유저', profileImage: null };
const mockOrder: OrderModel = {
  id: 'order001', productId: 'p001', productName: 'Nike Air Force 1', size: '260',
  price: 117000, type: '구매', status: '완료', createdAt: '2026-04-10T14:00:00Z',
};
const mockProduct: ProductModel = {
  id: 'p001', brand: 'Nike', name: 'Air Force 1', imageUri: 'https://picsum.photos/seed/p001/300/300',
  buyPrice: 119000, sellPrice: 110000, wishCount: 1000, category: '스니커즈', isNew: false,
};

describe('myPageReducer', () => {
  it('SET_LOADING: 로딩 상태 업데이트', () => {
    const result = myPageReducer(initialMyPageState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS: 유저·주문 저장, 로딩 해제, 에러 초기화', () => {
    const loading = { ...initialMyPageState, isLoading: true };
    const result = myPageReducer(loading, { type: 'LOAD_SUCCESS', user: mockUser, orders: [mockOrder] });
    expect(result.isLoading).toBe(false);
    expect(result.user?.id).toBe('u001');
    expect(result.orders).toHaveLength(1);
    expect(result.error).toBeNull();
  });

  it('SET_ERROR: 에러 저장, 로딩 해제', () => {
    const result = myPageReducer(initialMyPageState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
    expect(result.isLoading).toBe(false);
  });

  it('TOGGLE_WISH: 없던 상품을 위시리스트에 추가', () => {
    const result = myPageReducer(initialMyPageState, { type: 'TOGGLE_WISH', product: mockProduct });
    expect(result.wishlist).toHaveLength(1);
    expect(result.wishlist[0].id).toBe('p001');
  });

  it('TOGGLE_WISH: 이미 있는 상품을 위시리스트에서 제거', () => {
    const state = { ...initialMyPageState, wishlist: [mockProduct] };
    const result = myPageReducer(state, { type: 'TOGGLE_WISH', product: mockProduct });
    expect(result.wishlist).toHaveLength(0);
  });

  it('알 수 없는 액션: 상태 유지', () => {
    const result = myPageReducer(initialMyPageState, { type: 'UNKNOWN' } as never);
    expect(result).toEqual(initialMyPageState);
  });
});
```

- [ ] **Step 4: 테스트 실행 — 실패 확인**

Run: `npx jest __tests__/presentation/MyPageReducer.test.ts --no-coverage`
Expected: FAIL

- [ ] **Step 5: MyPageReducer.ts 구현**

`src/presentation/mypage/mvi/MyPageReducer.ts`:
```typescript
import { MyPageState } from './MyPageState';
import { MyPageAction } from './MyPageAction';

export function myPageReducer(state: MyPageState, action: MyPageAction): MyPageState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, user: action.user, orders: action.orders };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'TOGGLE_WISH': {
      const exists = state.wishlist.some((p) => p.id === action.product.id);
      const wishlist = exists
        ? state.wishlist.filter((p) => p.id !== action.product.id)
        : [...state.wishlist, action.product];
      return { ...state, wishlist };
    }
    default:
      return state;
  }
}
```

- [ ] **Step 6: 테스트 실행 — 통과 확인**

Run: `npx jest __tests__/presentation/MyPageReducer.test.ts --no-coverage`
Expected: PASS (6 tests)

- [ ] **Step 7: useMyPageViewModel.ts 작성**

`src/presentation/mypage/mvi/useMyPageViewModel.ts`:
```typescript
import { useReducer, useCallback, useEffect } from 'react';
import { myPageReducer } from './MyPageReducer';
import { initialMyPageState } from './MyPageState';
import { GetMyPageUseCase } from '../../../../domain/usecase/GetMyPageUseCase';
import { ProductModel } from '../../../../domain/model/ProductModel';

const getMyPageUseCase = new GetMyPageUseCase();

export function useMyPageViewModel() {
  const [state, dispatch] = useReducer(myPageReducer, initialMyPageState);

  const load = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const data = await getMyPageUseCase.execute(true);
      dispatch({ type: 'LOAD_SUCCESS', user: data.user, orders: data.orders });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const toggleWish = useCallback((product: ProductModel) => {
    dispatch({ type: 'TOGGLE_WISH', product });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, toggleWish };
}
```

- [ ] **Step 8: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS (all existing 52 + 4 GetMyPageUseCase + 6 MyPageReducer = 62 total)

- [ ] **Step 9: Commit**

```bash
git add src/presentation/mypage/mvi/ __tests__/presentation/MyPageReducer.test.ts
git commit -m "feat: add MyPage MVI (Action/State/Reducer/ViewModel)"
```

---

## Task 3: MyPageScreen (메인)

**Files:**
- Create: `src/presentation/mypage/MyPageScreen.tsx`

- [ ] **Step 1: MyPageScreen.tsx 작성**

`src/presentation/mypage/MyPageScreen.tsx`:
```typescript
import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useMyPageViewModel } from './mvi/useMyPageViewModel';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'MyPageMain'>;

const MENU_ITEMS = [
  { label: '구매/판매 내역', route: 'OrderHistory' as const, icon: '📋' },
  { label: '관심 상품', route: 'Wishlist' as const, icon: '♥' },
  { label: '내 스타일', route: 'MyStyles' as const, icon: '👗' },
  { label: '계정 설정', route: 'AccountSettings' as const, icon: '⚙️' },
] as const;

export default function MyPageScreen({ navigation }: Props) {
  const { state } = useMyPageViewModel();

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  const ongoing = MOCK_ORDERS.filter((o) => o.status === '입찰중' || o.status === '거래중').length;

  return (
    <SafeAreaWrapper>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>MY</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 프로필 */}
        <View style={styles.profileSection}>
          <View style={styles.avatarBox}>
            {state.user?.profileImage ? (
              <Image source={{ uri: state.user.profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {state.user?.name?.charAt(0) ?? 'K'}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{state.user?.name ?? '유저'}</Text>
            <Text style={styles.userEmail}>{state.user?.email ?? ''}</Text>
          </View>
        </View>

        {/* 통계 요약 */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{ongoing}</Text>
            <Text style={styles.statLabel}>진행 중</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{state.wishlist.length}</Text>
            <Text style={styles.statLabel}>관심</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{state.orders.length}</Text>
            <Text style={styles.statLabel}>거래 내역</Text>
          </View>
        </View>

        {/* 메뉴 */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map(({ label, route, icon }) => (
            <TouchableOpacity
              key={route}
              style={styles.menuRow}
              onPress={() => navigation.navigate(route)}>
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={styles.menuLabel}>{label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 16, fontWeight: '900', color: colors.primary },
  settingsIcon: { fontSize: 20 },
  profileSection: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 20, borderBottomWidth: 1, borderColor: colors.gray100,
  },
  avatarBox: {},
  avatar: { width: 60, height: 60, borderRadius: 30 },
  avatarPlaceholder: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: colors.gray200, alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: { fontSize: 24, fontWeight: '800', color: colors.gray800 },
  profileInfo: { gap: 4 },
  userName: { fontSize: 18, fontWeight: '800', color: colors.primary },
  userEmail: { fontSize: 13, color: colors.gray500 },
  statsRow: {
    flexDirection: 'row', paddingVertical: 16,
    borderBottomWidth: 8, borderColor: colors.gray100,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.gray500, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: colors.gray200 },
  menuSection: { paddingTop: 8 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  menuIcon: { fontSize: 20, width: 28 },
  menuLabel: { flex: 1, fontSize: 15, color: colors.primary },
  menuArrow: { fontSize: 20, color: colors.gray500 },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/presentation/mypage/MyPageScreen.tsx
git commit -m "feat: implement MyPageScreen with profile and menu"
```

---

## Task 4: OrderHistoryScreen · WishlistScreen · MyStylesScreen · AccountSettingsScreen

**Files:**
- Create: `src/presentation/mypage/OrderHistoryScreen.tsx`
- Create: `src/presentation/mypage/WishlistScreen.tsx`
- Create: `src/presentation/mypage/MyStylesScreen.tsx`
- Create: `src/presentation/mypage/AccountSettingsScreen.tsx`

- [ ] **Step 1: OrderHistoryScreen.tsx 작성**

`src/presentation/mypage/OrderHistoryScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { EmptyState } from '../components/EmptyState';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
import { OrderModel } from '../../domain/model/OrderModel';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'OrderHistory'>;

const TABS: Array<'전체' | '구매' | '판매'> = ['전체', '구매', '판매'];

const STATUS_COLOR: Record<string, string> = {
  '입찰중': '#FF9500',
  '거래중': colors.primary,
  '완료': colors.gray500,
  '취소': colors.accent,
};

export default function OrderHistoryScreen({ navigation }: Props) {
  const [tab, setTab] = useState<'전체' | '구매' | '판매'>('전체');

  const filtered = tab === '전체' ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.type === tab);

  const renderItem = ({ item }: { item: OrderModel }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.status, { color: STATUS_COLOR[item.status] ?? colors.primary }]}>
          {item.status}
        </Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
      <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.size}>사이즈: {item.size}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
      </View>
      <Text style={styles.date}>{item.createdAt.slice(0, 10)}</Text>
    </View>
  );

  return (
    <SafeAreaWrapper>
      <Header title="구매/판매 내역" onBack={() => navigation.goBack()} />

      {/* 탭 */}
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState message="내역이 없습니다." subMessage="구매 또는 판매를 시작해보세요." />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.gray200 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderColor: colors.primary },
  tabText: { fontSize: 14, color: colors.gray500 },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  list: { padding: 16, gap: 12 },
  card: {
    padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  status: { fontSize: 13, fontWeight: '700' },
  type: { fontSize: 12, color: colors.gray500, backgroundColor: colors.gray100, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  productName: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  size: { fontSize: 13, color: colors.gray500 },
  price: { fontSize: 15, fontWeight: '900', color: colors.primary },
  date: { fontSize: 11, color: colors.gray500, marginTop: 4 },
});
```

- [ ] **Step 2: WishlistScreen.tsx 작성**

위시리스트는 `useMyPageViewModel`의 `state.wishlist`를 사용한다. 처음에는 비어 있으나, HomeScreen의 ProductDetail에서 위시 버튼을 누르면 추가된다 (Mock 구조상 로컬 상태). 화면에서는 직접 Mock 상품 몇 개를 초기 위시리스트로 표시한다.

`src/presentation/mypage/WishlistScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { ProductModel } from '../../domain/model/ProductModel';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'Wishlist'>;

// 최초 진입 시 Mock 위시리스트로 상위 3개 상품을 표시
const INITIAL_WISHLIST = ALL_PRODUCTS.slice(0, 3);

export default function WishlistScreen({ navigation }: Props) {
  const [wishlist, setWishlist] = useState<ProductModel[]>(INITIAL_WISHLIST);

  const removeWish = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <SafeAreaWrapper>
      <Header title="관심 상품" onBack={() => navigation.goBack()} />

      {wishlist.length === 0 ? (
        <EmptyState message="관심 상품이 없습니다." subMessage="마음에 드는 상품을 찜해보세요." />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                brand={item.brand}
                name={item.name}
                price={item.buyPrice}
                imageUri={item.imageUri}
                onPress={() => navigation.navigate('WishProductDetail', { productId: item.id })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
```

- [ ] **Step 3: MyStylesScreen.tsx 작성**

`src/presentation/mypage/MyStylesScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { EmptyState } from '../components/EmptyState';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'MyStyles'>;

const CARD_SIZE = (Dimensions.get('window').width - 3) / 2;

// Mock: 현재 로그인 유저 ID는 'u001'
const MY_STYLES = MOCK_STYLES.filter((s) => s.userId === 'u001');

export default function MyStylesScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="내 스타일" onBack={() => navigation.goBack()} />

      {MY_STYLES.length === 0 ? (
        <EmptyState message="등록된 스타일이 없습니다." subMessage="스타일을 올려보세요." />
      ) : (
        <FlatList
          data={MY_STYLES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MyStyleDetail', { styleId: item.id })}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.likeText}>♥ {item.likeCount.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  row: { gap: 1 },
  card: { width: CARD_SIZE, height: CARD_SIZE },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 6, backgroundColor: 'rgba(0,0,0,0.35)',
  },
  likeText: { color: colors.background, fontSize: 11, fontWeight: '700' },
});
```

- [ ] **Step 4: AccountSettingsScreen.tsx 작성**

`src/presentation/mypage/AccountSettingsScreen.tsx`:
```typescript
import React, { useState } from 'react';
import {
  View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'AccountSettings'>;

export default function AccountSettingsScreen({ navigation }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }) },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <Header title="계정 설정" onBack={() => navigation.goBack()} />
      <ScrollView>
        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>푸시 알림</Text>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ true: colors.primary }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>마케팅 알림</Text>
            <Switch
              value={marketingEnabled}
              onValueChange={setMarketingEnabled}
              trackColor={{ true: colors.primary }}
            />
          </View>
        </View>

        {/* 계정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>이메일 변경</Text>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>비밀번호 변경</Text>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>버전</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>

        {/* 로그아웃 */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, borderBottomWidth: 8, borderColor: colors.gray100 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.gray500, marginBottom: 8 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderColor: colors.gray100,
  },
  rowLabel: { fontSize: 15, color: colors.primary },
  rowArrow: { fontSize: 20, color: colors.gray500 },
  rowValue: { fontSize: 14, color: colors.gray500 },
  logoutBtn: {
    margin: 24, padding: 16, borderRadius: 8,
    borderWidth: 1, borderColor: colors.accent, alignItems: 'center',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: colors.accent },
});
```

- [ ] **Step 5: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/presentation/mypage/OrderHistoryScreen.tsx src/presentation/mypage/WishlistScreen.tsx src/presentation/mypage/MyStylesScreen.tsx src/presentation/mypage/AccountSettingsScreen.tsx
git commit -m "feat: implement OrderHistory, Wishlist, MyStyles, AccountSettings screens"
```

---

## Task 5: 네비게이션 연결

**Files:**
- Modify: `src/presentation/navigation/types.ts`
- Create: `src/presentation/navigation/MyPageStackNavigator.tsx`
- Modify: `src/presentation/navigation/MainNavigator.tsx`

- [ ] **Step 1: types.ts에 MyPageStackParamList 추가**

`src/presentation/navigation/types.ts` 끝에 추가:
```typescript
export type MyPageStackParamList = {
  MyPageMain: undefined;
  OrderHistory: undefined;
  Wishlist: undefined;
  WishProductDetail: { productId: string };
  MyStyles: undefined;
  MyStyleDetail: { styleId: string };
  AccountSettings: undefined;
};

export type MyPageStackScreenProps<T extends keyof MyPageStackParamList> =
  NativeStackScreenProps<MyPageStackParamList, T>;
```

- [ ] **Step 2: MyPageStackNavigator.tsx 작성**

`src/presentation/navigation/MyPageStackNavigator.tsx`:
```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyPageStackParamList } from './types';
import MyPageScreen from '../mypage/MyPageScreen';
import OrderHistoryScreen from '../mypage/OrderHistoryScreen';
import WishlistScreen from '../mypage/WishlistScreen';
import MyStylesScreen from '../mypage/MyStylesScreen';
import AccountSettingsScreen from '../mypage/AccountSettingsScreen';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { colors } from '../theme/colors';

type WishProductDetailProps = NativeStackScreenProps<MyPageStackParamList, 'WishProductDetail'>;
type MyStyleDetailProps = NativeStackScreenProps<MyPageStackParamList, 'MyStyleDetail'>;

function WishProductDetailScreen({ navigation, route }: WishProductDetailProps) {
  const product = ALL_PRODUCTS.find((p) => p.id === route.params.productId) ?? ALL_PRODUCTS[0];
  return (
    <SafeAreaWrapper>
      <Header title="상품 상세" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.buyPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.btnRow}>
          <Button
            label="구매하기"
            onPress={() => Alert.alert('안내', '홈 탭에서 상품을 검색하여 구매해주세요.')}
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

function MyStyleDetailScreen({ navigation, route }: MyStyleDetailProps) {
  const style = MOCK_STYLES.find((s) => s.id === route.params.styleId) ?? MOCK_STYLES[0];
  return (
    <SafeAreaWrapper>
      <Header title="내 스타일" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: style.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{style.description}</Text>
          <Text style={styles.brand}>♥ {style.likeCount.toLocaleString()}</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  info: { padding: 16, gap: 6 },
  brand: { fontSize: 13, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: '700', color: colors.primary },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary, marginTop: 4 },
  btnRow: { padding: 16 },
  btn: { width: '100%' },
});

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageMain" component={MyPageScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="WishProductDetail" component={WishProductDetailScreen} />
      <Stack.Screen name="MyStyles" component={MyStylesScreen} />
      <Stack.Screen name="MyStyleDetail" component={MyStyleDetailScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </Stack.Navigator>
  );
}
```

- [ ] **Step 3: MainNavigator.tsx 업데이트**

`src/presentation/navigation/MainNavigator.tsx`에서:
- `import MyPageStackNavigator from './MyPageStackNavigator';` 추가
- My 탭을 `PlaceholderScreen` → `MyPageStackNavigator`로 변경

- [ ] **Step 4: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS (62 total)

- [ ] **Step 5: Commit**

```bash
git add src/presentation/navigation/types.ts src/presentation/navigation/MyPageStackNavigator.tsx src/presentation/navigation/MainNavigator.tsx
git commit -m "feat: add MyPageStackNavigator and wire to MainNavigator My tab"
```

---

## 최종 확인

- [ ] `npx jest --passWithNoTests` 전체 통과
- [ ] MY 탭 → MyPageScreen (프로필 + 메뉴)
- [ ] 구매/판매 내역 → OrderHistoryScreen (전체/구매/판매 탭)
- [ ] 관심 상품 → WishlistScreen (2열 그리드)
- [ ] 내 스타일 → MyStylesScreen (2열 이미지 그리드)
- [ ] 계정 설정 → AccountSettingsScreen (알림 토글 + 로그아웃)
