import "cypress-localstorage-commands"
import "cypress-iframe"
import 'cypress-file-upload'
var current_time, response_body

Cypress.Commands.add("custom_verify_text_value", (selector, text_value) => {
    cy.iframe().find(selector).each(($el, index, $list) => {
        const message = $el.text()
        expect(message).to.include(text_value);
    })
})

Cypress.Commands.add("verify_table_status", (selector1, selector2, header_name, header_value) => {
    cy.get(selector1).each(($id, index, $list) => {
        if ($id.text() === header_name) {
            cy.log($id.text())
            cy.get(selector2).eq(index).then(function ($status) {
                const status = $status.text()
                cy.log("header_value is :" + status)
                expect(status).to.include(header_value)
            })
        }
    })
})

Cypress.Commands.add("contains_value", (selector1, text_value) => {
    cy.get(selector1).contains(text_value)
})

Cypress.Commands.add("verify_iframe_table_status", (selector1, selector2, header_name, status1) => {
    cy.iframe().find(selector1).each(($id, index, $list) => {
        if ($id.text().trim() === header_name) {
            cy.log("name of column value is :" + $id.text().trim())
            cy.iframe().find(selector2).eq(index).then(function ($status) {
                cy.wait(3000)
                const status = $status.text()
                cy.log("name of column value is : " + status)
                expect(status).to.include(status1)
            })
        }
    })
})

Cypress.Commands.add("current_time", () => {
    current_time = Math.floor(Date.now() / 1000);
    return current_time
})

Cypress.Commands.add("random", (prefix) => {
    var random = Math.floor(Date.now() / 1000);
    return prefix + random
})

Cypress.Commands.add("upload_file", (selector, file_path) => {
    selector.attachFile(file_path, { encoding: 'utf-8' })

})

Cypress.Commands.add("extract_text_xpath", (selector) => {
    cy.xpath(selector).then(async ($e2, index, $list) => {
        var text_value = $e2.text()
        cy.log("Text value is: " + text_value)
        return text_value
    })
})

Cypress.Commands.add("extract_text_css", (selector, index) => {
    cy.get(selector).eq(index).then(async ($e2, index, $list) => {
        var text_value = $e2.text()
        cy.log("Text value is: " + text_value)
        return text_value
    })
})

Cypress.Commands.add("download_file", (selector, value) => {
    cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
            setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.wait(3000)
        cy.get(selector).contains(value).invoke('show').click({ force: true })
    })


})

Cypress.Commands.add("table_iframe_value", (selector, ind) => {
    cy.iframe().find(selector).eq(ind).then(async ($el, index, $list) => {
        var consignment_number = $el.text()
        cy.log("Consignment number is: " + consignment_number)
        return consignment_number
    })
})

Cypress.Commands.add("custom_verify_tiles_value", (selector, text_value) => {
    cy.contains(selector).each(($el, index, $list) => {
        const message = $el.text()
        expect(message).to.include(text_value);
    })
})

Cypress.Commands.add("verify_url_link", (url_link) => {
    cy.url().should('include', url_link)
})

Cypress.Commands.add("visit_url", (url_link) => {
    cy.visit(url_link)
})

Cypress.Commands.add("dropdown_selection", (option) => {
    cy.get("select").select(["option"])
})

Cypress.Commands.add("verify_table_data", (selector, expected_value) => {
    cy.xpath(selector).then(($element) => {
        var actual_value = $element.text()
        // Further assertion or processing
        expect(actual_value).to.include(expected_value)
    })
})

Cypress.Commands.add("verify_table_data_css", (selector, index, expected_value) => {
    cy.get(selector).eq(index).then(($element) => {
        var actual_value = $element.text()
        // Further assertion or processing
        expect(actual_value).to.include(expected_value)
    })
})

Cypress.Commands.add("verify_table_status_not_null", (selector1, selector2, header_name) => {
    cy.get(selector1).each(($id, index, $list) => {
        if ($id.text() === header_name) {
            cy.log($id.text())
            cy.get(selector2).eq(index).then(function ($status) {
                const status = $status.text()
                cy.log("header_value is :" + status)
                expect(status).to.not.be.null
            })
        }
    })
})

Cypress.Commands.add("network_intercept", (method, end_point, event_name) => {
    cy.intercept(method, end_point).as(event_name);
})

Cypress.Commands.add("network_response", (event_name) => {
    cy.wait('@' + event_name).then((interception) => {
        // Assert that the response contains the expected data
        response_body = interception.response.body
    })
    return response_body
})

Cypress.Commands.add("filter_selection", (filter_selector, module_selector, module_number,search_selector) => {
    filter_selector.click()
    module_selector.type(module_number)
    search_selector.click()
})




























































