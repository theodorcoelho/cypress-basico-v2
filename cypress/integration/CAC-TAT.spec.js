/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    it('Verifica o título da aplicação', function() {
        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

        cy.get('#firstName')
        .should('be.visible')
        .type('Theodor')
        .should('have.value', 'Theodor')

        cy.get('#lastName')
        .should('be.visible')
        .type('Coelho')
        .should('have.value','Coelho')
        
        cy.get('#email')
        .should('be.visible')
        .type('theodorfcoelho@gmail.com')
        .should('have.value', 'theodorfcoelho@gmail.com')

        cy.get('#open-text-area')
        .should('be.visible')
        .type('CAMPO TEXTO')
        .should('have.value', 'CAMPO TEXTO')

 
        
        cy.get('.button').click()
    })
  })
  