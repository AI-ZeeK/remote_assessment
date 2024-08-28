import React from "react";
import RecipeModal from "./RecipeModal";

describe("<RecipeModal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RecipeModal />);
  });
});
