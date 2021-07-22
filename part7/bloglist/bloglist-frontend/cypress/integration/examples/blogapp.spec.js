describe('Blog app', function() {
	beforeEach(function() {
		const user = { username: 'foking', name:'king', password:'random' }
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
		const blog = { title: 'random title', author: 'random author', url: 'random url' }

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

	describe('checking ordering', function(){
		const blog1 = { title: 'ritle', author: 'ahor', url: 'rurl' }
		const blog2 = { title: 'ranle', author: 'rathor', url: 'asrl' }
		const blog3 = { title: 'sdfke', author: 'aljfor', url: 'lsrl' }

		beforeEach(function () {
			cy.get('#Username').type('foking')
			cy.get('#Password').type('random')
			cy.contains('login').click()
			cy.contains('foking logged in successfully')

			cy.get('#Title').type(blog1.title)
			cy.get('#Author').type(blog1.author)
			cy.get('#Url').type(blog1.url)
			cy.contains('create').click()

			cy.contains(`${blog1.title} posted successfully`)
			cy.contains('create blog').click()

			cy.get('#Title').type(blog2.title)
			cy.get('#Author').type(blog2.author)
			cy.get('#Url').type(blog2.url)
			cy.contains('create').click()

			cy.contains('posted successfully')
			cy.contains(`${blog2.title} posted successfully`)
			cy.contains('create blog').click()

			cy.get('#Title').type(blog3.title)
			cy.get('#Author').type(blog3.author)
			cy.get('#Url').type(blog3.url)
			cy.contains('create').click()

			cy.contains('posted successfully')
			cy.contains(`${blog3.title} posted successfully`)

			cy.contains(`${blog1.title} ${blog1.author}`).parent().contains('see more').click().parent().contains('like').click()
			cy.contains(`${blog1.title} liked`)

			cy.contains(`${blog3.title} ${blog3.author}`).parent().contains('see more').click().parent().contains('like').click()
			cy.contains(`${blog3.title} liked`)

			cy.contains(`${blog2.title} ${blog2.author}`).parent().contains('see more').click().parent().contains('like').click()
			cy.contains(`${blog2.title} liked`)



			for (let i = 0; i < 4; i++) {
				cy.contains(`${blog3.url}`).parent().contains('like').click()
				cy.contains(`${blog3.title} liked`)
			}

			for (let i = 0; i < 2; i++) {
				cy.contains(`${blog2.url}`).parent().contains('like').click()
				cy.contains(`${blog2.title} liked`)
			}

		})

		it('according to likes', function() {
			cy.get('#showBlog').find('span')
				.then(resp => {
					console.log(resp, 'sf')

					expect(resp[0].innerText).to.equal('5')
					expect(resp[1].innerText).to.equal('3')
					expect(resp[2].innerText).to.equal('1')
				})
		})
	})

})