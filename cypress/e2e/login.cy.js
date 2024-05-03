describe("Teste de Formulário de Login", () => {
  const username = "tomsmith";
  const password = "SuperSecretPassword!";
  const loginUrl = "https://the-internet.herokuapp.com/login";
  const secureAreaUrl = "https://the-internet.herokuapp.com/secure";

  beforeEach(() => {
    cy.visit(loginUrl);
  });

  it('Deve exibir mensagem de erro ao não informar o "nickname"', () => {
    cy.get('button[type="submit"]').click();
    cy.get(".flash.error").should("contain.text", "Your username is invalid!");
  });

  it("Deve exibir mensagem de erro ao não informar senha", () => {
    cy.get("#username").type(username);
    cy.get('button[type="submit"]').click();
    cy.get(".flash.error").should("contain.text", "Your password is invalid!");
  });

  it("Deve realizar o login com sucesso", () => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", secureAreaUrl);
  });

  it("Mensagem de erro ao informar nickname ou senha incorreto", () => {
    cy.get("#username").type("nome_incorreto");
    cy.get("#password").type("senha_incorreta");
    cy.get('button[type="submit"]').click();
    cy.get(".flash.error").should("contain.text", "Your username is invalid!");
  });

  it("Deve exibir mensagem de erro ao acessar URL de área logada diretamente sem autenticação", () => {
    cy.visit(secureAreaUrl);
    cy.contains("div", "You must login to view the secure area!").should(
      "be.visible"
    );
  });
});
