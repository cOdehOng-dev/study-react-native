# KREAM Clone — Plan 3: 구매/판매 (Buy/Sell) Feature (8개 화면)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 구매(4개)·판매(4개) 화면을 Clean Architecture + MVI 패턴으로 구현하고 ProductDetailScreen에서 진입 가능하도록 연결한다. 모든 데이터는 Mock 전용.

**Architecture:** HomeStackParamList에 Buy/Sell 라우트 추가. `src/presentation/buysell/` 아래 buy/sell 각각 MVI + 4개 화면. domain에 SizeModel·BidModel·OrderModel 추가.

**Tech Stack:** React Native 0.84.1 · TypeScript · React Navigation v7 (NativeStack) · Mock 데이터

> **시리즈:** Plan 3/8. Plan 2(홈 Feature) 완료 상태에서 시작.

---

## 파일 맵

```
src/
├── domain/model/
│   ├── SizeModel.ts          (new)
│   ├── BidModel.ts           (new)
│   └── OrderModel.ts         (new)
├── domain/usecase/
│   ├── GetProductSizesUseCase.ts  (new)
│   ├── PlaceBuyBidUseCase.ts      (new)
│   └── PlaceSellAskUseCase.ts     (new)
├── data/mock/
│   ├── sizesMock.ts          (new)
│   └── ordersMock.ts         (new)
└── presentation/
    ├── navigation/
    │   └── types.ts          (modify: append Buy/Sell routes to HomeStackParamList)
    ├── home/
    │   └── ProductDetailScreen.tsx  (modify: wire Buy/Sell buttons)
    └── buysell/
        ├── buy/
        │   ├── mvi/
        │   │   ├── BuyAction.ts
        │   │   ├── BuyState.ts
        │   │   ├── BuyReducer.ts
        │   │   └── useBuyViewModel.ts
        │   ├── BuyScreen.tsx
        │   ├── BuyBidScreen.tsx
        │   ├── BuyConfirmScreen.tsx
        │   └── BuyCompleteScreen.tsx
        └── sell/
            ├── mvi/
            │   ├── SellAction.ts
            │   ├── SellState.ts
            │   ├── SellReducer.ts
            │   └── useSellViewModel.ts
            ├── SellScreen.tsx
            ├── SellAskScreen.tsx
            ├── SellConfirmScreen.tsx
            └── SellCompleteScreen.tsx

__tests__/
├── domain/GetProductSizesUseCase.test.ts  (new)
├── presentation/BuyReducer.test.ts        (new)
└── presentation/SellReducer.test.ts       (new)
```

---

## Task 1: Domain 모델 + UseCase 정의

**Files:**
- Create: `src/domain/model/SizeModel.ts`
- Create: `src/domain/model/BidModel.ts`
- Create: `src/domain/model/OrderModel.ts`
- Create: `src/domain/usecase/GetProductSizesUseCase.ts`
- Create: `src/domain/usecase/PlaceBuyBidUseCase.ts`
- Create: `src/domain/usecase/PlaceSellAskUseCase.ts`

- [ ] **Step 1: SizeModel.ts 작성**

`src/domain/model/SizeModel.ts`:
```typescript
export interface SizeModel {
  size: string;         // "230", "240", "250", "260", "270", "280", "290", "300"
  buyPrice: number;     // 즉시구매가 (해당 사이즈)
  sellPrice: number;    // 즉시판매가 (해당 사이즈)
  buyBidCount: number;  // 구매 입찰 수
  sellAskCount: number; // 판매 입찰 수
}
```

- [ ] **Step 2: BidModel.ts 작성**

`src/domain/model/BidModel.ts`:
```typescript
export type BidType = '구매' | '판매';

export interface BidModel {
  id: string;
  productId: string;
  size: string;
  price: number;
  type: BidType;
  createdAt: string;
  expiresAt: string;   // 입찰 유효기간
}
```

- [ ] **Step 3: OrderModel.ts 작성**

`src/domain/model/OrderModel.ts`:
```typescript
export type OrderStatus = '입찰중' | '거래중' | '완료' | '취소';
export type OrderType = '구매' | '판매';

export interface OrderModel {
  id: string;
  productId: string;
  productName: string;
  size: string;
  price: number;
  type: OrderType;
  status: OrderStatus;
  createdAt: string;
}
```

- [ ] **Step 4: GetProductSizesUseCase.ts 작성**

`src/domain/usecase/GetProductSizesUseCase.ts`:
```typescript
import { SizeModel } from '../model/SizeModel';
import { MOCK_SIZES } from '../../data/mock/sizesMock';

export class GetProductSizesUseCase {
  async execute(productId: string, useMock = true): Promise<SizeModel[]> {
    if (useMock) {
      return MOCK_SIZES[productId] ?? MOCK_SIZES['default'];
    }
    // TODO: API 연동 필요 — GET /api/v1/products/{productId}/sizes
    throw new Error('Repository not configured');
  }
}
```

- [ ] **Step 5: PlaceBuyBidUseCase.ts 작성**

`src/domain/usecase/PlaceBuyBidUseCase.ts`:
```typescript
import { BidModel } from '../model/BidModel';

export interface BuyBidInput {
  productId: string;
  size: string;
  price: number;
}

export class PlaceBuyBidUseCase {
  async execute(input: BuyBidInput, useMock = true): Promise<BidModel> {
    if (useMock) {
      return {
        id: `bid-buy-${Date.now()}`,
        productId: input.productId,
        size: input.size,
        price: input.price,
        type: '구매',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }
    // TODO: API 연동 필요 — POST /api/v1/bids/buy
    throw new Error('Repository not configured');
  }
}
```

- [ ] **Step 6: PlaceSellAskUseCase.ts 작성**

