import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import custom_dashboard_menu from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_dashboard_menu'
const custom_dashboard_menu1 = new custom_dashboard_menu()
import custom_purchase_order from '../../../../cypress/custom/custom_acs2/custom_inbound/custom_purchase_order'
const custom_purchase_order1 = new custom_purchase_order()
import custom_asn from '../../../custom/custom_acs2/custom_inbound/custom_asn'
const custom_asn1 = new custom_asn()
import custom_receiver_app from '../../../../cypress/api_utilities/custom_api/custom_api_acs2/custom_api_inbound/custom_receiver_app'
const custom_receiver_app1 = new custom_receiver_app()
import custom_container from '../../../../cypress/api_utilities/custom_api/custom_api_acs2/custom_api_inbound/custom_container'
const custom_container1 = new custom_container()
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
import resources_generic from '../../../../cypress/api_utilities/resources/resources_acs2/resources_inbound/resources_generic'
const resources_generic1 = new resources_generic()
import resources_setup from '../../../../cypress/api_utilities/resources/resources_acs2/resources_inbound/resources_setup'
const resources_setup1 = new resources_setup()
const fixtures_inbound = require('../../../../cypress/fixtures/fixture_acs2/fixture_inbound.json')
var env_acs2 = Cypress.env('env_acs2')
var env_acs2_data, web_login_token
var client_name, fc_name, customer_name, supplier_name, product_sku, product_name, product_qty
var purchase_order_number_network, response_body, asn_number
var container_creation_url, auth_token, warehouse_location, ver, bar_code
var container_number, device_type, app_user_name, app_user_password, app_auth_token, app_login_url
var advance_shipment_id, product_id

before(function () {
    cy.readFile(env_acs2).then((data) => {
        env_acs2_data = data
    })
})

When('Open the " Network" tab to capture the network responses of login', () => {
    cy.network_intercept("POST", resources_generic1.resources_acs2_login(), "login_token")
})

Then('Store the token number value value in variable  from the response of network call button', () => {
    cy.wait('@login_token').then((interception) => {
        // Assert that the response contains the expected data
        response_body = interception.response.body
        cy.log(" RESPONSE BODY IS : " + JSON.stringify(response_body), null, 2)
        web_login_token = response_body.responseObject.tokenString
        cy.log("Web login token is: " + web_login_token)
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
    custom_dashboard_menu1.custom_manage_purchase_order({force:true})
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

And('Store the purchase order number value in variable  from the response of network call button', function () {
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

When('Open the network tab for save the " Advance Shipment ID" in vaiable', () => {
    cy.network_intercept("POST", resources_purchase_order1.resources_asn_create(), "advance_shipment_id")
})

When('Search the ASN number in the ASN filter button by typing PO number in the ASN filter', () => {
    cy.filter_selection(page_purchase_order1.page_filter(), page_purchase_order1.page_asn_filter(), purchase_order_number_network, page_purchase_order1.page_po_filter_search())
})

When('Store the " Advance Shipment ID" and " Product id"  value in variable  from the response of network call button', () => {
    cy.wait('@advance_shipment_id').then((interception) => {
        // Assert that the response contains the expected data
        response_body = interception.response.body
        cy.log(" RESPONSE BODY IS : " + JSON.stringify(response_body), null, 2)
        advance_shipment_id = response_body.responseObject.content[0].id
        product_id = response_body.responseObject.content[0].advanceShipmentUnit[0].productId
        cy.log("advance_shipment_id is: " + advance_shipment_id)
        cy.log("product_id is: " + product_id)
    })
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

When('Status of ASN should be changed to "Arrived"', () => {
    cy.verify_table_data(page_asn1.page_arrived_status_path(), fixtures_inbound.asn.status[1])
})


Given('End points for container creation, Authorization Token, warehouse location, bar code and container name', () => {
    container_creation_url = env_acs2_data.api_web_base_url + resources_setup1.resources_container_create()
    auth_token = web_login_token
    warehouse_location = env_acs2_data.container_details.warehouse_location
    ver = env_acs2_data.container_details.ver
    device_type = "Web"
    cy.random('CONTAINER_').then((number) => {
        bar_code = number
        cy.log("BAR CODE AND CONTAINER NAME IS : " + bar_code)
    })
    cy.log("container_creation_url : " + container_creation_url)
    cy.log("auth_token : " + auth_token)
    cy.log("warehouse_location : " + warehouse_location)
    cy.log("ver : " + ver)
    cy.log("device_type : " + device_type)
    cy.log(" bar_code: " + bar_code)
})

When('User creates a container by hit the container creation api', () => {
    custom_container1.custom_container_creation('POST', container_creation_url, auth_token, ver, device_type, warehouse_location, bar_code)
})

Then('Status code should be "200"', () => {
    cy.verify_response_value(custom_container1.custom_container_creation_status_code(), 200)
})

Then('Container should be created and barcode of container should be generated', () => {
    container_number = custom_container1.custom_container_name()
    cy.verify_response_value_not_null(container_number)
    cy.log(" Container Number : " + container_number)
})

Given('Receiver app user Credentials', () => {
    app_login_url = env_acs2_data.api_web_base_url + resources_generic1.resources_acs2_login()
    app_user_name = env_acs2_data.api_app_user_name
    app_user_password = env_acs2_data.api_app_password
    device_type = "Android"
})

When('Receiver user  hit the login Mobile app API by valid credentials', () => {
    custom_receiver_app1.custom_receiver_app_login("POST", app_login_url, "", ver, device_type, app_user_password, app_user_name)
})

Then('Status code should be "200" after login', () => {
    cy.verify_response_value(custom_receiver_app1.custom_receiver_app_login_status_code(), 200)
})

Then('Authorized token should be generated', () => {
    app_auth_token = custom_receiver_app1.custom_access_token()
    cy.log( " App token is : " + app_auth_token)
    cy.verify_response_value_not_null(app_auth_token)
})



