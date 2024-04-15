import page_asn from "../../../page_objects/page_acs2/page_inbound/page_asn"
const page_asn1 = new page_asn()


class custom_asn {

    custom_select_option(option) {
        page_asn1.page_select_status_arrived().select(option)
        cy.wait(1000)
    }

    custom_asn_submit() {
        page_asn1.page_arrived_submit().click({ force: true })
    }

    custom_success_popup_ok() {
        page_asn1.page_success_popup_confirm().click()
        cy.wait(1000)
    }





}
export default custom_asn