describe("Recipe App E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("opens the recipe modal when Add Recipe button is pressed", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-modal"]').should("be.visible");
  });

  it("populates data in the recipe modal", () => {
    cy.get('[data-testid="add-recipe-button"]').click();
    cy.get('[data-testid="recipe-modal"]').should("be.visible");

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
