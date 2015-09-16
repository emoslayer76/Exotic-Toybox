
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;
document.body.appendChild(canvas);


// Load the Background image
var bgReady = false;
var bgImage = new Image();
var bgImage1 = new Image();
bgImage.onload = function () {	bgReady = true; }; // Will Change to True if image successfully loaded
bgImage1.onload = function () {	bgReady = true; }; // Will Change to True if image successfully loaded
bgImage.src = "images/background.png";
bgImage1.src = "images/background1.png";



// Load the Hero image
var heroReady = false;
var heroImage = new Image();
var heroImage2 = new Image();
var heroImage3 = new Image();
var heroImage4 = new Image();
heroImage.onload = function () {	heroReady = true; };
heroImage2.onload = function () {	heroReady = true; };
heroImage3.onload = function () {	heroReady = true; };
heroImage4.onload = function () {	heroReady = true; };
heroImage.src = "images/marioR.png";
heroImage2.src = "images/marioL.png";
heroImage3.src = "images/marioR1.png";
heroImage4.src = "images/marioL1.png";
var i = 0;

// Load the Monster image
var waterReady = false;
var waterImage = new Image();
waterImage.onload = function () {	waterReady = true; };
waterImage.src = "images/droplet.png";

// Game objects
var hero = {
	speed: 512 // movement in pixels per second
};


var water = {};
var water1 = {};
var water2 = {};
var waterCollected = 0; // Count for the water drops collected


// Handle keyboard controls
var keysDown = {};

//Attach a set of operations when the user presses a key
addEventListener("keydown", function (e) {	
	keysDown[e.keyCode] = true; 	//Attach the key code to the array/object	
}, false);

//Attache a set of operations when user releases the key
addEventListener("keyup", function (e) {	
	delete keysDown[e.keyCode];		//When Key is released, the code is deleted from the array/object
}, false);

// Reset all the game variables and objects 
var reset = function () {
	hero.width=104;
	hero.height=100;
	
	waterCollected = 0;
	countcheck= null;
	countstart = Date.now();
	//put the hero in the center of the screen
	hero.x = canvas.width / 2;
	hero.y = canvas.height-hero.height;//canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	water.x = 32 + (Math.random() * (canvas.width - 64));
	water.y = -32;//32 + (Math.random() * (canvas.height - 64));
	
	water1.x = 32 + (Math.random() * (canvas.width - 64));
	water1.y = -282;//32 + (Math.random() * (canvas.height - 64));
	
	water2.x = 32 + (Math.random() * (canvas.width - 64));
	water2.y = -642;//32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	//The "in" keyword is used to determine if the value is contained inside of the object
	//This is a built in search function that will check for the keys
	//Developer Docs on "in": https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/in
	
	if(gameState == 0){
		if (13 in keysDown) { // Player Press Enter
		  gameState=1;
		}
		
	}
	
	if(gameState == 1 ){
		if (37 in keysDown && hero.x>0) { // Player holding left
			hero.x -= hero.speed * modifier;
			if(i==1)i=3;
			else if(i==0){
			   hero.x-=50;
			   i=1;
			} 
			else i=1;
		}
		if (39 in keysDown && hero.x<canvas.width-hero.width) { // Player holding right
			hero.x += hero.speed * modifier;
			if(i==0)i=2;
			else if(i==1){
			   hero.x+=50;
			   i=0;
			} 
			else i=0;
		}

		// Are they touching? - checking for point of intersection
		//If they are touching,reset position of water droplet to top of the screen and increment waterCollected
		if (
			hero.x <= (water.x + 32)
			&& water.x <= (hero.x + hero.width)
			&& hero.y <= (water.y + 32)
			&& water.y <= (hero.y + hero.height)
		) {
			++waterCollected;
			water.x = 32 + (Math.random() * (canvas.width - 64));
			water.y = -32;
		}
		if (
			hero.x <= (water1.x + 32)
			&& water1.x <= (hero.x + hero.width)
			&& hero.y <= (water1.y + 32)
			&& water1.y <= (hero.y + hero.height)
		) {
			++waterCollected;
			water1.x = 32 + (Math.random() * (canvas.width - 64));
			water1.y = -32;
		}
		if (
			hero.x <= (water2.x + 32)
			&& water2.x <= (hero.x + hero.width)
			&& hero.y <= (water2.y + 32)
			&& water2.y <= (hero.y + hero.height)
		) {
			++waterCollected;
			water2.x = 32 + (Math.random() * (canvas.width - 64));
			water2.y = -32;
		}
		
		//water drops movement
		water.y+=1;
		water1.y+=1;
		water2.y+=1;
		
		//reset water drops position to top of the screen after exiting the bottom of the screen
		if(water.y>canvas.height+32){
			water.x = 32 + (Math.random() * (canvas.width - 64));
			water.y = -32;
		} 
		if(water1.y>canvas.height+32){
			water1.x = 32 + (Math.random() * (canvas.width - 64));
			water1.y = -32;
		} 
		if(water2.y>canvas.height+32){
			water2.x = 32 + (Math.random() * (canvas.width - 64));
			water2.y = -32;
		}
		
		if (countcheck >= 20000) {
			gameState = 2;
		};
	}
	
	if(gameState == 2){
		if (13 in keysDown) { // Player Press Enter
		  reset();
		  gameState=0;
		}
		
	}
	
	
};

