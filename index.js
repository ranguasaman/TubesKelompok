import express from 'express';
import path from 'path';
import mysql from 'mysql';
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const PORT = 8080;
const app = express();

const pool = mysql.createPool({
    host: 'localhost',
	user: 'root',
	password: '',
	database: 'gameofthrones',
    dateStrings: true,
    connectionLimit: 10
});

app.set('view engine', 'ejs')

app.set('views', [path.join(__dirname, 'views'),
path.join(__dirname, 'views/Profile')


]);

app.use(express.static(__dirname + '/public'));

const dbConnect = () => {
    return new Promise ((resolve, rejects) => {
        pool.getConnection((err, conn) => {
            if (err)
            {
               rejects(err);
            }
            else
            {
                resolve(conn);
            }
        })
    })
};

app.get('/', async (req, res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('home');
});

app.get('/grafikbar', async (req, res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('grafikbar');
});

app.get('/graftakberarah', async (req, res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('graftakberarah');
});

app.get('/pencarian', async (req, res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('pencarian');
});

app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
});
