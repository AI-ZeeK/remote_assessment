describe("Recipe App E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Adjust this URL to match your app's address
  });

  it("mounts the app and fetches data from the server", () => {
    cy.get('[data-testid="recipe-list"]').should("exist");
    cy.get('[data-testid="recipe-item"]').should("have.length.greaterThan", 0);
  });

  it("opens the recipe modal when Add Recipe button is pressed", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-modal"]').should("be.visible");
  });

  it("populates data in the recipe modal", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-name-input"]').type("Test Recipe");
    cy.get('[data-testid="recipe-ingredients-input"]').type(
      "Ingredient 1, Ingredient 2"
    );
    cy.get('[data-testid="recipe-instructions-input"]').type(
      "Step 1: Do this\nStep 2: Do that"
    );
  });

  it("uploads a file and adds the URL to the recipe", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="file-input"]').selectFile(
      "cypress/fixtures/test-image.jpg"
    );
    cy.get('[data-testid="file-upload-status"]').should(
      "contain",
      "File uploaded successfully"
    );
    cy.get('[data-testid="recipe-image-url"]').should("not.be.empty");
  });

  it("creates a new recipe with uploaded image", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-name-input"]').type("New Test Recipe");
    cy.get('[data-testid="recipe-ingredients-input"]').type(
      "New Ingredient 1, New Ingredient 2"
    );
    cy.get('[data-testid="recipe-instructions-input"]').type(
      "New Step 1: Do this\nNew Step 2: Do that"
    );
    cy.get('[data-testid="file-input"]').selectFile("test-image.jpg");
    cy.get('[data-testid="submit-recipe-button"]').click();

    // Check if the new recipe appears in the list
    cy.get('[data-testid="recipe-item"]').should("contain", "New Test Recipe");
  });
});
