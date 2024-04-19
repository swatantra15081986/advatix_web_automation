class resources_purchase_order {

    resources_purchase_order_create() {
        return '/receiving/api/v1/purchaseOrder/createPurchaseOrder'
    }

    resources_asn_create() {
        return '/receiving/api/v1/receiving/getInventoryReceivingList?pageNumber=0&pageSize=50'
    }
    
    resources_asn_receive() {
        return '/receiving/api/v1/receiving/receiveInventory'
    }

    resources_asn_staging_location() {
        return '/receiving/api/v1/receiving/getInventoryReceivingUnitsWithContainer'
    }

    resources_put_away_list() {
        return '/receiving/api/v1/stow/asnAssignedContainerValidate'
    }

    resources_put_away(){
        return '/receiving/api/v1/stow/putAwaySuccessful'
    }

    








}

export default resources_purchase_order