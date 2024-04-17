/** @type {import("ts-jest").JestConfigWithTsJest} */
const config = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  resolver: 'ts-jest-resolver',
};
export default config;
