import page_dashboard from '../../../../cypress/page_objects/page_acs2/page_inbound/page_dashboard_menu'
const page_dashboard1 = new page_dashboard()


class custom_dashboard_menu {

    custom_manage_purchase_order() {
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_inventory().realHover('mouse')
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_receiving_button1().realHover('mouse')
        page_dashboard1.page_manage_purchase_order().click()
    }

    custom_bulk_upload_wms_location() {
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_admin_support().realHover('mouse')
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_support().realHover('mouse')
        page_dashboard1.page_wms_location().click()
    }

    custom_dashboard_menu_page(selector1, selector2, selector3) {
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        selector1.realHover('mouse')
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        selector2.realHover('mouse')
        selector3.click()
    }





}
export default custom_dashboard_menu