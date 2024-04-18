import page_login from '../../../cypress/page_objects/page_acs2/page_login'
const page_login1 = new page_login()


class custom_acs2_login {

    custom_acs2_login(user_name, user_password ){
        page_login1.page_acs2_user_name().type(user_name)
        page_login1.page_acs2_user_password().type(user_password)
        page_login1.page_acs2_login().click()
    }

    

}   
export default custom_acs2_login