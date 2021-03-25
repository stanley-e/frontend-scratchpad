let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }
options = {
	view:   document.getElementById("scene"),
	width:  640,
	height: 480
}
let app = new PIXI.Application(options);

baseTextStyleOptions = {
	fill: "#FFFFFF",
	fontfamily: "serif",
	fontWeight: 16,
	fontSize: 40 

}
greenTextStyleOptions = Object.create(baseTextStyleOptions)
greenTextStyleOptions.fill = "#00EE00"

redTextStyleOptions = Object.create(baseTextStyleOptions)
redTextStyleOptions.fill = "#FF0000"

greenTextStyle = new PIXI.TextStyle(greenTextStyleOptions)
redTextStyle = new PIXI.TextStyle(redTextStyleOptions) 

textSprite = new PIXI.Text('type these words', redTextStyle)
overlayTextSprite = new PIXI.Text('', greenTextStyle);
// TODO: Setup an object oriented system that ties the two sprites together
// maybe subclass PIXI.Container

function randrange(a,b) {
	dif =  b - a - 1
	return  a + Math.random() * dif
}

function getCenterOfBox(width,height) {
	return [(width/2),(height/2)]

}

function centerSprite(sprite,stage) {
	// Assumes the x,y of the sprite is anchored to the top left corner
	sceneCenter = getCenterOfBox(scene.width,scene.height)
	spriteCenter = getCenterOfBox(sprite.width,sprite.height)
	sprite.x = sceneCenter[0] - spriteCenter[0]
	sprite.y = sceneCenter[1] - spriteCenter[1]
}

window.addEventListener("keydown", function(event) {
	console.log("()")
	console.log(event.key)
	correctLetterIndex = overlayTextSprite.text.length
	console.log(correctLetterIndex)
	correctLetter = textSprite.text.charAt(correctLetterIndex)
	console.log(correctLetter)
	if (event.key == correctLetter) {
		overlayTextSprite.text = overlayTextSprite.text + correctLetter

	}
 })


console.log(textSprite.width)
centerSprite(textSprite,app.stage)
overlayTextSprite.x = textSprite.x
overlayTextSprite.y = textSprite.y
console.log(textSprite)
app.stage.addChild(textSprite)
app.stage.addChild(overlayTextSprite)

function setup() {
	app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

}

setup()



