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
    },
	
	giveAnswer: function(answer){ //handles the selection and score tracking progression of the user
		if(answer === 1){
			this.userChoice = this.choice1;
			engine.gameState.selectionBoxX = 10;
		}
		else if(answer == 2){
			this.userChoice = this.choice2;
			engine.gameState.selectionBoxX = 10;
		}
		else if(answer === 3){
			this.userChoice = this.choice3;
			engine.gameState.selectionBoxX = engine.w / 2 + 10;
		}
		else if(answer == 4){
			this.userChoice = this.choice4;
			engine.gameState.selectionBoxX = 10;
		}
		engine.gameState.selectionBoxX = 10 + (answer - 1) * (engine.w / 4);
		engine.gameState.selectionBoxY = engine.h - this.bottomCrossY + 10;
		engine.gameState.selectionBoxWidth = (engine.w / 4) - 20;
		engine.gameState.selectionBoxHeight = this.bottomCrossY - 20;
		if(this.userChoice === this.answer){
			engine.gameState.numRight++;
			engine.gameState.message = "You got the right answer";
			engine.gameState.messageColor = "green";
		}
		else{
			engine.gameState.numWrong++;
			engine.gameState.message = "You got the wrong answer";
			engine.gameState.messageColor = "red";
		}
		engine.gameState.isDisplayingMessage = true;
	}
}
