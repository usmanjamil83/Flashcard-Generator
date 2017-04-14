// npm packages.
var fs = require('fs');
var inquirer = require('inquirer');

// calling the function flashCards.
flashCards();

// creating a function flashCards.
function flashCards(){
	// using if statement to check the user responce.
	if (process.argv[2] === 'basic'){
		// using prompt to get the user input for the questions.
		inquirer.prompt([{
			name: "front",
			message: "Enter the question: "
		},{
			name: "back",
			message: "Enter the answer: " 
		}]).then(function(answer){
			// creating a new object of BasicCard
			var BasicCard = new BasicCard(answer.front, answer.back);
			BasicCard();
		});
	}
	// using else if statement to check the user responce
	else if (process.argv[2] === "cloze"){
		// using prompt to get the user input for the questions.
		inquirer.prompt([{
			name: "text",
			message: "Enter full text:"
		},{
			name: "cloze",
			message: "Enter cloze text:"
		}]).then(function(answer){
			// creating a new object of ClozeCard
			var ClozeCard = new ClozeCard(answer.text, answer.cloze);
			ClozeCard();
		});
	}
	// using else if statement to check the user responce
	else if (process.argv[2] === "show"){
		showthecards();
	}
	else {
		console.log("Type one of these options 'basic' , 'cloze' , 'show' ");
	}
}
// creating a BasicCard constructor
function BasicCard(front, back){
	this.front = front;
	this.back = back;
	this.save = function(){
		// appending the user input into card.txt
		fs.appendFile("card.txt", "front: " + front + " back: " + back , function(err) {
			// catching an error
			if (err) {
				return console.log(err);
			}
			console.log("card.txt was updated!");
		});
	};
}
// creating a ClozeCard constructor
function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.save = function(){
		// appending the user input into card.txt
		fs.appendFile("card.txt", "text: " + text + " cloze: " + cloze , function(err) {
			// catching an error
			if (err) {
				return console.log(err);
			}
			console.log("card.txt was updated!");
		});
	};
}
// using prototype to give new property to ClozeCard
ClozeCard.prototype.partial = function(){
	if(this.text.includes(this.cloze)){
		return this.text.replace(this.cloze, "....");
	}
	else{
		return 'wrong input';
	}
};
// showing all the saved card in card.txt using readFile
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