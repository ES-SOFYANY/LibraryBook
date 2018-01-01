import HeaderPage from '@/components/HeaderPage'
import {mount, mockRouter} from 'vuenit'

describe('HeaderPage.vue', () => {
  let vm
  let config
  const {$router} = mockRouter([{
    path: '/home',
    name: 'Home'
  }], '/home')
  beforeEach(function () {
    config = {
      inject: { $router },
      stubComponents: true
    }
    vm = mount(HeaderPage, config)
  })
  it('la variable de recherche doit être vide à l\'instantiation du composant ', () => {
    expect(vm.$el.querySelector('#SerachInput').value).to.be.empty
    expect(vm.$data.search).to.be.empty
  })

  it('SerachInput est egale à Exemple ', () => {
    config.data = {
      search: 'Exemple'
    }
    vm = mount(HeaderPage, config)
    expect(vm.$el.querySelector('#SerachInput').value).to.equal('Exemple')
  })
})
