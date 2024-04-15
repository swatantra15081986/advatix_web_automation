Feature: FC CREATION IN ACS 2

    Feature Description
    WMS FC CREATION IN WMS


    @sanity @regression
    Scenario: User Login in ACS2.0 should be done successfully with correct User name and Password
        Given ACS2 dashboard URL, Username and Password for login in ACS2 Dashboard
        When User clicks on Login button of ACS2 Dashboard after fill user name and password
        Then User should get logged in successfully on ASC2 Order dashboard Page

    @sanity @regression
    Scenario: FC should be created after entring all mandatory field and should be displayed in the FC list in MANAGE FC Page
        Given Test data for the FC creation mandatory field like " FC Name", " country", " State", " City", " Address", " Postal Code", " E Mail", " Mobile"
        When Click on the Facility left side options
        And Click on FC button in the "Facility and Settings" sections
        And  Click on the Manage FC button
        And Click on the "Add" button in the " manage FC" Page
        And Enter the " FC Name"
        And Enter the " Country" Name
        And Enter the " State"  Name
        And Enter the " City" name
        And Enter the "Address"
        And Enter the " Postal Code"
        And Enter the " Email"
        And Enter the " Mobile"
        And Click on "Submit" button
        Then FC should be created and should be displayed in the "MANAGE FC" page
        Then Verify the "status" of the FC in the  "MANAGE FC" page, It should be "ACTIVE"
        Then Verify the "FC CODE" of the FC in the  "MANAGE FC" page, It should "Not be NULL"
        Then Verify the "City" of the FC in the  "MANAGE FC" page
        Then Verify the "State" of the FC in the  "MANAGE FC" page





