import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import page_excel_upload from '../../../../cypress/page_objects/page_acs2/page_excel_upload'
const page_excel_upload1 = new page_excel_upload()
import page_dashboard_menu from '../../../../cypress/page_objects/page_acs2/page_inbound/page_dashboard_menu'
const page_dashboard_menu1 = new page_dashboard_menu()
import page_manage_bin from '../../../../cypress/page_objects/page_acs2/page_manage_bin'
const page_manage_bin1 = new page_manage_bin()
import page_generic from '../../../../cypress/page_objects/page_acs2/page_generic'
const page_generic1 = new page_generic()
import page_purchase_order from '../../../../cypress/page_objects/page_acs2/page_inbound/page_purchase_order'
const page_purchase_order1 = new page_purchase_order()
import custom_dashboard from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_dashboard_menu'
const custom_dashboard1 = new custom_dashboard()
import custom_manage_bin from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_manage_bin'
const custom_manage_bin1 = new custom_manage_bin()
const fixture_setup = require('../../../../cypress/fixtures/fixture_acs2/fixture_setup.json')
var env_acs2 = Cypress.env('env_acs2')
var env_acs2_data
var fc_name, fixture_location_excel_path, file_path, full_file_path, location_name
var location_name_cell, bar_code_cell, location_upload_sheet_name

before(function () {
    cy.readFile(env_acs2).then((data) => {
        env_acs2_data = data
    })
})

Given('Add the Excel file in fixture file location, location name, FC name, excel cell value of Barcode and Location name, Sheet Name', () => {
    fc_name = env_acs2_data.setup_flow.acs2_fc
    fixture_location_excel_path = env_acs2_data.excel_upload_files_path.fixture_location
    file_path = "cypress/fixtures/" + fixture_location_excel_path
    full_file_path = Cypress.config("fileServerFolder") + "/" + file_path
    location_name_cell = fixture_setup.location_excel_file.location_name_cell
    bar_code_cell = fixture_setup.location_excel_file.bar_code_name_shell,
        location_upload_sheet_name = fixture_setup.location_excel_file.location_upload_sheet_name
    cy.random(fc_name + '-').then((number) => {
        location_name = number
        cy.log("location_name  : " + location_name)
    })
    cy.log("fc_name : " + fc_name)
    cy.log("fixture_location_excel_path : " + fixture_location_excel_path)
    cy.log("file_path : " + file_path)
    cy.log("full_file_path : " + full_file_path)
    cy.log("location_name_cell : " + location_name_cell)
    cy.log("bar_code_cell : " + bar_code_cell)
    cy.log("location_upload_sheet_name : " + location_upload_sheet_name)
})

When('Type the new location name in field "LocationName*" in the excel file', () => {
    cy.task('write_excel', {
        file_path: file_path,
        cell_name: location_name_cell,
        value: location_name,
        sheet_name: location_upload_sheet_name
    }).then((message) => {
        cy.log(message)// Output: Value updated successfully!
    })
})

When('Type the barcode of location in the "Barcode*" in the excel file', () => {
    cy.task('write_excel', {
        file_path: file_path,
        cell_name: bar_code_cell,
        value: location_name,
        sheet_name: location_upload_sheet_name
    }).then((message) => {
        cy.log(message)// Output: Value updated successfully!
    })
})

Then('"Location Upload" Excel file should be updated with updated "LocationName " and "Barcode"', () => {
    cy.task('read_excel', { file_path: full_file_path, sheet: location_upload_sheet_name }).then((result) => {
        const data_excel_read = result; // No need to stringify and parse
        cy.log("excel data is: ", JSON.stringify(data_excel_read), null, 2);
        cy.log("updated location name is: ", data_excel_read[0]["LocationName*"]); // Access the property directly
        cy.verify_response_value_include_or(data_excel_read[0]["LocationName*"], location_name)
        cy.verify_response_value_include_or(data_excel_read[0]["Barcode*"], location_name)
    })
})

When('Open the " Bulk uploads WMS locations " page by " Support"', () => {
    custom_dashboard1.custom_bulk_upload_wms_location()
})

When('Click on the "Upload files" button', () => {
    cy.action_item(page_excel_upload1.page_upload_excel())
})

When('Attach the " Location upload file excel" file here in the Browse', () => {
    cy.attach_excel(page_excel_upload1.page_attach_files(), fixture_location_excel_path)
})

When('Open the "Manage bin" page by "FC" in "Facility & Planning" page', () => {
    custom_dashboard1.custom_dashboard_menu_page(page_dashboard_menu1.page_facility_icon(), page_dashboard_menu1.page_facility(), page_dashboard_menu1.page_manage_bin())
})

When('Select the "FC" in filter button', () => {
    custom_manage_bin1.custom_select_fc()
    cy.contains_value(page_manage_bin1.page_select_fc_option(), fc_name)
    cy.wait(3000)
})

When('Select the "Location" in filter button', () => {
    cy.filter_selection(page_manage_bin1.page_filter(), page_manage_bin1.page_location_filter(), location_name, page_purchase_order1.page_po_filter_search())
})

Then('Created "Location" should be displayed in the List', () => {
    cy.verify_table_status(page_generic1.page_header(), page_generic1.page_data(), "Bin Name", location_name)
})
