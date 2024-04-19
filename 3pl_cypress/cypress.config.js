const { defineConfig } = require("cypress");
const readXlsx = require('./cypress/plugins/read-xlsx')
//const mongoDB  = require('../api_automation/cypress/plugins/read-mongo')
const mongoDB  = require('./cypress/plugins/read-mongo')
//const postgresqlDB  = require('./cypress/plugins/read-postgresql')
const extract_file_name = require('./cypress/plugins/extract_file_name')
const fs = require("fs-extra")
const path = require("path")
const cucumber = require("cypress-cucumber-preprocessor").default;

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: "rqeups",
  allScriptsTimeout: 12000,
  defaultTimeoutInterval: 10000,
  defaultCommandTimeout: 10000,
  execTimeout: 120000,
  responseTimeout: 120000,
  taskTimeout: 36000,
  pageLoadTimeout: 120000,
  requestTimeout: 10000,
  viewportWidth: 1200,
  viewportHeight: 900,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: false,
  "options.printLogsToConsole": "always",
  numTestsKeptInMemory: 0,
  failOnStatusCode: false,
  //waitForAnimations: false,
  //animationDistanceThreshold: 50,
  experimentalMemoryManagement: true,
  trashAssetsBeforeRuns: true,
  video: true,
  retries: {
    runMode: 1,
    openMode: 1,
  },

  e2e: {
    testIsolation: false,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());

      on('task', {
        'mongoDB': mongoDB.mongodb_connection
      })

      on('task', {
        'genericMongoQuery': mongoDB.mongodb_connection_generic
      })

      on('task', {
       'read_excel': readXlsx.read_excel
      })

      on('task', {
        'extract_file_name': extract_file_name.extract_file_name
       })
     

      require("cypress-terminal-report/src/installLogsPrinter")(on);
      // accept a configFile value or use uat by default
      const file = config.env.configFile || "uat";
      return getConfigurationByFile(file);  
    },
    specPattern: "**/*.{feature,features}",
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
