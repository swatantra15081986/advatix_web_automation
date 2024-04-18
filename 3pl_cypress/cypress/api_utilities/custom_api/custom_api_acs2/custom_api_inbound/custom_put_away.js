import headers from '../../../../../cypress/api_utilities/headers/headers'
const headers1 = new headers()
import payloads_put_away_app from '../../../../../cypress/api_utilities/payloads/payloads_acs2/payloads_inbound/payloads_put_away_app'
const payloads_put_away_app1 = new payloads_put_away_app()
var put_away_list_response, put_away_list_status_code
var put_away_list_response, put_away_response, put_away_status_code

class custom_put_away{

    custom_put_away_list(method, url, auth_token, ver, device_type, container_code){
        cy.api({
            method: method,
            failOnStatusCode: false,
            form: false,
            url: url,
            headers: headers1.headers_generic_web(auth_token, ver, device_type),
            qs: payloads_put_away_app1.payloads_put_away_list(container_code)
        }).then((response) => {
            put_away_list_response = response.body
            cy.log("Response body is : " + JSON.stringify(put_away_list_response))
            put_away_list_status_code = response.status 
        })
    }

    custom_put_away_list_response(){
        return put_away_list_response
    }

    custom_put_away_list_response_status_code(){
        return put_away_list_status_code
    }

    custom_put_away_list_id(){
        return put_away_list_response.responseObject[0].id
    }

    custom_put_away(method, url, auth_token, ver, device_type, container_code, advance_shipment_id, bar_code, put_away_list_id, location_qr_code, quantity ){
        cy.api({
            method: method,
            failOnStatusCode: false,
            form: false,
            url: url,
            headers: headers1.headers_generic_web(auth_token, ver, device_type),
            qs: payloads_put_away_app1.payloads_put_away_list(container_code),
            body: payloads_put_away_app1.payloads_put_away(advance_shipment_id, bar_code, put_away_list_id, location_qr_code, quantity)
        }).then((response) => {
            put_away_response = response.body
            cy.log("Response body is : " + JSON.stringify(put_away_response))
            put_away_status_code = response.status 
        })
    }

    custom_put_away_response(){
        return put_away_response
    }

    custom_put_away_status_code(){
        return put_away_status_code
    }

  






}

export default custom_put_away