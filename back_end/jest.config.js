module.exports = {
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  // Para que no intente testear archivos en node_modules
  testPathIgnorePatterns: ['/node_modules/'],
};
