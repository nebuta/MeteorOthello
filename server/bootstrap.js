// server/bootstrap.js

  Meteor.startup(function () {
    // code to run on server at startup
	//	if(Cells.find().count() === 0){
			Boards.remove({});		
			Boards.insert({name:'Room 1', ready: false, board_id: 'b1', current_color: 'b',black:false,white:false});
			resetBoard();
//		}
  });


