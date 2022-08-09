import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { waitForMultimodalPage, waitForHTMLPage, waitForInvalidPage } from "../CypressNetworkRequests/CypressNetworkRequests"

let webPageDestination;

When('I navigate to the W3 page: {string}', (w3PageDestination) => {
    waitForMultimodalPage();
    waitForHTMLPage();
    waitForInvalidPage();
    webPageDestination = w3PageDestination;
    switch(webPageDestination) {
        case 'Multimodal':
            cy.visit('https://www.w3.org/standards/webofdevices/multimodal');
            break;
        case 'HTML':
            cy.visit('https://www.w3.org/standards/webdesign/htmlcss');
            break;
        case 'Invalid':
            cy.visit({
                url: 'https://www.w3.org/standards/badpage',
                failOnStatusCode: false
            });
    }
});

Then('I validate the response from the webpage', () => {
    switch(webPageDestination) {
        case 'Multimodal':
            cy.wait('@waitForMultimodalPage').should((response) => {
                expect(response.response.statusCode).to.equal(200);
            });
            break;
        case 'HTML':
            cy.wait('@waitForHTMLPage').should((response) => {
                expect(response.response.statusCode).to.equal(200);
            });
        case 'Invalid':
            cy.request({
                url: 'https://www.w3.org/standards/badpage',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
            });
    }
})

Then('I validate that all the links on the page go to another page',() => {
    cy.get('a').each(($element) => {
        console.log($element)
        validateLinkRequest($element);
    })
})

/**
 * 
 * @param {*} element 
 * 
 * This function checks if the incoming element contains the href property.
 * If that property length is > 0, we utilize the cy.request(...) functionality to make a request of that link
 * The failOnStatusCode is set to false due to broken links that can cause this request to fail, as we
 * want to check every link on the page to make sure of its response.
 * 
 * After making the initial request, we are then validating that the response from that request is 200. If we find
 * a 404, we log it in the Cypress runner and continue down the chain.
 */

function validateLinkRequest(element) {
    if(element.prop('href').length > 0) {
        cy.request({
            url: element.prop('href'),
            failOnStatusCode: false
        }).then((response) => {
            if(response.status === 404) {
                cy.log('Caught 404 reponse');
            } else {
                expect(response.status).to.eq(200);
            }
        })
    }
}