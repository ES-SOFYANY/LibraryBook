<template>

  <div class="product-image-wrapper">
    <div class="single-products">
      <div class="productinfo text-center">
        <img width="255" height="374" :src="book.cover" alt="" />
        <h2 class="price-book">{{book.price}}€</h2>
        <p class="title-book">{{book.title}}</p>
        <a href="#" @click.prevent="addlivreToCart" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Ajouter au panier</a>
      </div>
      <div class="product-overlay">
        <div class="overlay-content">
          <h2>{{book.price}}€</h2>
          <p>{{book.title}}</p>
          <a href="#" @click.prevent="addlivreToCart" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Ajouter au panier</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import ListBooks from '../store/ListBooks'

  export default {
    name: 'Book',
    methods: {
      addlivreToCart () {
        ListBooks.addLivre(this.book)
      }
    },
    props: ['book', 'page']
  }
</script>
