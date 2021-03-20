let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)
//Create a Pixi Application
options = {};
options.view = document.getElementById("scene");
options.width = 640;
options.height = 480;
let app = new PIXI.Application(options);

let textStyle = new PIXI.TextStyle({
	fill: '#FFFFFF',
	fontfamily: 'monospace',
	fontWeight: 16,
	fontSize: 40 
})

let textGraphic = new PIXI.Text('Hello World!', textStyle)

function randrange(a,b) {
	dif =  b - a - 1
	return  a + Math.random() * dif
}

console.log(textGraphic.width)
textGraphic.x = 100
textGraphic.y = 100
textGraphic.vx = randrange(-29,20)/2 
textGraphic.vy = randrange(-20,20)/2
app.stage.addChild(textGraphic)

function setup() {
	app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
	textGraphic.x = textGraphic.x + textGraphic.vx * delta;
	textGraphic.y = textGraphic.y + textGraphic.vy * delta;
	if (textGraphic.y < 0) { 
		textGraphic.vy = Math.abs(textGraphic.vy);
	}
	if (textGraphic.x < 0) {
		textGraphic.vx = Math.abs(textGraphic.vx)
	}
	if (textGraphic.x > (app.screen.width - textGraphic.width)) {
		textGraphic.vx = -Math.abs(textGraphic.vx);

	}
	if (textGraphic.y > (app.screen.height - textGraphic.height)) {
		textGraphic.vy = -Math.abs(textGraphic.vy);
	}

}

setup()



