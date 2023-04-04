describe('template spec', () => {
  it('passes', () => {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000')
    // eslint-disable-next-line no-undef
    cy.contains('blogs')
  })
})