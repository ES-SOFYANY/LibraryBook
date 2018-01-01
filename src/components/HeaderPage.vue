<template>
  <header>
   <div class="header-bottom">
    <div class="container">
      <div class="row">
        <div class="col-sm-9">
          <div class="mainmenu pull-left">
            <ul class="nav navbar-nav collapse navbar-collapse">
              <li><router-link :to="{name:'Home'}" >Accueil</router-link></li>
              <li class="dropdown"><router-link :to="{name:'Cart'}" >Mon panier</i></router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="search_box pull-right">
            <input type="text" v-if="this.$route.name == 'Home'" id="SerachInput" v-model="search" placeholder="Search"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </header>
</template>

<script>
  import ListBooks from '../store/ListBooks'

  export default {
    name: 'HeaderPage',
    data () {
      return {
        search: '',
        state: ListBooks.state
      }
    },
    watch: {
      search: function () {
        this.state.searchInput = this.search
      }
    }
  }
</script>
