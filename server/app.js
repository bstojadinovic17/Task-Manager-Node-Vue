const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');

const auth = require('./routes/auth')
const useri = require('./routes/users')
const taskovi = require('./routes/tasks');
const komentari = require('./routes/comments')
const app = express();
app.use(cors())





app.use('/auth', auth);
app.use('/api', taskovi, komentari, useri);


const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(8080);



