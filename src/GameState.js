var GameState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
    this.running = true;
	
	this.isQuitting = false;
	
	this.currentChoice = 1; //integers are used to represent the choices for each problem
	
	this.numRight = 0; //the number of problems answered correctly
	this.numRightX = 0; //the coordinates of the number right
	this.numRightY = 0;
	
	this.numWrong = 0; //the number of problems answered incorrectly
	this.numWrongX = 0; //the coordinates of the number wrong
	this.numWrongY = 0;
	
	this.isScreenShaking = false; //set this to true any time a screen shake should occur 
	this.isScreenShakingEnd = false;
	this.screenShakeTimer = 0;
	this.shakeMagnitude = 12; //how far away the camera shakes around its original point, in pixels
	this.transX = 0; //keeps track of the canvas's translation in order to reset it to its original position after screen shaking
	this.transY = 0;
	
	this.isDisplayingMessage = false;
	this.displayMessageTimer = 0;
	this.message = "";
	
	this.fitProblem = new HowManyFitProblem(100, 100); //test code
	this.angleProblem = new IdentifyAngleProblem(500, 500);
	this.perimeterProblem = new MatchPerimeterProblem(320, 240);
	
	this.currentProblem = this.angleProblem; //used to keep track of the current problem
}

GameState.prototype =
{	
    init: function()
    {
		
    },

    // Update the simulation each frame
    update: function(dt)
    {
        //code for screen shaking
        if(this.isScreenShaking){
            this.screenShakeTimer += dt;
            if(this.screenShakeTimer >= 1000){ //how many milliseconds the screen shaking lasts
                this.screenShakeTimer = 0;
                this.isScreenShaking = false;
                this.isScreenShakingEnd = true;
            }
        }
		
		//code for displaying message after every choice made
        if(this.isDisplayingMessage){
            this.displayMessageTimer += dt;
            if(this.displayMessageTimer >= 2000){ //how many milliseconds the message lasts
                this.displayMessageTimer = 0;
                this.isDisplayingMessage = false;
				console.log("Stopped displaying message");
				//create a new problem for the user to solve
				this.currentProblem = new IdentifyAngleProblem(0, 0);
            }
        }
    },

    keyPress: function(keyCode)
    {
        switch(keyCode){
            case 87: // 'w'
				console.log("W pressed");
				if(!this.isDisplayingMessage){
					this.currentChoice = 1;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
                break;
            case 83: // 's'
                console.log("S pressed");
				if(!this.isDisplayingMessage){
					this.currentChoice = 2;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
                break;
			case 68: // 'd'
				console.log("D pressed");
				if(!this.isDisplayingMessage){
					this.currentChoice = 3;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
				break;
				
			case 38: // Up arrow
				console.log("Up pressed");
				break;
			case 40: // Down arrow
				console.log("Down pressed");
				break;
			case 27: // Escape key
				this.isQuitting = !this.isQuitting;
				console.log("Esc pressed");
				break;
			case 13: // Enter key
				if(this.isQuitting){
					engine.activeState = engine.menuState;
				}
				break;
		}
	},

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
		//Screen shaking effect
		if(this.isScreenShaking){
			canvas.translate(-this.transX, -this.transY); //move the canvas back to its origin (0, 0)
			var newX = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			var newY = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			canvas.translate(newX, newY); //move the canvas to a new origin
			this.transX = newX; //keep track of the current x and y translations
			this.transY = newY;
		}
		if(this.isScreenShakingEnd){ //solves the issue where the last translation isn't called
			canvas.translate(-this.transX, -this.transY);
			this.isScreenShakingEnd = false;
			this.transX = 0;
			this.transY = 0;
		}
	
        canvas.clearRect(0, 0, this.w, this.h);
		
		canvas.font = "24px sans-serif";
        canvas.textAlign = "center";
		canvas.fillStyle = "red";
		canvas.fillText("Incorrect: " + this.numWrong, engine.w - 64, 64);
		canvas.fillStyle = "green";
		canvas.fillText("Correct: " + this.numRight, 64, 64);
		
		//this.fitProblem.draw(canvas); //test code
		//this.angleProblem.draw(canvas);
		//this.perimeterProblem.draw(canvas);
		if(this.currentProblem != null){
			this.currentProblem.draw(canvas);
		}
		
		//Screen shaking effect
		if(this.isDisplayingMessage){
			canvas.fillText(this.message, engine.w / 2, engine.h / 2);
		}
		
		if(this.isQuitting){
			canvas.fillText("Are you sure you\nwant to quit?", engine.w / 2, engine.h / 2);
		}
    }
}
