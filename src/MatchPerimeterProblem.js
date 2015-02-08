//In this type of problem, the user is presented with one target shape and three other shapes,
//Only one of which has the same perimeter as the target shape. The user must choose this shape.
var MatchPerimeterProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
	this.crossY = 128; //the top y-position of the cross drawn
	
	this.instructionsX = 0; //the coordinates of the message "Match the Areas!"
	this.instructionsY = 0;
}

MatchPerimeterProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillStyle = "black";
		canvas.font = '24px sans-serif';
        canvas.textAlign = 'center';
		canvas.fillText("Match the perimeter!", engine.w / 2, 64);
	
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
    }
}
