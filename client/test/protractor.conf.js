var browsers = {
  firefox: {
    name: 'Firefox',
    browserName: 'firefox'
  },
  chrome: {
    name: 'Chrome',
    browserName: 'chrome'
  }
}

exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:5000',
  framework: 'jasmine2',
  specs: [
    './e2e/*.spec.js'
  ]
};

//Run just Chrome in Dev
//In Travis, run against both browsers
if (process.argv[3] === '--prod') {
  exports.config.multiCapabilities = [
    browsers.firefox,
    browsers.chrome
  ]
} else {
  exports.config.capabilities = browsers.chrome;
}