Template.todo.rendered = function () {
  var vm = new Vue({
    el: '#demo',
    data: {
      title: 'todos',
      todos: []
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
      Tracker.autorun(function () {
        this.todos = Todos.find().fetch()
      }.bind(this))
    },
    destroyed: function () {
      this.subscription.stop()
    }
  });
}