import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testMatch: [
    '**/test/**'
  ],
  collectCoverage: true,
};

export default config;