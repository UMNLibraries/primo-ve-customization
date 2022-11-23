process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = async function (config) {
  const { default: webpackConfig } = await import("./webpack.test.js");
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ["jasmine", "webpack"],

    // list of files / patterns to load in the browser
    files: [
      "../node_modules/angular/angular.js",
      "../node_modules/angular-ui-router/release/angular-ui-router.js",
      "../node_modules/angular-mocks/angular-mocks.js",
      "../node_modules/angular-translate/dist/angular-translate.js",
      "../node_modules/angular-material/angular-material.js",
      "../node_modules/angular-animate/angular-animate.js",
      "../node_modules/angular-aria/angular-aria.js",
      "../node_modules/angular-cookies/angular-cookies.js",
      "../node_modules/lodash/lodash.js",
      "../src/**/*.spec.js",
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      "../src/**/*.spec.js": ["webpack"],
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ["spec"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,
  });
};
