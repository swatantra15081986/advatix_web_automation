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
        When User clicks on Login button of ACS2 Dashboard after fill user name and password
        Then User should get logged in successfully on ASC2 Order dashboard Page

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

        Scenario: Newly created Purchase Order should display in top of the list along with Approve hyperlink in Approve column
        When Close the purchase order modal window
        Then Purchase order should be displayed in the top of the list

        Scenario: PO should get approved and user should get 'Successfully Approved' as success message
        When Search the PO number in the PO filter button
        When Click on the " Approve " button"



        