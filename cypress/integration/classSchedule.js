describe('Test filter by subject and instructor', function () {

  it('should only show by classes by Liu Xiang', function () {
    cy.visit('http://localhost:3000/');
    cy.get('.search-autocomplete input').click();
    cy.wait(600)
    cy.get('div').contains('Accounting').click();
    cy.get('button').contains('Submit').click();
    cy.wait(900)
    cy.get('.search-instructor-autocomplete input').click();
    cy.wait(300)
    cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
    cy.get('a').should('not.contain', 'Munsif, Vishal');
    cy.get('a').should('not.contain', 'Bazaz, Mohammad');
    cy.get('a').should('contain', 'Liu, Xiang');
  });

});