#!/usr/bin/env node
/* eslint-env node */

// https://github.com/websockets/ws

var users = {} // user dictionary. key: counter, value: user
var counter = 0 // increments everytime a connection is established

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
    response.sendFile('index.html')
})

server.listen(5000, function(){
    console.log('Starting server on port 5000')
})

// app.set('port', 3000)
// app.use(express.static(path.join(__dirname, 'public')))
//
// app.get('/', function(request, response){
//   respone.sendFile('index.html');
// });
// server.listen(3000, () => console.log('Server listening on port 3000!'))

// checks if the username exists in the dictionary "users"
function userExists (name) {
  for (key in users) {
    if (users[key].name == name) {
      return true
    }
  }
  return false
}

io.sockets.on('connection', function connection (socket) {
  function sendAllUsers () {
    for (var u in users) {
      for (var i = 0; i < users[u].bullets.length; i++) {
    if(users[u] != null && (users[u].bullets[i] != null)){
    moveBullets();
    deleteBullets(u, i);
  }
}
}
    socket.send(JSON.stringify(users))
  }

  socket.on('message', function incoming (message) {
    var user = JSON.parse(message)
    if (userExists(user.name)) {
      for (key in users) {
          // if match, update user coordinates
        if (users[key].name == user.name) {
          users[key].x = user.x
          users[key].y = user.y
          users[key].bullets = user.bullets
        }
      }
    } else { // if the user doesnt exist it is added
      socket.playerId = counter
      users[counter] = user
      console.log('user: ' + user.name + ' added')
      counter++
    }
  })
  var timer = setInterval(sendAllUsers, 10)

  socket.on('close', function (code, message) {
    console.log('user: ' + users[socket.playerId].name + ' left')
    delete users[socket.playerId]
    clearTimeout(timer)
  })
})

Array.prototype.clean = function(deleteValue){ //cleaning method used to clean null values
    for(var i = 0; i < this.length; i++){
        if(this[i] == deleteValue){
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

function deleteBullets (u, i) {
      if(users[u] != null && (users[u].bullets[i] != null)){
      if (users[u].bullets[i].y < 0 || users[u].bullets[i].y > 500 || users[u].bullets[i].x < 0 || users[u].bullets[i].x > 500) {
        delete users[u].bullets[i]
        users[u].bullets.clean(null); //Cleans the bullets for null values
        console.log("deleting");
  }
}
}

function moveBullets () {
  console.log('moving bullets')
  for (var u in users) {
    for (var i = 0; i < users[u].bullets.length; i++) {
      if(users[u] != null && (users[u].bullets[i] != null)){
      if (users[u].bullets[i].buldir == 1) {
                                                     /* Up is the bulletdirection */
        users[u].bullets[i].y -= 10

      } else if (users[u].bullets[i].buldir == 2) {  /* Down is the bulletdirection */
        users[u].bullets[i].y += 10
      } else if (users[u].bullets[i].buldir == 3) {  /*Left is the bulletdirection */
        users[u].bullets[i].x -= 10
      } else if (users[u].bullets[i].buldir == 4) {  /* Right is the bulletdirection */
        users[u].bullets[i].x += 10
      }
    }
  }
  }
}
