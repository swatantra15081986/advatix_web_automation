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

    page_download() {
        return 'Download'
    }

    page_a() {
        return 'a'
    }

    page_pagination_10() {
        return '10'
    }

    




}

export default page_generic