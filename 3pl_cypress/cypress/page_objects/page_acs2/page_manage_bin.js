class page_manage_bin {

    page_select_fc() {
        return cy.get('[id="WAREHOUSE_ID"]')
    }

    page_select_fc() {
        return 'Select FC'
    }

    page_select_fc_option(){
        return '[role="option"]'
    }

    page_select_fc_option(){
        return '[role="option"]'
    }

    page_filter(){
        return cy.get('.searchBox')
    }

    page_location_filter(){
        return cy.get('[formcontrolname="BIN_ID"]')
    }

    page_enable_button(){
        return ' Enable'

    }

    page_disable_button(){
        return cy.contains('Disable')
  
    }




}

export default page_manage_bin