describe("Teste de Upload de Arquivo", () => {
  const folderPath = "./cypress/fixtures/";
  const fileNames = [
    "arquivo1.txt",
    "arquivo2.txt",
    "arquivo3.txt",
    "arquivo4.txt",
  ];

  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/upload");
  });

  it("Deve fazer upload de arquivo através do botão choose file", () => {
    cy.get("#file-upload").selectFile(`${folderPath}${fileNames[0]}`);
    cy.get("#file-submit").click();
    cy.get("h3").should("contain.text", "File Uploaded!");
  });

  it("Fazer upload através da área de upload marcada", () => {
    cy.get("#drag-drop-upload").selectFile(`${folderPath}${fileNames[0]}`, {
      action: "drag-drop",
    });
    cy.get(".dz-success-mark span").should("contain.text", "✔");
  });

  it("Fazer upload de uma sequência de arquivos usando botão de upload", () => {
    cy.get("#file-upload").selectFile(
      fileNames.map((name) => `${folderPath}${name}`)
    );
    cy.get("#file-submit").click();
    cy.get("h3").should("contain.text", "File Uploaded!");
  });

  it("Fazer upload de uma sequencia através da área de upload marcada", () => {
    cy.get("#drag-drop-upload").selectFile(
      fileNames.map((name) => `${folderPath}${name}`),
      { action: "drag-drop" }
    );
    cy.get(".dz-success-mark > span")
      .filter(":visible")
      .should("have.length", 4);
  });
});
