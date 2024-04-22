import page_manage_bin from '../../../../cypress/page_objects/page_acs2/page_manage_bin'
const page_manage_bin1 = new page_manage_bin()
import page_purchase_order from '../../../../cypress/page_objects/page_acs2/page_inbound/page_purchase_order'
const page_purchase_order1 = new page_purchase_order()


class custom_manage_bin {

    custom_select_fc(){
        cy.contains(page_manage_bin1.page_select_fc()).click({force:true})
    }

    custom_location_search(location_number) {
        page_manage_bin1.page_filter().click({force:true})
        page_manage_bin1.page_location_filter().type(location_number)
        page_purchase_order1.page_po_filter_search().click({force:true})
    }

    custom_enable(){
        cy.contains(page_manage_bin1.page_enable_button()).click({force:true})
    }


    








}
export default custom_manage_bin