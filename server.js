const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const db = new sqlite3.Database('./hsk.db');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/practice', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'practice.html'));
});

app.get('/hsk1', (req, res) => {
    const query = `SELECT * FROM hsk WHERE hsklevel = 1`
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(rows);
        res.json(rows);
    });
});

app.get('/hsk2', (req, res) => {
    const query = `SELECT * FROM hsk WHERE hsklevel = 2`
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(rows);
        res.json(rows);
    });
});

app.get('/customhsk', (req, res) => {
    const query = `SELECT * FROM hsk`
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => { console.log("server is running on port: " + PORT) });