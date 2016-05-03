module.exports = function(io){
  io.on('connection',function(socket){
    //console.log('one user connected ' + socket.id);
    socket.on('countNotify',function(data){
      var sockets = io.sockets.sockets;
      sockets.forEach(function(sock){
        sock.emit('countNotify',data);
      });
    });

    socket.on('disconnect',function(){
      //console.log('one user disconnected ' + socket.id);
    })
  });
}
