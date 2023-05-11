const typeDefs = `#graphql
  type Book {
    id: Int!
    name: String!
    authorId: Int!
    author: Author!
  }

  type Author {
    id: Int!
    name: String!
    books: [Book!]!
  }

  type SuccessMessage {
    message: String!
    data: Book
  }
  type GeneralMessage {
  message: String!
  data: Book
  }
  # Queries
  type Query {
    getAllBooks: [Book!]!,
    getAllAuthors: [Author!]!
  }

  # Mutation
  type Mutation {
    createBook(name: String!, authorId: Int!): SuccessMessage!
    updateBook(id: Int!, authorId: Int!, name: String!): GeneralMessage
    deleteBook(id: Int!): GeneralMessage
  }
`;

export default typeDefs