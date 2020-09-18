const { Pool } = require('pg'); // https://www.npmjs.com/package/pg
const express = require('express');

const app = express();

app.use(express.static("/home/florian/SqlInjection/public"));  // Das Verzeichnis für normale HTML-Dateien
app.listen(3001);
console.log("SQL Injection hört auf Port 3001");

app.get('/anlegen', async (req, res, next) => {
    res.json(await benutzerAnlegen(req.query.name, req.query.passwort));
    next();
});

app.get('/anmelden', async (req, res, next) => {
    res.json(await benutzerAnmelden(req.query.name, req.query.passwort));
    next();
});

// Datenbank-Funktionen:

const pool = new Pool({
    user: 'sql_injection',
    host: '127.0.0.1',
    database: 'sql_injection',
    password: 'geheim',
    port: 5432
});

async function benutzerAnlegen(name, passwort) {
    const client = await pool.connect();
    let ergebnis;
    try {
        const queryText = `insert into benutzer (name, passwort) values ('${name}', '${passwort}')`;
        await client.query(queryText);
        ergebnis = { ergebnis: "ok" };
    } catch (e) {
        console.log(e.detail);
        ergebnis = { ergebnis: e.detail };
    } finally {
        client.release();
    }
    return ergebnis;
}

async function benutzerAnmelden(name, passwort) {
    const client = await pool.connect();
    let ergebnis;
    try {
        const queryText = `select from benutzer where name='${name}' and passwort='${passwort}'`;
        const result = await client.query(queryText);
        console.log(result);
        if (result.rowCount===0) {
            ergebnis = { ergebnis: "Passwort ungültig" };
        } else {
            ergebnis = { ergebnis: "ok" };
        }
    } catch (e) {
        console.log(e.detail);
        ergebnis = { ergebnis: e.detail };
    } finally {
        client.release();
    }
    return ergebnis;
}
