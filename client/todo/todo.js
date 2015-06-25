Template.todo.onCreated(function() {
  var template = this
  template.limit = new ReactiveVar(5)
  template.loaded = new ReactiveVar(0)

  template.todos = function() {
    return Todos.find({}, {
      limit: template.limit.get()
    })
  }

})


Template.todo.onRendered(function() {
  var template = this
  Vue.use(window['vue-validator'])
  var vm = new Vue({
    el: '#demo',
    data: {
      title: 'todos',
      todos: [],
      newTodo: '',
      limit: template.limit.get(),
      todosSubscription: null,
      subscriptionsReady: false
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
      },
      loadMore: function() {
        template.limit.set(template.limit.get() + 5)
      },
    },
    sync: {
      'todos': function() {
        return Todos.find({}, {limit: template.limit.get()})
      },
      'todosSubscription': function() {
        var limit = template.limit.get()
        var subscription = template.subscribe('todos', limit)

        // if subscription is ready, set limit to new limit
        if (subscription.ready()) {
          template.loaded.set(limit)
          return subscription
        }
      },

      subscriptionsReady: function() {
        return template.subscriptionsReady()
      }
    },
    destroyed: function () {
      this.subscription.stop()
    }
  })

})
