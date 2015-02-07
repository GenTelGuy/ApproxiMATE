//In this type of problem, the user is presented with one target shape and three other shapes,
//Only one of which has the same perimeter as the target shape. The user must choose this shape.
var MatchPerimeterProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
}

MatchPerimeterProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillText("This is a match-perimeter problem", this.x, this.y);
    }
}
