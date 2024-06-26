/// <reference types="Cypress" />

const text = "Sed a bibendum lacus. Pellentesque in bibendum diam. Aenean ultricies in leo non pretium. Integer eu efficitur dui. Pellentesque hendrerit interdum orci sed maximus. Proin quam quam, ultricies at enim in, tristique tincidunt nibh. Vestibulum dictum mauris quis quam aliquam dapibus. Quisque vitae felis placerat, vulputate ex sed, sagittis lectus. Integer malesuada sapien a libero elementum interdum."

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    // é possível usar it.only() para rodar apenas aquele teste em específico
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName')
          .should('be.visible')
          .type('Theodor',{delay:0})
          .should('have.value', 'Theodor')

        cy.get('#lastName')
          .should('be.visible')
          .type('Coelho',{delay:0})
          .should('have.value','Coelho')
        
        cy.get('#email')
          .should('be.visible')
          .type('theodorfcoelho@gmail.com',{delay:0})
          .should('have.value', 'theodorfcoelho@gmail.com')

        cy.get('#open-text-area')
          .should('be.visible')
         .type(text,{delay:0})
         .should('have.value', text)
          
        cy.contains('Button','Enviar').click()

        cy.get('.success')
          .should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName')
          .should('be.visible')
          .type('Theodor',{delay:0})
          .should('have.value', 'Theodor')
        cy.get('#lastName')
          .should('be.visible')
          .type('Lupin',{delay:0})
          .should('have.value','Lupin')
        cy.get('#email')
          .should('be.visible')
          .type('theodorfcoelhogmail.com',{delay:0})
          .should('have.value','theodorfcoelhogmail.com')
        cy.get('#open-text-area')
          .should('be.visible')
          .type(text,{delay:0})
          .should('have.value',text)

        cy.contains('Button','Enviar').click()

        cy.get('.error').should('be.visible')

    })
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcde')
          .should('have.value','')
    })


    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
          .should('be.visible')
          .type('Theodor',{delay:0})
          .should('have.value', 'Theodor')

        cy.get('#lastName')
          .should('be.visible')
          .type('Lupin',{delay:0})
          .should('have.value','Lupin')
        
        cy.get('#email')
          .should('be.visible')
          .type('theodorfcoelho@gmail.com',{delay:0})
          .should('have.value','theodorfcoelho@gmail.com')

        cy.get('#open-text-area')
          .should('be.visible')
          .type(text,{delay:0})
          .should('have.value',text)

        cy.get('#phone-checkbox').click()
        cy.contains('Button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .should('be.visible')
        .type('Theodor',{delay:0})
        .should('have.value', 'Theodor')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .should('be.visible')
        .type('Lupin',{delay:0})
        .should('have.value','Lupin')
        .clear()
        .should('have.value','')
        
        cy.get('#email')
        .should('be.visible')
        .type('theodorfcoelho@gmail.com',{delay:0})
        .should('have.value','theodorfcoelho@gmail.com')
        .clear()
        .should('have.value','')

        cy.get('#phone')
        .should('be.visible')
        .type('48988402322',{delay:0})
        .clear()
        .should('have.value','')

        cy.get('#open-text-area')
        .should('be.visible')
        .type(text,{delay:0})
        .should('have.value',text)
        .clear()       
        .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('Button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit(text)
        
        cy.get('.success')
          .should('be.visible')
    })
    it('usando contains', function() {
        cy.preencheCamposObrigatorios(text)

        cy.contains('Button','Enviar').click()
    })

  })
  