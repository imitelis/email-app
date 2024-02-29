const LOCALHOST_URL = Cypress.env("LOCALHOST_URL");

describe("Landing Page tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit(LOCALHOST_URL); // Assuming '/login' is the route for the login component
  });

  it("redirects to the correct pages when links are clicked", () => {
    // Click login link
    cy.contains("Login").click();
    cy.url().should("include", "/login");

    // Go back to landing page
    cy.go("back");

    // Click signup link
    cy.contains("Signup").click();
    cy.url().should("include", "/signup");

    // Go back to landing page
    cy.go("back");

    // Click invite link
    cy.contains("Invite").click();
    cy.url().should("include", "/invite");

    // Go back to landing page
    cy.go("back");

    // Click password link
    cy.contains("Password").click();
    cy.url().should("include", "/password");

    // Go back to landing page
    cy.go("back");

    // Click fake email link
    cy.contains("FakeEmail").click();
    cy.url().should("include", "/"); // Assuming landing page is the base UR
  });
});
