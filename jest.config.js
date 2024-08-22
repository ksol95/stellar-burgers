/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Отчёт по тестированию',
        // outputPath: 'public/index.html',
        boilerplate: 'test-report/index.html'
      }
    ]
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@store': '<rootDir>/src/services/store.ts',
    '^@slice': '<rootDir>/src/services/slices',
    '^@api': '<rootDir>/src/utils/burger-api.ts',
    '^@hooks': '<rootDir>/src/services/hooks.ts',
    '^@selectors': '<rootDir>/src/services/selectors',
    '^@utils-types': '<rootDir>/src/utils/types',
    '^@cookie': '<rootDir>/src/utils/cookie.ts'
  }
};
