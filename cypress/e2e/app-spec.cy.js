describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: "orders.json" })
    cy.visit('http://localhost:3000/')
  })
  
  it('Should render form, orders and header on page load', () => {
    cy.contains('Burrito Builder')
    cy.get('.controlled-form').children().should('have.length', 15)
    cy.get('.orders-container').children().should('have.length', 3)
    cy.get('.order').first().contains('Pat')
    cy.get('.ingredient-list').contains('beans')
    cy.get('.ingredient-list').contains('lettuce')
    cy.get('.ingredient-list').contains('carnitas')
    cy.get('.ingredient-list').contains('queso fresco')
    cy.get('.ingredient-list').contains('jalapeno')
  })

  it('Should be able to fill out form and see order added', () => {
    cy.get('.input-name').type('Rachel')
    cy.get('.beans').click()
    cy.get('.steak').click()
    cy.get('.carnitas').click()
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: "post.json" })
    cy.get('.submit-order').click()
    cy.get('.order').last().contains('Rachel')
    cy.get('.order').last().contains('beans')
    cy.get('.order').last().contains('steak')
    cy.get('.order').last().contains('carnitas')
  })
})