import mysql from "mysql2";
// Create a connection to the MySQL database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",      // Your MySQL username
    password: "sana",  // Your MySQL password
    database: "drone_delivery_data"  // Name of your database
});
// Connect to MySQL
con.connect(function (err) {
    if (err) {
        console.error("Error connecting to the database: " + err.stack);
        return;
    }
    console.log("Connected to the database as id " + con.threadId);
});
// Export the connection to be used in other files
export default con;
