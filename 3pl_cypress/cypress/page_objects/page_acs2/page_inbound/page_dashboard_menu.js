class page_dashboard_menu {

    page_inventory() {
        return cy.get('[id="Inventory icon"]')
    }

    page_receiving_button1() {
        return cy.get('#Receiving').eq(0)
    }

    page_receiving_button2() {
        return cy.get('[id="Receiving"]').eq(1)
    }

    page_manage_purchase_order() {
        return cy.get('[href="/acs20/inventory/managepo"]').eq(1)
    }

 



}

export default page_dashboard_menu