<template>
<div>
  <div v-if="!cartBooks.length" class="container vide">
    <h1 > Votre panier est vide</h1>
  </div>
  <section v-if="cartBooks.length" id="advertisement">
    <div class="container">
      <div class="offreCommercial">
        <p>La meilleur offre commerciale qui correspond à votre panier est  <span class="promo">{{offre.bestCommercialOffer}}€</span> (Sans la promo  {{offre.sumPriceOfBookCart}}€)</p>
      </div>
    </div>
  </section>
  <section v-if="cartBooks.length" id="cart_items">
    <div class="container">
      <div class="table-responsive cart_info">
        <table class="table table-condensed">
          <thead>
          <tr class="cart_menu">
            <td class="image">Livre</td>
            <td class="description"></td>
            <td class="price">Prix</td>
            <td class="quantity">Quantité</td>
            <td class="total">Totale</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book in cartBooks">
            <td class="cart_product">
              <a href=""><img width="110" height="160" :src="book.cover" alt=""></a>
            </td>
            <td class="cart_description">
              <h4><a href="">{{book.title}}</a></h4>
            </td>
            <td class="cart_price">
              <p>{{book.price}}€</p>
            </td>
            <td class="cart_quantity">
              <div class="cart_quantity_button">
                <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
              </div>
            </td>
            <td class="cart_total">
              <p class="cart_total_price">{{book.price}}€</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>
</template>

<script>

  import ListBooks from '../store/ListBooks'
  import Book from '@/components/Book'
  import _ from 'lodash'

  export default {
    name: 'Cart',
    components: {Book},
    data () {
      return {offre: {}, cartBooks: ListBooks.state.cart}
    },
    mounted () {
      if (!this.cartBooks.length) return
      var ids = _.map(this.cartBooks, 'isbn').toString()
      var url = 'api/books/' + ids + '/commercialOffers'

      this.$http.get(url).then(response => {
        var listOfDifferentCommercialOffers = []
        var sumPriceOfBookCart = _.reduce(this.cartBooks, function (a, b) {
          return a + b.price
        }, 0)

        response.body.offers.forEach(offre => {
          if (offre.type === 'percentage') {
            listOfDifferentCommercialOffers[0] = sumPriceOfBookCart * offre.value / 100
          }
          if (offre.type === 'minus') {
            listOfDifferentCommercialOffers[1] = offre.value
          }
          if (offre.type === 'slice') {
            listOfDifferentCommercialOffers[2] = Math.trunc(sumPriceOfBookCart / offre.sliceValue) * offre.value
          }
        })
        var bestCommercialOffer = sumPriceOfBookCart - Math.max(...listOfDifferentCommercialOffers)
        this.offre = {sumPriceOfBookCart, bestCommercialOffer}
      })
    }
  }
</script>

<style>
  .offreCommercial{
    height: 146px;
    background: #FE980F;
    padding: 50px 0 50px 10px;
  }

  .offreCommercial p{
    font-size: 24px;
    color: white;
    font-weight: bold;
    font-family: cursive;
  }
  .promo{
    background: white;
    color: #FE980F;
    text-shadow: 0px 1px black;
    padding: 8px;
    box-shadow: -2px 6px 19px black;
  }


</style>
