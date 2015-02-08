//In this type of problem, the user is presented with one target shape and three other shapes,
//Only one of which has the same perimeter as the target shape. The user must choose this shape.
var MatchPerimeterProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
	this.crossY = 128; //the top y-position of the cross drawn
	
	this.instructionsX = 0; //the coordinates of the message "Match the Areas!"
	this.instructionsY = 0;
	
	this.choice1 = 1; //these should be generated
	this.choice2 = 2;
	this.choice3 = 3;
	
	this.userChoice = 0;
	
	this.targetPerimeter = 1; //this should be generated
}

MatchPerimeterProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillStyle = "black";
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
		
        canvas.font = '24px sans-serif';
        canvas.textAlign = 'center';
		canvas.fillText("Find the shape with the same perimeter!", engine.w / 2, 64);
	
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
    },
	
	giveAnswer: function(answer){ //handles the selection and score tracking progression of the user
		if(answer === 1){
			this.userChoice = this.choice1;
			engine.gameState.selectionBoxX = 10;
			engine.gameState.selectionBoxY = this.crossY + 10;
		}
		else if(answer == 2){
			this.userChoice = this.choice2;
			engine.gameState.selectionBoxX = 10;
			engine.gameState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		else if(answer === 3){
			this.userChoice = this.choice3;
			engine.gameState.selectionBoxX = engine.w / 2 + 10;
			engine.gameState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		else if(answer === 4){
			return; //perimeter match problems do not have a 4th option
		}
		engine.gameState.selectionBoxWidth = engine.w / 2 - 32;
		engine.gameState.selectionBoxHeight = (engine.h - engine.gameState.currentProblem.crossY) / 2 - 32;
		if(this.userChoice !== 0){
			if(this.userChoice === this.targetPerimeter){
				engine.gameState.numRight++;
				engine.gameState.message = "You got the right answer";
				engine.gameState.messageColor = "green";
				engine.gameState.correctSound.play();
			}
			else{
				engine.gameState.numWrong++;
				engine.gameState.message = "You got the wrong answer";
				engine.gameState.messageColor = "red";
				engine.gameState.incorrectSound.play();
			}
		}
		engine.gameState.isDisplayingMessage = true;
	}
}
