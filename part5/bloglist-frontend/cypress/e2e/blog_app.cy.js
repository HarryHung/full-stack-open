describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'test_user',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    const user2 = {
      name: 'Test User2',
      username: 'test_user2',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('input').should('have.length', 2)
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test_user', password: 'password123' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#new-title').type('test title')
      cy.get('#new-author').type('test author')
      cy.get('#new-url').type('http://www.test.com/')
      cy.get('#create-button').click()

      cy.get('.notification')
        .should('contain', 'a new blog test title by test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.blogs')
        .should('contain', 'test title')
        .and('contain', 'test author')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://www.test.com' })

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('Creator can delete a blog', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://www.test.com' })

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.blogs')
        .should('not.contain', 'test title')
        .and('not.contain', 'test author')
    })

    it('Only creator can see delete button', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://www.test.com' })

      cy.contains('view').click()
      cy.contains('remove').should('be.visible')

      cy.login({ username: 'test_user2', password: 'password123' })
      cy.contains('view').click()
      cy.contains('remove').should('not.be.visible')
    })
  })
})