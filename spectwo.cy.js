//scenario 1

// cypress/e2e/appointment.cy.js
describe('CURA Healthcare Appointment with Error Handling', () => {
  it('Should make an appointment and handle errors gracefully', () => {
    cy.visit('https://katalon-demo-cura.herokuapp.com/');
    cy.get('#btn-make-appointment').click();

    // Login with demo credentials
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();

    // Fill appointment form
    cy.get('#combo_facility').select('Seoul CURA Healthcare Center');
    cy.get('#chk_hospotal_readmission').check();
    cy.get('[name="programs"]').check('Medicaid');
    
    // Handle date picker
    cy.get('#txt_visit_date').click();
    cy.get('.datepicker-days').contains('td', '30').click();
    
    cy.get('#txt_comment').type('CURA Healthcare Service');
    cy.get('#btn-book-appointment').click();

    // Validate confirmation
    cy.url().should('include', 'appointment.php#summary').then(() => {
      cy.get('#facility').should('contain', 'Seoul CURA Healthcare Center');
      cy.get('#hospital_readmission').should('contain', 'Yes');
      cy.get('#program').should('contain', 'Medicaid');
      cy.get('#visit_date').should('contain', '30');
      cy.get('#comment').should('contain', 'CURA Healthcare Service');
    }).catch((error) => {
      cy.log('Error during validation: ', error);
    });
  });
});