`src/domain/usecase/PlaceSellAskUseCase.ts`:
```typescript
import { BidModel } from '../model/BidModel';

export interface SellAskInput {
  productId: string;
  size: string;
  price: number;
}

export class PlaceSellAskUseCase {
  async execute(input: SellAskInput, useMock = true): Promise<BidModel> {
    if (useMock) {
      return {
        id: `bid-sell-${Date.now()}`,
        productId: input.productId,
        size: input.size,
        price: input.price,
        type: '판매',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }
    // TODO: API 연동 필요 — POST /api/v1/asks/sell
    throw new Error('Repository not configured');
  }
}
```

- [ ] **Step 7: 커밋**

```bash
git add src/domain/
git commit -m "feat: add buysell domain models (SizeModel, BidModel, OrderModel) and use cases"
```

---

## Task 2: Mock 데이터

**Files:**
- Create: `src/data/mock/sizesMock.ts`
- Create: `src/data/mock/ordersMock.ts`

- [ ] **Step 1: sizesMock.ts 작성**

`src/data/mock/sizesMock.ts`:
```typescript
import { SizeModel } from '../../domain/model/SizeModel';

const makeSizes = (base: number): SizeModel[] => [
  { size: '230', buyPrice: base + 5000,  sellPrice: base - 2000, buyBidCount: 12, sellAskCount: 3 },
  { size: '240', buyPrice: base + 3000,  sellPrice: base - 1000, buyBidCount: 25, sellAskCount: 8 },
  { size: '250', buyPrice: base,         sellPrice: base - 5000, buyBidCount: 41, sellAskCount: 15 },
  { size: '260', buyPrice: base - 2000,  sellPrice: base - 8000, buyBidCount: 38, sellAskCount: 12 },
  { size: '270', buyPrice: base + 1000,  sellPrice: base - 4000, buyBidCount: 29, sellAskCount: 9 },
  { size: '280', buyPrice: base + 8000,  sellPrice: base + 2000, buyBidCount: 8,  sellAskCount: 2 },
  { size: '290', buyPrice: base + 12000, sellPrice: base + 5000, buyBidCount: 4,  sellAskCount: 1 },
  { size: '300', buyPrice: base + 20000, sellPrice: base + 8000, buyBidCount: 2,  sellAskCount: 0 },
];

// productId → sizes 매핑 (mock)
export const MOCK_SIZES: Record<string, SizeModel[]> = {
  p001: makeSizes(119000),
  p002: makeSizes(139000),
  p003: makeSizes(149000),
  p004: makeSizes(169000),
  p005: makeSizes(89000),
  p006: makeSizes(99000),
  r001: makeSizes(289000),
  r002: makeSizes(189000),
  r003: makeSizes(399000),
  r004: makeSizes(219000),
  r005: makeSizes(199000),
  n001: makeSizes(249000),
  n002: makeSizes(179000),
  n003: makeSizes(159000),
  n004: makeSizes(139000),
  n005: makeSizes(129000),
  default: makeSizes(150000),
};
```

- [ ] **Step 2: ordersMock.ts 작성**

`src/data/mock/ordersMock.ts`:
```typescript
import { OrderModel } from '../../domain/model/OrderModel';

export const MOCK_ORDERS: OrderModel[] = [
  {
    id: 'order001',
    productId: 'p001',
    productName: 'Nike Air Force 1 Low White',
    size: '260',
    price: 117000,
    type: '구매',
    status: '완료',
    createdAt: '2026-04-10T14:00:00Z',
  },
  {
    id: 'order002',
    productId: 'r003',
    productName: 'Adidas Yeezy 350 V2 Bone',
    size: '270',
    price: 400000,
    type: '판매',
    status: '입찰중',
    createdAt: '2026-04-12T10:00:00Z',
  },
  {
    id: 'order003',
    productId: 'p002',
    productName: 'New Balance 530 White Silver',
    size: '255',
    price: 138000,
    type: '구매',
    status: '거래중',
    createdAt: '2026-04-13T09:30:00Z',
  },
];
```

- [ ] **Step 3: 커밋**

```bash
git add src/data/mock/sizesMock.ts src/data/mock/ordersMock.ts
git commit -m "feat: add buysell mock data (sizes, orders)"
```

---

## Task 3: Buy MVI (TDD)

**Files:**
- Create: `__tests__/presentation/BuyReducer.test.ts`
- Create: `src/presentation/buysell/buy/mvi/BuyAction.ts`
- Create: `src/presentation/buysell/buy/mvi/BuyState.ts`
- Create: `src/presentation/buysell/buy/mvi/BuyReducer.ts`
- Create: `src/presentation/buysell/buy/mvi/useBuyViewModel.ts`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/presentation/BuyReducer.test.ts`:
```typescript
import { buyReducer } from '../../src/presentation/buysell/buy/mvi/BuyReducer';
import { initialBuyState } from '../../src/presentation/buysell/buy/mvi/BuyState';

describe('BuyReducer', () => {
  it('SET_LOADING true 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('SET_SIZES 사이즈 목록 설정', () => {
    const sizes = [{ size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 }];
    const result = buyReducer(initialBuyState, { type: 'SET_SIZES', sizes });
    expect(result.sizes).toHaveLength(1);
    expect(result.sizes[0].size).toBe('260');
  });

  it('SELECT_SIZE 사이즈 선택', () => {
    const size = { size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 };
    const result = buyReducer(initialBuyState, { type: 'SELECT_SIZE', size });
    expect(result.selectedSize?.size).toBe('260');
  });

  it('SET_BID_PRICE 입찰가 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_BID_PRICE', price: 115000 });
    expect(result.bidPrice).toBe(115000);
  });

  it('SET_ERROR 에러 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
  });
});
```

- [ ] **Step 2: 테스트 실행 — FAIL 확인**

```bash
yarn jest __tests__/presentation/BuyReducer.test.ts --no-coverage 2>&1 | head -10
```

Expected: FAIL (module not found)

- [ ] **Step 3: BuyAction.ts 작성**

`src/presentation/buysell/buy/mvi/BuyAction.ts`:
```typescript
import { SizeModel } from '../../../../domain/model/SizeModel';

