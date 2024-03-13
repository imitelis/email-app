const LOCALHOST_URL_SIGNUP = `${Cypress.env("LOCALHOST_URL")}/signup`;

describe("Signup tests", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => {
      // Returning false here prevents Cypress from failing the test
      return false;
    });
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit(LOCALHOST_URL_SIGNUP); // Assuming '/signup' is the route for the signup component
  });

  it("displays error when email is not valid", () => {
    cy.get('input[name="name"]').type("test user");
    cy.get('input[name="email"]').type("test-test");
    cy.get('input[name="cellphone"]').type("3001234321");
    cy.get('input[name="password"]').type("validpass");
    cy.get('input[name="repeatPassword"]').type("validpass");
    cy.get("#signupButton").click();

    cy.contains("Please enter a valid email address.");
  });

  it("displays error when information is blank", () => {
    cy.get("#signupButton").click();

    cy.contains("Please fill all the required fields*.");
  });

  it("displays error when passwords don't match", () => {
    cy.get('input[name="name"]').type("test user");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="cellphone"]').type("3001234321");
    cy.get('input[name="password"]').type("validpass");
    cy.get('input[name="repeatPassword"]').type("passvalid");
    cy.get("#signupButton").click();

    cy.contains("Passwords do not match.");
  });

  it("displays error when fields are less than 8 characters", () => {
    cy.get('input[name="name"]').type("test");
    cy.get('input[name="email"]').type("test");
    cy.get('input[name="cellphone"]').type("3000");
    cy.get('input[name="password"]').type("pass");
    cy.get('input[name="repeatPassword"]').type("pass");
    cy.get("#signupButton").click();

    cy.contains("All fields must be at least 8 characters long.");
  });
  it("displays error when cellphone is not a number", () => {
    cy.get('input[name="name"]').type("test user");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="cellphone"]').type("asdfghjk");
    cy.get('input[name="password"]').type("passvalid");
    cy.get('input[name="repeatPassword"]').type("passvalid");
    cy.get("#signupButton").click();

    cy.contains("Cellphone must be numbers only.");
  });

  it("sends a successful POST request when signup button is clicked, if user already exist on db, returns a 400", () => {
    // Intercept the login request
    cy.intercept("POST", "/api/signup").as("signupRequest");

    // Fill in the login form
    cy.get('input[name="name"]').type("test user");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="cellphone"]').type("3001234321");
    cy.get('input[name="password"]').type("passvalid");
    cy.get('input[name="repeatPassword"]').type("passvalid");

    cy.get("#signupButton").click();

    // Wait for the login request to complete
    cy.wait("@signupRequest").then((interception) => {
      expect(interception.response?.body.message).to.equal(
        "User already exists",
      );
      // Assert that the request was made
      expect(interception.response?.statusCode).to.equal(400);
    });
  });
});
