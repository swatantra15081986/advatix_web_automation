class page_purchase_order {

    page_add_purchase_order() {
        return cy.get('button').contains(' + Add Purchase Order ')
    }

    page_select_client() {
        return cy.get('[formcontrolname="accountId"]')
    }

    page_select_fc() {
        return cy.get('[formcontrolname="shipTo"]')
    }

    page_select_customer() {
        return cy.get('[formcontrolname="customer"]')
    }

    page_select_supplier() {
        return cy.get('[formcontrolname="supplierId"]')
    }

    page_scheduler_date() {
        return cy.xpath('//*[@id="ej2-datetimepicker_0"]/span/span[2]')
    }

    page_today() {
        return cy.get('.e-btn')
    }

    page_select_product_sku() {
        return cy.get('[placeholder="Select SKU"]').eq(2)
    }

    page_select_product_options() {
        return cy.get('[role="option"]')
    }
    page_select_product_name() {
        return cy.get('[placeholder="Select Product"]').eq(1)
    }

    page_product_qty() {
        return cy.get('[formcontrolname="quantity"]').eq(2)
    }

    page_submit() {
        return cy.get('[type="submit"] > :nth-child(2)')
    }

    page_modal_purchase_order() {
        return `//*[@id="podetailspopup"]/div/div/div[2]/div/div[1]/div[1]/text()`
    }

    page_modal_purchase_order_status() {
        return `//*[@id="podetailspopup"]/div/div/div[2]/div/div[1]/div[13]/text()`
    }

    page_close_button() {
        return cy.get('#closebtn')
    }

    page_filter(){
        return cy.get(".searchBox").eq(1)
    }

    page_po_filter(){
        return cy.get("#PO_NUMBER")
    }

    page_po_filter_search(){
        return cy.get("button").contains(" Search")
    }

    page_asn_page() {
        return ('Manage Receiving/Return')
    }

    page_asn_filter(){
        return cy.get('[placeholder="ASN #"]')
    }








}

export default page_purchase_order