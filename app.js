var canvas;
var canvasContext;
var canvasW;
var canvasH;

var framePerSecond = 30;
var array = [];

var maxRadiusCircle = 250;

var audioStart = [2.153, 3.211, 4.732, 5.295, 7.918];
var audioStop =  [2.210, 3.330, 4.792, 5.351, 7.992];

function draw(){
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');	
	canvasW = canvas.width;
	canvasH = canvas.height;
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvasW, canvasH);

	setInterval(function () {
		drawEverything();
	}, 1000/framePerSecond);

	canvas.addEventListener('mousedown',createCircleClick);
	
	var rnd;
	var myAudio = document.getElementById('myAudio');		
	canvas.addEventListener('click', function() {
		rnd = Math.round(Math.random() * 4);
	    myAudio.currentTime = audioStart[rnd];
	    stopTime = audioStop[rnd];
	    myAudio.play();
	    if(myAudio.currentTime>=stopTime) myAudio.stop();
	  }, false);
	myAudio.addEventListener('timeupdate', function() {
		if (this.currentTime > stopTime) {
			this.pause();
		}
	});
	
}

function createCircleClick(evt) {
	//position?
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	//create circle
	var c  = new Circle(mouseX, mouseY);
	array[array.length] = c;
}

function drawEverything () {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvasW, canvasH);
	if(array.length>0){
		for (var i=0; i < array.length; i++) {
			if (array[i]!==null){
				array[i].drawCircle();
				array[i].transformCircle();			
				deleteCircle(i);		
			}
		}	
	}
}

function deleteCircle(number) {
	if (array[number].radius >= maxRadiusCircle)
	{
		array[number] = null;
	}	
}


//--------------- CIRCLE ---------------//

function Circle(posX, poxY) {
	this.radius = 0;
	
	this.circleX = posX;
	this.circleY = poxY;
	//this.isDraw = true;

	this.drawCircle = function () {
		canvasContext.strokeStyle = "rgb("+ (255 - this.radius) + "," + (255-this.radius) +","+ (255-this.radius) +")";
		canvasContext.beginPath();
		canvasContext.arc(this.circleX, this.circleY, this.radius, 0, 2*Math.PI, true);
		canvasContext.stroke();		
	};
	this.transformCircle = function () {
		if(this.radius > maxRadiusCircle ) {
			this.radius = 0;
		}
		this.radius+=2;
	};	
};
