/// <reference types="Cypress" />

const text = "Sed a bibendum lacus. Pellentesque in bibendum diam. Aenean ultricies in leo non pretium. Integer eu efficitur dui. Pellentesque hendrerit interdum orci sed maximus. Proin quam quam, ultricies at enim in, tristique tincidunt nibh. Vestibulum dictum mauris quis quam aliquam dapibus. Quisque vitae felis placerat, vulputate ex sed, sagittis lectus. Integer malesuada sapien a libero elementum interdum."

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => { //arrow function, também poderia ser function()
        cy.visit('./src/index.html')
    })
    // é possível usar it.only() para rodar apenas aquele teste em específico
    it('verifica o título da aplicação', function() { // function, poderia ser usada a arrow function () =>
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
        
        cy.clock() 
        cy.contains('Button','Enviar').click()

        cy.get('.success')
          .should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
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

        cy.clock()
        cy.contains('Button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')

    })
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcde')
          .should('have.value','')
    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
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

        cy.get('#phone-checkbox').check()
        cy.clock()
        cy.contains('Button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.contains('Button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit(text)
        cy.get('.success')
          .should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    it('usando contains', function() {
        cy.preencheCamposObrigatorios(text)
        cy.contains('Button','Enviar').click()
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
      //cy.preencheCamposObrigatorios(text)
      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      //cy.preencheCamposObrigatorios(text)
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      //cy.preencheCamposObrigatorios(text)
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

        /* --- minha solução ---
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .each(function($checkbox) {
          cy.wrap($checkbox).check()
          cy.wrap($checkbox).should('be.checked')
        })
      cy.get('input[type="checkbox"]')
        .last()
        .uncheck()
        .should('not.be.checked')
        */
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          console.log($input)
          expect($input.length).to.equal(1)
          expect($input[0].files[0].name).to.equal('example.json')
        })
        
        /*      também funciona se fizer assim:
          .then(input => {
          console.log(input)
          expect(input[0].files[0].name).to.equal('example.json')
        })*/
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })  
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('exampleFile')
      
      cy.get('input[type="file"]#file-upload')
        .selectFile('@exampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    Cypress._.times(5, function() {
      it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
      }) 
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() { // arrow function
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show') // remove o elemento css display:none, fazendo aparecer a mensagem que estava escondida
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide') // faz a mensagem desaparecer novamente
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
    it('preenche a area de texto usando o comando invoke', function() {
      const longText = Cypress._.repeat('0123456789',20)
      cy.get('#open-text-area')
        .invoke('val',longText)
        .should('have.value', longText)
    })
    it('faz uma requisição HTTP aprendido no texto', function() {
      cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.body).contains('CAC TAT')
      })
    })
    it('faz uma requisição HTTP aprendido no vídeo', function() {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
          const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
    })
    it('finding a cat', function() {
      cy.get('#cat').invoke('show')
      cy.get('#title')
        .invoke('text','CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'EU AMO GATOS')
    })
  })
  