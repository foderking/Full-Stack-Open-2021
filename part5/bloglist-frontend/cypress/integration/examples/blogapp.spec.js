describe('Blog app', function() {
  beforeEach(function() {
		const user = {username: 'foking', name:'king', password:'random' }
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
	
	it('login form is shown', function() {
		cy.contains('Username')
		cy.contains('Password')
		cy.contains('login')
	})

	describe('Log in', function(){
		it('success with correct credentials', function() {
			cy.get('#Username').type('foking')
			cy.get('#Password').type('random')
			cy.contains('login').click()
			cy.contains('foking logged in successfully')	
		})
		it('failure with wrong credentials', function() {
			cy.get('#Username').type('fking')
			cy.get('#Password').type('random')
			cy.contains('login').click()
			cy.get('.error').contains('invalid username or password')
		})
	})
})