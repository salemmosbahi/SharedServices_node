module.exports = function(io){
  //var onData = {};
  io.on('connection',function(socket){
    console.log('one user connected ' + socket.id);
    //onData[socket.id] = {socket: socket};

    socket.on('countNotify',function(data){
      //onData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      sockets.forEach(function(sock){
        sock.emit('countNotify',data);
      });
    });

    socket.on('disconnect',function(){
      console.log('one user disconnected ' + socket.id);
      //delete onData[socket.id];
    })
  });
}
