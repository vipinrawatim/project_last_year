import express from 'express';
import con from './db.js';


const router = express.Router();
router.get('/profile', (req, res) => {
    var r = req.session.dp;
 
    console.log(req.session.path);

    res.render('profile/profile1', {
        f: req.session.path,
        name1: req.session.user1,
        phone: req.session.phone,
        email1: req.session.email
    });
})
router.get('/edit-profile', (req,res)=>{

})
export default router