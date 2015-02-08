//In this type of problem, the user is presented with one large shape and one small shape, and must
//determine how many of the small shape fit within the large shape.
var HowManyFitProblem = function(x, y)
{	
    this.x = x;
	this.y = y;

	this.minBigWidth = 160;
	this.maxBigHeight = 150;//The dimension limits for the large shape. 

	
	this.maxBigWidth = 320;
	this.maxBigHeight = 300;
	
	
	this.userChoice = 0;
	this.timeBonus = 3000; //how many milliseconds are added to the timer for time mode
	this.timePenalty = 1000; //how many milliseconds are lost when answering incorrectly for time mode
	
	this.choice1 = 0; //these choices also need to be generated like in the identify-angle problems
	this.choice2 = 0;
	this.choice3 = 0;
	this.choice4 = 4;
	this.answer = 4; //needs to actually be calculated depending on the shapes generated
	
	this.crossY = 128; //the top y-position of the cross drawn
	this.bottomCrossY = 96; //the bottom y-position of the cros
	
	this.minDivision = 2;//The small shape can be at most half of the 
	this.maxDivision = 10;//It can't be smaller than a tenth of the size of the large shape.
}

HowManyFitProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillStyle = "black";
		canvas.font = '24px sans-serif';
        canvas.textAlign = 'center';
		canvas.fillText("How many small shapes fit in the large one?", engine.w / 2, 64);
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h - this.bottomCrossY); //3rd vertical line middle
		canvas.fillRect(engine.w / 4, engine.h - this.bottomCrossY, 1, this.bottomCrossY); //2nd vertical line
		canvas.fillRect((engine.w / 4) * 3, engine.h - this.bottomCrossY, 1, this.bottomCrossY); //4th vertical line
		canvas.fillRect(0, engine.h - this.bottomCrossY, 1, this.bottomCrossY); //1st vertical line
		canvas.fillRect(engine.w - 1, engine.h - this.bottomCrossY, 1, this.bottomCrossY); //last vertical line
		canvas.fillRect(0, engine.h - 1, engine.w, 1);
		canvas.fillRect(0, this.crossY, engine.w, 1);
		canvas.fillRect(0, engine.h - this.bottomCrossY, engine.w, 1); //horizontal line
		
		canvas.fillText("#1", 24, engine.h - this.bottomCrossY + 28);
		canvas.fillText("#2", 24 + (engine.w / 4), engine.h - this.bottomCrossY + 28);
		canvas.fillText("#3", 24 + (engine.w / 4) * 2, engine.h - this.bottomCrossY + 28);
		canvas.fillText("#4", 24 + (engine.w / 4) * 3, engine.h - this.bottomCrossY + 28);
    },
	
	giveAnswer: function(answer){ //handles the selection and score tracking progression of the user
		if(answer === 1){
			this.userChoice = this.choice1;
			engine.activeState.selectionBoxX = 10;
		}
		else if(answer == 2){
			this.userChoice = this.choice2;
			engine.activeState.selectionBoxX = 10;
		}
		else if(answer === 3){
			this.userChoice = this.choice3;
			engine.activeState.selectionBoxX = engine.w / 2 + 10;
		}
		else if(answer == 4){
			this.userChoice = this.choice4;
			engine.activeState.selectionBoxX = 10;
		}
		engine.activeState.selectionBoxX = 10 + (answer - 1) * (engine.w / 4);
		engine.activeState.selectionBoxY = engine.h - this.bottomCrossY + 10;
		engine.activeState.selectionBoxWidth = (engine.w / 4) - 20;
		engine.activeState.selectionBoxHeight = this.bottomCrossY - 20;
		if(this.userChoice === this.answer){
			if(engine.activeState.numRight != null){ //this means we're in learning mode
				engine.activeState.numRight++;
			}
			else if(engine.activeState.gameTimer != null){ //this means we're in time mode
				console.log("Before: " + engine.activeState.gameTimer);
				engine.activeState.gameTimer += this.timeBonus;
				console.log("After: " + engine.activeState.gameTimer);
			}
			engine.activeState.message = "You got the right answer";
			engine.activeState.messageColor = "green";
			engine.activeState.correctSound.play();
		}
		else{
			if(engine.activeState.numWrong != null){ //this means we're in learning mode
				engine.activeState.numWrong++;
			}
			else if(engine.activeState.gameTimer != null){ //this means we're in time mode
				engine.activeState.gameTimer -= this.timePenalty;
			}
			engine.activeState.message = "You got the wrong answer";
			engine.activeState.messageColor = "red";
			engine.activeState.incorrectSound.play();
			engine.activeState.isScreenShaking = true;
		}
		engine.activeState.isDisplayingMessage = true;
	}
}
