exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:5000',
  framework: 'jasmine2',
  specs: [
    './e2e/*.spec.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};