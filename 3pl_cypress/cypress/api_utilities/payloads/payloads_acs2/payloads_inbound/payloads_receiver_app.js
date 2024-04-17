
class payloads_receiver_app {

    payloads_receiver_app(password, user_name) {
        var payloads_receiver_app = {
            "password": password,
            "userName": user_name
        }
        cy.log("Payload is : " + JSON.stringify(payloads_receiver_app))
        return payloads_receiver_app
    }


}
export default payloads_receiver_app