export type BuyAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SIZES'; sizes: SizeModel[] }
  | { type: 'SELECT_SIZE'; size: SizeModel }
  | { type: 'SET_BID_PRICE'; price: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'PLACE_BID_SUCCESS' }
  | { type: 'RESET' };
```

- [ ] **Step 4: BuyState.ts 작성**

`src/presentation/buysell/buy/mvi/BuyState.ts`:
```typescript
import { SizeModel } from '../../../../domain/model/SizeModel';

export interface BuyState {
  isLoading: boolean;
  error: string | null;
  sizes: SizeModel[];
  selectedSize: SizeModel | null;
  bidPrice: number;
  isSuccess: boolean;
}

export const initialBuyState: BuyState = {
  isLoading: false,
  error: null,
  sizes: [],
  selectedSize: null,
  bidPrice: 0,
  isSuccess: false,
};
```

- [ ] **Step 5: BuyReducer.ts 작성**

`src/presentation/buysell/buy/mvi/BuyReducer.ts`:
```typescript
import { BuyAction } from './BuyAction';
import { BuyState } from './BuyState';

export function buyReducer(state: BuyState, action: BuyAction): BuyState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SIZES':
      return { ...state, sizes: action.sizes, isLoading: false };
    case 'SELECT_SIZE':
      return { ...state, selectedSize: action.size, bidPrice: action.size.buyPrice };
    case 'SET_BID_PRICE':
      return { ...state, bidPrice: action.price };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'PLACE_BID_SUCCESS':
      return { ...state, isSuccess: true, isLoading: false };
    case 'RESET':
      return { ...state, isSuccess: false, error: null };
    default:
      return state;
  }
}
```

- [ ] **Step 6: 테스트 — PASS 확인**

```bash
yarn jest __tests__/presentation/BuyReducer.test.ts --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 7: useBuyViewModel.ts 작성**

`src/presentation/buysell/buy/mvi/useBuyViewModel.ts`:
```typescript
import { useReducer, useCallback, useEffect } from 'react';
import { buyReducer } from './BuyReducer';
import { initialBuyState } from './BuyState';
import { SizeModel } from '../../../../domain/model/SizeModel';
import { GetProductSizesUseCase } from '../../../../domain/usecase/GetProductSizesUseCase';
import { PlaceBuyBidUseCase } from '../../../../domain/usecase/PlaceBuyBidUseCase';

const getSizesUseCase = new GetProductSizesUseCase();
const placeBidUseCase = new PlaceBuyBidUseCase();

export function useBuyViewModel(productId: string) {
  const [state, dispatch] = useReducer(buyReducer, initialBuyState);

  const loadSizes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const sizes = await getSizesUseCase.execute(productId);
      dispatch({ type: 'SET_SIZES', sizes });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId]);

  const selectSize = useCallback((size: SizeModel) => {
    dispatch({ type: 'SELECT_SIZE', size });
  }, []);

  const setBidPrice = useCallback((price: number) => {
    dispatch({ type: 'SET_BID_PRICE', price });
  }, []);

  const placeBid = useCallback(async () => {
    if (!state.selectedSize) {
      dispatch({ type: 'SET_ERROR', error: '사이즈를 선택해주세요.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await placeBidUseCase.execute({
        productId,
        size: state.selectedSize.size,
        price: state.bidPrice,
      });
      dispatch({ type: 'PLACE_BID_SUCCESS' });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId, state.selectedSize, state.bidPrice]);

  useEffect(() => {
    loadSizes();
  }, [loadSizes]);

  return { state, selectSize, setBidPrice, placeBid };
}
```

- [ ] **Step 8: 커밋**

```bash
git add src/presentation/buysell/buy/mvi/ __tests__/presentation/BuyReducer.test.ts
git commit -m "feat: add Buy MVI (Action, State, Reducer, ViewModel) with TDD"
```

---

## Task 4: Sell MVI (TDD)

**Files:**
- Create: `__tests__/presentation/SellReducer.test.ts`
- Create: `src/presentation/buysell/sell/mvi/SellAction.ts`
- Create: `src/presentation/buysell/sell/mvi/SellState.ts`
- Create: `src/presentation/buysell/sell/mvi/SellReducer.ts`
- Create: `src/presentation/buysell/sell/mvi/useSellViewModel.ts`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/presentation/SellReducer.test.ts`:
```typescript
import { sellReducer } from '../../src/presentation/buysell/sell/mvi/SellReducer';
import { initialSellState } from '../../src/presentation/buysell/sell/mvi/SellState';

describe('SellReducer', () => {
  it('SET_LOADING true 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('SET_SIZES 사이즈 목록 설정', () => {
    const sizes = [{ size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 }];
    const result = sellReducer(initialSellState, { type: 'SET_SIZES', sizes });
    expect(result.sizes).toHaveLength(1);
  });

  it('SELECT_SIZE 사이즈 선택시 askPrice가 sellPrice로 초기화', () => {
    const size = { size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 };
    const result = sellReducer(initialSellState, { type: 'SELECT_SIZE', size });
    expect(result.selectedSize?.size).toBe('260');
    expect(result.askPrice).toBe(110000);
  });

  it('SET_ASK_PRICE 호가 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_ASK_PRICE', price: 108000 });
    expect(result.askPrice).toBe(108000);
  });

  it('SET_ERROR 에러 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
  });
});
```

- [ ] **Step 2: 테스트 실행 — FAIL 확인**

```bash
yarn jest __tests__/presentation/SellReducer.test.ts --no-coverage 2>&1 | head -10
```

Expected: FAIL

- [ ] **Step 3: SellAction.ts 작성**

`src/presentation/buysell/sell/mvi/SellAction.ts`:
```typescript
import { SizeModel } from '../../../../domain/model/SizeModel';

