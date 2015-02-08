//IdentifyAngleProblem: In this type of problem, you are presented with an angle and three options of
//degree or radian measurements, and then have to determine which measurement matches the presented angle
var IdentifyAngleProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
	
	this.minimumAngle = 16;//One degree is the minimum that the angle can be
	this.maximumAngle = 344;//One less than 360 degrees. It is likely that these numbers need adjustment.
	
	this.minimumDifference = 15; //There can be a minimum of 15 degrees between two angles
	this.maximumDifference = 90; //There can be a maximum of 90 degrees between two angles 
	
	this.targetAngle = Math.floor(Math.random() * (this.maximum-this.minimum) + this.minimum);
	//This line sets the angle that the user tries to identify
	
	this.choice1 = 0;
	this.choice2 = 0;
	this.choice3 = 0;
	
	switch(chooseValueBetween(1, 3)){
	
		case 1:
		
			this.choice1 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			this.choice2 = generateWrongAnswer( targetAngle );
			this.choice3 = generateWrongAnswer( targetAngle, choice2 );
			
			
			break;
		
		case 2:
		
			this.choice2 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			
			this.choice1 = generateWrongAnswer( targetAngle );
			this.choice3 = generateWrongAnswer( targetAngle, choice1 );
		
		
			break;
			
		default: //Case 3
		
			this.choice3 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			
			
			this.choice1 = generateWrongAnswer( targetAngle );
			this.choice2 = generateWrongAnswer( targetAngle, choice1 );
			
			break;
			
	
	}
}


var generateWrongAnswer = function( correctAnswer ) //Minimum difference is the minimum difference between the correct angle and an incorrect angle.
{

	switch( chooseValueBetween(1, 2) ){
	
		case 1://Go low
		
		
			this.ret = chooseValueBetween( correctAnswer - this.maximumDifference, correctAnswer - this.minimumDifference ) ;
			
			if(this.ret > this.max){
			
			this.ret = this.max;
			}
			
			if(this.ret < this.min) {
			
			this.ret = this.min
			};
			
			return this.ret;
			
			
			break;
		
		case 2://Go high 
		
			this.ret =  chooseValueBetween( correctAnswer + this.minimumDifference, correctAnswer + this.maximumDifference ) ;
			if(this.ret > this.max){//Make sure you don't go too high or too low
			
				this.ret = this.max;
			}
			
			if(this.ret < this.min) {//^^
			
				this.ret = this.min
			};
		
			return this.ret;
			break;
		
		default: // do nothing, this one never happens
	
	}
	
	



}

var generateWrongAnswer = function( correctAnswer, alreadyUsedWrongAnswer ) //Overloaded function, avoids two of the wrong answers being the same
{

	this.ret = generateWrongAnswer( correctAnswer );
	
	while( Math.abs(this.ret - alreadyUsedWrongAnswer) < minimumDifference ){//If the first generated value was too close to the other answer, try again until it is acceptable.
	
		this.ret = generateWrongAnswer( correctAnswer );
	
	}

	return this.ret;

}

var chooseValueBetween = function( min, max )//Chooses a random value between the min and the max, inclusive.
{

return( Math.floor(  Math.random() * (1 + min-max) + min  ) );


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
