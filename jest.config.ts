import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: false,
  collectCoverage: true,
  silent: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
  globalSetup: '<rootDir>/test/helpers/testSetup.ts',
};

export default config;
