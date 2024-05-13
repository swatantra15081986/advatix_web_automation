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
        if ($id.text().trim() === header_name) {
            cy.log($id.text())
            cy.get(selector2).eq(index).then(function ($status) {
                const status = $status.text().trim()
                cy.log("header_value is :" + status)
                expect(status).to.include(header_value)
            })
        }
    })
})

Cypress.Commands.add("contains_value", (selector1, text_value) => {
    cy.get(selector1).contains(text_value).click()
})

Cypress.Commands.add("verify_iframe_table_status", (selector1, selector2, header_name, status1) => {
    cy.iframe().find(selector1).each(($id, index, $list) => {
        if ($id.text().trim() === header_name) {
            cy.log("name of column value is :" + $id.text().trim())
            cy.iframe().find(selector2).eq(index).then(function ($status) {
                cy.wait(1000)
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
        cy.wait(1000)
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

Cypress.Commands.add("verify_table_data_expected_actual", (selector, expected_value) => {
    cy.xpath(selector).then(($element) => {
        var actual_value = $element.text()
        // Further assertion or processing
        expect(expected_value).to.include(actual_value)
    })
})

Cypress.Commands.add("verify_table_data_css", (selector, index, expected_value) => {
    cy.get(selector).eq(index).then(($element) => {
        var actual_value = $element.text()
        // Further assertion or processing
        expect(actual_value).to.include(expected_value)
    })
})

Cypress.Commands.add("verify_table_data_contains", (selector, expected_value) => {
    cy.contains(selector).then(($element) => {
        var actual_value = $element.text()
        // Further assertion or processing
        expect(actual_value).to.include(expected_value)
    })
})

Cypress.Commands.add("verify_table_status_not_null", (selector1, selector2, header_name) => {
    cy.get(selector1).each(($id, index, $list) => {
        if ($id.text().trim() === header_name) {
            cy.log($id.text().trim())
            cy.get(selector2).eq(index).then(function ($status) {
                const status = $status.text().trim()
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

Cypress.Commands.add("filter_selection", (filter_selector, module_selector, module_number, search_selector) => {
    filter_selector.click({force:true})
    cy.wait(1000)
    module_selector.clear()
    module_selector.type(module_number, {force:true})
    search_selector.click({force:true})
    cy.wait(3000) // putting wait for successfully applied filter
})

Cypress.Commands.add("menu_dashboard_item", (dashboard_main_menu_selector, selector_under_main_menu, selector_under_sub_menu) => {
    cy.wait(1000)       // Applied Hard wait due to handle mouse events
    dashboard_main_menu_selector.realHover('mouse')
    cy.wait(1000)       // Applied Hard wait due to handle mouse events
    selector_under_main_menu.realHover('mouse')
    cy.wait(1000) 
    selector_under_sub_menu.click()
})

Cypress.Commands.add("action_item", (selector) => {
    selector.click({force:true})
    cy.get(1000) // putting wait for successfully applied filter
})

Cypress.Commands.add("select_css", (option) => {
    cy.xpath(selector).select(option)
})

Cypress.Commands.add("verify_response_value", (actual_response_key_value, expected_reeponse_key_value) => {
    expect(actual_response_key_value).equal(expected_reeponse_key_value)
})

Cypress.Commands.add("verify_response_value_include", (actual_response_key_value, expected_response_key_value) => {
    expect(actual_response_key_value).to.include(expected_response_key_value)
})

Cypress.Commands.add("verify_response_value_include_or", (expected_response_key_value, actual_response_key_value) => {
    expect(expected_response_key_value).to.include(actual_response_key_value)
})

Cypress.Commands.add("verify_response_value_not_null", (actual_response_key_value) => {
    expect(actual_response_key_value).to.not.be.null
})

Cypress.Commands.add("attach_excel", (selector, fixture_excel_file_path) => {
    selector.attachFile(fixture_excel_file_path, { encoding: 'utf-8' })
})

Cypress.Commands.add("verify_button_visible", (selector) => {
    selector.should('be.enabled')
})

Cypress.Commands.add("extract_custom_tiles_value", (selector) => {
    const messages = []
    cy.contains(selector).each(($el, index, $list) => {
        const message = $el.text();
        cy.log(message);
        messages.push(message);
    }).then(() => {
        // Once all messages are collected, resolve with the array
        return messages;
    })
})




























































