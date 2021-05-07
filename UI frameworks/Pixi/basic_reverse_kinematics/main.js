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


shoulderArm = new PIXI.Graphics()
shoulderArm.lineStyle(4, 0x00ffff, 2)
shoulderArmLength = 70
shoulderArm.lineTo(0,-shoulderArmLength)
shoulderArm.x = centerX
shoulderArm.y = centerY
app.stage.addChild(shoulderArm)

elbowArm = new PIXI.Graphics()
elbowArm.lineStyle(4, 0xff00ff,2)
elbowArmLength = 50
elbowArm.lineTo(0,-elbowArmLength)
elbowArm.x = 0
elbowArm.y = -shoulderArmLength
shoulderArm.addChild(elbowArm)

upperRing = new PIXI.Graphics()
upperRing.lineStyle(1, 0xffffff, 1)
upperRing.drawCircle(0,0, shoulderArmLength + elbowArmLength)
upperRing.x = centerX
upperRing.y = centerY
app.stage.addChild(upperRing)

lowerRing = new PIXI.Graphics()
lowerRing.lineStyle(1, 0xffffff,1)
lowerRing.drawCircle(0,0, Math.abs(shoulderArmLength - elbowArmLength))
lowerRing.x = centerX
lowerRing.y = centerY
app.stage.addChild(lowerRing)

pointMarker = new PIXI.Graphics()
pointMarker.lineStyle(1, 0xAA0000, 1)
pointMarker.drawCircle(0,0,4)
markerUsed = false;

function distance_between_points(aX,aY,bX,bY) {
	 return Math.sqrt((aX-bX)**2 + (aY-bY)**2)
}

function sss_formula(leftSide,rightSide,oppositeSide) {
	// Given three side lengths of a triangle calculates the interior angle in degrees
	// See https://www.mathsisfun.com/algebra/trig-solving-sss-triangles.html
	// Note can return NaN if a solution is not possible
	numerator = leftSide**2 + rightSide**2 - oppositeSide**2
	denominator = 2 * leftSide * rightSide
	radiansAngle = Math.acos(numerator / denominator)
	degreesAngle = radiansAngle * PIXI.RAD_TO_DEG
	return degreesAngle
}


function simplifyDegrees(angle) {
	angle = angle % 360
	if (angle < 0) {
		angle = angle + 360
	}
	return angle
}

function angleDiffDegrees(startAngle,stopAngle) {
	// Returns the smallest change in degrees that when added to the start angle
	// results.
	// Eg 350 to 20 is +10 degrees
	// 20 to 350 is -10 degrees
	// 725 to 0 is -5 degrees
	// If stopAngle is completely opposite startAngle then position is returned
	startAngle = simplifyDegrees(startAngle)
	stopAngle = simplifyDegrees(stopAngle)

	if (stopAngle >= startAngle) {
		clockwiseDiff = stopAngle - startAngle
		anticlockwiseDiff = -(360 - clockwiseDiff)
	} else {
		clockwiseDiff = (360 - startAngle) + stopAngle
		anticlockwiseDiff = -(startAngle - stopAngle)
	}
	if (clockwiseDiff <= 180) {
		return clockwiseDiff
	} else {
		return anticlockwiseDiff
	}
}


	

app.renderer.plugins.interaction.on('mousedown', function(ev) {
	mouseDownX = ev.data.global.x;
	mouseDownY = ev.data.global.y;             
	if (markerUsed == false) {
		app.stage.addChild(pointMarker)
	}
	pointMarker.x = mouseDownX
	pointMarker.y = mouseDownY

	pointDistance = distance_between_points(centerX,centerY,mouseDownX,mouseDownY)
	pointAngleRadians = Math.atan2(centerY-mouseDownY, centerX-mouseDownX)
	pointAngleDegrees = PIXI.RAD_TO_DEG * pointAngleRadians
	console.log(pointAngleDegrees)

	baseTargetShoulderAngle = pointAngleDegrees - 90
	ShoulderShiftAngle = sss_formula(shoulderArmLength,pointDistance,elbowArmLength)
	elbowShiftAngle = sss_formula(shoulderArmLength,elbowArmLength,pointDistance)

	leftTargetShoulderAngle = baseTargetShoulderAngle - ShoulderShiftAngle
	rightTargetShoulderAngle = baseTargetShoulderAngle + ShoulderShiftAngle

	leftDiff = angleDiffDegrees(shoulderArm.angle, leftTargetShoulderAngle)
	rightDiff = angleDiffDegrees(shoulderArm.angle, rightTargetShoulderAngle)

	if (Math.abs(leftDiff) <= Math.abs(rightDiff)) {
		targetShoulderAngle = leftTargetShoulderAngle
		targetElbowAngle =  180 - elbowShiftAngle 
	} else {
		targetShoulderAngle = rightTargetShoulderAngle
		targetElbowAngle = 180 + elbowShiftAngle
	}


	shoulderArm.angle = targetShoulderAngle
	elbowArm.angle = targetElbowAngle
})




function setup() {
	app.ticker.add(delta => gameLoop(delta));
	app.ticker.maxFPS = 5
}

function gameLoop(delta) {
}

setup()



