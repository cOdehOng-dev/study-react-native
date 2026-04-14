import React from 'react';
import {render} from '@testing-library/react-native';
import AddressManageScreen from '../../../src/screens/mypage/AddressManageScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

describe('AddressManageScreen', () => {
  const navigation = createNavigationMock();
  const route = createRouteMock();

  describe('Given 저장된 주소 목록 상태', () => {
    it('Then 주소 목록이 표시된다', () => {
      const {getByText} = render(
        <AddressManageScreen navigation={navigation as never} route={route as never} />,
      );
      expect(getByText(/서울시 강남구/)).toBeTruthy();
      expect(getByText(/서울시 마포구/)).toBeTruthy();
    });
  });
});
