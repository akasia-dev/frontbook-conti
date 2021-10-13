module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json'
    }
  },
  testRegex: '(test.*|(\\.|/)test).test\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'json'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/utils/__mocks__/styleMock.js',
    'styled-jsx/style': '<rootDir>/utils/__mocks__/styledJsxMock.js'
  },
  collectCoverage: true,
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/'
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', './']
}
