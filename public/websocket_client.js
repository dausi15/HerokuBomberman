//ws = new WebSocket('ws://localhost:3000');
var socket = io();

//var username = prompt("Please enter your username");
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
var user = {
    //name:username,
    name:guid,
    x:0,
    y:0,
    bullets:[],
    direction:0
};
var otherusers = [];
socket.on('connection', function() {
    user.x = x;
    user.y = y;
    console.log(x,y,user.name);
    console.log(user);
    socket.send(JSON.stringify(user))
});

socket.on('message', function (event) {
    otherusers = JSON.parse(event);
    if(otherusers[0] != null && (otherusers[0].bullets[0] != null)){
    console.log("after move bullets(): " + otherusers[0].bullets[0].y);
    }
    for(u in otherusers){
      if(otherusers[u].name == user.name){
        user.bullets = otherusers[u].bullets
      }
    }

});


function sendUserdata() {
  user.x = x;
  user.y = y;
  socket.send(JSON.stringify(user));
}

setInterval(sendUserdata, 10);

socket.on('close', function(message) {
    socket.close();
});
