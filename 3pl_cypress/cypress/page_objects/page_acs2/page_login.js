class page_login {

    page_acs2_user_name() {
        return cy.xpath('//*[@id="usernameLogin"]')
    }

    page_acs2_user_password(){
        return cy.xpath('//*[@id="passwords"]')
    }

    page_acs2_login(){
        return cy.xpath('//*[@id="loginbtn"]')
    }

    page_header(){
        return ("th")
    }

    page_data(){
        return ("td")
    }



}

export default page_login