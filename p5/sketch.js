function setup() {
	createCanvas(400, 400);
}

let gridUnit = 10;
let pointSize = 4;
let lineGridColor = "#ddd";
let dotGridColor = "#0041FF";
let dotGridBaseColor = "#E1E1E1";

function createLineGrid (w, h) {
  for (var x = 0; x <= w; x += gridUnit) {
		for (var y = 0; y <= h; y += gridUnit) {
			stroke(dotGridColor);
			strokeWeight(0.03);
			line(x, 0, x, h);
			line(0, y, w, y);
		}
	}
}

function createDotGrid (w = width, h = height, color = dotGridBaseColor) {
  for (var x = 0; x <= w; x += gridUnit*5) {
		for (var y = 0; y <= h; y += gridUnit*5) {
			fill(color);
      stroke(color);
      rect(x-(pointSize/2), y-(pointSize/2), pointSize, pointSize)
		}
	}
}

function createHighlightArea (w, h) {
  fill('rgba(0,65,255,0.2)');
  stroke('rgba(0,65,255,0.4)');
  strokeWeight(1)
  rect(0,0,w,h);

  createDotGrid(w, h, dotGridColor)
  createLineGrid(w, h)
}

let isIncreasing = true; 
function draw() {
	background("#fff");
  translate(10,10)
  createDotGrid();
  createHighlightArea(150,300)
}