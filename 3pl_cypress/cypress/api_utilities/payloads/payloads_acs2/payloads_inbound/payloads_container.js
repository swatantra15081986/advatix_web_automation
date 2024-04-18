
class payloads_container {

    payloads_container_creation(warehouse_location, bar_code) {
        var payloads_container_creation = {
            "warehouseLocation": warehouse_location,
            "barcode": bar_code,
            "containerName": bar_code,
            "containerType": "1",
            "numberOfContainerReq": "1",
            "productType": "2,7,8,5,4,3,1,12,9,14,13",
            "length": "1",
            "width": "1",
            "height": "1",
            "cubic": 1,
            "maxWeight": "10000000",
            "key": "WAREHOUSE"
        }
        cy.log("Payload is : " + JSON.stringify(payloads_container_creation))
        return payloads_container_creation
    }


}
export default payloads_container