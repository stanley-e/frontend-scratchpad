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
class TypeWord extends PIXI.Container {

	constructor(word,baseTextOptions) {
		super()
		var generateStyledTextSprite = function(content,customColor) {
			var styleTextOptions = Object.create(baseTextOptions)
			styleTextOptions.fill = customColor
			var textStyle = new PIXI.TextStyle(styleTextOptions)
			var textSprite = new PIXI.Text(content, textStyle)
			return textSprite
		}
		this.regularTextSprite = generateStyledTextSprite(word, "#FF0FF0")
		this.overlayTextSprite = generateStyledTextSprite("", "#FF0000")
		this.addChild(this.regularTextSprite)
		this.addChild(this.overlayTextSprite)
		this.currentTextLength = word.length
		this.currentOverlayLength = 0
	}

	getNextLetter() {
		if (this.currentTextLength == this.currentOverlayLength) {
			return ""
		}
		return this.regularTextSprite.text[this.currentOverlayLength]
	}
	shiftLetter() {
		if (this.currentTextLength >  this.currentOverlayLength) {
			this.overlayTextSprite.text = this.overlayTextSprite.text + this.getNextLetter()
			this.currentOverlayLength = this.currentOverlayLength + 1
		}
	}
}


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

textSprite = new TypeWord("Hello World!",baseTextStyleOptions)
centerSprite(textSprite,app.stage)
app.stage.addChild(textSprite)


window.addEventListener("keydown", function(event) {
	console.log("()")
	console.log(event.key)
	console.log(textSprite.getNextLetter())
	if (event.key == textSprite.getNextLetter()) {
		textSprite.shiftLetter()
	}
 })



function setup() {
	app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

}

setup()



