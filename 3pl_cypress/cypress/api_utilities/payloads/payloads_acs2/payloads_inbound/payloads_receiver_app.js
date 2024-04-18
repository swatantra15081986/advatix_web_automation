
class payloads_receiver_app {

    payloads_receiver_app(password, user_name) {
        var payloads_receiver_app = {
            "password": password,
            "userName": user_name
        }
        cy.log("Payload is : " + JSON.stringify(payloads_receiver_app))
        return payloads_receiver_app
    }

    payloads_receiver_app_receiving(advance_shipment_id, quantity, area_code, product_id, bar_code) {
        var payloads_receiver_app_receiving = {
            "advanceShipmentId": advance_shipment_id,
            "submitionType": 1,
            "quantity": quantity,
            "damageFileUrl": [],
            "productBatchId": "",
            "isConforming": true,
            "conformingReason": "",
            "areaCode": area_code,
            "expirationDate": "",
            "isOk": true,
            "packageType": 3,
            "productId": product_id,
            "barcode": bar_code,
            "isExceptionReceiving": false,
            "hoursSpent": ""
        }
        cy.log("Payload is : " + JSON.stringify(payloads_receiver_app_receiving))
        return payloads_receiver_app_receiving
    }


}
export default payloads_receiver_app