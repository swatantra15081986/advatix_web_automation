class headers {

    headers_generic_web(auth_token, ver, device_type) {
        var headers_generic_web = {
            "Content-Type": "application/json",
            "device-type": device_type,
            "auth-token": auth_token,
            "ver": ver
        }
        cy.log("Headers are : " + JSON.stringify(headers_generic_web))
        return headers_generic_web
    }

}

export default headers