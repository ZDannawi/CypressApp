export function waitForMultimodalPage() {
    cy.intercept({
        url: 'https://www.w3.org/standards/webofdevices/multimodal',
        method: 'GET'
    }).as('waitForMultimodalPage')
}

export function waitForHTMLPage() {
    cy.intercept({
        url: 'https://www.w3.org/standards/webdesign/htmlcss',
        method: 'GET'
    }).as('waitForHTMLPage');
}

export function waitForInvalidPage() {
    cy.intercept({
        url: 'https://www.w3.ord/standards/badpage',
        method: 'GET'
    }).as('waitForInvalidPage')
}