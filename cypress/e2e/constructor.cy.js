describe("creating an order", () => {
  before(() => {
    const email = "04102023@mail.ru";
    const password = "111111";
    cy.intercept("POST", "**/orders").as("postOrder");
    cy.viewport(1400, 1200);
    cy.visit("http://localhost:3000/login");
    cy.get("input[type=email]").type(`${email}{enter}`);
    cy.get("input[type=password]").type(`${password}{enter}`);
  });

  it("drag and drop ingredients and create an order", () => {
    cy.contains("Соберите бургер");
    cy.get("[class^=burger-constructor_section_container__]").as("constructor");
    
    cy.wait(5000);
    cy.get('[data-id="643d69a5c3f7b9001cfa093c"]').trigger('dragstart')
    cy.get('[class^=burger-constructor_section_container__]').trigger('drop')
    cy.get('[data-id="643d69a5c3f7b9001cfa0941"]').trigger('dragstart')
    cy.get('[class^=burger-constructor_section_container__]').trigger('drop')
    cy.get('[data-id="643d69a5c3f7b9001cfa0943"]').trigger('dragstart')
    cy.get('[class^=burger-constructor_section_container__]').trigger('drop')
    cy.get('[data-id="643d69a5c3f7b9001cfa093c"]').trigger('dragstart')
    cy.get('[class^=burger-constructor_section_container__]').trigger('drop')  

    cy.get("button").contains("Оформить заказ").click();
    cy.wait(13000);
    cy.get("[class^=modal_closeModalButton__]").click();
    cy.contains("Перетащите в это поле ингридиенты из меню слева.");
  });
});
