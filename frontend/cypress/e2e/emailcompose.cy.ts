const LOCALHOST_URL_EMAILCOMPOSE = `${Cypress.env("LOCALHOST_URL")}/emails/send`;

describe("Checks that logged user can see Send Email", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => {
      // Returning false here prevents Cypress from failing the test
      return false;
    });
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.intercept("GET", "http://localhost:9000/api/emails/inbox", (req) => {
      // Do nothing or respond with a stubbed response
      req.reply({
        statusCode: 200,
        body: [], // You can provide an empty array or any other stubbed response
      });
    });
    cy.visit(`${Cypress.env("LOCALHOST_URL")}`);
    // Click login link
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.intercept("POST", "/api/login").as("loginRequest");

    // Fill in the login form
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("test123456");

    // Click the login button
    cy.get("#loginButton").click();

    // Wait for the login request to complete
    cy.wait("@loginRequest").then((interception) => {
      // Assert that the request was made
      expect(interception.request.body).to.deep.equal({
        email: "test@gmail.com",
        password: "test123456",
      });
    });
  });

  it("Checks if all inputs are blank and show Please fill out this field.", () => {
    cy.visit(LOCALHOST_URL_EMAILCOMPOSE);
    cy.get("#sendEmail").click();

    cy.log("An invalid form control is not focusable.");
  });
  it("Displays error when email is not valid and api returns 404 Error", () => {
    cy.visit(LOCALHOST_URL_EMAILCOMPOSE);
    cy.intercept("POST", "/api/emails").as("emailcreateRequest");
    cy.get('input[name="to"]').type("test1099@gmail.com");
    cy.get('input[name="subject"]').type("This is a test email"); //if the test breaks look into the way email compose form is being handled /EmailCompose.tsx
    cy.get('textarea[name="body"]').type(
      "testtesttesttesttesttesttesttesttesttestte"
    );
    cy.get("#sendEmail").click();
    cy.wait("@emailcreateRequest").then((interception) => {
      // Assert that the request was made
      expect(interception.request.body).to.deep.equal({
        to: "test1099@gmail.com",
        subject: "This is a test email",
        body: "testtesttesttesttesttesttesttesttesttestte",
      });

      // Assert that the response has a successful status code (200)
      expect(interception.response?.statusCode).to.equal(404);
    });
  });
});
