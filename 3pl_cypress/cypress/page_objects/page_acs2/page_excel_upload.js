class page_excel_upload {

    page_upload_excel() {
        return cy.xpath("//label[contains(text(),'Upload Files')]")
    }

    page_attach_files() {
        return cy.get('[type="file"]')
    }

    page_filter() {
        return cy.get('[type="file"]')
    }



    
















}

export default page_excel_upload