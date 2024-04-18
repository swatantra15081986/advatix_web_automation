class page_asn {

    page_select_status_filter() {
        return cy.get('[id="status"]')
    }

    page_action_change_status() {
        return cy.get('.text-primary > span')
    }

    page_select_status_arrived() {
        return cy.xpath("//div[@class='col-md-6']//select[@id='status']")
    }

    page_arrived_submit() {
        return cy.get('form.ng-dirty > .col-md-12 > .btn')
    }

    page_success_popup() {
        return '#swal2-title'
    }
    
    page_success_popup_confirm() {
        return cy.get('.swal2-confirm')
    }

    page_arrived_status_path() {
        return "//td[contains(text(),'Arrived')]"
    }

    page_assigned_status_path() {
        return "Assigned"
    }

    page_receiving_unit_status() {
        return "//table/tbody/tr/td[13]"
    }

    page_move_staging_area_button() {
        return cy.xpath("//span[contains(text(),'Staging Area')]")
    }

    page_stow_staging_column_value(){
        return "//table/tbody/tr/td[19]"
    }

    page_button_confirm(){
        return 'Confirm'
    }


  










}

export default page_asn