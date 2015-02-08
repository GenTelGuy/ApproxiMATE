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
		//test code for drawing polygons or paths
		canvas.beginPath();
		canvas.moveTo(0, 0); //the initial point
		canvas.lineTo(100,50);
		canvas.lineTo(50, 100);
		canvas.lineTo(0, 90);
		canvas.closePath();
		canvas.stroke(); //draws an outline
		
		canvas.fillText("This is a how-many-fit problem", this.x, this.y);
    }
}
