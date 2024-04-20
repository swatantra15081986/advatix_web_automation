import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import neat_csv from 'neat-csv'
var downloaded_csv_file_name, csv_file_path, data_excel_read

When('Click on "download excel"', () => {
    cy.visit("https://acs2-uat.advatix.net/acs20/inventory/receiving")
    cy.get('button').contains('Download').click()
    cy.get('a').contains('10').click()
    const file_path = Cypress.config("fileServerFolder") + "/cypress/downloads/Upload_Product.xlsx"
    var data_excel = cy.task('read_excel', { file_path: file_path, sheet: "ProductUploadSample" }).then((result) => {
        data_excel = JSON.stringify(result)
        cy.log(" excel data is : " + data_excel)
    })
})

When('Click on "download csv"', () => {
    cy.visit("https://acs2-uat.advatix.net/acs20/inventory/receiving")
    cy.get('button').contains('Download').click()
    cy.get('a').contains('10').click()
    cy.wait(1000)



    // You can do further processing with the downloaded file path here

    const folder_path = Cypress.config("fileServerFolder") + "/cypress/downloads"
    //  const first_file_name_csv = cy.task('extract_file_name', { folderPath : folder_path, fileExtension: ".csv" }).then((result) => {
    //   var      first_file_name_csv = JSON.stringify(result)
    //   cy.log(" first_file_name_csv : " + first_file_name_csv)
    // })
    cy.task('extract_file_name', { folder_path: folder_path, file_extension: ".csv" }).then((result) => {
        downloaded_csv_file_name = result.trim()
        cy.log(" downloaded_csv_file_name is : " + downloaded_csv_file_name)
        csv_file_path = folder_path + '/' + downloaded_csv_file_name
        cy.log(" File path is : " + csv_file_path)
    })
    const file_path = csv_file_path
    cy.log(" File path is : " + file_path)
    cy.readFile(file_path).then(async (text) => {
        const data_csv = await neat_csv(text)
        cy.log(" csv data is  : " + JSON.stringify(data_csv))
    })
})

When('write excel', () => {
    cy.task('write_excel', {
        file_path: 'cypress/fixtures/fixture_acs2/uat_excel/container_upload.xlsx',
        cell_name: 'H2',
        value: 'last12345',
        sheet_name: 'WMSLocationsPlan'
    }).then((message) => {
        console.log(message); // Output: Value updated successfully!
    })
    cy.task('write_excel', {
        file_path: 'cypress/fixtures/fixture_acs2/uat_excel/container_upload.xlsx',
        cell_name: 'I2',
        value: 'last123456',
        sheet_name: 'WMSLocationsPlan'
    }).then((message) => {
        console.log(message); // Output: Value updated successfully!
    })
    const file_path = Cypress.config("fileServerFolder") + "/cypress/fixtures/fixture_acs2/uat_excel/container_upload.xlsx"
    cy.task('read_excel', { file_path: file_path, sheet: "WMSLocationsPlan" }).then((result) => {
        const data_excel_read = result; // No need to stringify and parse
        cy.log("excel data is: ", data_excel_read);
        cy.log("updated location name is: ", data_excel_read[0]["LocationName*"]); // Access the property directly
        cy.verify_response_value_include_or(data_excel_read[0]["LocationName*"], "last12345");
    });
})