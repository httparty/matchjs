//Use this config to run locally
//without Sauce connect
//webdriver-manager start
//protractor client/test/e2e/config/protractor.conf.js or gulp e2e

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
    '../*.spec.js'
  ]
};

//set --all flag to run both Chrome and Firefox in dev
if (process.argv[3] === '--all') {
  exports.config.multiCapabilities = [
    browsers.firefox,
    browsers.chrome
  ]
} else {
  exports.config.capabilities = browsers.chrome;
}

//Travis
if (process.env.TRAVIS) {
  exports.config.sauceUser = process.env.SAUCE_USERNAME;
  exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  exports.config.capabilities = {
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  };
}