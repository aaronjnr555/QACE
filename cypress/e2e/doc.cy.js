describe('Login Tests', ()=>{
    it('Valid Login - standard_user', () => {
        cy.visit('/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.wait(2000);
    })

    it('Invalid login - locked_out_user', () => {
        cy.visit('/');
        cy.get('#user-name').type('locked_out_user')
        cy.wait(4000);
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('contain', 'locked out')
        cy.wait(2000);
    });
});

describe('Add to Cart and Checkout', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
    })
  
    it('Valid Add to Cart and Checkout', () => {
        cy.get('.inventory_item').first().contains('Add to cart').click()
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.get('.shopping_cart_link').click()
        cy.contains('Checkout').click()
        cy.get('[data-test=firstName]').type('Daniel')
        cy.get('[data-test=lastName]').type('Chiemezie')
        cy.get('[data-test=postalCode]').type('234')
        cy.get('[data-test=continue]').click()
        cy.get('[data-test=finish]').click()
        cy.contains('Thank you for your order!').should('be.visible')
    })
  
    it('Invalid Checkout - missing info', () => {
      cy.get('.inventory_item').first().contains('Add to cart').click()
      cy.get('.shopping_cart_link').click()
      cy.contains('Checkout').click()
      cy.get('[data-test=continue]').click()
      cy.get('[data-test=error]').should('contain', 'First Name is required')
    })
  })
  
