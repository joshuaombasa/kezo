import express from 'express'

const app = express()

// set template engine and specify extension

app.set('view engine', 'ejs')

// source for static 
app.use(express.static('public'))

const notes = [
    {
        id: 1,
        title: 'Title 1',
        body: 'Body of the first note goes here'
    },
    {
        id: 2,
        title: 'Title 2',
        body: 'Body of the second note goes here'
    },
    {
        id: 3,
        title: 'Title 3',
        body: 'Body of the third note goes here'
    },
    {
        id: 4,
        title: 'Title 4',
        body: 'Body of the fourth note goes here'
    },
    {
        id: 5,
        title: 'Title 5',
        body: 'Body of the fifth note goes here'
    }
]
// routestocu
// homepage
app.get('/', (req, res) => {
res.render('index')
})

// view all notes
app.get('/notes', (req, res) => {
    
    res.render('notes',{notes})
})

// view a single note
app.get('/note/:id', (req, res) => {
    // get the note
    const note = notes.find(note => note.id === parseInt(req.params.id))
    res.render('note', {note})
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