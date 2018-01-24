var canvas;
var ctx;
var dx = 10;
var dy = 10;
var x = 100;
var y = 100;
var WIDTH = 1000;
var HEIGHT = 500;
var background = new Image();
var direction = 1;

function circle(x,y,r) {
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI*2, true);
ctx.fill();
}

function rect(x,y,w,h) {
ctx.beginPath();
ctx.rect(x,y,w,h);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

function clear() {
ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");


canvas.width = 1000;
canvas.height = 500;

background.src = "images/background.jpg";

return setInterval(draw, 10);
return x,y;
}


function doKeyDown(evt){
switch (evt.keyCode) {
case 38:  /* Up arrow was pressed */
if (y - dy > 0){
    y -= dy;
    user.direction = 1;
}
break;
case 40:  /* Down arrow was pressed */
if (y + dy < HEIGHT){
    y += dy;
    user.direction = 2;
}
break;
case 37:  /* Left arrow was pressed */
 if (x - dx > 0){
     x -= dx;
    user.direction = 3;
}
break;
case 39:  /* Right arrow was pressed */
if (x + dx < WIDTH){
    x += dx;
    user.direction = 4;
}
break;
    case 32: /* Spacebar was pressed */
    shoot();
    }
}

function shoot(){
var bullet = {
    x:0,
    y:0,
    buldir:0
}

bullet.x = user.x;
bullet.y = user.y;
bullet.buldir = user.direction;

    user.bullets.push(bullet);
    console.log(user.bullets);

}

function draw() {
clear();
ctx.drawImage(background,0,0);
ctx.strokeStyle = "black";
ctx.fillStyle = "purple";

for(i in otherusers){
    circle(otherusers[i].x, otherusers[i].y, 30)
    for(u in otherusers[i].bullets){
      if(otherusers[i] != null && (otherusers[i].bullets[u] != null)){
        circle(otherusers[i].bullets[u].x, otherusers[i].bullets[u].y, 5)
      }
    }

    }

}

init();
window.addEventListener('keydown',doKeyDown,true);
