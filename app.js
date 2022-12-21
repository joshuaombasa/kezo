import express from 'express'

const app = express()

// set template engine and specify extension

app.set('view engine', 'ejs')

// source for static 
app.use(express.static('public'))

// routestocu
// homepage
app.get('/', (req, res) => {
res.render('index')
})

// about
app.get('/about', (req, res) => {
    res.render('about')
})

// signup
app.get('/signup', (req, res) => {
    res.render('signup')
})

// 404 error
app.get('*', (req, res) => {
    res.render('404')
})


app.listen(3000)