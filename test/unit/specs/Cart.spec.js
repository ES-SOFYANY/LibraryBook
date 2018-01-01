import Cart from '@/components/Cart'
import Vue from 'vue'
import {mount, mockRouter} from 'vuenit'
import VueResource from 'vue-resource'
Vue.use(VueResource)

describe('Panier.vue', () => {
  let vm
  let config
  const {$router} = mockRouter([{
    path: '/panier',
    name: 'Panier'
  }], '/Panier')
  let livre = {
    'isbn': 'id1',
    'title': 'Henri Potier',
    'price': 35,
    'cover': 'http://exemple.fr/hp0.jpg',
    'synopsis': [
      'description 1', 'description 1', 'description 1'
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
  let offre1 = {
    'offers': [
      {
        'type': 'percentage',
        'value': 4
      },
      {
        'type': 'minus',
        'value': 15
      },
      {
        'type': 'slice',
        'sliceValue': 100,
        'value': 12
      }
    ]
  }
  let offre2 = {
    'offers': [
      {
        'type': 'percentage',
        'value': 50
      },
      {
        'type': 'minus',
        'value': 15
      },
      {
        'type': 'slice',
        'sliceValue': 100,
        'value': 12
      }
    ]
  }
  let offre3 = {
    'offers': [
      {
        'type': 'percentage',
        'value': 4
      },
      {
        'type': 'minus',
        'value': 15
      },
      {
        'type': 'slice',
        'sliceValue': 60,
        'value': 20
      }
    ]
  }

  beforeEach(function () {
    config = {
      inject: { $router },
      stubComponents: true
    }
    vm = mount(Cart, config)
  })

  it('le panier doit être vide ', () => {
    expect(vm.$el.querySelector('h1').textContent.trim()).to.equal('Votre panier est vide')
  })
  it('il y a pas d\'offre commerciale ', () => {
    expect(vm.$el.querySelector('.offreCommercial')).to.be.null
  })

  it('une offre commercial est proposé ', () => {
    sinon.stub(Vue.http, 'get').returnsPromise()
    config.data = {cartBooks: [livre]}
    vm = mount(Cart, config)
    expect(vm.$el.querySelector('.offreCommercial')).to.not.be.null
    Vue.http.get.restore()
  })

  it('vue http doit être appelé ', () => {
    config.data = {cartBooks: [livre]}
    sinon.stub(Vue.http, 'get').returnsPromise()
    vm = mount(Cart, config)
    expect(Vue.http.get.called).to.be.true
    Vue.http.get.restore()
  })

  it('vue http doit être appelé avec l\'url ', () => {
    config.data = {cartBooks: [livre]}
    sinon.stub(Vue.http, 'get').returnsPromise()
    vm = mount(Cart, config)
    expect(Vue.http.get).to.have.been.calledWith('api/books/id1/commercialOffers')
    Vue.http.get.restore()
  })

  it('le total du panier doit être égale à 65 ', () => {
    config.data = {offre: {}, cartBooks: [livre, livre2]}
    const call = sinon.stub(Vue.http, 'get').returnsPromise()
    call.resolves({body: offre1})
    vm = mount(Cart, config)
    expect(vm.$data.offre.sumPriceOfBookCart).to.equal(65)
    Vue.http.get.restore()
  })

  it('l\'offre commerciale doit être égale à 50 ( minus ) ', () => {
    config.data = {cartBooks: [livre, livre2]}
    const call = sinon.stub(Vue.http, 'get').returnsPromise()
    call.resolves({body: offre1})
    vm = mount(Cart, config)
    expect(vm.$data.offre.bestCommercialOffer).to.equal(50)
    Vue.http.get.restore()
  })

  it('l\'offre commerciale doit être égale à 32.5 ( poucentgage ) ', () => {
    config.data = {cartBooks: [livre, livre2]}
    const call = sinon.stub(Vue.http, 'get').returnsPromise()
    call.resolves({body: offre2})
    vm = mount(Cart, config)
    expect(vm.$data.offre.bestCommercialOffer).to.equal(32.5)
    Vue.http.get.restore()
  })

  it('l\'offre commerciale doit être égale à 45 ( slice ) ', () => {
    config.data = {cartBooks: [livre, livre2]}
    const call = sinon.stub(Vue.http, 'get').returnsPromise()
    call.resolves({body: offre3})
    vm = mount(Cart, config)
    expect(vm.$data.offre.bestCommercialOffer).to.equal(45)
    Vue.http.get.restore()
  })
})
