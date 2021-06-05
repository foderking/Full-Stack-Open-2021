describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/reset')
    cy.visit('http://localhost:3000')
  })
	
	it('login form is shown', function() {
		cy.contains('Username')
		cy.contains('Password')
		cy.contains('login')
	})
  // it('front page can be opened', function() {
	// 	cy.get('#Username').type('root')
	// 	cy.get('#Password').type('sekret')
  //   cy.contains('login').click()
	// 	cy.contains('logged in successfully')	
  // })
})