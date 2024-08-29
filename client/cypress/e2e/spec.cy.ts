describe("Recipe App E2E Tests", () => {
  beforeEach(() => {
    // Intercept the recipes API call
    // Visit the application
    cy.visit("http://localhost:3000");
    // Wait for the API call to complete
  });

  it("opens the recipe modal when Add Recipe button is pressed", () => {
    // Click the Add Recipe button and ensure the modal is visible
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-modal"]').should("be.visible");
  });

  it("populates data in the recipe modal", () => {
    // Open the recipe modal
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-modal"]').should("be.visible");

    // Fill in the form fields
    cy.get('[data-testid="recipe-title-input"]').type("Test Recipe");
    cy.get('[data-testid="recipe-description-input"]').type("Test Recipe");

    cy.get('[data-testid="recipe-ingredients-input"]').type(
      "Step 1: igre\nStep 2:gregre"
    );
    cy.get('[data-testid="recipe-instructions-input"]').type(
      "Step 1: Do this\nStep 2: Do that"
    );
  });
});
