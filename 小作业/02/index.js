 //创建Vue实例,得到 ViewModel
 const app = new Vue({
  el: '#app',
  data: {
    message: '你好啊',
    books: [
      {
        id: 1,
        name: '斗破苍穹',
        time: '2012-10-22',
        price: '100.00',
        count: 0
      },
      {
        id: 2,
        name: '逆天邪神',
        time: '2012-11-22',
        price: '180.00',
        count: 0
      },
      {
        id: 3,
        name: '剑来',
        time: '2018-2-22',
        price: '170.00',
        count: 0
      },
      {
        id: 4,
        name: '雪中悍刀行',
        time: '2015-04-5',
        price: '55.00',
        count: 0
      },
     
    ],
    active: true,
  },
  methods: {
    increment (index) {
      return this.books[index].count++;
    },
    decrement (index) {
      return this.books[index].count--;
    },
    deleteLine (index) {
      return this.books.splice(index,1)
    },
    getState () {
      return this.books.length > 0
    }
  },
  computed: {
   getTotalPrice () {
     return this.books.map((book) => book.price*book.count).reduce((total,num) => total + num)
   }
  },
  filters: {
    showPrice(value) {
      return '￥' + value
    }
  }
 });