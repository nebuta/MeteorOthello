var stopHandle = null;
function resetBoard(){
			Cells.remove({});
			for(var x = 0; x < 8; x++){
				for(var y = 0; y < 8; y++){
					Cells.insert({board_id: 'b1',x:x,y:y,piece:'n'});
				}	
			}
			Cells.update({board_id:'b1',x:3,y:3},{$set: {piece: 'b'}});
			Cells.update({board_id:'b1',x:4,y:3},{$set: {piece: 'w'}});
			Cells.update({board_id:'b1',x:3,y:4},{$set: {piece: 'w'}});
			Cells.update({board_id:'b1',x:4,y:4},{$set: {piece: 'b'}});
			if(stopHandle)
				stopHandle.stop();
			stopHandle = Boards.find({black: true, white: true}).observe({
				added: function(){
						Boards.update({},{$set: {ready: true}});
				 }
			});
}


