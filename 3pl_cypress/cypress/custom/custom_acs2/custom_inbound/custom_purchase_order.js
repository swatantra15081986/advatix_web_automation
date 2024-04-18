import page_purchase_order from '../../../../cypress/page_objects/page_acs2/page_inbound/page_purchase_order'
const page_purchase_order1 = new page_purchase_order()


class custom_purchase_order {

    custom_add_purchase_order() {
        page_purchase_order1.page_add_purchase_order().click()
    }

    custom_select_client(client) {
        page_purchase_order1.page_select_client().select(client)
    }

    custom_select_fc(fc) {
        page_purchase_order1.page_select_fc().select(fc)
    }

    custom_select_customer(customer) {
        page_purchase_order1.page_select_customer().select(customer)
    }

    custom_select_supplier(supplier) {
        page_purchase_order1.page_select_supplier().select(supplier)
    }

    custom_scheduled_date() {
        page_purchase_order1.page_scheduler_date().click()
        page_purchase_order1.page_today().click()
    }

    custom_select_product_sku(product_sku) {
        page_purchase_order1.page_select_product_sku().click()
        page_purchase_order1.page_select_product_options().contains(product_sku).click()
    }

    custom_select_product_name(product_name) {
        page_purchase_order1.page_select_product_name().click()
        page_purchase_order1.page_select_product_options().contains(product_name).click()
    }

    custom_product_qty(product_qty) {
        page_purchase_order1.page_product_qty().clear()
        page_purchase_order1.page_product_qty().type(product_qty)
    }

    custom_submit() {
        page_purchase_order1.page_submit().click({ force: true })
        cy.wait(1000)
    }

    custom_close_button() {
        page_purchase_order1.page_close_button().click({ force: true })
        cy.wait(1000)

    }

    custom_po_search(purchase_order_number) {
        page_purchase_order1.page_filter().click()
        page_purchase_order1.page_po_filter().type(purchase_order_number)
        page_purchase_order1.page_po_filter_search().click()
    }
    








}
export default custom_purchase_order