import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import neat_csv from 'neat-csv'




When('Click on "download excel"', () => {
    cy.visit("https://acs2-uat.advatix.net/acs20/inventory/receiving")
    cy.get('button').contains('Download').click()
    cy.get('a').contains('10').click()
    const file_path = Cypress.config("fileServerFolder") + "/cypress/downloads/Upload_Product.xlsx"
    var data_excel = cy.task('read_excel', { file_path : file_path, sheet: "ProductUploadSample" }).then((result) => {
        data_excel = JSON.stringify(result)
        cy.log(" excel data is : " + data_excel)
    })
})

When('Click on "download csv"', () => {
    cy.visit("https://acs2-uat.advatix.net/acs20/inventory/receiving")
    cy.get('button').contains('Download').click()
    cy.get('a').contains('10').click()
    const file_path = Cypress.config("fileServerFolder") + "/cypress/downloads/ASN_04-18-2024_10_51_18.csv"
    cy.readFile(file_path).then(async (text) => {
        const data_csv = await neat_csv(text)
        cy.log(" csv data is  : " + JSON.stringify(data_csv))
        })
    })