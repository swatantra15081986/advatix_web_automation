import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import custom_login from '../../../cypress/custom/custom_acs2/custom_login'
const custom_login1 = new custom_login()
import custom_fc from '../../custom/custom_acs2/custom_fc'
const custom_fc1 = new custom_fc()
import page_fc from '../../../cypress/page_objects/page_acs2/page_fc'
const page_fc1 = new page_fc()
const fixture_setup = require('../../../cypress/fixtures/fixture_acs2/fixture_setup.json')
var env_acs2 = Cypress.env('env_acs2')
var env_acs2_data, acs2_user_name, acs2_password, dashboard_url, facility_url
var fc_name, fc_country, fc_state, fc_city, fc_address, fc_postal_code, fc_email, fc_mobile

before(function () {
    cy.readFile(env_acs2).then((data) => {
        env_acs2_data = data
    })
})


Given('ACS2 dashboard URL, Username and Password for login in ACS2 Dashboard', () => {
    dashboard_url = env_acs2_data.base_url_acs2 + fixture_setup.setup_url[0]
    acs2_user_name = env_acs2_data.acs2_user_id
    acs2_password = env_acs2_data.acs2_user_password
    cy.log( " DASHBOARD URL IS :  " + dashboard_url)
    cy.log( " USER NAME IS :  " + acs2_user_name)
    cy.log( " USER PASSWORD IS :  " + acs2_password)
})

When('User clicks on Login button of ACS2 Dashboard after fill user name and password', () => {
    cy.visit_url(dashboard_url)
    custom_login1.custom_acs2_login(acs2_user_name, acs2_password)
})

Then('User should get logged in successfully on ASC2 Order dashboard Page', () => {
    cy.verify_url_link(fixture_setup.setup_url[1])
})

Given('Test data for the FC creation mandatory field like " FC Name", " country", " State", " City", " Address", " Postal Code", " E Mail", " Mobile"', function ()  {
    cy.random('FC_AUTO').then((number) => {
        fc_name = number
        cy.log("FC NAME IS : " + fc_name)
    })
    fc_country = fixture_setup.fc_setup.country
    fc_state = fixture_setup.fc_setup.state
    fc_city = fixture_setup.fc_setup.city
    fc_address = fixture_setup.fc_setup.address
    fc_postal_code = fixture_setup.fc_setup.postal_code
    fc_email = fixture_setup.fc_setup.e_mail
    fc_mobile = fixture_setup.fc_setup.mobile 
    facility_url = env_acs2_data.base_url_acs2 + fixture_setup.setup_url[2]
    cy.log( " FC COUNTRY IS : " + fc_country)
    cy.log( " FC STATE IS : " + fc_state)
    cy.log( " FC CITY IS : " + fc_city)
    cy.log( " FC ADDRESS IS : " + fc_address)
    cy.log( " FC POSTAL CODE IS : " + fc_postal_code)
    cy.log( " FC EMAIL IS : " + fc_email)
    cy.log( " FC MOBILE IS : " + fc_mobile)
})

When('Click on the Facility left side options', () => {
    cy.log( " FC NAME IS IN LOG : " + fc_name)
    cy.visit_url(facility_url)
})

When('Click on FC button in the "Facility and Settings" sections', () => {
    //custom_fc1.custom_fc_button()
})

When('Click on the Manage FC button', () => {
    //custom_fc1.custom_manage_fc()
})

When('Click on the "Add" button in the " manage FC" Page', () => {
    custom_fc1.custom_create_fc()
})

When('Enter the " FC Name"', () => {
    custom_fc1.custom_fc_name(fc_name)
})

When('Enter the " Country" Name', () => {
    custom_fc1.custom_fc_country(fc_country)
})

When('Enter the " State"  Name', () => {
    custom_fc1.custom_fc_state(fc_state)
})

When('Enter the " City" name', () => {
    custom_fc1.custom_fc_city(fc_city)
})

When('Enter the "Address"', () => {
    custom_fc1.custom_fc_address(fc_address)
})

When('Enter the " Postal Code"', () => {
    custom_fc1.custom_fc_postal_code(fc_postal_code)
})

When('Enter the " Email"', () => {
    custom_fc1.custom_fc_email(fc_email)
})

When('Enter the " Mobile"', () => {
    custom_fc1.custom_fc_mobile(fc_mobile)
    
})

When('Click on "Submit" button', () => {
    custom_fc1.custom_submit()
})

Then('FC should be created and should be displayed in the "MANAGE FC" page', () => {
    custom_fc1.custom_fc_close()
    custom_fc1.custom_warehouse_search(fc_name)
    cy.verify_table_data(page_fc1.page_fc_search(), fc_name)
})











