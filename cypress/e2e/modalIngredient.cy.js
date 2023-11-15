describe("open modal with ingredient", () => {
  before(() => {
    cy.viewport(1400, 1200);
    cy.visit("http://localhost:3000");
  });

  it("open modal with ingredient", () => {
    cy.get('[data-id="643d69a5c3f7b9001cfa0943"]').first().click();
    cy.contains("Детали ингредиента");
    cy.wait(3000);
    cy.get("[class^=modal_closeModalButton__]").click();
    cy.contains("Детали ингредиента").should("not.exist");
    cy.wait(1000);
    cy.get('[data-id="643d69a5c3f7b9001cfa093c"]').first().click();
    cy.contains("Детали ингредиента");
    cy.wait(3000);
    cy.get("[class^=modal_closeModalButton__]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});
