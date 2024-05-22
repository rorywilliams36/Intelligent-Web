const comments = require('../controllers/comments')
const plants = require('../controllers/plants')

exports.init = function(io) {
  io.sockets.on('connection', function (socket) {
    console.log("try");
    try {
      /**
       * create or joins a room
       */
      socket.on('create or join', function (room, userId) {
        socket.join(room);
        io.sockets.to(room).emit('joined', room, userId);
      });

      socket.on('chat', function (room, userId, chatText) {
        io.sockets.to(room).emit('chat', room, userId, chatText);
        // save chat to database
        comments.saveChat(room, userId, chatText);

      });

      socket.on('update_identification', function (plantid, identification) {
        // save identification to database
        plants.updateIdentification(plantid, identification);
        // Refresh the page
        io.sockets.emit('refresh');
      });

      socket.on('disconnect', function(){
        console.log('someone disconnected');
      });
    } catch (e) {
    }
  });
}
