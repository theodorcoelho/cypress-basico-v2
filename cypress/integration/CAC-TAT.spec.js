/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

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
        .type('CAMPO TEXTO COM MUITO MAIS TEXTO DO QUE TINHA ANTES',options(delay(0)))
        .should('have.value', 'CAMPO TEXTO COM MUITO MAIS TEXTO DO QUE TINHA ANTES')
        
        cy.get('.button').click()

        cy.get('.success')
        .should('be.visible')
    })
  })
  