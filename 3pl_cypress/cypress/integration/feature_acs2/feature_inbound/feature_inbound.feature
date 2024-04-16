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
        When Click on the " Approve " button
        When Click on the "Receiving" icon from the " Receiving" option under "inventory" button from  Dashboard menu items
        Then ASN receiving page should be opened
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        Then ASN Number should be same as the number of purchase order
        And Save this ASN number for the future reference

    Scenario: Receiver should be able to mark the status of ASN to " Arrived " by "Change Status"
        When Search the ASN number in the ASN filter button by typing PO number in the ASN filter
        When click on the "change status" button
        And Click on the "Select Status" filter button and select option "Arrived"
        And Click on the " Submit " button for marked arrived
        Then Success Pop up should be displayed with "Updated" message
        And Click on "OK" button of pop up to close pop up

        Scenario: After marked ASN "Arrived", status should be changed to "Arrived"
        Then Status of ASN should be changed to "Arrived"

        Scenario: Create containers for receiving items
        Given Container code, container name, Container Type, No of container required, length, width, height, cubic inches, max weight, temp storage areas
        When Go to " Facility and Planning" tab and then " Manage FC" and then come to "Manage FC " button
        And  Click on the "Add +" button to create new container
        And  Select the " FC Name"
        And  Type the "Container code"
        And Type the " Container Name"
        And Select the "Container Type"
        And Type the value in "No of container required"
        And Type the dimensions "L", "B", "H"
        And Type the require "Cubic Inches"
        And Type the "Max weight (lb)"
        And Select the "Temp Storage Area"
        And Open the " Network" tab to capture the network responses of container creation
        And Click on the "Submit" button to create container 
        And Store the "container code" number value in variable  from the response of network call button


   
        





