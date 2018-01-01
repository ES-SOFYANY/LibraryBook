import Home from '@/components/Home'
import Vue from 'vue'
import {mount, mockRouter} from 'vuenit'
import VueResource from 'vue-resource'
Vue.use(VueResource)

describe('Home.vue', () => {
  let vm
  let config
  const {$router} = mockRouter([{
    path: '/home',
    name: 'Home'
  }], '/home')
  let livre = {
    'isbn': 'id1',
    'title': 'Henri Potier',
    'price': 35,
    'cover': 'http://exemple.fr/hp0.jpg',
    'synopsis': [
      'description 1: le mot à recherche pour tester la fonction de recherche est #chercheMoi ', 'description 1', 'description 1'
    ]
  }
  let livre2 = {
    'isbn': 'id2',
    'title': 'Henri Potier',
    'price': 30,
    'cover': 'http://exemple.fr/hp0.jpg',
    'synopsis': [
      'description 1', 'description 1', 'description 1'
    ]
  }

  beforeEach(function () {
    config = {
      inject: { $router },
      stubComponents: true
    }
  })

  it('vue http doit être appelé ', () => {
    sinon.stub(Vue.http, 'get').returnsPromise()
    vm = mount(Home, config)
    expect(Vue.http.get.called).to.be.true
    Vue.http.get.restore()
  })

  it('vue http doit être appelé avec l\'url ', () => {
    sinon.stub(Vue.http, 'get').returnsPromise()
    vm = mount(Home, config)
    expect(Vue.http.get).to.have.been.calledWith('api/books')
    Vue.http.get.restore()
  })

  it('le nombre des livre doit être 2 ', () => {
    const call = sinon.stub(Vue.http, 'get').returnsPromise()
    call.resolves({body: [livre, livre2]})
    vm = mount(Home, config)
    expect(vm.$data.state.books.length).to.equal(2)
    Vue.http.get.restore()
  })

  it('le nombre des livre trouvé doit être 1 et son isbn est id1 ', () => {
    config.data = {
      state: {searchInput: '#chercheMoi', books: [livre, livre2]}
    }
    vm = mount(Home, config)
    expect(vm.searchedBooks.length).to.equal(1)
    expect(vm.searchedBooks[0].isbn).to.equal('id1')
  })
})
