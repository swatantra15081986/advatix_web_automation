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

    page_admin_support() {
        return cy.get('[id="Admin Support icon"]')
    }

    page_support() {
        return cy.get('[id="Support"]')
    }

    page_wms_location() {
        return cy.get('[id="Bulk Uploads WMS Location"]')
    }

    page_facility_icon() {
        return cy.get('[id="Facility & Settings icon"]')
    }

    page_facility() {
        return cy.get('[id="FC"]')
    }

    page_manage_bin() {
        return cy.get('[id="Manage Bin"]')
    }






}

export default page_dashboard_menu