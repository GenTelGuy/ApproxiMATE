var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
	
	this.selectionBoxWidth = 280;
	this.selectionBoxHeight = 60;
	this.selectionBoxX = (this.w / 2) - (this.selectionBoxWidth / 2);
	this.selectionBoxY = 280;
	
	//we may need a current-screen system where the MenuState.js file handles all different states
}

MenuState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){				
			case 38: // Up arrow
				console.log("Up pressed");
				if(this.selectionBoxY === 380){ //very specific, hacky code
					this.selectionBoxY = 280;
				}
				break;
			case 40: // Down arrow
				console.log("Down pressed");
				if(this.selectionBoxY === 280){ //very specific, hacky code
					this.selectionBoxY = 380;
				}
				break;
			case 13: // Enter key
				if(this.selectionBoxY === 280){ //if Learn Mode is currently selected, go to learn mode
					engine.gameState = new GameState(this.w, this.h);
					engine.activeState = engine.gameState;
				}
				else{
					engine.gameState.incorrectSound.play();
				}
				break;
		}
	},

    /*giveResources: function(resources)
    {
        this.stageSelection.giveResources(resources);
        this.characterSelection.giveResources(resources);
    },*/

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.clearRect(0, 0, this.w, this.h);
		
		canvas.font = "40px sans-serif";
        canvas.textAlign = "center";
		canvas.fillStyle = "black";
		canvas.fillText("ApproxiMATE", engine.w / 2, 80);
		canvas.font = "30px sans-serif";
		canvas.fillText("Learning Mode", engine.w / 2, 320);
		canvas.fillStyle = "grey";
		canvas.fillText("Time mode", engine.w / 2, 420);
		canvas.strokeRect(this.selectionBoxX, this.selectionBoxY, this.selectionBoxWidth, this.selectionBoxHeight);
    },

}
