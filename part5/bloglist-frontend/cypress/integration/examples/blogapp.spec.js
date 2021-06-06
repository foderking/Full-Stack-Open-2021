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
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})

	describe('when logged in', function (){
		const blog = {title: 'random title', author: 'random author', url: 'random url' }
		
		beforeEach( function() {
			cy.get('#Username').type('foking')
			cy.get('#Password').type('random')
			cy.contains('login').click()
			cy.contains('foking logged in successfully')	

			cy.get('#Title').type(blog.title)
			cy.get('#Author').type(blog.author)
			cy.get('#Url').type(blog.url)

			cy.contains('create').click()
		})

		it('a blog can be created', function (){
			cy.contains('random title posted successfully')
			cy.contains('random title random author')
		})

		it('the like button works', function () {
			cy.contains('see more').click()
			cy.contains('likes').parent().should('contain', 'likes 0')
			cy.contains('like').parent().find('button').click()
			cy.contains('likes').parent().should('contain', 'likes 1')
		})

		it('blog deletion', function () {
			cy.contains('see more').click()
			cy.contains('remove').click()

			cy.should('not.contain', 'random title random author')
		})
	})

})