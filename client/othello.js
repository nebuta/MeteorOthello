Cells = new Meteor.Collection("cells");
Boards = new Meteor.Collection('boards');

Meteor.subscribe('cells');
Meteor.subscribe('boards');
Session.set('board_id','b1');

function map(arr,func){
	ret = new Array();
	for(var i = 0; i < arr.length; i++){
		ret.push(func(arr[i]));
	}
	return ret;
}

Meteor.startup(function () {
});


Template.board.cells = function(){
	//	console.log(Cells.find({board_id:'b1'}));

	return Cells.find();
}

Template.cell_item.piece = function(){
	return {'w':'white','b':'black','n':'none'}[this.piece];
}	

Template.cell_item.style= function(){
	xpos = this.x * 33;
	ypos = this.y * 33;
	style='left: '+xpos+'px; top: '+ypos+'px;';
	return style;
}



Template.cell_item.events = {
	'click span': function(){
		current = Boards.findOne().current_color;
		clicked = Cells.findOne({board_id:'b1',x:this.x,y:this.y});
		if(Boards.findOne().ready && isMyTurn() && clicked.piece == 'n'){
			numflip = checkPiece(clicked.x,clicked.y,true);
			if(numflip > 0){
				current = (current=="b" ? 'w' : 'b');
				Boards.update({},{$set: {current_color: current}});
			}
		}
	}
};

function isMyTurn(){
		current = Boards.findOne().current_color;
		return Session.get('mycolor') == current;
}

function getCurrentColor(){
	current = Boards.findOne().current_color;
	return current;
}


Template.tools.events = {
	'click #reset': function() {
		resetBoard();
	},
	'click #joinblack': function(){
		Boards.update({board_id:'b1'},{$set: {black: true}});
		mycolor = Session.set('mycolor','b');
	},
	'click #joinwhite': function(){
		Boards.update({board_id:'b1'},{$set: {white: true}});
		mycolor = Session.set('mycolor','w');
	}
}

Template.tools.is_myturn = function() {
	return true; //isMyTurn();
}

Template.tools.black = function(){
	return Session.get('mycolor')=='b';
}

Template.tools.white = function(){
	return Session.get('mycolor')=='w';
}

Template.tools.black_disabled = function(){
	return Boards.findOne({board_id:'b1',black:true}) ? 'disabled="disabled"': "";
}

Template.tools.white_disabled = function(){
	return Boards.findOne({board_id:'b1',white:true}) ? 'disabled="disabled"': "";
}


Template.tools.current = function(){
	return getCurrentColor();
}


//Thanks to @tkihita
function checkPiece(x, y, flip) {
	var ret = 0;
	mine = Session.get('mycolor');
	opp = (mine=='b' ? 'w' : 'b');
	for(var dx = -1; dx <= 1; dx++) {
		for(var dy = -1; dy <= 1; dy++) {
			if(dx == 0 && dy == 0) { continue; }
			var nx = x + dx, ny = y + dy, n = 0;
			while(Cells.findOne({board_id:'b1',x:nx,y:ny}).piece == opp) { n++; nx += dx; ny += dy; }
			if(n > 0 && Cells.findOne({board_id:'b1',x:nx,y:ny}).piece == mine) {
				ret += n;
				if(flip) {
					nx = x + dx; ny = y + dy;
					while(Cells.findOne({board_id:'b1',x:nx,y:ny}).piece == opp) {
						Cells.update({board_id:'b1',x:nx,y:ny},{$set: {piece: mine}});
						nx += dx; ny += dy;
					}
					Cells.update({board_id:'b1',x:x,y:y},{$set: {piece: mine}});
				}
			}
		}
	}
	return ret;
};

