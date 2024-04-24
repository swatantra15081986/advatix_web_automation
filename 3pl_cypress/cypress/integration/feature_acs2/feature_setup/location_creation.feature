Feature: LOCATION CREATION IN ACS-2.0

    Feature Description
    Location creation for the put away the products

    @sanity @regression
    Scenario: User Login in ACS2.0 should be done successfully with correct User name and Password
        Given ACS2 dashboard URL, Username and Password for login in ACS2 Dashboard
        When User clicks on Login button of ACS2 Dashboard after fill user name and password
        Then User should get logged in successfully on ASC2 Order dashboard Page

    @sanity @regression
    Scenario: Update the Location Upload Excel file with new values
        Given Add the Excel file in fixture file location, location name, FC name, excel cell value of Barcode and Location name, Sheet Name
        When Type the new location name in field "LocationName*" in the excel file
        When Type the barcode of location in the "Barcode*" in the excel file
        Then "Location Upload" Excel file should be updated with updated "LocationName " and "Barcode"

    @sanity @regression
    Scenario: Location should be created by " Upload excel " in the "support >> Bulk uploads WMS locations"
    When Open the " Bulk uploads WMS locations " page by " Support"
    When Click on the "Upload files" button
    When Attach the " Location upload file excel" file here in the Browse
    When Open the "Manage bin" page by "FC" in "Facility & Planning" page
    When Select the "FC" in filter button
    When Select the "Location" in filter button
    Then Created "Location" should be displayed in the List

