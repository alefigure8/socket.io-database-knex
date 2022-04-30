const express = require('express');
const { engine } = require('express-handlebars');

const {Server: IOServer} = require('socket.io');
const {Server: HttpServer} = require('http');
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const db = require('./scripts/crearTablas');
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
    await db.producto.insertProductos(data);
    const productosLista = await producto.listarProductos()
    io.sockets.emit('product', productosLista);
  })

  socket.on('newMsg', async (msg)=>{
    await db.comments.insertComment(msg);
    const commentsList = await db.comments.listarComment()
    io.sockets.emit('message', commentsList);
  })
})
