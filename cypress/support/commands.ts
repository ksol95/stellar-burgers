/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('attr', (value, attr = 'data-cy') => {
  cy.get(`[${attr}="${value}"]`);
});
Cypress.Commands.add('checkProductDescriptions', (selector, ingredinet) => {
  cy.get(selector)
    .contains('Калории, ккал')
    .next('p')
    .contains(ingredinet.calories);

  cy.get(selector).contains('Белки, г').next('p').contains(ingredinet.proteins);

  cy.get(selector).contains('Жиры, г').next('p').contains(ingredinet.fat);

  cy.get(selector)
    .contains('Углеводы, г')
    .next('p')
    .contains(ingredinet.carbohydrates);
});
