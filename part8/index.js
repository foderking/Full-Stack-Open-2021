const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Books = require('./models/Books')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const MONGODB_URI = 'mongodb+srv://foder:king@gql.quotp.mongodb.net/grapgql?retryWrites=true&w=majority'
const JWT_SECRET = 'fw893ra9fy'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

let authors = [
	{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

/*
 *  * Suomi:
 *   * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 *    * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *     *
 *      * English:
 *       * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 *        * However, for simplicity, we will store the author's name in connection with the book
 *        */

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

const typeDefs = gql`
	type Subscription {
		bookAdded: Book!
	}    
	type Book {
		title: String!
		published: Int
		author: Author
		id: ID!
		genres: [String!]
	}
	type Author {
		name: String!
		bookCount: Int
		born: Int
	}
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	
	type Token {
		value: String!
	}

	type Query {
			bookCount: Int!
			authorCount: Int!
			allBooks(author: String, genre: String): [Book!]!
			allAuthors: [Author!]!
			me: User
		}
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createAuthor(
			name: String!
			setBornTo: Int!
		): Author

		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
		`

const resolvers = {
	Query: {
		bookCount: () => Books.collection.countDocuments(),//books.length,

		authorCount: () => Author.collection.countDocuments(),//authors.length,

		allBooks: async(root, args) => {

			if (!args.author && !args.genre) {
				const ans = await Books.find({}).populate('author')// all
				return ans
			}

			let all = books

			if (!args.author ) {
				// return await Books.find({})
				all = all.filter(each => each.author === args.author)
			}
			if (args.genre) {
				const ans  = await Books.find({genres: {"$in": [args.genre]}}).populate('author')
				// console.log(ans)
				return ans
				// all = all.filter(each => each.genres.includes(args.genre))
			}
			return all
		},

		allAuthors: async() => await Author.find({}),//.populate('Author'),//authors,
		me: (root, args, context) => context.currentUser// User.collection.countDocuments()
	},

	Author: {
		bookCount: (root) => books.filter(each => each.author === root.name).length
	},

	Mutation: {
		createUser: (root, args) => {
			try {
				const user = new User({ ...args })
				return user.save()
			}
			catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		createAuthor: (root, args) => {
			try {
				const author = new Author({ ...args })
				return author.save()
			}
			catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError("wrong credentials")
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},

		editAuthor: async (root, args, context) =>
		{
			if (!context) {
				return null
			}
			try {
				const author = await Author.findOne({ name: args.name })

				if (!author) {
					return null
				}

				author.born = args.setBornTo
				return author.save()
			}
			catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},

		addBook: async (root, args, context) =>
		{
			if (!context) {
				return null
			}
			try {
				const book = new Books({ ...args })
				await book.save()
				const ans = await Books.findOne({title:args.title}).populate('author')
				pubsub.publish('BOOK_ADDED', { bookAdded: book })
				return ans
			}
			catch (error) {
				throw new UserInputError(error.message)
			}
		},
	},
	Subscription: {   
		bookAdded: {     
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])   
		}, 
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null   
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)     
			const currentUser = await User.findById(decodedToken.id).populate()     
			return { currentUser }
		}
	}
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
