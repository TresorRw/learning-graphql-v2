import { authors, books } from "../Dummy/Data.js";

const resolvers = {
    Query: {
        getAllBooks() {
            return books
        },
        getAllAuthors() {
            return authors
        }
    },
    Author: {
        books: (parent) => {
            return books.filter(bk => bk.authorId === parent.id)
        }
    },
    Book: {
        author: (parent) => authors.find(auth => auth.id === parent.authorId)
    },
    Mutation: {
        createBook: (parent, args) => {
            const newBook = { id: books.length + 1, name: args.name, authorId: args.authorId }
            books.push(newBook)
            return { message: "Your book was created succesfully", data: newBook }
        },
        updateBook: (parent, args) => {
            const check = books.findIndex(bk => bk.id === args.id);
            if (check >= 0) {
                books[check].authorId = args.authorId;
                books[check].name = args.name;
                return { message: `${args.name} is updated!`, data: books[check] }
            } else {
                return { message: "Book ID does not match with any book." }
            }
        },
        deleteBook: (parent, args) => {
            const check = books.findIndex(bk => bk.id === args.id);
            if (check >= 0) {
                books.splice(check, 1);
                return { message: `Deletion succesfully`}
            } else {
                return { message: "Book ID does not match with any book." }
            }
        }
    }
};

export default resolvers