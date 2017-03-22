// 导入express、http和socket.io模块
var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use(express.static('dist'))

// 响应'/'请求，返回index.html
app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html')
})

// socket监听connection事件
io.on('connection', function(socket){
  console.log('a user connected');
  // 服务端断开连接
  socket.on('disconnect',function(){
    console.log('disconnected from server')
  })
  // 监听客户端发送过来的消息
  socket.on('chat message',function(msg){
      io.emit('chat message',msg.substring(3,msg.length-4))
  })
});

// http监听3000端口
http.listen(3000,function(){
    console.log('listening on *:3000')
})