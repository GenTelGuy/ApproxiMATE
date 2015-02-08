//In this type of problem, the user is presented with one large shape and one small shape, and must
//determine how many of the small shape fit within the large shape.
var HowManyFitProblem = function(x, y)
{	
    this.x = x;
	this.y = y;

	this.minBigWidth = 160;
	this.minBigHeight = 150;//The dimension limits for the large shape. 

	
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
	
	this.leftBoxCenterX = 200;//The positions of the box centers
	this.leftBoxCenterY = 316;
	
	this.rightBoxCenterX = 600;
	this.rightBoxCenterY = 316;
	
	this.minDivision = 2;//The small shape can be at most half of the 
	this.maxDivision = 10;//It can't be smaller than a tenth of the size of the large shape.
	this.currentDivision = chooseValueBetween( this.minDivision, this.maxDivision);
	
	
	this.bigShapeType = "";//What kind of shape the large shape is
	this.widthValue = chooseValueBetween(this.minBigWidth, this.maxBigWidth);
	console.log("Width: " + this.widthValue);
	this.heightValue = chooseValueBetween(this.minBigHeight, this.maxBigHeight);
	console.log( "Height: " + this.heightValue);
	this.area = this.widthValue * this.heightValue;
	
	
	this.comparisonShapeArea = this.area/this.currentDivision;

	
	//choose between rectangle and triangle for the right side
	switch(chooseValueBetween(1,2)){
	
		case 1://Rectangle
			this.bigShapeType = "Rectangle";
			this.targetShape = new Rectangle( this.widthValue, this.heightValue, this.rightBoxCenterX, this.rightBoxCenterY );
			this.area = this.widthValue * this.heightValue;
			this.comparisonShapeArea = this.area/this.currentDivision;
			
			
			break;
		case 2://Triangle
		
			this.bigShapeType = "Triangle";
			this.targetShape = new Triangle( this.widthValue, this.heightValue, this.rightBoxCenterX, this.rightBoxCenterY );
			this.area = this.widthValue * this.heightValue / 2;
			this.comparisonShapeArea = this.area/this.currentDivision;
		
			break;
			
		default:
			//Nothing, this case is not possible
			
			
	}
			
	//Now we make the left side
	switch(chooseValueBetween(1,2)){
	
		case 1://Rectangle
		
			if(this.bigShapeType === "Rectangle"){
		
				this.smallWidthFactor = chooseFloatBetween(1, Math.pow( this.currentDivision, 0.5 ));//Currently this doesn't vary between skinny and fat triangles, but it may in the future.
				this.smallHeightFactor = this.currentDivision / this.smallWidthFactor;//THIS NEEDS TO BE CHANGED, base/10 * height/10 = area/100 not area/10
				//smallWidthFactor and smallHeightFactor multiply to the value of currentDivision
				
				this.smallWidth =  this.widthValue / this.smallWidthFactor;
				this.smallHeight = this.heightValue / this.smallHeightFactor;
				
				this.comparisonShape = new Rectangle(this.smallWidth, this.smallHeight, this.leftBoxCenterX, this.leftBoxCenterY);
				
				
			}
			
			else{//The big shape was a triangle and this one is a rectangle
			
				//this part of the code may be incorrect
				this.currentDivision *= Math.pow(2, 0.5);//Because A = 1/2BH, it will take half as many triangles to reach the same area as a triangle
				
				this.smallWidthFactor = chooseFloatBetween(1, Math.pow( this.currentDivision, 0.5));
				console.log("smallWidthFactor: " + this.smallWidthFactor);
				this.smallHeightFactor = this.currentDivision / this.smallWidthFactor;
				console.log("smallHeightFactor: " + this.smallHeightFactor);
				
				this.smallWidth =  this.widthValue / this.smallWidthFactor;
				this.smallHeight = this.heightValue / this.smallHeightFactor;
				
				this.comparisonShape = new Rectangle(this.smallWidth, this.smallHeight, this.leftBoxCenterX, this.leftBoxCenterY);
			
			
			}
		
			break;
		case 2://Triangle
		
			if(this.bigShapeType === "Rectangle"){
				//this part of the code may be incorrect
				this.currentDivision /= Math.pow(2, 0.5);//Because A = 1/2BH, it will take twice as many triangles to reach the same area by the old formula
				
				this.smallWidthFactor = chooseFloatBetween(1, Math.pow( this.currentDivision, 0.5));
				this.smallHeightFactor = this.currentDivision / this.smallWidthFactor;
				
				
				this.smallWidth =  this.widthValue / this.smallWidthFactor;
				this.smallHeight = this.heightValue / this.smallHeightFactor;
				
				this.comparisonShape = new Triangle(this.smallWidth, this.smallHeight, this.leftBoxCenterX, this.leftBoxCenterY);
			
			}
			
			else{//Both are triangles
			
				this.smallWidthFactor = chooseFloatBetween(1, Math.pow( this.currentDivision, 0.5));
				this.smallHeightFactor = this.currentDivision / this.smallWidthFactor;
				
				this.smallWidth =  this.widthValue / this.smallWidthFactor;
				this.smallHeight = this.heightValue / this.smallHeightFactor;
				
				this.comparisonShape = new Triangle(this.smallWidth, this.smallHeight, this.leftBoxCenterX, this.leftBoxCenterY);
			
			
			}
		
			break;
		
		
		default:
		
		//Not possible
		
		
	
	}
	
	console.log( "Ratio: " + this.targetShape.area / this.comparisonShape.area);
}

var chooseValueBetween = function( min, max )//Chooses a random value between the min and the max, inclusive.
{

	return( Math.floor(  Math.random() * (1 + max-min) + min  ) );


}

var chooseFloatBetween = function( min, max )//Chooses a random float between the min and the max
{
	return( Math.random(max-min) + min );


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
		
		this.comparisonShape.drawFilled( canvas );
		this.targetShape.drawFilled( canvas );
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
			engine.gameState.correctSound.play();
		}
		else{
			engine.gameState.numWrong++;
			engine.gameState.message = "You got the wrong answer";
			engine.gameState.messageColor = "red";
			engine.gameState.incorrectSound.play();
		}
		engine.gameState.isDisplayingMessage = true;
	}
}
