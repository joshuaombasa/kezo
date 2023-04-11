import express from 'express'
import mysql from 'mysql'

const app = express()

// create a db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kezo'
})

// set template engine and specify extension

app.set('view engine', 'ejs')

// source for static 
app.use(express.static('public'))

// configuration to accept form information
app.use(express.urlencoded({extended: true}))

// routestocu
// homepage
app.get('/', (req, res) => {
res.render('index')
})

// view all notes
app.get('/notes', (req, res) => {
    // retrieve all notes from notes table
    let sql = 'SELECT * FROM notes'
    connection.query(
        sql, (error, results) => {
            res.render('notes', {notes: results})
        }
    )
    
})

// view a single note
app.get('/note/:id', (req, res) => {
    // retrieve note from notes
    let sql = 'SELECT * FROM notes WHERE id = ?'
    connection.query(
        sql,
         [parseInt(req.params.id)],
         (error, results) => {
            res.render('note', {note:results[0]})
        }
    )
    
})


// display create a note form
app.get('/create', (req, res) => {
    res.render('create')
})

// submit ceate a note form
app.post('/create', (req, res)=> {
    const note = {
        title: req.body.title,
        body: req.body.body

    }
    let sql = 'INSERT INTO notes (title, body) VALUES (?, ?)'
    connection.query(
        sql,
        [note.title, note.body],
        (error, results) => {
            res.redirect('/notes')
        }
    )
}
)

// display edit a note form

app.get('/edit/:id', (req,res) => {
     let sql = 'SELECT * FROM notes WHERE id = ?'
     connection.query(
        sql, [parseInt(req.params.id)], (error,results) => {
res.render('edit', {note:results[0]})
        }
     )
})

// submit edit a note form 
app.post('/edit/:id', (req,res) => {
    const note = {
        title: req.body.title,
        body: req.body.body

    }
    let sql = 'UPDATE notes SET title = ?, body = ? WHERE id = ?'
    connection.query(
        sql,
        [note.title, note.body, parseInt(req.params.id)],
        (error, results) => {
            res.redirect(`/note/${req.params.id}`)
        }
    )
}
)


// delete a note

app.post('/delete/:id', (req,res) => {
    let sql = 'DELETE FROM notes WHERE id = ?'
    connection.query(
        sql, [parseInt(req.params.id)],
        (error, results) => {
            res.redirect('/notes')
        }
    )
})


// 404 error
app.get('*', (req, res) => {
    res.render('404')
})


app.listen(3000, () => {
    console.log('app listening on port 3000')
})