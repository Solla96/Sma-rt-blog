const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
//database connect
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'progate',
    password: 'password',
    database: 'blog'
});
// topscreen routing url-screen
app.get('/', (req, res) =>  {
    res.render('top.ejs');
});
//Homescreen routing url-screen
app.get('/list', (req, res) =>  {
    connection.query(
        'SELECT * FROM articles',
        (error, results) => {
            //Check Data & Proparty for EJS
         res.render('list.ejs', { articles: results });
        }
    );
});

//Viewing screen routing url-screen
app.get('/article/:id', (req, res) =>  {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM articles WHERE id = ?',
        [id],
        (error, results) => {
            //Check Data & Proparty for EJS
         res.render('article.ejs', { articles: results[0] });
        }
    );
});

app.listen(3000);