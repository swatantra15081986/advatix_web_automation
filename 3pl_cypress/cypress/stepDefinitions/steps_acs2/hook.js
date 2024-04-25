const { After } = require("cypress-cucumber-preprocessor/steps");

After({ tags: "@screenshot" }, function (scenario) {
  if (scenario.result.status === "failed") {
    cy.screenshot(`cypress/screenshots/${Cypress.spec.name}/${scenario.pickle.name}.png`);
  }
});