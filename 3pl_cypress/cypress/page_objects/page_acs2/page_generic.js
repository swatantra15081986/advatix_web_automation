class page_generic {

    

    page_header(){
        return ("th")
    }

    page_data(){
        return ("td")
    }

    page_action() {
        return cy.get('.text-primary')
    }

    page_button() {
        return 'button'
    }

    




}

export default page_generic