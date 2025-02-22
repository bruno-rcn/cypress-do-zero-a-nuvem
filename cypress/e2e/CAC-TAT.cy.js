describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  });
  
  it('Aula 2 Ex 1: Preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('abcdefghiklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Noberto')
    cy.get('#email').type('bruno@noberto.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Aula 2 Ex 2: Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Noberto')
    cy.get('#email').type('bruno@noberto,com')
    cy.get('#open-text-area').type('teste do campo de email')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('Aula 2 Ex 3: Campo telefone fica vazio ao adicionar valor nao numerico', () => {
    cy.get('#phone').type('abc').should('have.value', '')
  });

  it('Aula 2 Ex 4: Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Noberto')
    cy.get('#email').type('bruno@noberto.com')
    cy.get('#open-text-area').type('teste do campo de telefone')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('Aula 2 Ex 5: Preencher e limpar os campos nome, sobrenome, email e telefone', () => {
    // encadeamento
    cy.get('#firstName')
      .type('Bruno')
      .should('have.value', 'Bruno')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName').type('Noberto').as('cmpSobrenome') 
    cy.get('#email').type('bruno@noberto.com').as('cmpEmail') 
    cy.get('#phone').type('964739876').as('cmpTelefone') 

    cy.get('@cmpSobrenome').should('have.value', 'Noberto')
    cy.get('@cmpEmail').should('have.value', 'bruno@noberto.com')
    cy.get('@cmpTelefone').should('have.value', '964739876')

    cy.get('@cmpSobrenome').clear().should('have.value', '')
    cy.get('@cmpEmail').clear().should('have.value', '')
    cy.get('@cmpTelefone').clear().should('have.value', '')
  });

  it('Aula 2 Ex 6: Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible')
  });

  it('Aula 2 Ex 7: Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Bruno', 'Ricardo', 'bruno@ricardo.com', 'Teste de comandos customizados')
    cy.get('.success').should('be.visible')
  });

  it('Aula 3 Ex 1: Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  });

  it('Aula 3 Ex 2: Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  });

  it('Aula 3 Ex 3: Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  });

  it('Aula 4 Ex 1: Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[name="atendimento-tat"]').check().should('be.checked')
    // ou cy.get('input[type="radio"][value="feedback"]').check()
  });

  it('Aula 4 Ex 2: Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
            .should('be.checked')
      })
  });

  it('Aula 5 Ex 1: marca ambos checkboxes, depois desmarca o último', () => {
    //cy.get('#email-checkbox').check().should('be.checked')
    //cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('be.not.checked')
  });

  it('Aula 5 Ex 2: Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    cy.fillMandatoryFieldsAndSubmit('Bruno', 'Ricardo', 'bruno@ricardo.com', 'Teste de comandos customizados')
    cy.get('.error').should('be.visible')
  });

  it('Aula 6 Ex 1: Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
        .should(input => {
          //console.log(input)
          expect(input[0].files[0].name).to.equal('example.json')
        })
  });

  it('Aula 6 Ex 2: Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('Aula 6 Ex 3: Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile', {action: 'drag-drop'})
      .should(input => {
        //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

})