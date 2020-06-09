module.exports = {
  cacheDirectory: ".cache/jest",
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary"],
  reporters: ["default"],
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: [ "enzyme-to-json/serializer" ],
  setupTestFrameworkScriptFile: "<rootDir>/setupEnzyme.ts",
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
  },
  testMatch: ['**/test/**/*.test.(ts|js|tsx)'],
  testEnvironment: 'node'
};