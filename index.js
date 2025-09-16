const express = require('express');
const db = require('./db');
const User = require("./models/User");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;


db.sync();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // para processar forms HTML

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 para ler dados de formulários

app.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

app.use("/", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});