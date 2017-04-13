var fs = require('fs');
var inquirer = require('inquirer');

flashCards()

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

function flashCards(){
	if (process.argv[2] === 'basic'){
		inquirer.prompt([{
			name: "Front:",
			message: "Enter the question: "
		},{
			name: "Back:",
			message: "Enter the answer: " 
		}]).then(function(answer){
			var BasicCard = new BasicCard(answer.front, answer.back);
			BasicCard.card();
		});
	}
	else if (process.argv[2] === "cloze"){
		inquirer.prompt([{
			name: "Text:",
			message: "Enter full text:"
		},{
			name: "Cloze",
			message: "Enter cloze text:"
		}]).then(function(answer){
			var ClozeCard = new ClozeCard(answer.text, answer.cloze);
			ClozeCard.card();
		});
	}
}