Feature: Test Scenario

    Testing Things

    # Scenario: This is a test
    #     When I navigate to the page

    Scenario: Invalid Webpage Test
        When I navigate to a W3 page that does not exist
        Then I validate the W3 page should have a 404 response
        Then I validate that all the links on the page go to another page