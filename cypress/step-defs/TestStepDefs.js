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