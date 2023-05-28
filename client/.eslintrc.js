module.exports = {
  ...require('@battleball/config/eslint.web'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
}