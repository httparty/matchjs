var browsers = require('./browsers');

var config = {
    specs: [
        '../*.spec.js'
    ],

    baseUrl: 'http://localhost:5000',
    allScriptsTimeout: 30000,
    getPageTimeout: 30000,
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 300000
    }
};

config.baseUrl = 'https://matchjs.herokuapp.com';
config.sauceUser = process.env.SAUCE_USERNAME;
config.sauceKey = process.env.SAUCE_ACCESS_KEY;

config.multiCapabilities = [
    browsers.chrome,
    browsers.firefox,
    browsers.ie9,
    browsers.ie10,
    browsers.ie11,
    browsers.ios
];

exports.config = config;