<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="features_items">
          <h2 class="title text-center">Les derniers livres</h2>
          <div v-for="book in searchedBooks" class="col-sm-4">
            <Book page="home" :book="book"></Book>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

  import Book from '@/components/Book'
  import ListBooks from '../store/ListBooks'
  import _ from 'lodash'

  export default {
    name: 'Home',
    components: {Book},
    data () {
      return {
        state: ListBooks.state
      }
    },
    computed: {
      searchedBooks: function () {
        return this.state.books.filter((book) => {
          return this.checkIfSearchInputexistInAttributsOfBook(book)
        })
      }
    },
    methods: {
      ckeckIfStringContainsSearchInput: function (value) {
        return value.toUpperCase().includes(this.state.searchInput.toUpperCase())
      },
      checkIfSearchInputexistInAttributsOfBook: function (object) {
        return _.some(_.values(object), attribut => {
          if (typeof attribut === 'object') {
            return this.checkIfSearchInputexistInAttributsOfBook(attribut)
          } else if (typeof attribut === 'string') {
            return this.ckeckIfStringContainsSearchInput(attribut)
          }
        })
      }
    },

    mounted () {
      if (this.state.books.length > 0) return
      this.$http.get('api/books').then(response => {
        ListBooks.fillListBooks(response.body)
      })
    }
  }
</script>
