class resources_purchase_order {

    resources_purchase_order_create() {
        return '/receiving/api/v1/purchaseOrder/createPurchaseOrder'
    }

    resources_asn_create() {
        return '/receiving/api/v1/receiving/getInventoryReceivingList?pageNumber=0&pageSize=50'
    }
    //
    resources_asn_receive() {
        return '/receiving/api/v1/receiving/receiveInventory'
    }








}

export default resources_purchase_order