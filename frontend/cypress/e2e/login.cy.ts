describe("Login Test", () => {
  beforeEach(() => {
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit("http://localhost:9000/login"); // Assuming '/login' is the route for the login component
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

    // You may add assertions here to verify successful login behavior,
    // such as checking for the presence of a success message or redirection to a different page.
  });
});
