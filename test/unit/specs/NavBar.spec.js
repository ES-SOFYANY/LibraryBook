import NavBar from '@/components/NavBar'
import {mount, mockRouter} from 'vuenit'

describe('NaveBar.vue', () => {
  let vm
  let config
  const {$router} = mockRouter([{
    path: '/home',
    name: 'Home'
  }], '/home')

  beforeEach(function () {
    config = {
      inject: { $router },
      stubComponents: true,
      data: {
        state: {
          cart: ['livre1', 'livre2', 'livre3']
        }
      }
    }
    vm = mount(NavBar, config)
  })

  it('le nombre de livre dans le panier doit être 3 ', () => {
    expect(vm.nbLivreCart).to.equal(3)
    expect(vm.$el.querySelector('ul.nav li').textContent.trim()).to.equal('Panier ( 3 )')
  })
})
