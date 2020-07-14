let color = "#FFF";
let strokeWidth = 4;

const color_picker = select("#pickcolor");
const color_btn = select("#color-btn");
const color_holder = select("#color-holder");
const stroke_width_picker = select("#stroke-width-picker");
const stroke_btn = select("#stroke-btn");

if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$) /i.test(color_picker.value())) {
  color = color_picker.value();
  color_holder.style("background-color", color);
} else {
  console.log("Enter a valid hex value");
}


stroke_btn.mousePressed(() => {
  const width = parseInt(stroke_width_picker.value());
  if (width > 0) strokeWidth = width;
});


function setup() {
  const cv = createCanvas(800, 600);
  cv.position(600, 100);
  cv.background(0);
}
function mouseDragged() {
  // Draw
  stroke(color);
  strokeWeight(strokeWidth);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