export type SellAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SIZES'; sizes: SizeModel[] }
  | { type: 'SELECT_SIZE'; size: SizeModel }
  | { type: 'SET_ASK_PRICE'; price: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'PLACE_ASK_SUCCESS' }
  | { type: 'RESET' };
```

- [ ] **Step 4: SellState.ts 작성**

`src/presentation/buysell/sell/mvi/SellState.ts`:
```typescript
import { SizeModel } from '../../../../domain/model/SizeModel';

export interface SellState {
  isLoading: boolean;
  error: string | null;
  sizes: SizeModel[];
  selectedSize: SizeModel | null;
  askPrice: number;
  isSuccess: boolean;
}

export const initialSellState: SellState = {
  isLoading: false,
  error: null,
  sizes: [],
  selectedSize: null,
  askPrice: 0,
  isSuccess: false,
};
```

- [ ] **Step 5: SellReducer.ts 작성**

`src/presentation/buysell/sell/mvi/SellReducer.ts`:
```typescript
import { SellAction } from './SellAction';
import { SellState } from './SellState';

export function sellReducer(state: SellState, action: SellAction): SellState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SIZES':
      return { ...state, sizes: action.sizes, isLoading: false };
    case 'SELECT_SIZE':
      return { ...state, selectedSize: action.size, askPrice: action.size.sellPrice };
    case 'SET_ASK_PRICE':
      return { ...state, askPrice: action.price };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'PLACE_ASK_SUCCESS':
      return { ...state, isSuccess: true, isLoading: false };
    case 'RESET':
      return { ...state, isSuccess: false, error: null };
    default:
      return state;
  }
}
```

- [ ] **Step 6: 테스트 — PASS 확인**

```bash
yarn jest __tests__/presentation/SellReducer.test.ts --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 7: useSellViewModel.ts 작성**

`src/presentation/buysell/sell/mvi/useSellViewModel.ts`:
```typescript
import { useReducer, useCallback, useEffect } from 'react';
import { sellReducer } from './SellReducer';
import { initialSellState } from './SellState';
import { SizeModel } from '../../../../domain/model/SizeModel';
import { GetProductSizesUseCase } from '../../../../domain/usecase/GetProductSizesUseCase';
import { PlaceSellAskUseCase } from '../../../../domain/usecase/PlaceSellAskUseCase';

const getSizesUseCase = new GetProductSizesUseCase();
const placeAskUseCase = new PlaceSellAskUseCase();

export function useSellViewModel(productId: string) {
  const [state, dispatch] = useReducer(sellReducer, initialSellState);

  const loadSizes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const sizes = await getSizesUseCase.execute(productId);
      dispatch({ type: 'SET_SIZES', sizes });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId]);

  const selectSize = useCallback((size: SizeModel) => {
    dispatch({ type: 'SELECT_SIZE', size });
  }, []);

  const setAskPrice = useCallback((price: number) => {
    dispatch({ type: 'SET_ASK_PRICE', price });
  }, []);

  const placeAsk = useCallback(async () => {
    if (!state.selectedSize) {
      dispatch({ type: 'SET_ERROR', error: '사이즈를 선택해주세요.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await placeAskUseCase.execute({
        productId,
        size: state.selectedSize.size,
        price: state.askPrice,
      });
      dispatch({ type: 'PLACE_ASK_SUCCESS' });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId, state.selectedSize, state.askPrice]);

  useEffect(() => {
    loadSizes();
  }, [loadSizes]);

  return { state, selectSize, setAskPrice, placeAsk };
}
```

- [ ] **Step 8: 커밋**

```bash
git add src/presentation/buysell/sell/mvi/ __tests__/presentation/SellReducer.test.ts
git commit -m "feat: add Sell MVI (Action, State, Reducer, ViewModel) with TDD"
```

---

## Task 5: Navigation 업데이트 + GetProductSizesUseCase 테스트

**Files:**
- Modify: `src/presentation/navigation/types.ts`
- Create: `__tests__/domain/GetProductSizesUseCase.test.ts`

- [ ] **Step 1: types.ts에 Buy/Sell 라우트 추가**

READ `src/presentation/navigation/types.ts` first. Then append to `HomeStackParamList`:

```typescript
// HomeStackParamList에 추가 (기존 항목 유지, 아래만 추가):
  Buy: { productId: string };
  BuyBid: { productId: string; size: string; buyPrice: number };
  BuyConfirm: { productId: string; size: string; price: number; isBid: boolean };
  BuyComplete: { productId: string; orderId: string };
  Sell: { productId: string };
  SellAsk: { productId: string; size: string; sellPrice: number };
  SellConfirm: { productId: string; size: string; price: number; isBid: boolean };
  SellComplete: { productId: string; orderId: string };
```

- [ ] **Step 2: GetProductSizesUseCase 테스트 작성 + 실행**

`__tests__/domain/GetProductSizesUseCase.test.ts`:
```typescript
import { GetProductSizesUseCase } from '../../src/domain/usecase/GetProductSizesUseCase';

describe('GetProductSizesUseCase', () => {
  const useCase = new GetProductSizesUseCase();

  it('알려진 productId의 사이즈 목록 반환', async () => {
    const result = await useCase.execute('p001', true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('size');
    expect(result[0]).toHaveProperty('buyPrice');
    expect(result[0]).toHaveProperty('sellPrice');
  });

  it('알 수 없는 productId는 default 사이즈 반환', async () => {
    const result = await useCase.execute('unknown-id', true);
    expect(result.length).toBeGreaterThan(0);
  });
});
```

