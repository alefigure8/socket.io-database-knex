const socket = io.connect();


/* FORMULARIO PRODUCTO*/

const divProducts = document.getElementById('products')
const formProducts = document.getElementById('form_products');

formProducts.addEventListener('submit', e => {
  e.preventDefault()
  let title =  e.target.title.value;
  let price = e.target.price.value;
  let thumbnail = e.target.thumbnail.value;

  const product = {
    title,
    price,
    thumbnail
  };

  socket.emit('newProduct', product);

  formProducts.reset();

})

socket.on('product', async data => {
  const html = await makeHtmlTable(data);
  divProducts.innerHTML = html;
})

function makeHtmlTable(productosLista) {
  return fetch('views/partials/products.hbs')
      .then(respuesta => respuesta.text())
      .then(plantilla => {
          const template = Handlebars.compile(plantilla);
          const html = template({ productosLista })
          return html
      })
}

/* FORMULARIO COMENTARIOS*/

const formComments = document.getElementById('form_comments');
const divComments = document.getElementById('comments')

formComments.addEventListener('submit', e => {
  e.preventDefault()
  let mail =  e.target.mail.value;
  let message = e.target.message.value;

  const comment = {
    mail,
    message
  };

  socket.emit('newMsg', comment);

  formComments.reset();

})

socket.on('message', async messages => {
  console.log(messages);
  const html = await makeComment(messages);
  divComments.innerHTML = html;
})

function makeComment(commentsList) {
  return fetch('views/partials/comments.hbs')
      .then(respuesta => respuesta.text())
      .then(plantilla => {
          const template = Handlebars.compile(plantilla);
          const html = template({ commentsList })
          return html
      })
}