import { SizeModel } from '../../domain/model/SizeModel';

const SIZES_MM = [230, 240, 250, 260, 270, 280, 290, 300];

function makeSizes(basePrice: number): SizeModel[] {
  return SIZES_MM.map((mm, i) => ({
    size: `${mm}`,
    buyPrice: basePrice + i * 3000,
    sellPrice: basePrice + i * 3000 - 5000,
    buyBidCount: 8 + i * 2,
    sellAskCount: 5 + i,
  }));
}

export const MOCK_SIZES: Record<string, SizeModel[]> = {
  default: makeSizes(89000),

  // MOCK_TRENDING
  p001: makeSizes(119000),
  p002: makeSizes(139000),
  p003: makeSizes(149000),
  p004: makeSizes(169000),
  p005: makeSizes(89000),
  p006: makeSizes(99000),

  // MOCK_RANKING
  r001: makeSizes(289000),
  r002: makeSizes(189000),
  r003: makeSizes(399000),
  r004: makeSizes(219000),
  r005: makeSizes(199000),

  // MOCK_NEW_ARRIVALS
  n001: makeSizes(249000),
  n002: makeSizes(179000),
  n003: makeSizes(159000),
  n004: makeSizes(139000),
  n005: makeSizes(129000),
};
