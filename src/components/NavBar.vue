<template>
  <div class="header-middle">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="logo pull-left">
            <router-link :to="{name:'Home'}" class="active"><img src="../assets/static/img/logo.png"></a></router-link>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="shop-menu pull-right">
            <ul class="nav navbar-nav">
              <li><router-link :to="{name:'Cart'}" ><i class="fa fa-shopping-cart"></i>Panier ( {{nbLivreCart}} )</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ListBooks from '../store/ListBooks'

  export default {
    name: 'NavBar',
    data () {
      return {
        state: ListBooks.state
      }
    },
    computed: {
      nbLivreCart: function () { return this.state.cart.length }
    }
  }
</script>
