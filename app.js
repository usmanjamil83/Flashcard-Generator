var fs = require('fs');
var inquirer = require('inquirer');

function BasicCard(front, back){
	this.front = front;
	this.back = bcak;
	this.card = function(){
		fs.appendFile("card.txt", "front: " + front + " back: " + back , function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("card.txt was updated!");

		});
	};
}

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.card = function(){
		fs.appendFile("card.txt", "text: " + text + " cloze: " + cloze , function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("card.txt was updated!");
		});
	};
}
ClozeCard.prototype.partial = function(){
	if(this.text.includes(this.cloze)){
		return this.text.replace(this.cloze, "....");
	}
	else{
		return 'wrong input';
	}
};