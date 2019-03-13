'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const client = require('./global/redis')
    // Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const config = require("./config");
mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('======DB not Connected=======', err)
    } else {
        console.log('======DB Connected=======')
    }
});

/**Check redis */

client.keys("socket_*", function(e, keys) {
        console.log(keys)
        client.get(keys, function(err, val) {
            console.log('=======redis value========', val)
        })
    })
    // App
const app = express();
var server = require('http').Server(app);
app.listen(PORT);
var io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
var nsp = io.of('/my-namespace');
var roomNo = 1;
io.on('connection', function(socket) {
    console.log('someone connected IO');
    socket.on('click', function(data) {
        console.log("====IO====", data);
    });

    // if (io.nsps['/'].adapter.rooms["room-" + roomNo] && io.nsps['/'].adapter.rooms["room-" + roomNo].length > 1) {
    //     //  roomNo++;
    // }
    // socket.join("room-" + roomNo);
    // io.sockets.in("room-" + roomNo).emit('connectToRoom', "You are in room no. " + roomNo);
    // console.log(io.nsps['/'].adapter.rooms["room-" + roomNo].length);sdsdfsf

});

nsp.on('connection', function(socket) {

    console.log('someone connected NSP');
    socket.on('click2', function(data) {
        console.log('====NSP====', data)
    });
    //
    //
    var users = [];
    console.log(users.indexOf('s'));
    socket.on('setUsername', function(data) {
        if (users.indexOf(data) == -1) {
            users.push(data);
            socket.emit('setUser', { username: data });
        } else {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
    })

    socket.on('msg', function(data) {
        //Send message to everyone
        console.log('======msg in emit in server===', data)
        nsp.emit('newmsg', data);
    })
});


server.listen('3000', HOST, function() {
    console.log(`Running on http://${HOST}:${PORT}`);
});