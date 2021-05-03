options = {};
options.view = document.getElementById("scene")
options.width = 640
options.height = 480
var centerX = options.width/2
var centerY = options.height/2
let app = new PIXI.Application(options)

clockFace = new PIXI.Graphics()
clockFace.lineStyle(4, 0xffffff, 1)
clockFace.drawCircle(640/2,480/2,200)


for( var i = 0; i<12; i++) {
	// Note Grpaphics.arc has 0 at 3'0 clock
	// Each marking is centered on the appropriate angle
	
	clockMarker = new PIXI.Graphics()
	clockMarker.lineStyle(1, 0xffffff, 1)
	clockMarker.beginFill(0xffffff)
	baseDegrees = i * (360/12)
	clockwiseEdge = PIXI.DEG_TO_RAD * (baseDegrees + 3)
	anticlockwiseEdge = PIXI.DEG_TO_RAD * (baseDegrees - 3)
	
	// Draws the arc clockwise and then anti-clockwise. This is because otherwise
	// PIXI will close the path by joining the start and end of the arc with a 
	// straight line
	//
	// the last argument controls whether PIXI draws anti-clockwise (true)
	// or clockwise (false and default)
	clockMarker.arc(centerX, centerY, 180, anticlockwiseEdge, clockwiseEdge,false)
	clockMarker.arc(centerX, centerY, 165, clockwiseEdge, anticlockwiseEdge,true)
	clockMarker.closePath()
	clockMarker.endFill()
	clockFace.addChild(clockMarker)
	
}

hourHand = new PIXI.Graphics()
hourHand.lineStyle(12, 0xffffff, 1)
hourHand.lineTo(0,-80)
hourHand.closePath()
hourHand.x = centerX
hourHand.y = centerY
hourHand.angle = 45

minuteHand = new PIXI.Graphics()
minuteHand.lineStyle(6, 0xffffff, 1)
minuteHand.lineTo(0,-140)
minuteHand.closePath()
minuteHand.x = centerX
minuteHand.y = centerY
minuteHand.angle = 90

app.stage.addChild(clockFace)
app.stage.addChild(hourHand)
app.stage.addChild(minuteHand)

function setup() {
	app.ticker.add(delta => gameLoop(delta));
	app.ticker.maxFPS = 5
}

function gameLoop(delta) {
	now = new Date()
	hourHand.angle = (now.getHours()%12) * 30 + (now.getMinutes()/60 * (360/12))
	minuteHand.angle = (now.getMinutes())* 6 + now.getSeconds()/60 
}

setup()



