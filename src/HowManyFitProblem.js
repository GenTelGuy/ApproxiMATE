//In this type of problem, the user is presented with one large shape and one small shape, and must
//determine how many of the small shape fit within the large shape.
var HowManyFitProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
}

HowManyFitProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillText("This is a how-many-fit problem", this.x, this.y);
    }
}
