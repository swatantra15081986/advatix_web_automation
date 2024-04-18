import page_dashboard from '../../../../cypress/page_objects/page_acs2/page_inbound/page_dashboard_menu'
const page_dashboard1 = new page_dashboard()


class custom_dashboard_menu {

    custom_manage_purchase_order(){
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_inventory().realHover('mouse')
        cy.wait(1000)       // Applied Hard wait due to handle mouse events
        page_dashboard1.page_receiving_button1().realHover('mouse')
        page_dashboard1.page_manage_purchase_order().click()
    }

    

    

}   
export default custom_dashboard_menu