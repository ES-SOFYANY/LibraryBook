import Vue from 'vue'
import FooterPage from '@/components/FooterPage'

describe('FooterPage.vue', () => {
  let vm
  beforeEach(function () {
    const Constructor = Vue.extend(FooterPage)
    vm = new Constructor().$mount()
  })

  it('Le footer doit contenir le nom Abdellah comme étant le developpeur de l\'appli', () => {
    expect(vm.$el.querySelector('div.row p span').textContent)
      .to.equal('Abdellah')
  })
})
