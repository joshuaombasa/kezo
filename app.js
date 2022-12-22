import express from 'express'

const app = express()

// set template engine and specify extension

app.set('view engine', 'ejs')

// source for static 
app.use(express.static('public'))

// routestocu
// homepage
app.get('/', (req, res) => {
res.render('index', {title: 'hello world - from backend'})
})

// about
app.get('/about', (req, res) => {
    const languages = ['Java', 'Go', 'PHP', 'JavaScript', 'Python', 'C++', 'Rust']
    res.render('about',{languages})
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