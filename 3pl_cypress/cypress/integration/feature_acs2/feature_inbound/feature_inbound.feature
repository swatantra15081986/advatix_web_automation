Feature: INBOUND PROCESS IN ACS 2

    Feature Description
    WMS Inbound process like :-
    - PO Creation/ Approval
    - ASN Creation
    - ASN Arrived
    - Receiving
    - QC
    - Put Away



    @sanity @regression 
    Scenario: User Login in ACS2.0 should be done successfully with correct User name and Password
        Given ACS2 dashboard URL, Username and Password for login in ACS2 Dashboard
        When  Open the " Network" tab to capture the network responses of login
        When User clicks on Login button of ACS2 Dashboard after fill user name and password
        Then User should get logged in successfully on ASC2 Order dashboard Page
        And Store the token number value value in variable  from the response of network call button

    @sanity @regression 
    Scenario: Purchase Order should get created with desired qty that should be display on modal window
        Given Client, Customer, FC, Supplier, Scheduled date, Product details
        When Click on the "Manage Purchase Order" icon from the " Receiving" option under "inventory" button from  Dashboard menu items
        And  Click on the " Add Purchase Order" button
        And Select the "client" from the " Add purchase Order" page
        And Select the "FC" from the " Add purchase Order" page
        And Select the "Customer" from the " Add purchase Order" page
        And Select the "Supplier" from the " Add purchase Order" page
        And Select the "Scheduled Date" from the " Add purchase Order" page
        And Type the "Product SKU" from the " Add purchase Order" page
        And Type the "Product Name" from the " Add purchase Order" page
        And Type the "Product Quantity" from the " Add purchase Order" page
        And Open the " Network" tab to capture the network responses
        And Click on the " Submit " button
        And Store the purchase order number value in variable  from the response of network call button
        Then PO Number should be generated and should be displayed in the open Pop up
        And  Verify the status of PO, Should be " Created"

    @sanity @regression 
    Scenario: Newly created Purchase Order should display in top of the list along with Approve hyperlink in Approve column
        When Close the purchase order modal window
        When Search the PO number in the PO filter button
        Then Purchase order should be displayed in the top of the list

    @sanity @regression
    Scenario: PO should get approved and user should get 'Successfully Approved' as success message
        When Search the PO number in the PO filter button
        When Click on the " Approve " button
        When Click on the "Receiving" icon from the " Receiving" option under "inventory" button from  Dashboard menu items
        Then ASN receiving page should be opened
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        Then ASN Number should be same as the number of purchase order
        And Save this ASN number for the future reference

    @sanity @regression
    Scenario: Receiver should be able to mark the status of ASN to " Arrived " by "Change Status" and status of ASN should be changed to " Arrived"
        When Open the network tab for save the " Advance Shipment ID" in vaiable
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        When Store the " Advance Shipment ID" and " Product id"  value in variable  from the response of network call button
        When click on the "change status" button
        And Click on the "Select Status" filter button and select option "Arrived"
        And Click on the " Submit " button for marked arrived
        Then Success Pop up should be displayed with "Updated" message
        And Click on "OK" button of pop up to close pop up
        Then Status of ASN should be changed to "Arrived"

    @sanity @regression 
    Scenario: Create containers for receiving items using APIs '/acs-shipper-services/api/v1/container/createContainer'
        Given End points for container creation, Authorization Token, warehouse location, bar code and container name
        When User creates a container by hit the container creation api
        Then Status code should be "200"
        Then Container should be created and barcode of container should be generated

    @sanity @regression
    Scenario: Login by app user for receiving the products of ASN by APIs '/acs-user-auth/api/v1/user/userLogin'
        Given Receiver app user Credentials
        When Receiver user  hit the login Mobile app API by valid credentials
        Then Status code should be "200" after login
        Then Authorized token should be generated

    @sanity @regression
    Scenario: Receiver app user should be able to receive the quantity of products in the container by APIs '/receiving/api/v1/receiving/receiveInventory'
        Given End points url for Receiving, product ID, advance shipment id, product , product quantity, container
        When Receiver user  hit the receiving Mobile app API to put product quantity into container as "OK" bucket
        Then Status code should be "200" after received
        Then " Inventory received successfully " message should be displayed

    @sanity @regression
    Scenario: After Receiving, Verify the status of ASN in web, It should be "Assigned"
        When Visit the url of " Manage recceiving Page"
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        Then Verify the status of ASN, it should be "Assigned"
        Then Sequential ID should be generated and should be displayed in the " Sequential ID" column

    @sanity @regression
    Scenario: After Receiving, Verify the status of Products in web, It should be "Received"
        When Click on the "ASN Number"
        Then "Receiving Unit" page should be opened
        Then Status of " receiving Unit" should be "Received"

    @sanity @regression
    Scenario: Location should be add in " Stow Staging" after click on " Move to Staging Area " and status of ASN should be remain same to " Assigned "
        When Open the " Network" tab to capture the network responses to extract the "location value"
        When Click on the "Move to Staging Area" and confirm
        When Store the "Staging location number" value in variable  from the response of network call button
        Then "Location name" should be displayed in the "staging area" column
        When Click on the "Back" button
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        Then Verify the status of ASN, it should be "Assigned"

    @sanity @regression
    Scenario: Hit the API to get the putaway unit ID '/api/v1/stow/asnAssignedContainerValidate'
        Given End points for ASN assigned and container
        When   Hit the API to get the putaway unit ID
        Then Put Away Unit ID should be generated

    @sanity @regression
    Scenario: Stow user should be able to complete the " Put Away" successfully by APIs '/api/v1/stow/putAwaySuccessful?'
        Given End points url for put away, product ID, advance shipment id, product , product quantity, container, put_away_list
        When User put away the quantity in the staging location
        Then Status code should be "200" after put away
        #Then " Inventory received successfully " message should be displayed

        @sanity @regression
    Scenario: After Put Away, Verify the status of ASN in web, It should be "Assigned"
        When Visit the url of " Manage recceiving Page"
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        Then Verify the status of ASN, it should be "Assigned"
        Then Sequential ID should be generated and should be displayed in the " Sequential ID" column

    @sanity @regression
    Scenario: After Put Away, Verify the status of Products in web, It should be "Stowed"
        When Click on the "ASN Number"
        Then "Receiving Unit" page should be opened
        Then Status of " receiving Unit" should be "Stowed"

        @sanity @regression 
        Scenario: Download the CSV file from Download button and verify the ASN details in CSV file
        When Visit the url of " Manage recceiving Page"
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        When Click on the "Download" button and then select the pagination and then click
        When Extract the downloaded CSV file data
        Then Verify the "ASN Number" in CSV file, It should be same as just filtered ASN Number
        Then Verify the "ASN status" in CSV file, It should be same as the web status of ASN
        Then Verify the "Supplier_name" in CSV file, It should be same as the web status of ASN
        
  











