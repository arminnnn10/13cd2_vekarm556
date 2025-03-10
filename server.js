const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: "3307",
        password: "",
        database: "felveteli"
    }






)

app.get("/", (req, res) => {
    res.send("a szerver működik")
})



app.get("/nevszerintiranglista", (req, res) => {

    const sql = "SELECT d.nev, t.agazat, (d.hozott + d.kpmagy + d.kpmat) AS osszpont FROM diakok d INNER JOIN jelentkezesek j ON d.oktazon = j.diak INNER JOIN tagozatok t ON j.tag = t.akod ORDER BY d.nev ASC;"
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    }
    )
}
)

app.get("/pontszerintiranglista", (req, res) => {
    const sql = "SELECT d.nev, t.agazat, (d.hozott + d.kpmagy + d.kpmat) AS osszpont FROM diakok d INNER JOIN jelentkezesek j ON d.oktazon = j.diak INNER JOIN tagozatok t ON j.tag = t.akod ORDER BY osszpont ASC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(result);
    });
});



app.listen(3000, () => {
    console.log('a szerver a 3000 porton fut!')

})