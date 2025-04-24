// routes/auth.js
import express from 'express';
import con from './db.js';
import { dirname } from 'path';
import path from 'path';
const router = express.Router();

// Example login handler
router.get('/', (req, res) => {
const login = req.app.get('login');
    res.sendFile(login+'/loginpage/login.html');
});
let allow = false;
function authentication(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    req.session.u3 = req.body.username;
    // check the data in database
    con.query('SELECT * FROM userdata WHERE (email = ? || username =?) AND password = ?', [username, username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length > 0) {
            allow = true; // Set a flag or session variable to indicate authentication success
            req.session.u1 = username;

        }
        else {
            allow = false;
        }
        next(); // Move to the next middleware or route handler
    });
}
router.use(authentication);
// Logout
router.post("/check", (req, res) => {
    if (allow) {
        const Id = req.session.u1;
        console.log("User Email (Id):", Id);

        const sql = `SELECT username, profile_pic_path, phone FROM userdata WHERE email = ?`;

        con.query(sql, [Id], (err, result) => {
            if (err) {
                console.error("Error fetching data:", err);
                return res.send("Database error");
            }

            if (result.length > 0) {
                const user1 = result[0].username;
                const path = result[0].profile_pic_path;
                const phone = result[0].phone;
                const email = Id;

                // session mein store karo
                req.session.user1 = user1;
                req.session.path = path;
                req.session.phone = phone;
                req.session.email = email;
                console.log(req.session.path);

                console.log("Username:", user1);


                // ab safely render karo
                const home = req.app.get('home');
                res.render('home/index', {
                    name1: req.session.user1,
                    f: req.session.path

                });
            } else {
                console.log("User not found!");
                res.send("User not found");
            }
        });
    }
    else {
        res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.send('Error logging out');
        } else {
            res.redirect('/');
        }
    });
})
export default router;
