var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
	
	this.testProblem = new ExampleProblem(250, 250); //test code
	this.fitProblem = new HowManyFitProblem(100, 100);
	this.angleProblem = new IdentifyAngleProblem(500, 500);
	this.perimeterProblem = new MatchPerimeterProblem(320, 240);
	
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
		
		this.testProblem.draw(canvas); //test code
		this.fitProblem.draw(canvas);
		this.angleProblem.draw(canvas);
		this.perimeterProblem.draw(canvas);
		canvas.fillText("Testing, testing", 50, 50); //testing code - remove later
    },

}
