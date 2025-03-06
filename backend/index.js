const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "felveteli",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed: ", err);
        return;
    }
    console.log("MySQL connection successful.");
});

app.get("/preliminary-ranking", (req, res) => {
    const sql = `
        SELECT 
            d.nev AS 'Tanuló neve',
            t.agazat AS 'Ágazat',
            (d.hozott * 2 + d.kpmagy + d.kpmat) AS 'osszpont'
        FROM diakok d
        JOIN jelentkezések j ON d.oktazon = j.diak
        JOIN tagozatok t ON j.tag = t.akod
        ORDER BY d.nev ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get("/admitted/:sector", (req, res) => {
    const { sector } = req.params;
    const sql = `
        SELECT 
            d.nev AS 'Tanuló neve',
            t.agazat AS 'Ágazat',
            (d.hozott * 2 + d.kpmagy + d.kpmat) AS 'osszpontszam'
        FROM diakok d
        JOIN jelentkezések j ON d.oktazon = j.diak
        JOIN tagozatok t ON j.tag = t.akod
        WHERE t.agazat = ? AND t.nyek = 1 AND j.hely = 1
        ORDER BY (d.hozott * 2 + d.kpmagy + d.kpmat) DESC
        LIMIT 32
    `;
    db.query(sql, [sector], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get("/sectors", (req, res) => {
    const sql = "SELECT DISTINCT agazat FROM tagozatok WHERE nyek = 1";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001.");
});