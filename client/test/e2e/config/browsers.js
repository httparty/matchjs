exports.chrome = {
    name: 'Chrome',
    browserName: 'chrome'
}

exports.firefox = {
    name: 'Firefox',
    browserName: 'firefox'
}

exports.safari = {
    name: 'Safari',
    browserName: 'safari'
}

exports.ie8 = {
    name: 'IE 8',
    browserName: 'internet explorer',
    version: '8.0',
    tags: ['ie']
}

exports.ie9 = {
    name: 'IE 9',
    browserName: 'internet explorer',
    version: '9.0',
    tags: ['ie']
}

exports.ie10 = {
    name: 'IE 10',
    browserName: 'internet explorer',
    version: '10.0',
    tags: ['ie']
}

exports.ie11 = {
    name: 'IE 11',
    browserName: 'internet explorer',
    version: '11.0',
    tags: ['ie']
}

// iOS for local or Sauce Labs (via Appium)
exports.ios = {
    name: 'iOS 7 - iPad',
    platformName: 'iOS',
    platformVersion: '7.1',
    deviceName: 'iPad Simulator',
    browserName: 'safari',
    orientation: 'landscape',
    'appium-version': '1.2',
    tags: ['ios']
}