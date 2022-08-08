import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

When('I navigate to the page', () => {
    cy.visit('https://www.w3.org/standards/webdesign/htmlcss');
})

When('I navigate to a W3 page that does not exist', () => {
    cy.visit({
        url: 'https://www.w3.org/standards/badpage',
        failOnStatusCode: false
    });
})

Then('I validate the W3 page should have a 404 response', () => {
    cy.request({
        url: 'https://www.w3.org/standards/badpage',
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);
    })
});

Then('I validate that all the links on the page go to another page',() => {
    cy.get('a').each(($element) => {
        validateLinkRequest($element);
    })
})

function validateLinkRequest(element) {
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