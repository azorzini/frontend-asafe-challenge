const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
});

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