```bash
yarn jest __tests__/domain/GetProductSizesUseCase.test.ts --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 3: 커밋**

```bash
git add src/presentation/navigation/types.ts __tests__/domain/GetProductSizesUseCase.test.ts
git commit -m "feat: add Buy/Sell routes to HomeStackParamList, add GetProductSizesUseCase tests"
```

---

## Task 6: Buy 화면 4개 구현

**Files:**
- Create: `src/presentation/buysell/buy/BuyScreen.tsx`
- Create: `src/presentation/buysell/buy/BuyBidScreen.tsx`
- Create: `src/presentation/buysell/buy/BuyConfirmScreen.tsx`
- Create: `src/presentation/buysell/buy/BuyCompleteScreen.tsx`

- [ ] **Step 1: BuyScreen.tsx 작성**

사이즈 선택 + 즉시구매 / 입찰 구매 선택 화면.

`src/presentation/buysell/buy/BuyScreen.tsx`:
```tsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useBuyViewModel } from './mvi/useBuyViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'Buy'>;

export default function BuyScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { state, selectSize } = useBuyViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title="구매" onBack={() => navigation.goBack()} />
      <ScrollView>
        {/* 상품명 */}
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        {/* 사이즈 선택 */}
        <Text style={styles.sectionTitle}>사이즈 선택</Text>
        <FlatList
          data={state.sizes}
          keyExtractor={(item) => item.size}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.sizeGrid}
          renderItem={({ item }) => {
            const isSelected = state.selectedSize?.size === item.size;
            return (
              <TouchableOpacity
                style={[styles.sizeCard, isSelected && styles.sizeCardActive]}
                onPress={() => selectSize(item)}>
                <Text style={[styles.sizeText, isSelected && styles.sizeTextActive]}>
                  {item.size}
                </Text>
                <Text style={[styles.sizePrice, isSelected && styles.sizePriceActive]}>
                  {item.buyPrice.toLocaleString()}원
                </Text>
                <Text style={[styles.sizeBidCount, isSelected && styles.sizePriceActive]}>
                  구매 {item.buyBidCount}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button
          label={
            state.selectedSize
              ? `즉시구매  ${state.selectedSize.buyPrice.toLocaleString()}원`
              : '사이즈를 선택하세요'
          }
          onPress={() => {
            if (!state.selectedSize) return;
            navigation.navigate('BuyConfirm', {
              productId,
              size: state.selectedSize.size,
              price: state.selectedSize.buyPrice,
              isBid: false,
            });
          }}
          style={styles.buyBtn}
        />
        <Button
          label="구매 입찰"
          onPress={() => {
            if (!state.selectedSize) return;
            navigation.navigate('BuyBid', {
              productId,
              size: state.selectedSize.size,
              buyPrice: state.selectedSize.buyPrice,
            });
          }}
          variant="secondary"
          style={styles.bidBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  productInfo: { padding: 16, borderBottomWidth: 1, borderColor: colors.gray100 },
  brand: { fontSize: 13, color: colors.gray500, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '800', color: colors.primary },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, padding: 16, paddingBottom: 8 },
  sizeGrid: { paddingHorizontal: 12, paddingBottom: 16 },
  sizeCard: {
    flex: 1, margin: 4, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background, alignItems: 'center',
  },
  sizeCardActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  sizeText: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  sizeTextActive: { color: colors.background },
  sizePrice: { fontSize: 13, color: colors.gray800, marginBottom: 2 },
  sizePriceActive: { color: colors.background },
  sizeBidCount: { fontSize: 11, color: colors.gray500 },
  footer: {
    flexDirection: 'row', padding: 12, gap: 8,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  buyBtn: { flex: 2 },
  bidBtn: { flex: 1 },
});
```

- [ ] **Step 2: BuyBidScreen.tsx 작성**

구매 입찰가 직접 입력 화면.

`src/presentation/buysell/buy/BuyBidScreen.tsx`:
```tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyBid'>;

export default function BuyBidScreen({ navigation, route }: Props) {
  const { productId, size, buyPrice } = route.params;
  const [bidPrice, setBidPrice] = useState(String(buyPrice));

  const parsedPrice = parseInt(bidPrice.replace(/,/g, ''), 10) || 0;

  return (
    <SafeAreaWrapper>
      <Header title="구매 입찰" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.label}>사이즈</Text>
          <Text style={styles.value}>{size}</Text>

          <Text style={styles.label}>즉시구매가</Text>
          <Text style={styles.value}>{buyPrice.toLocaleString()}원</Text>

          <Text style={styles.label}>입찰가 입력</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={bidPrice}
              onChangeText={setBidPrice}
              keyboardType="numeric"
              placeholder="희망 구매가를 입력하세요"
              placeholderTextColor={colors.gray500}
            />
            <Text style={styles.unit}>원</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>입찰가가 즉시구매가보다 낮을 경우 입찰로 등록됩니다.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label={parsedPrice > 0 ? `${parsedPrice.toLocaleString()}원으로 입찰` : '입찰가를 입력하세요'}
            onPress={() => {
              if (parsedPrice <= 0) return;
              navigation.navigate('BuyConfirm', {
                productId,
                size,
                price: parsedPrice,
                isBid: true,
              });
            }}
            style={styles.btn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 12, color: colors.gray500, marginTop: 16, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '700', color: colors.primary },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.primary, paddingBottom: 4 },
  input: { flex: 1, fontSize: 22, fontWeight: '800', color: colors.primary },
  unit: { fontSize: 16, color: colors.primary, marginLeft: 4 },
  infoBox: { marginTop: 12, padding: 12, backgroundColor: colors.gray100, borderRadius: 8 },
  infoText: { fontSize: 12, color: colors.gray500, lineHeight: 18 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
```

- [ ] **Step 3: BuyConfirmScreen.tsx 작성**

구매 최종 확인 화면.

`src/presentation/buysell/buy/BuyConfirmScreen.tsx`:
```tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useBuyViewModel } from './mvi/useBuyViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyConfirm'>;

export default function BuyConfirmScreen({ navigation, route }: Props) {
  const { productId, size, price, isBid } = route.params;
  const { state, placeBid } = useBuyViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  const handleConfirm = async () => {
    await placeBid();
  };

  if (state.isSuccess) {
    navigation.replace('BuyComplete', { productId, orderId: `order-${Date.now()}` });
    return null;
  }

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title={isBid ? '구매 입찰 확인' : '즉시구매 확인'} onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주문 정보</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>상품</Text>
            <Text style={styles.rowValue} numberOfLines={2}>{product.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>사이즈</Text>
            <Text style={styles.rowValue}>{size}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>거래 방식</Text>
            <Text style={styles.rowValue}>{isBid ? '구매 입찰' : '즉시구매'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 금액</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>구매가</Text>
            <Text style={styles.priceValue}>{price.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>수수료</Text>
            <Text style={styles.rowValue}>무료</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>최종 결제금액</Text>
            <Text style={styles.totalValue}>{price.toLocaleString()}원</Text>
          </View>
        </View>

        {state.error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={isBid ? '입찰하기' : '즉시구매'}
          onPress={handleConfirm}
          style={styles.btn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, borderBottomWidth: 8, borderColor: colors.gray100 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.primary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { fontSize: 14, color: colors.gray500 },
  rowValue: { fontSize: 14, color: colors.primary, flex: 1, textAlign: 'right' },
  priceValue: { fontSize: 14, fontWeight: '700', color: colors.primary },
  totalRow: { borderTopWidth: 1, borderColor: colors.gray200, marginTop: 8, paddingTop: 16 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: colors.primary },
  totalValue: { fontSize: 18, fontWeight: '900', color: colors.accent },
  errorBox: { margin: 16, padding: 12, backgroundColor: '#FFF0EE', borderRadius: 8 },
  errorText: { fontSize: 13, color: colors.accent },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
```

- [ ] **Step 4: BuyCompleteScreen.tsx 작성**

구매 완료 화면.

`src/presentation/buysell/buy/BuyCompleteScreen.tsx`:
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyComplete'>;

export default function BuyCompleteScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.icon}>🎉</Text>
        <Text style={styles.title}>구매가 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          KREAM 검수 후 배송이 시작됩니다.{'\n'}마이페이지에서 거래 현황을 확인하세요.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>검수 안내</Text>
          <Text style={styles.infoText}>• 판매자 배송 → KREAM 검수 → 구매자 배송</Text>
          <Text style={styles.infoText}>• 검수 기간: 영업일 기준 1~3일</Text>
          <Text style={styles.infoText}>• 불합격 시 전액 환불</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="홈으로 돌아가기"
          onPress={() => navigation.navigate('HomeMain')}
          style={styles.homeBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '900', color: colors.primary, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.gray500, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  infoBox: { width: '100%', backgroundColor: colors.gray100, padding: 16, borderRadius: 12, gap: 8 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  infoText: { fontSize: 13, color: colors.gray500, lineHeight: 20 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  homeBtn: { width: '100%' },
});
```

- [ ] **Step 5: 커밋**

```bash
git add src/presentation/buysell/buy/
git commit -m "feat: implement Buy screens (BuyScreen, BuyBidScreen, BuyConfirmScreen, BuyCompleteScreen)"
```

---

## Task 7: Sell 화면 4개 구현

**Files:**
- Create: `src/presentation/buysell/sell/SellScreen.tsx`
- Create: `src/presentation/buysell/sell/SellAskScreen.tsx`
- Create: `src/presentation/buysell/sell/SellConfirmScreen.tsx`
- Create: `src/presentation/buysell/sell/SellCompleteScreen.tsx`

- [ ] **Step 1: SellScreen.tsx 작성**

`src/presentation/buysell/sell/SellScreen.tsx`:
```tsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useSellViewModel } from './mvi/useSellViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'Sell'>;

export default function SellScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { state, selectSize } = useSellViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title="판매" onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        <Text style={styles.sectionTitle}>사이즈 선택</Text>
        <FlatList
          data={state.sizes}
          keyExtractor={(item) => item.size}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.sizeGrid}
          renderItem={({ item }) => {
            const isSelected = state.selectedSize?.size === item.size;
            return (
              <TouchableOpacity
                style={[styles.sizeCard, isSelected && styles.sizeCardActive]}
                onPress={() => selectSize(item)}>
                <Text style={[styles.sizeText, isSelected && styles.sizeTextActive]}>
                  {item.size}
                </Text>
                <Text style={[styles.sizePrice, isSelected && styles.sizePriceActive]}>
                  {item.sellPrice.toLocaleString()}원
                </Text>
                <Text style={[styles.sizeBidCount, isSelected && styles.sizePriceActive]}>
                  판매 {item.sellAskCount}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={
            state.selectedSize
              ? `즉시판매  ${state.selectedSize.sellPrice.toLocaleString()}원`
              : '사이즈를 선택하세요'
          }
          onPress={() => {
            if (!state.selectedSize) return;
            navigation.navigate('SellConfirm', {
              productId,
              size: state.selectedSize.size,
              price: state.selectedSize.sellPrice,
              isBid: false,
            });
          }}
          style={styles.sellBtn}
        />
        <Button
          label="판매 입찰"
          onPress={() => {
            if (!state.selectedSize) return;
            navigation.navigate('SellAsk', {
              productId,
              size: state.selectedSize.size,
              sellPrice: state.selectedSize.sellPrice,
            });
          }}
          variant="secondary"
          style={styles.askBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  productInfo: { padding: 16, borderBottomWidth: 1, borderColor: colors.gray100 },
  brand: { fontSize: 13, color: colors.gray500, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '800', color: colors.primary },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, padding: 16, paddingBottom: 8 },
  sizeGrid: { paddingHorizontal: 12, paddingBottom: 16 },
  sizeCard: {
    flex: 1, margin: 4, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background, alignItems: 'center',
  },
  sizeCardActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  sizeText: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  sizeTextActive: { color: colors.background },
  sizePrice: { fontSize: 13, color: colors.gray800, marginBottom: 2 },
  sizePriceActive: { color: colors.background },
  sizeBidCount: { fontSize: 11, color: colors.gray500 },
  footer: {
    flexDirection: 'row', padding: 12, gap: 8,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  sellBtn: { flex: 2 },
  askBtn: { flex: 1 },
});
```

- [ ] **Step 2: SellAskScreen.tsx 작성**

`src/presentation/buysell/sell/SellAskScreen.tsx`:
```tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'SellAsk'>;

export default function SellAskScreen({ navigation, route }: Props) {
  const { productId, size, sellPrice } = route.params;
  const [askPrice, setAskPrice] = useState(String(sellPrice));

  const parsedPrice = parseInt(askPrice.replace(/,/g, ''), 10) || 0;

  return (
    <SafeAreaWrapper>
      <Header title="판매 입찰" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.label}>사이즈</Text>
          <Text style={styles.value}>{size}</Text>

          <Text style={styles.label}>즉시판매가</Text>
          <Text style={styles.value}>{sellPrice.toLocaleString()}원</Text>

          <Text style={styles.label}>판매 희망가 입력</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={askPrice}
              onChangeText={setAskPrice}
              keyboardType="numeric"
              placeholder="희망 판매가를 입력하세요"
              placeholderTextColor={colors.gray500}
            />
            <Text style={styles.unit}>원</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>판매 희망가가 즉시판매가보다 높을 경우 입찰로 등록됩니다.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label={parsedPrice > 0 ? `${parsedPrice.toLocaleString()}원으로 판매 입찰` : '판매가를 입력하세요'}
            onPress={() => {
              if (parsedPrice <= 0) return;
              navigation.navigate('SellConfirm', {
                productId,
                size,
                price: parsedPrice,
                isBid: true,
              });
            }}
            style={styles.btn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 12, color: colors.gray500, marginTop: 16, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '700', color: colors.primary },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.primary, paddingBottom: 4 },
  input: { flex: 1, fontSize: 22, fontWeight: '800', color: colors.primary },
  unit: { fontSize: 16, color: colors.primary, marginLeft: 4 },
  infoBox: { marginTop: 12, padding: 12, backgroundColor: colors.gray100, borderRadius: 8 },
  infoText: { fontSize: 12, color: colors.gray500, lineHeight: 18 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
```

- [ ] **Step 3: SellConfirmScreen.tsx 작성**

`src/presentation/buysell/sell/SellConfirmScreen.tsx`:
```tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useSellViewModel } from './mvi/useSellViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'SellConfirm'>;

export default function SellConfirmScreen({ navigation, route }: Props) {
  const { productId, size, price, isBid } = route.params;
  const { state, placeAsk } = useSellViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  const fee = Math.round(price * 0.05); // 수수료 5%
  const payout = price - fee;

  const handleConfirm = async () => {
    await placeAsk();
  };

  if (state.isSuccess) {
    navigation.replace('SellComplete', { productId, orderId: `order-sell-${Date.now()}` });
    return null;
  }

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title={isBid ? '판매 입찰 확인' : '즉시판매 확인'} onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>판매 정보</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>상품</Text>
            <Text style={styles.rowValue} numberOfLines={2}>{product.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>사이즈</Text>
            <Text style={styles.rowValue}>{size}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>거래 방식</Text>
            <Text style={styles.rowValue}>{isBid ? '판매 입찰' : '즉시판매'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정산 금액</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>판매가</Text>
            <Text style={styles.rowValue}>{price.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>수수료 (5%)</Text>
            <Text style={styles.rowValue}>-{fee.toLocaleString()}원</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>최종 정산금액</Text>
            <Text style={styles.totalValue}>{payout.toLocaleString()}원</Text>
          </View>
        </View>

        {state.error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={isBid ? '판매 입찰하기' : '즉시판매'}
          onPress={handleConfirm}
          style={styles.btn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, borderBottomWidth: 8, borderColor: colors.gray100 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.primary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { fontSize: 14, color: colors.gray500 },
  rowValue: { fontSize: 14, color: colors.primary, flex: 1, textAlign: 'right' },
  totalRow: { borderTopWidth: 1, borderColor: colors.gray200, marginTop: 8, paddingTop: 16 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: colors.primary },
  totalValue: { fontSize: 18, fontWeight: '900', color: colors.accent },
  errorBox: { margin: 16, padding: 12, backgroundColor: '#FFF0EE', borderRadius: 8 },
  errorText: { fontSize: 13, color: colors.accent },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
```

- [ ] **Step 4: SellCompleteScreen.tsx 작성**

`src/presentation/buysell/sell/SellCompleteScreen.tsx`:
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'SellComplete'>;

export default function SellCompleteScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>판매 등록이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          구매자가 나타나면 알림을 드립니다.{'\n'}마이페이지에서 판매 현황을 확인하세요.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>판매 안내</Text>
          <Text style={styles.infoText}>• 구매 체결 후 2일 이내 KREAM으로 발송</Text>
          <Text style={styles.infoText}>• 검수 완료 후 정산 (영업일 1~3일)</Text>
          <Text style={styles.infoText}>• 입찰 유효기간: 30일</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="홈으로 돌아가기"
          onPress={() => navigation.navigate('HomeMain')}
          style={styles.homeBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '900', color: colors.primary, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.gray500, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  infoBox: { width: '100%', backgroundColor: colors.gray100, padding: 16, borderRadius: 12, gap: 8 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  infoText: { fontSize: 13, color: colors.gray500, lineHeight: 20 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  homeBtn: { width: '100%' },
});
```

- [ ] **Step 5: 커밋**

```bash
git add src/presentation/buysell/sell/
git commit -m "feat: implement Sell screens (SellScreen, SellAskScreen, SellConfirmScreen, SellCompleteScreen)"
```

---

## Task 8: HomeStackNavigator 업데이트 + ProductDetailScreen 연결 + 전체 테스트

**Files:**
- Modify: `src/presentation/navigation/HomeStackNavigator.tsx`
- Modify: `src/presentation/home/ProductDetailScreen.tsx`

- [ ] **Step 1: HomeStackNavigator.tsx에 Buy/Sell 스크린 등록**

READ `src/presentation/navigation/HomeStackNavigator.tsx` first.

Add these imports:
```tsx
import BuyScreen from '../buysell/buy/BuyScreen';
import BuyBidScreen from '../buysell/buy/BuyBidScreen';
import BuyConfirmScreen from '../buysell/buy/BuyConfirmScreen';
import BuyCompleteScreen from '../buysell/buy/BuyCompleteScreen';
import SellScreen from '../buysell/sell/SellScreen';
import SellAskScreen from '../buysell/sell/SellAskScreen';
import SellConfirmScreen from '../buysell/sell/SellConfirmScreen';
import SellCompleteScreen from '../buysell/sell/SellCompleteScreen';
```

Add these Stack.Screen entries inside `<Stack.Navigator>` (after existing screens):
```tsx
<Stack.Screen name="Buy" component={BuyScreen} />
<Stack.Screen name="BuyBid" component={BuyBidScreen} />
<Stack.Screen name="BuyConfirm" component={BuyConfirmScreen} />
<Stack.Screen name="BuyComplete" component={BuyCompleteScreen} />
<Stack.Screen name="Sell" component={SellScreen} />
<Stack.Screen name="SellAsk" component={SellAskScreen} />
<Stack.Screen name="SellConfirm" component={SellConfirmScreen} />
<Stack.Screen name="SellComplete" component={SellCompleteScreen} />
```

- [ ] **Step 2: ProductDetailScreen.tsx 하단 버튼 연결**

READ `src/presentation/home/ProductDetailScreen.tsx`.

Find the footer buttons section:
```tsx
<Button
  label={`구매  ${product.buyPrice.toLocaleString()}원`}
  onPress={() => {}}
  style={styles.buyBtn}
/>
<Button
  label={`판매  ${product.sellPrice.toLocaleString()}원`}
  onPress={() => {}}
  variant="secondary"
  style={styles.sellBtn}
/>
```

Replace both `onPress={() => {}}` with actual navigation:
```tsx
<Button
  label={`구매  ${product.buyPrice.toLocaleString()}원`}
  onPress={() => navigation.navigate('Buy', { productId: product.id })}
  style={styles.buyBtn}
/>
<Button
  label={`판매  ${product.sellPrice.toLocaleString()}원`}
  onPress={() => navigation.navigate('Sell', { productId: product.id })}
  variant="secondary"
  style={styles.sellBtn}
/>
```

- [ ] **Step 3: 전체 테스트 실행**

```bash
yarn jest --no-coverage 2>&1
```

Expected: 21 tests PASS
- OnboardingReducer: 4
- LoginUseCase: 3
- HomeReducer: 4
- GetHomeUseCase: 2
- BuyReducer: 5
- SellReducer: 5 (실제로는 각 5개씩 + GetProductSizesUseCase: 2 = 23 tests)

Actually expected: at least 21 tests from all suites. Fix any failures.

- [ ] **Step 4: TypeScript 체크**

```bash
yarn tsc --noEmit 2>&1 | head -40
```

Expected: 에러 없음

- [ ] **Step 5: 최종 커밋**

```bash
git add src/presentation/navigation/HomeStackNavigator.tsx src/presentation/home/ProductDetailScreen.tsx
git commit -m "feat: wire Buy/Sell screens into HomeStackNavigator and ProductDetailScreen"
```

Then:
```bash
git add .
git commit -m "chore: Plan 3 complete - Buy/Sell feature 8 screens"
```

(Only if there are remaining uncommitted changes)

---

## 완료 체크리스트

- [ ] `yarn jest --no-coverage` — 전체 PASS (OnboardingReducer 4 + LoginUseCase 3 + HomeReducer 4 + GetHomeUseCase 2 + BuyReducer 5 + SellReducer 5 + GetProductSizesUseCase 2 = 25 tests)
- [ ] `yarn tsc --noEmit` — 에러 없음
- [ ] ProductDetailScreen → 구매 버튼 → BuyScreen (사이즈 선택) → BuyConfirmScreen → BuyCompleteScreen
- [ ] ProductDetailScreen → 판매 버튼 → SellScreen (사이즈 선택) → SellConfirmScreen → SellCompleteScreen
- [ ] `git log --oneline -15` 확인

---
