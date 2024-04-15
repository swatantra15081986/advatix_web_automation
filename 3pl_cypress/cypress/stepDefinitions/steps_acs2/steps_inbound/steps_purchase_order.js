import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import custom_dashboard_menu from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_dashboard_menu'
const custom_dashboard_menu1 = new custom_dashboard_menu()
import custom_purchase_order from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_purchase_order'
const custom_purchase_order1 = new custom_purchase_order()
import custom_asn from '../../../custom/custom_acs2/custom_inbound/custom_asn'
const custom_asn1 = new custom_asn()
import page_purchase_order from '../../../../cypress/page_objects/page_acs2/page_inbound/page_purchase_order'
const page_purchase_order1 = new page_purchase_order()
import page_dashboard_menu from '../../../../cypress/page_objects/page_acs2/page_inbound/page_dashboard_menu'
const page_dashboard1 = new page_dashboard_menu()
import page_generic from '../../../../cypress/page_objects/page_acs2/page_generic'
const page_generic1 = new page_generic()
import page_asn from '../../../page_objects/page_acs2/page_inbound/page_asn'
const page_asn1 = new page_asn()
import resources_purchase_order from '../../../../cypress/api_utilities/resources/resources_acs2/resources_inbound/resources_purchase_order'
const resources_purchase_order1 = new resources_purchase_order()
const fixtures_inbound = require('../../../../cypress/fixtures/fixture_acs2/fixture_inbound.json')
var env_acs2 = Cypress.env('env_acs2')
var env_acs2_data
var client_name, fc_name, customer_name, supplier_name, product_sku, product_name, product_qty
var purchase_order_number_network, response_body, asn_number

before(function () {
    cy.readFile(env_acs2).then((data) => {
        env_acs2_data = data
    })
})

Given('Client, Customer, FC, Supplier, Scheduled date, Product details', () => {
    client_name = env_acs2_data.setup_flow.acs2_client
    customer_name = env_acs2_data.setup_flow.acs2_customer
    fc_name = env_acs2_data.setup_flow.acs2_fc
    supplier_name = env_acs2_data.setup_flow.acs2_supplier
    product_sku = env_acs2_data.product_details.product_sku
    product_name = env_acs2_data.product_details.product_name
    product_qty = env_acs2_data.product_details.product_qty
    cy.log(" client name : " + client_name)
    cy.log(" customer name : " + customer_name)
    cy.log(" warehouse name : " + fc_name)
    cy.log(" supplier name : " + supplier_name)
    cy.log(" product sku name : " + product_sku)
    cy.log(" product name name : " + product_name)
    cy.log(" product qty : " + product_qty)
})

When('Click on the "Manage Purchase Order" icon from the " Receiving" option under "inventory" button from  Dashboard menu items', () => {
    custom_dashboard_menu1.custom_manage_purchase_order()
})

And('Click on the " Add Purchase Order" button', () => {
    custom_purchase_order1.custom_add_purchase_order()
})

And('Select the "client" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_client(client_name)
})

And('Select the "FC" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_fc(fc_name)
})

And('Select the "Customer" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_customer(customer_name)
})

And('Select the "Supplier" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_supplier(supplier_name)
})

And('Select the "Scheduled Date" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_scheduled_date()
})

And('Type the "Product SKU" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_product_sku(product_sku)
})

And('Type the "Product Name" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_select_product_name(product_name)
})

And('Type the "Product Quantity" from the " Add purchase Order" page', () => {
    custom_purchase_order1.custom_product_qty(product_qty)
})

And('Open the " Network" tab to capture the network responses', () => {
    cy.network_intercept("POST", resources_purchase_order1.resources_purchase_order_create(), "po_creation")
})

And('Click on the " Submit " button', () => {
    custom_purchase_order1.custom_submit()
})

And('Store the purchase order number value in variable  from the response of network call button', () => {
    cy.wait('@po_creation').then((interception) => {
        // Assert that the response contains the expected data
        response_body = interception.response.body
        cy.log(" RESPONSE BODY IS : " + JSON.stringify(response_body), null, 2)
        purchase_order_number_network = response_body.responseObject
        cy.log("Purchase Order Number is: " + purchase_order_number_network)
    })
})

Then('PO Number should be generated and should be displayed in the open Pop up', () => {
    cy.verify_table_data(page_purchase_order1.page_modal_purchase_order(), purchase_order_number_network)
})

Then('Verify the status of PO, Should be " Created"', () => {
    cy.verify_table_data(page_purchase_order1.page_modal_purchase_order_status(), fixtures_inbound.purchase_order.status[0])
})

When('Close the purchase order modal window', () => {
    custom_purchase_order1.custom_close_button()
})

Then('Purchase order should be displayed in the top of the list', () => {
    cy.verify_table_data_css('[data-target="#podetailspopup"]', 0, purchase_order_number_network)
})

When('Search the PO number in the PO filter button', () => {
    cy.filter_selection(page_purchase_order1.page_filter(), page_purchase_order1.page_po_filter(), purchase_order_number_network, page_purchase_order1.page_po_filter_search())
})

When('Click on the " Approve " button', () => {
    cy.action_item(page_generic1.page_action())
})

When('Click on the "Receiving" icon from the " Receiving" option under "inventory" button from  Dashboard menu items', () => {
    cy.menu_dashboard_item(page_dashboard1.page_inventory(), page_dashboard1.page_receiving_button1(), page_dashboard1.page_receiving_button2())
})

Then('ASN receiving page should be opened', () => {
    cy.verify_table_data_contains(page_purchase_order1.page_asn_page(), "Manage Receiving/Return")
})

When('Search the ASN number in the ASN filter button by typing PO number in the ASN filter', () => {
    cy.filter_selection(page_purchase_order1.page_filter(), page_purchase_order1.page_asn_filter(), purchase_order_number_network, page_purchase_order1.page_po_filter_search())
})

Then('ASN Number should be same as the number of purchase order', () => {
    cy.verify_table_status(page_generic1.page_header(), page_generic1.page_data(), "ASN/Return Number ", purchase_order_number_network)
})

Then('Save this ASN number for the future reference', () => {
    asn_number = purchase_order_number_network
    cy.log(" ASN NUMBER IS : " + asn_number)
})

When('click on the "change status" button', () => {
    cy.action_item(page_asn1.page_action_change_status())
})

When('Click on the "Select Status" filter button and select option "Arrived"', () => {
    custom_asn1.custom_select_option("Arrived")
})

When('Click on the " Submit " button for marked arrived', () => {
    custom_asn1.custom_asn_submit()
})

Then('Success Pop up should be displayed with "Updated" message', () => {
    cy.verify_table_data_css(page_asn1.page_success_popup(), 0, "Updated!")
})

Then('Click on "OK" button of pop up to close pop up', () => {
    custom_asn1.custom_success_popup_ok()
})

Then('Status of ASN should be changed to "Arrived"', () => {
    cy.verify_table_data(page_asn1.page_arrived_status_path(), fixtures_inbound.asn.status[1])
})

