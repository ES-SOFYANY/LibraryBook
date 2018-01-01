import _ from 'lodash'

class ListBooks {

  constructor () {
    this.state = {
      books: [],
      cart: [],
      searchInput: ''
    }
  }

  fillListBooks (books) {
    this.state.books = books
  }
 // à améliorer pour ne pas dupliquer le meme article dans le panier
  addLivre (book) {
    this.state.cart.push(_.clone(book))
  }
  clearCart () {
    this.state.cart = []
  }

}

export default new ListBooks()
