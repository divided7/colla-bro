const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const paths = [];
let currentPath = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);

  socket.on("mouse", (data) => {
    paths.push(data);
  });
}

function draw() {
  noFill();

  if (mouseIsPressed) {
    const point = {
      x: mouseX,
      y: mouseY,
      color: colorInput.value,
      weight: weight.value,
    };
    currentPath.push(point);
  } else {
    senddata(currentPath);
  }

  paths.forEach((path) => {
    beginShape();
    path.forEach((point) => {
      stroke(point.color);
      strokeWeight(point.weight);
      vertex(point.x, point.y);
    });
    endShape();
  });
}

function mousePressed() {
  currentPath = [];
  paths.push(currentPath);
}

clear.addEventListener("click", () => {
  paths.splice(0);
  background(255);
});

function senddata(sth) {
  socket.emit("mouse", sth);
}
