var fs = require('fs');
var inquirer = require('inquirer');

flashCards();

function flashCards(){
	if (process.argv[2] === 'basic'){
		inquirer.prompt([{
			name: "front",
			message: "Enter the question: "
		},{
			name: "back",
			message: "Enter the answer: " 
		}]).then(function(answer){
			var BasicCard = new BasicCard(answer.front, answer.back);
			BasicCard();
		});
	}
	else if (process.argv[2] === "cloze"){
		inquirer.prompt([{
			name: "text",
			message: "Enter full text:"
		},{
			name: "cloze",
			message: "Enter cloze text:"
		}]).then(function(answer){
			var ClozeCard = new ClozeCard(answer.text, answer.cloze);
			ClozeCard();
		});
	}
	else if (process.argv[2] === "show"){
		showthecards();
	}
	else {
		console.log("Type one of these options 'basic' , 'cloze' , 'show' ");
	}
}
function BasicCard(front, back){
	this.front = front;
	this.back = back;
	this.save = function(){
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
	this.save = function(){
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
function showthecards() {
	fs.readFile("card.txt", "utf8", function(err, data){
		if (err){
			console.log(err);
		}
		else {
			console.log(data);
		}
	});
}