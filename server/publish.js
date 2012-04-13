// server/publish.js

// Cells -- {board_id: String, x: Int, y: Int, piece: String}	piece: 'b','w','n'
Cells = new Meteor.Collection("cells");

// Publish complete set of lists to all clients.
Meteor.publish('cells', function () {
  return Cells.find();
});


// Boards -- {name: String,
//           playing: Boolean,
//           board_id: String}

Boards = new Meteor.Collection("boards");

// Publish all items for requested list_id.
Meteor.publish('boards', function () {
  return Boards.find();
});


