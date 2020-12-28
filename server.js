const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const passwordHash = require('password-hash');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./service-accout-key.json');
const { v4: uuidv4 } = require('uuid');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const PORT = 3000;


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

//Main get 
app.get('/', (request, response) => {
    if (localStorage.getItem('chatUser')) {
        response.render('chat', {
            name: 'OGUZHAN',
        });
    }
    else {
        response.redirect('/login');
    }
});
//Main get  end


// Register get
app.get('/register', (request, response) => {
    response.render('register', {

    });
    console.log(request.method);
});
// Register get end


// Register post
app.post('/register',(request,response) => {
    const {name, surname, mail, password, repeatPassword} = request.body;
    response.send(r);
});
// Register post end

//Login get
app.get('/login', (request, response) => {
    response.render('login', {

    });
    console.log(request.method);
});
//Login get end

//Login post
app.post('/login', (request, response) => {
    const { mail, password } = request.body;
    db.collection("users")
        .where("mail", "==", mail)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot._size < 1) {
                console.log("Kullanıcı bulunamadı.");
            }
            else {
                querySnapshot.forEach(function (doc) {
                    if(passwordHash.verify(password, doc.data().password)){
                        const {name,surname,email} = doc.data();
                        localStorage.setItem('chatUser',{
                            user_id : doc.id,
                            name : name,
                            surname : surname,
                            email : email
                        }); 
                    }
                    else{
                        console.log("başarısız");
                    }         
                });
            }
        }).then(() =>{
            response.redirect('/');
        }  );  
});
//Login post end

io.on('connection', socket => {

    socket.on('message', (message, userId, chatId) => {
        socket.emit('message', {
            message,
            userId,
            chatId
        });

        console.log(message, userId, chatId);
    });

})


server.listen(PORT, () => console.log(`http://localhost:${PORT}`));