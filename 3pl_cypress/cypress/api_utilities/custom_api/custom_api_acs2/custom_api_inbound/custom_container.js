import headers from '../../../../../cypress/api_utilities/headers/headers'
const headers1 = new headers()
import payloads_container from '../../../../../cypress/api_utilities/payloads/payloads_acs2/payloads_inbound/payloads_container'
const payloads_container1 = new payloads_container()
var container_creation_response, container_creation_status_code

class custom_container{

    custom_container_creation(method, url, auth_token, ver, device_type, warehouse_location, bar_code){
        cy.api({
            method: method,
            failOnStatusCode: false,
            form: false,
            url: url,
            headers: headers1.headers_generic_web(auth_token, ver, device_type),
            body: payloads_container1.payloads_container_creation(warehouse_location, bar_code)
        }).then((response) => {
            container_creation_response = response.body
            cy.log("Response body is : " + JSON.stringify(container_creation_response))
            container_creation_status_code = response.status 
        })
    }

    custom_container_creation_response(){
        return container_creation_response
    }

    custom_container_creation_status_code(){
        return container_creation_status_code
    }

    custom_container_name(){
        return container_creation_response.responseObject[0].barcode
    }

}

export default custom_container