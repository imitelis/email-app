describe("Checks that logged user can see his Inbox and search bar works", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => {
      // Returning false here prevents Cypress from failing the test
      return false;
    });
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit(`${Cypress.env("LOCALHOST_URL")}`);
    // Click login link
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.intercept("POST", "/api/login").as("loginRequest");

    // Fill in the login form
    cy.get('input[name="email"]').type("dsaavedra@unal.edu.co");
    cy.get('input[name="password"]').type("darwinito218");

    // Click the login button
    cy.get("#loginButton").click();

    // Wait for the login request to complete
    cy.wait("@loginRequest").then((interception) => {
      // Assert that the request was made
      expect(interception.request.body).to.deep.equal({
        email: "dsaavedra@unal.edu.co",
        password: "darwinito218",
      });
    });
  });

  it("Checks if search bar works", () => {
    cy.url().should("include", "/emails");
    cy.get('input[name="search"]').type("My first email here");
    // cy.contains("My first email here");
  });
});
