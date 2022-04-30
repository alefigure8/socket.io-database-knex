const express = require('express');
const { engine } = require('express-handlebars');
const Productos = require('./api/contenedor')
const Comments = require('./api/contenedor_msg')
const producto = new Productos()
const comments = new Comments()

const {Server: IOServer} = require('socket.io');
const {Server: HttpServer} = require('http');
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// settings handlebars
app.set('views', path.join(__dirname, '/public/views'));
app.engine('.hbs', engine({
    defaultlayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// routes
app.use('/', require('./routes/routes.index'));

// public
app.use(express.static(__dirname + '/public'));

// listen
const server = httpServer.listen(8080, ()=>{
  console.log(`Server listo en http://localhost:${server.address().port}`);
})

server.on('error', err => {
  console.log(err);
})

// socket

io.on('connection', (socket) => {
  socket.on('newProduct', async (data)=>{
    await producto.save(data);
    const productosLista = await producto.getAll()
    io.sockets.emit('product', productosLista);
  })

  socket.on('newMsg', async (msg)=>{
    await comments.save(msg);
    const commentsList = await comments.getAll()
    io.sockets.emit('message', commentsList);
  })
})
