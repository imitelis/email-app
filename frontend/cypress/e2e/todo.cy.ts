/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Birth Query E2E entry tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.viewport(1200, 800);
    cy.visit("http://localhost:9000");
  });

  it("home page displays the more details button", () => {
    cy.get('.btn[href="/about"]')
      .should("exist")
      .should("have.text", "More details")
      .click();

    cy.url().should("include", "/about");
  });

  it("home page displays the login button", () => {
    cy.get('a[href="/login"]').find(".login-button").click();

    cy.url().should("include", "/login");
  });

  it("average user can log in", () => {
    cy.get('a[href="/login"]').find(".login-button").click();

    cy.url().should("include", "/login");

    cy.get("#username").type("goodcitizen");
    cy.get("#password").type("veryoriginalpassword");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/queries");

    cy.get(".notification").contains("welcome goodcitizen!");
  });
});
