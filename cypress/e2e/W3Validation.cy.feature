Feature: Testing and Validating Webpage Responses

    Scenario: Multimodal Page
        When I navigate to the W3 page: 'Multimodal'
        Then I validate the response from the webpage
        Then I validate that all the links on the page go to another page

    Scenario: HTML Page
        When I navigate to the W3 page: 'HTML'
        Then I validate the response from the webpage
        Then I validate that all the links on the page go to another page

    Scenario: Invalid Webpage Test
        When I navigate to the W3 page: 'Invalid'
        Then I validate the response from the webpage
        Then I validate that all the links on the page go to another page
