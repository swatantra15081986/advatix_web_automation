
class payloads_put_away_app {

    payloads_put_away_list(container_code) {
        var payloads_put_away_list = {
            "containerCode": container_code
        }
        cy.log("Payload is : " + JSON.stringify(payloads_put_away_list))
        return payloads_put_away_list
    }

    payloads_put_away(advance_shipment_id, bar_code, put_away_list_id, location_qr_code, quantity) {
        var payloads_put_away = {
            "asnId": advance_shipment_id,
            "barCode": bar_code,
            "id": put_away_list_id,
            "locationQrcode": location_qr_code,
            "quantity": quantity
        }
        cy.log("Payload is : " + JSON.stringify(payloads_put_away))
        return payloads_put_away
    }





}


export default payloads_put_away_app