// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/scene.png";

// ninja image
var ninjaReady = false;
var ninjaImage = new Image();
ninjaImage.onload = function () {
	ninjaReady = true;
};
ninjaImage.src = "img/ninja.png";

// apple image
var appleReady = false;
var appleImage = new Image();
appleImage.onload = function () {
	appleReady = true;
};
appleImage.src = "img/apple.png";

// Game objects
var ninja = {
	speed: 256 // movement in pixels per second
};
var apple = {};
var applesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a apple
var reset = function () {
	ninja.x = canvas.width / 2;
	ninja.y = canvas.height / 2;

	// Throw the apple somewhere on the screen randomly
	apple.x = 32 + (Math.random() * (canvas.width - 64));
	apple.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		ninja.y -= ninja.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		ninja.y += ninja.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		ninja.x -= ninja.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		ninja.x += ninja.speed * modifier;
	}

	// Are they touching?
	if (
		ninja.x <= (apple.x + 32)
		&& apple.x <= (ninja.x + 32)
		&& ninja.y <= (apple.y + 32)
		&& apple.y <= (ninja.y + 32)
	) {
		++applesCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (ninjaReady) {
		ctx.drawImage(ninjaImage, ninja.x, ninja.y);
	}

	if (appleReady) {
		ctx.drawImage(appleImage, apple.x, apple.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Apples: " + applesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
