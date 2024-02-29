/*describe("Home Test", () => {
  beforeEach(() => {
    cy.viewport(1200, 800); // Adjust viewport size as needed
    cy.visit("http://localhost:9000/login"); // Assuming '/login' is the route for the login component
  });
  it("displays error when credentials are not valid", () => {
    cy.get('input[name="email"]').type("test@gmail.com"); // good email
    cy.get('input[name="password"]').type("wrongpassword"); // wrong password
    cy.get("#loginButton").click();

    cy.contains("Invalid credentials. Please try again."); // Check for invalida credentials error message
  });
});*/
