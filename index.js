const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

dotenv.config({
  path: './.env'
})

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cookieParser())

app.get('*', checkUser)
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

app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard');
});

// app.use((req, res) => {
//   res.status(404).render('404')
// })
app.use(authRoutes)

app.get('/set-cookie', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', 'false', { maxAge: 6000 * 60 * 24 * 31, httpOnly: true })

  res.send('you got cookies')
})

app.get('/read-cookie', (req, res) => {
  const cookies = req.cookies
  console.log(cookies);
  res.json(cookies)
})

require('./config/db');
const port = process.env.PORT || 5050;
// Start server
app.listen(port, () => console.log(`server started at port http://localhost:${port}`))