import WebSocket, { WebSocketServer } from "ws";
import http from 'http';

let userCount = 0;

const server = http.createServer(function(request:any,response:any){
    console.log(new Date() + "Recieved request from " + request.url);
    response.end("hello there");
})


const wss = new WebSocketServer({server});

wss.on('connection', function connection(socket){
    // error
    socket.on('error', (err) => console.error(err));

    //message
    socket.on('message',function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary});
            }
        });
    });
    console.log("user connected", ++userCount);
    socket.send("hello messsage from the server!!");
});


server.listen(8080, function(){
    console.log(new Date() + "Server is listening on the port 8080");
})