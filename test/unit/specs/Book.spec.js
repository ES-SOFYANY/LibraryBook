import Book from '@/components/Book'
import {mount, mockRouter} from 'vuenit'
import ListBooks from '@/store/ListBooks'

describe('Book.vue', () => {
  let vm
  let config
  const {$router} = mockRouter([{
    path: '/home',
    name: 'Home'
  }], '/home')
  let book = {
    'isbn': 'id1',
    'title': 'Henri Potier',
    'price': 35,
    'cover': 'http://exemple.fr/hp0.jpg',
    'synopsis': [
      'description 1', 'description 1', 'description 1'
    ]
  }
  beforeEach(function () {
    config = {
      inject: { $router },
      stubComponents: true,
      props: { book: book, page: 'Home' }
    }
    vm = mount(Book, config)
  })

  after(function () {
    ListBooks.clearCart()
  })

  it('Le livre du composant Book doit être celui passé en attribut props  ', () => {
    expect(vm.book).to.equal(book)
  })

  it('La page doit être home ', () => {
    expect(vm.page).to.equal('Home')
  })
  it('le prix du livre doit être 35€ ', () => {
    expect(vm.$el.querySelector('.price-book').textContent.trim()).to.equal('35€')
  })

  it('le titre du livre doit être "Henri Potier" ', () => {
    expect(vm.$el.querySelector('.title-book').textContent.trim()).to.equal('Henri Potier')
  })

  it('la methode addlivreToCart doit être appelé après avoir cliqué sur le bouton" ', () => {
    sinon.spy(vm, 'addlivreToCart')
    const link = vm.$el.querySelector('div.productinfo a')
    link.click()
    expect(vm.addlivreToCart.called).to.be.true
  })

  it('la methode addLivre du store ListBooks  doit être appelé après avoir cliqué sur le bouton Ajouter au panier" ', () => {
    sinon.spy(ListBooks, 'addLivre')
    const link = vm.$el.querySelector('div.productinfo a')
    link.click()
    expect(ListBooks.addLivre.calledWith(book)).to.be.true
  })
})
