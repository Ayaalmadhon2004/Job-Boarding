import "@testing-library/jest-dom";

// jest.setup.js

// محاكاة next-auth JWT لتجنب مشاكل ESM
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn().mockResolvedValue({ user: { name: 'Aya', role: 'OWNER' } })
}));

