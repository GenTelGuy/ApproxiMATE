//IdentifyAngleProblem: In this type of problem, you are presented with an angle and three options of
//degree or radian measurements, and then have to determine which measurement matches the presented angle
var IdentifyAngleProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
}

IdentifyAngleProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillText("This is an identify-angle problem", this.x, this.y);
    }
}
