import {Service} from '../types/models';

export const mockServices: Service[] = [
  {id: 'svc-001', name: '일반세탁', pricePerItem: 3000, category: '기본', description: '셔츠, 바지, 티셔츠 등 일반 의류', icon: '👕'},
  {id: 'svc-002', name: '드라이클리닝', pricePerItem: 8000, category: '프리미엄', description: '정장, 코트, 울 소재 등 고급 의류', icon: '🧥'},
  {id: 'svc-003', name: '이불세탁', pricePerItem: 15000, category: '대형', description: '이불, 베개, 침대커버 등 침구류', icon: '🛏'},
  {id: 'svc-004', name: '운동화세탁', pricePerItem: 10000, category: '특수', description: '운동화, 스니커즈 전문 세탁', icon: '👟'},
  {id: 'svc-005', name: '가방세탁', pricePerItem: 20000, category: '특수', description: '백팩, 핸드백, 명품백 전문 세탁', icon: '👜'},
  {id: 'svc-006', name: '커튼세탁', pricePerItem: 12000, category: '대형', description: '커튼, 블라인드 등 홈패브릭', icon: '🪟'},
];
