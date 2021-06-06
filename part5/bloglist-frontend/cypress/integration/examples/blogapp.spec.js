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

	describe('when logged in', function (){
		const blog = {title: 'random title', author: 'random author', url: 'random url' }
		
		beforeEach( function() {
			cy.get('#Username').type('foking')
			cy.get('#Password').type('random')
			cy.contains('login').click()
			cy.contains('foking logged in successfully')	
		})

		it('a blog can be created', function (){
			cy.get('#Title').type(blog.title)
			cy.get('#Author').type(blog.author)
			cy.get('#Url').type(blog.url)

			cy.contains('create').click()
			cy.contains('random title posted successfully')
			cy.contains('random title random author')
		})
	})
})