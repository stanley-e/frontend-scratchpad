options = {};
options.view = document.getElementById("scene")
options.width = 640
options.height = 480
var centerX = options.width/2
var centerY = options.height/2
let app = new PIXI.Application(options)

centerMarker = new PIXI.Graphics()
centerMarker.lineStyle(4, 0xAA0000, 1)
centerMarker.moveTo(-10,0)
centerMarker.lineTo(10,0)
centerMarker.moveTo(0,-10)
centerMarker.lineTo(0,10)
centerMarker.x = centerX
centerMarker.y = centerY
centerMarker.angle = 45
app.stage.addChild(centerMarker)



upperArm = new PIXI.Graphics()
upperArm.lineStyle(4, 0x00ffff, 2)
upperArmLength = 70
upperArm.lineTo(0,-upperArmLength)
upperArm.x = centerX
upperArm.y = centerY
app.stage.addChild(upperArm)

lowerArm = new PIXI.Graphics()
lowerArm.lineStyle(4, 0xff00ff,2)
lowerArmLength = 50
lowerArm.lineTo(0,-lowerArmLength)
lowerArm.x = 0
lowerArm.y = -upperArmLength
upperArm.addChild(lowerArm)


upperRing = new PIXI.Graphics()
upperRing.lineStyle(1, 0xffffff, 1)
upperRing.drawCircle(0,0, upperArmLength + lowerArmLength)
upperRing.x = centerX
upperRing.y = centerY
app.stage.addChild(upperRing)

lowerRing = new PIXI.Graphics()
lowerRing.lineStyle(1, 0xffffff,1)
lowerRing.drawCircle(0,0, Math.abs(upperArmLength - lowerArmLength))
lowerRing.x = centerX
lowerRing.y = centerY
app.stage.addChild(lowerRing)

pointMarker = new PIXI.Graphics()
pointMarker.lineStyle(1, 0xAA0000, 1)
pointMarker.drawCircle(0,0,4)
markerUsed = false;


app.renderer.plugins.interaction.on('mousedown', function(ev) {
	mouseDownX = ev.data.global.x;
	mouseDownY = ev.data.global.y;             
	if (markerUsed == false) {
		app.stage.addChild(pointMarker)
	}
	pointMarker.x = mouseDownX
	pointMarker.y = mouseDownY
})




function setup() {
	app.ticker.add(delta => gameLoop(delta));
	app.ticker.maxFPS = 5
}

function gameLoop(delta) {
}

setup()



