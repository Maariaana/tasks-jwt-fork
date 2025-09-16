const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;


db.sync();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // para processar forms HTML

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});