// Draw everything
var render = function () {	
    if(gameState == 0){
		if (bgReady) { //if Background Image loaded
			ctx.drawImage(bgImage1, 0, 0);
		}
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Start Game ",375,200);
		ctx.fillStyle = "rgb(250, 0, 0)";
		ctx.fillText("Press Enter ",375,250);
		
	}
    if(gameState == 1){
		if (bgReady) { //if Background Image loaded
			ctx.drawImage(bgImage, 0, 0);
		}
        //select image based on next position of animation
		if (heroReady&& i==0) { //if Hero Image Loaded
			ctx.drawImage(heroImage, hero.x, hero.y,hero.width,hero.height);
		}
		if (heroReady&& i==1) { //if Hero Image Loaded
			ctx.drawImage(heroImage2, hero.x, hero.y,hero.width,hero.height);
		}
		if (heroReady&& i==2) { //if Hero Image Loaded
			ctx.drawImage(heroImage3, hero.x, hero.y,hero.width,hero.height);
		}
		if (heroReady&& i==3) { //if Hero Image Loaded
			ctx.drawImage(heroImage4, hero.x, hero.y,hero.width,hero.height);
		}

		if (waterReady) { //if water Image loaded
			ctx.drawImage(waterImage, water.x, water.y);
			ctx.drawImage(waterImage, water1.x, water1.y);
			ctx.drawImage(waterImage, water2.x, water2.y);
		}

		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		countcheck=countcheck/1000;
		ctx.fillText("Water Collected: " + waterCollected + "                                                      Time = "+ parseInt(countcheck), 32, 0);
	}
	if(gameState == 2){
		if (bgReady) { //if Background Image loaded
			ctx.drawImage(bgImage1, 0, 0);
		}
		ctx.fillStyle = "rgb(250,250,250)";
		ctx.font = "24px Helvetica";
		ctx.textalign = "left";
		ctx.Baseline = "top";
		ctx.fillText(" Time is Up! ", 300, 150);
		ctx.fillText("Water Drops Collected: " + waterCollected, 300, 200);
		ctx.fillStyle = "rgb(250,0,0)";
		ctx.fillText("Press ENTER to Try Again " ,300, 250);
		countcheck = "";
		
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	countcheck = now - countstart;
};

// Let's play this game!
reset();
var countstart = Date.now();
var countcheck = null;
var gameState = 0;
var then = Date.now();
	if(gameState === 0) {
		setInterval(main, 1); // Execute as fast as possible
	};
