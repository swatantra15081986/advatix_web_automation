class page_fc {

    page_facility_option() {
        return cy.get('#Facility\ \&\ Settings\ icon').invoke('show')
    }

    page_fc_button() {
        return cy.xpath('//*[@id="FC"]')
    }

    page_manage_fc() {
        return cy.xpath('//*[@id="Manage FC"]')
    }

    page_create_fc() {
        return cy.xpath('//*[@id="addOrderButton"]')
    }

    page_fc_name() {
        return cy.xpath('//*[@id="createwarehouseName"]')
    }

    page_create_country() {
        return cy.xpath("//select[@id='createCountry']")
    }

    page_fc_state() {
        return cy.xpath("//select[@id='createState']")
    }

    page_fc_city() {
        return cy.xpath("//select[@id='createCity']")
    }

    page_fc_address() {
        return cy.xpath('//*[@id="createAddress1"]')
    }

    page_fc_postal_code() {
        return cy.xpath('//*[@id="createZipCode"]')
    }

    page_fc_email() {
        return cy.xpath('//*[@id="createEmail"]')
    }

    page_fc_mobile() {
        return cy.xpath('//*[@id="createMobile"]')
    }

    page_fc_submit() {
        return cy.xpath('//*[@id="createSubmit"]')
    }

    page_fc_close(){
        return cy.xpath('//*[@id="closeaddform"]')
    }

    page_header(){
        return ("th")
    }

    page_data(){
        return ("td")
    }

    page_fc_search(){
        return("//table/tbody/tr[1]/td[1]")
    }

    page_fc_filter(){
        return cy.get(".searchBox")
    }

    page_warehouse_name(){
        return cy.get("#WAREHOUSE_NAME")
    }

    page_search_submit(){
        return cy.get("#searchSubmit")
    }


















}

export default page_fc