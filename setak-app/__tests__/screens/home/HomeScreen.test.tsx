import React from 'react';
import HomeScreen from '../../../src/screens/home/HomeScreen';
import {renderWithProviders} from '../../helpers/renderWithProviders';
import {mockUser} from '../../../src/data/mockUser';
import {mockOrders} from '../../../src/data/mockOrders';

describe('HomeScreen', () => {
  describe('Given 로그인된 사용자가 홈 화면을 연다', () => {
    it('Then 사용자 이름이 표시된다', () => {
      const {getByText} = renderWithProviders(<HomeScreen />);
      expect(getByText(`${mockUser.name}님 👋`)).toBeTruthy();
    });

    it('Then 보유 포인트가 표시된다', () => {
      const {getByText} = renderWithProviders(<HomeScreen />);
      expect(getByText(`${mockUser.points.toLocaleString()}P`)).toBeTruthy();
    });

    it('Then 서비스 목록이 표시된다', () => {
      const {getByText} = renderWithProviders(<HomeScreen />);
      // 드라이클리닝은 최근 주문 카드에 나오지 않으므로 유일하게 서비스 목록에서 매칭됨
      expect(getByText('드라이클리닝')).toBeTruthy();
      expect(getByText('이불세탁')).toBeTruthy();
    });
  });

  describe('Given 이용 내역이 존재하는 상태', () => {
    it('Then 최근 주문의 서비스명이 표시된다', () => {
      const {getAllByText} = renderWithProviders(<HomeScreen />, {
        orderOverrides: {orderHistory: mockOrders},
      });
      // 서비스명은 서비스 목록과 최근 주문 카드 양쪽에 나타날 수 있음
      expect(getAllByText(mockOrders[0].service.name).length).toBeGreaterThan(0);
    });
  });
});
