describe('drag and drop test', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  const dragAndDrop = (index) => {
    cy.get('[data-test="ingredient"]').eq(index).trigger('dragstart');
    cy.get('[data-test="dropTarget"]').trigger('drop');
  };
  it('drag and drop add bun', function () {
    dragAndDrop(0);
    cy.get('[data-test="container-bun"]')
      .children()
      .should('have.length', 2);
  });
  it('drag and drop new bun', function () {
    dragAndDrop(1);
    cy.get('[data-test="container-bun"]')
      .children()
      .should('have.length', 2);
  });
  it('drag and drop add full set of ingredients', function () {
    dragAndDrop(4);
    cy.get('[data-test="container-bun"]')
      .children()
      .should('have.length', 2);
    cy.get('[data-test="container"]').children().should('have.length', 1);
    dragAndDrop(13);
    dragAndDrop(6);
    cy.get('[data-test="container"]').children().should('have.length', 3);
    cy.get('[data-test="burger-price"]').contains('7379');
  });
});