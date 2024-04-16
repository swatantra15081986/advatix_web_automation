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
    Scenario: Receiver should be able to mark the status of ASN to " Arrived " by "Change Status"
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        When click on the "change status" button
        And Click on the "Select Status" filter button and select option "Arrived"
        And Click on the " Submit " button for marked arrived
        Then Success Pop up should be displayed with "Updated" message
        And Click on "OK" button of pop up to close pop up

    @sanity @regression 
    Scenario: After marked ASN "Arrived", status should be changed to "Arrived"
        Then Status of ASN should be changed to "Arrived"

    @sanity @regression 
    Scenario: Create containers for receiving items using APIs '/acs-shipper-services/api/v1/container/createContainer'
        Given End points for container creation, Authorization Token, warehouse location, bar code and container name
        When User creates a container by hit the container creation api
        Then Status code should be "200" 
        Then Container should be created and barcode of container should be generated










