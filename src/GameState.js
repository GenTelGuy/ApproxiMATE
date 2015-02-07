var GameState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
    this.running = true;
	
	this.isScreenShaking = true; //set this to true any time a screen shake should occur 
	this.isScreenShakingEnd = false;
	this.screenShakeTimer = 0;
	this.shakeMagnitude = 12; //how far away the camera shakes around its original point, in pixels
	this.transX = 0; //keeps track of the canvas's translation in order to reset it to its original position after screen shaking
	this.transY = 0;
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
    },

    keyPress: function(keyCode)
    {
        switch(keyCode){
            case 87: // 'w'
				console.log("W pressed");
                break;
            case 83: // 's'
                console.log("S pressed");
                break;
				
			case 38: // Up arrow
				console.log("Up pressed");
				break;
			case 40: // Down arrow
				console.log("Down pressed");
				break;
			case 27: //Escape key
				console.log("Esc pressed");
				break;
		}
	},

    /*giveResources: function(resources)
    {
        this.desertBackground = resources.bgDesert;
        this.finalDestinationBackground = resources.bgFinalD;
        this.grottoBackground = resources.bgGrotto;
		this.peaksBackground = resources.bgPeaks;
        this.activeBackground = this.desertBackground;

        this.player1.giveResources(resources);
        this.player2.giveResources(resources);
    },*/

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
        //all drawing should happen after canvas is cleared
    }
}
