Cypress._.times(5, function() {
  it('testa a página da política de privacidade de forma independente', function() {
    cy.visit('/src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  }) 
})