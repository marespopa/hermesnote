describe("Homepage spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Loads homepage correctly", () => {
    // Navigation
    cy.get("header").should("be.visible");
    cy.get("header img[alt='Hermes Notes']").should("be.visible");
    cy.get("header nav ul li").contains("Home").should("be.visible");
    cy.get("header nav ul li").contains("Learn Markdown").should("be.visible");
    cy.get("header nav ul li").contains("Pricing").should("be.visible");
    cy.get("header nav ul li").contains("App").should("be.visible");

    // Theme Toggle
    cy.get("html").should("have.class", "dark");
    cy.get("header [data-testid='ThemeSwitcher']").click();
    cy.get("html").should("not.have.class", "dark");
    cy.get("header [data-testid='ThemeSwitcher']").click();
    cy.get("html").should("have.class", "dark");

    // It has CTA button
    cy.contains("Try Hermes Notes").should("be.visible");

    // It has sfeatures section
    cy.scrollTo(0, 500);
    cy.get('[data-testid="Features"]');
    cy.get('[data-testid="FeaturesList"] div')
      .contains("Create and Edit .md Files")
      .should("be.visible");

    cy.get('[data-testid="FeaturesList"] div')
      .contains("Frontmatter Support")
      .should("be.visible");

    cy.get('[data-testid="FeaturesList"] div')
      .contains("Effortless PDF Exporting")
      .should("be.visible");
  });
});
