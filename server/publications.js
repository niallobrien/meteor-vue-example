Meteor.publish("todos", function (limit) {
  // Simulate slow network response
  Meteor._sleepForMs(2000)
  return Todos.find({}, {limit: limit})
})