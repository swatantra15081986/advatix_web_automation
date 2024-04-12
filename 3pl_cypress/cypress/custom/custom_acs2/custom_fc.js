import page_fc from '../../../cypress/page_objects/page_acs2/page_fc'
const page_fc1 = new page_fc()

class custom_fc {

    custom_facility_option() {
        page_fc1.page_facility_option().invoke('show').click({force:true})
    }

    custom_fc_button() {
        page_fc1.page_fc_button().click()
    }

    custom_manage_fc(){
        page_fc1.page_manage_fc().click()
    }

    custom_create_fc(){
        page_fc1.page_create_fc().click()
    }

  
    custom_fc_name(fc_name){
        page_fc1.page_fc_name().type(fc_name)
    }

    custom_fc_country(country){
        page_fc1.page_create_country().select(country)
    }

    custom_fc_state(fc_state){
        page_fc1.page_fc_state().select(fc_state)
    }

    custom_fc_city(fc_city){
        page_fc1.page_fc_city().select(fc_city)
    }

    custom_fc_address(fc_address){
        page_fc1.page_fc_address().type(fc_address)
    }

    custom_fc_postal_code(fc_postal_code){
        page_fc1.page_fc_postal_code().type(fc_postal_code)
    }

    custom_fc_email(fc_email){
        page_fc1.page_fc_email().type(fc_email)
    }

    custom_fc_mobile(mobile_number){
        page_fc1.page_fc_mobile().type(mobile_number)
    }

    custom_submit(){
        page_fc1.page_fc_submit().click()
    }

    custom_fc_close(){
        page_fc1.page_fc_close().click({force:true})
        cy.wait(3000)
    }

    custom_warehouse_search(fc_name){
        page_fc1.page_fc_filter().click({force:true})
        page_fc1.page_warehouse_name().type(fc_name)
        page_fc1.page_search_submit().click({force:true})
    }

    

}   
export default custom_fc