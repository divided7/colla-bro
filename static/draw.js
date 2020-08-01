var colorr=''
const width = document.getElementById("weight");
const clear = document.getElementById("clear");

function update(clr){
  window.colorr = clr;
}

function setup() {
  createCanvas(window.innerWidth*2/3, window.innerHeight*2/3);
  background('#2f2f2f');
  
  socket.on('mouse',
    function(data) {
      stroke(data.clr);
      strokeWeight(data.str)
      line(data.x,data.y,data.px,data.py);
    });
    socket.on('touch',
    function(data) {
     stroke(data.clr);
      strokeWeight(data.str)
      line(data.x,data.y,data.px,data.py);
    });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*2/3);
  background('#2f2f2f');
}

function mouseDragged() {

  strokeWeight(width.value);
  stroke(colorr);
  line(mouseX, mouseY, pmouseX, pmouseY);
  // Make a little object with mouseX and mouseY
  let data = {
    x: mouseX,
    y: mouseY,
    px:pmouseX,
    py:pmouseY,
    clr:colorr,
    str:width.value
  };
  // Send that object to the socket
  socket.emit('mouse',data);
}

function touchMoved() {
  strokeWeight(width.value)
  stroke(colorr);
  line(mouseX, mouseY, pmouseX, pmouseY);
  // Make a little object with mouseX and mouseY
  let data = {
    x: mouseX,
    y: mouseY,
    px:pmouseX,
    py:pmouseY,
    clr:colorr,
    str:width.value
  };
  // Send that object to the socket
  socket.emit('touch',data);
  return false;
}

clear.addEventListener("click", () => {
  background('#2f2f2f');
});  