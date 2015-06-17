Template.todo.rendered = function () {
  Vue.use(window['vue-validator']);
  var vm = new Vue({
    el: '#demo',
    data: {
      title: 'todos',
      todos: [],
      newTodo: ''
    },
    methods: {
      addTodo: function (e) {
        e.preventDefault()
        if (this.newTodo.trim()) {
          Meteor.call('addTodo', this.newTodo)
          this.newTodo = ''
        }
      },
      removeTodo: function (id) {
        Meteor.call('removeTodo', id)
      }
    },
    created: function () {
      this.subscription = Meteor.subscribe('todos')
    },
    sync: {
      'todos': function() {
        return Todos.find();
      }
    },
    destroyed: function () {
      this.subscription.stop()
    }
  });
}