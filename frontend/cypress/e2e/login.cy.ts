const LOCALHOST_URL_LOGIN = `${Cypress.env("LOCALHOST_URL")}/login`;

describe("Login tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit(LOCALHOST_URL_LOGIN); // Assuming '/login' is the route for the login component
  });

  it("displays error when credentials are not valid", () => {
    cy.get('input[name="email"]').type("test@gmail.com"); // good email
    cy.get('input[name="password"]').type("wrongpassword"); // wrong password
    cy.get("#loginButton").click();

    cy.contains("Invalid credentials. Please try again.").should("be.visible"); // Check for invalida credentials error message
  });

  it("displays error messages for short inputs", () => {
    cy.get('input[name="email"]').type("invalid"); // short email
    cy.get('input[name="password"]').type("short"); // Short password
    cy.get("#loginButton").click();

    cy.contains("Email and password must be at least 8 characters long."); // Check for password error message
  });

  it("displays error message for invalid email", () => {
    cy.get('input[name="email"]').type("invalidemail"); // short email
    cy.get('input[name="password"]').type("validpassword"); // Short password
    cy.get("#loginButton").click();

    cy.contains("Please enter a valid email address."); // Check for password error message
  });

  it("displays error messages for short email", () => {
    cy.get('input[name="email"]').type("invalid"); // short email
    cy.get('input[name="password"]').type("validpassword"); // Short password
    cy.get("#loginButton").click();

    cy.contains("Email must be at least 8 characters long."); // Check for password error message
  });
  it("displays error messages for invalid password", () => {
    cy.get('input[name="email"]').type("validemail@example.com"); // short email
    cy.get('input[name="password"]').type("short"); // Short password
    cy.get("#loginButton").click();

    cy.contains("Password must be at least 8 characters long."); // Check for password error message
  });

  it("submits the form with valid credentials", () => {
    cy.get('input[name="email"]').type("validemail@example.com");
    cy.get('input[name="password"]').type("validpassword");
    cy.get("#loginButton").click();
  });

  it("sends a successful POST request when login button is clicked", () => {
    // Intercept the login request
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

      // Assert that the response has a successful status code (200)
      expect(interception.response?.statusCode).to.equal(200);
    });
  });
});
