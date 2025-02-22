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

})