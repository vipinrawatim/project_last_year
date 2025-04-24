
import express from 'express';
import con from './db.js';
const router = express.Router();

router.get('/upload', (req, res) => {
   
    let u = req.session.u;
    let p = req.session.pass;
    let e = req.session.e;
    let m = req.session.p;
    const sql1 = `select * from userdata where email = ?`;
    const data1 = [e];
    con.query(sql1, data1, (err, result) => {
        if (result.length > 0) {
            res.redirect('/');
        }
        if (err) throw err;
        else {
            const value = [u, p, e, m];
            const sql = `INSERT INTO userdata(username, password, email, phone) VALUES (?,?,?,?)`;
            con.connect(function (err) {
                if (err) throw err;
                console.log("Connected!");
                con.query(sql, value, (err) => {
                    if (err) throw err;
                    console.log("data inserted successfully");
                    res.render('home/index', { name1: u });
                })
            });
        }
    })
});