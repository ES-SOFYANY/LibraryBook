<template>

  <div id="app">

    <nav-bar></nav-bar>

    <header-page></header-page>

    <router-view></router-view>

    <footer-page></footer-page>

  </div>

</template>

<script>
  import FooterPage from '@/components/FooterPage'
  import NavBar from '@/components/NavBar'
  import HeaderPage from '@/components/HeaderPage'
  import router from './router'

  export default {
    name: 'app',
    router,
    components: {
      'footer-page': FooterPage,
      'nav-bar': NavBar,
      'header-page': HeaderPage
    }
}
</script>

