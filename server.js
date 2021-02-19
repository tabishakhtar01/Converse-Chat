const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;
const users = {};


// app.use(function(req,res,next)
// {
//     res.header('Access-Control-Allow-Origin',"*");
//     res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
//     res.header('Access-Control-Allow-Headers',"content-type");
//     next();


// })

app.use(express.static(__dirname+'/'));
app.get('/',(req,res)=>
{
    res.sendFile('index.html');
})
io.on('connection', socket =>   // step 1: Connection
{   
    socket.on('new-user',name =>
    {
        users[socket.id] = name;
        socket.broadcast.emit('new-user-joined',name)
    })
    socket.on('send-message',data =>  //step 3: recieving message from client side
    {
        socket.broadcast.emit('send-everyone',{username:users[socket.id], message:data}); // step 4: sending/emiting message to everyone but the sender
        
    })

    socket.on('disconnect',()=>
    {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id];
    })
});

server.listen(port,()=>
{
    console.log(`Server started at port ${port}`);
});
