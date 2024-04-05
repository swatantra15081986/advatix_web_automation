//const reporter = require("multiple-cucumber-html-reporter");
//Available HTML themes: ['bootstrap', 'hierarchy', 'foundation', 'simple']
const reporter = require("cucumber-html-reporter");
const options = {
    theme: "foundation",
    jsonDir: "cypress/cucumber-json",  // ** Path of .json file **//
    output: "reports/cucumber_report.html",
    name: "Express Testing Report",
    brandTitle: "Test Results of Express Flow",
    columnLayout: 1,
    screenshotsDirectory: 'cypress/screenshots/',
    noInlineScreenshots: true,
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    ignoreBadJsonFile: true,
    scenarioTimestamp: true,


    metadata: {
        browser: {
            name: "chrome",
            version: "81",
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "10",
        },
    },

}


reporter.generate(options);


