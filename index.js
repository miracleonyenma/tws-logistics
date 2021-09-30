const express = require('express');
const dotenv = require('dotenv')
const path = require('path');

const authRoutes = require('./routes/authRoutes')

dotenv.config({
  path: './.env'
})

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/blog', (req, res) => {
  res.render('blog');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/industries', (req, res) => {
  res.render('industries');
});
app.get('/services', (req, res) => {
  res.render('services');
});

// app.use((req, res) => {
//   res.status(404).render('404')
// })
app.use(authRoutes)

require('./config/db');
const port = process.env.PORT || 5050;
// Start server
app.listen(port, () => console.log(`server started at port http://localhost:${port}`))