var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public/'));

app.get('/',(request,response) => {
    response.render('chat',{
        name : 'OGUZHAN',
    });
});


io.on('connection',socket => {
    
})


server.listen(PORT,() => console.log(`http://localhost:${PORT}`));