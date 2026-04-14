import {mockUser} from '../../src/data/mockUser';
import {mockOrders} from '../../src/data/mockOrders';

export const createAuthContextMock = (overrides = {}) => ({
  user: mockUser,
  isLoggedIn: true,
  login: jest.fn(),
  logout: jest.fn(),
  updateProfile: jest.fn(),
  ...overrides,
});

export const createOrderContextMock = (overrides = {}) => ({
  currentOrder: {},
  orderHistory: mockOrders,
  setService: jest.fn(),
  setItems: jest.fn(),
  setSchedule: jest.fn(),
  setAddress: jest.fn(),
  submitOrder: jest.fn(),
  resetOrder: jest.fn(),
  ...overrides,
});
