import headers from '../../../../../cypress/api_utilities/headers/headers'
const headers1 = new headers()
import payloads_receiver_app from '../../../../../cypress/api_utilities/payloads/payloads_acs2/payloads_inbound/payloads_receiver_app'
const payloads_receiver_app1 = new payloads_receiver_app()
var receiver_app_login_response, receiver_app_login_status_code, receiver_app_receiving_response, receiver_app_receiving_status_code

class custom_container{

    custom_receiver_app_login(method, url, auth_token, ver, device_type, password, user_name){
        cy.api({
            method: method,
            failOnStatusCode: false,
            form: false,
            url: url,
            headers: headers1.headers_generic_web(auth_token, ver, device_type),
            body: payloads_receiver_app1.payloads_receiver_app(password, user_name)
        }).then((response) => {
            receiver_app_login_response = response.body
            cy.log("Response body is : " + JSON.stringify(receiver_app_login_response))
            receiver_app_login_status_code = response.status 
        })
    }

    custom_receiver_app_login_response(){
        return receiver_app_login_response
    }

    custom_receiver_app_login_status_code(){
        return receiver_app_login_status_code
    }

    custom_access_token(){
        return receiver_app_login_response.responseObject.tokenString
    }

    custom_receiver_app_receive(method, url, auth_token, ver, device_type, advance_shipment_id, quantity, area_code, product_id, bar_code){
        cy.api({
            method: method,
            failOnStatusCode: false,
            form: false,
            url: url,
            headers: headers1.headers_generic_web(auth_token, ver, device_type),
            body: payloads_receiver_app1.payloads_receiver_app_receiving(advance_shipment_id, quantity, area_code, product_id, bar_code)
        }).then((response) => {
            receiver_app_receiving_response = response.body
            cy.log("Response body is : " + JSON.stringify(receiver_app_receiving_response))
            receiver_app_receiving_status_code = response.status 
        })
    }

    custom_receiver_app_receiving_response(){
        return receiver_app_receiving_response
    }

    custom_receiver_app_receiving_status_code(){
        return receiver_app_receiving_status_code
    }

    custom_success_received_message(){
        return receiver_app_receiving_response.responseObject.responseMessage
    }







}

export default custom_container