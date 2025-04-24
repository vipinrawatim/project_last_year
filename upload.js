import express from 'express';
import con from './db.js';
const router = express.Router();
import multer from 'multer';
import fs from 'fs';
import path from 'path';


const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
router.use("/uploads", express.static("uploads"));
router.post('/upload1', upload.single('file'), (req, res) => {
    console.log("File upload request received!"); // Debugging log
    console.log("Uploaded file details: ", req.file); // Check file details

    if (!req.file) {
        return res.send("No file uploaded.");
    }
  
    req.session.dp = `/uploads/${req.file.filename}`;
    const filePath = req.session.dp;
    const userId = req.session.user1;
const dir = req.app.get('dir');
    const getOldPathSQL = 'SELECT profile_pic_path FROM userdata WHERE username = ?';
    con.query(getOldPathSQL, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching old path:", err);
        } else if (result.length > 0) {
            const oldPath = result[0].profile_pic_path;
            // STEP 2: Purani photo delete karo
            if (oldPath) {
                const fullOldPath = path.join(dir, oldPath);
                console.log(fullOldPath);
                fs.unlink(fullOldPath, (err) => {
                    if (err) {
                        console.error("Error deleting old photo:", err);
                    } else {
                        console.log("Old profile picture deleted successfully");
                    }
                });
            }
            const sql = 'UPDATE userdata SET profile_pic_path = ? WHERE username = ?';
            con.query(sql, [filePath, userId], (err, result) => {
                if (err) {
                    console.error("Error updating database:", err);
                    return;
                }
                if (result.affectedRows > 0) {
                    console.log("Profile picture path updated successfully");
                } else {
                    console.log("No rows affected. The user may not exist, or the email may be incorrect.");
                }
                req.session.path = req.session.dp;
                console.log("Session path:", req.session.path);

                // Render the page after the update
                res.render('profile/profile1', {
                    f: req.session.path,
                    name1: req.session.user1,
                    phone: req.session.phone,
                    email1: req.session.email
                });
            });
        }
    });
});
export default router